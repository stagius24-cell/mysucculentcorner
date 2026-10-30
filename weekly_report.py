"""Read-only combined report of pending Etsy and Shopify orders.

Output:
  1) Generates a combined Etsy + Shopify CSV locally.
  2) Automatically uploads/updates the CSV in your GitHub repo:
     stagius24-cell/mysucculentcorner (beside index.html).

Required environment variables:
  ETSY_KEYSTRING, ETSY_SHARED_SECRET
  SHOPIFY_STORE_DOMAIN, SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET
  GITHUB_TOKEN (unless --skip-github is used)

Optional environment variables:
  ETSY_SHOP_ID             (default: 24066289)
  ETSY_TOKEN_FILE          (default: etsy_tokens.json)
  SHOPIFY_API_VERSION      (default: 2026-10)
  GITHUB_REPO              (default: stagius24-cell/mysucculentcorner)
  GITHUB_BRANCH            (default: main)

The CSV keeps the original Etsy columns and adds a final `source` column.
The legacy GitHub filename is intentionally retained to avoid breaking any
existing workflow that reads it.

Run:
  python weekly_report.py
"""

from __future__ import annotations

import argparse
import base64
import csv
import html
import json
import os
import sys
import time
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

import requests

SHOP_ID = os.getenv("ETSY_SHOP_ID", "24066289")
TOKEN_FILE = Path(os.getenv("ETSY_TOKEN_FILE", "etsy_tokens.json"))
API_BASE = "https://openapi.etsy.com/v3/application"
TOKEN_URL = "https://api.etsy.com/v3/public/oauth/token"
LOCAL_TZ = ZoneInfo("America/Los_Angeles")

# GitHub configuration
GITHUB_REPO = os.getenv("GITHUB_REPO", "stagius24-cell/mysucculentcorner")
GITHUB_BRANCH = os.getenv("GITHUB_BRANCH", "main")
GITHUB_FILE_NAME = "etsy_pending_order_variations.csv"  # Keep legacy path for compatibility.
SHOPIFY_API_VERSION = os.getenv("SHOPIFY_API_VERSION", "2026-10")
_SHOPIFY_ACCESS_TOKEN: str | None = None

SHOPIFY_QUERY = """
query PendingOrders($first: Int!, $after: String) {
  orders(first: $first, after: $after, sortKey: CREATED_AT, reverse: false,
         query: "financial_status:paid") {
    edges {
      cursor
      node {
        id
        name
        cancelledAt
        displayFinancialStatus
        displayFulfillmentStatus
        lineItems(first: 50) {
          edges {
            node {
              title
              sku
              quantity
              unfulfilledQuantity
              product { id }
              variant {
                id
                title
                selectedOptions { name value }
              }
              unfulfilledDiscountedTotalSet { shopMoney { amount currencyCode } }
              discountedUnitPriceSet { shopMoney { amount currencyCode } }
              originalUnitPriceSet { shopMoney { amount currencyCode } }
            }
          }
        }
      }
    }
    pageInfo { hasNextPage endCursor }
  }
}
"""


def required_env(name: str) -> str:
    value = os.getenv(name, "").strip()
    if not value:
        raise RuntimeError(
            f"Missing environment variable {name}. Set it in your terminal before running this script."
        )
    return value


def api_key_header() -> str:
    return f"{required_env('ETSY_KEYSTRING')}:{required_env('ETSY_SHARED_SECRET')}"


def get_access_token() -> str:
    if not TOKEN_FILE.exists():
        raise FileNotFoundError(
            f"Token file not found: {TOKEN_FILE.resolve()}\n"
            "Put your existing etsy_tokens.json beside this script or set ETSY_TOKEN_FILE."
        )

    with TOKEN_FILE.open("r", encoding="utf-8") as f:
        tokens = json.load(f)

    if tokens.get("access_token") and time.time() < float(tokens.get("expires_at", 0)) - 120:
        return tokens["access_token"]

    print("Access token expired; attempting refresh...")
    response = requests.post(
        TOKEN_URL,
        headers={"x-api-key": api_key_header()},
        data={
            "grant_type": "refresh_token",
            "client_id": required_env("ETSY_KEYSTRING"),
            "refresh_token": tokens["refresh_token"],
        },
        timeout=30,
    )
    if response.status_code != 200:
        raise RuntimeError(
            f"Etsy token refresh failed ({response.status_code}). "
            "Check your app credentials and refresh token. Response: "
            f"{response.text[:500]}"
        )

    refreshed = response.json()
    tokens["access_token"] = refreshed["access_token"]
    tokens["refresh_token"] = refreshed.get("refresh_token", tokens["refresh_token"])
    tokens["expires_at"] = time.time() + int(refreshed.get("expires_in", 3600))
    with TOKEN_FILE.open("w", encoding="utf-8") as f:
        json.dump(tokens, f, indent=2)
    return tokens["access_token"]


def fetch_receipts(access_token: str) -> list[dict]:
    headers = {
        "x-api-key": api_key_header(),
        "Authorization": f"Bearer {access_token}",
    }
    receipts: list[dict] = []
    offset = 0

    while True:
        response = requests.get(
            f"{API_BASE}/shops/{SHOP_ID}/receipts",
            headers=headers,
            params={
                "limit": 100,
                "offset": offset,
                "sort_on": "created",
                "sort_order": "asc",
                "was_paid": "true",
                "was_shipped": "false",
                "was_canceled": "false",
            },
            timeout=30,
        )
        if response.status_code != 200:
            message = response.text[:700]
            if response.status_code == 403:
                message += (
                    "\nThis often means the Etsy app has not been authorized with the "
                    "transactions_r scope. Re-run your OAuth authorization with that scope."
                )
            raise RuntimeError(f"Etsy receipts request failed ({response.status_code}): {message}")

        payload = response.json()
        batch = payload.get("results", [])
        receipts.extend(batch)
        if len(batch) < 100:
            break
        offset += len(batch)

    return receipts



def shopify_store_domain() -> str:
    """Return a normalized myshopify.com domain."""
    domain = required_env("SHOPIFY_STORE_DOMAIN").strip()
    domain = domain.removeprefix("https://").removeprefix("http://").strip("/")
    if "/" in domain:
        domain = domain.split("/", 1)[0]
    return domain


def get_shopify_access_token() -> str:
    """Get a fresh 24-hour token using Shopify's client-credentials grant.

    SHOPIFY_ACCESS_TOKEN is also accepted as a fallback for an existing
    long-lived admin-created custom-app token.
    """
    global _SHOPIFY_ACCESS_TOKEN
    if _SHOPIFY_ACCESS_TOKEN:
        return _SHOPIFY_ACCESS_TOKEN

    # Preferred for new apps created in Shopify's Dev Dashboard.
    client_id = os.getenv("SHOPIFY_CLIENT_ID", "").strip()
    client_secret = os.getenv("SHOPIFY_CLIENT_SECRET", "").strip()
    if client_id and client_secret:
        response = requests.post(
            f"https://{shopify_store_domain()}/admin/oauth/access_token",
            data={
                "grant_type": "client_credentials",
                "client_id": client_id,
                "client_secret": client_secret,
            },
            timeout=30,
        )
        if response.status_code != 200:
            raise RuntimeError(
                f"Shopify token request failed ({response.status_code}): {response.text[:700]}"
            )
        token_data = response.json()
        token = token_data.get("access_token")
        if not token:
            raise RuntimeError("Shopify token response did not contain an access_token.")
        _SHOPIFY_ACCESS_TOKEN = token
        return token

    # Compatibility option for stores that already have a valid static token.
    _SHOPIFY_ACCESS_TOKEN = required_env("SHOPIFY_ACCESS_TOKEN")
    return _SHOPIFY_ACCESS_TOKEN


def shopify_graphql(query: str, variables: dict) -> dict:
    """Make one authenticated Shopify Admin GraphQL request."""
    url = (
        f"https://{shopify_store_domain()}/admin/api/"
        f"{SHOPIFY_API_VERSION}/graphql.json"
    )
    response = requests.post(
        url,
        headers={
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": get_shopify_access_token(),
        },
        json={"query": query, "variables": variables},
        timeout=60,
    )
    if response.status_code != 200:
        raise RuntimeError(
            f"Shopify API request failed ({response.status_code}): {response.text[:700]}"
        )
    payload = response.json()
    if payload.get("errors"):
        details = "; ".join(
            str(error.get("message", error)) for error in payload["errors"]
        )
        raise RuntimeError(f"Shopify GraphQL error: {details}")
    if not payload.get("data"):
        raise RuntimeError("Shopify API returned no data.")
    return payload["data"]


def fetch_shopify_pending_orders() -> list[dict]:
    """Fetch paid Shopify orders that still have at least one unfulfilled unit."""
    orders: list[dict] = []
    cursor = None
    while True:
        data = shopify_graphql(
            SHOPIFY_QUERY,
            {"first": 10, "after": cursor},
        )
        connection = data["orders"]
        for edge in connection.get("edges", []):
            order = edge["node"]
            # Exclude canceled orders and anything not actually paid.
            if order.get("cancelledAt"):
                continue
            if (order.get("displayFinancialStatus") or "").upper() != "PAID":
                continue
            # Partially fulfilled orders are included because they still have
            # outstanding units. Fully fulfilled orders have no unfulfilled units.
            pending_lines = []
            for line_edge in (order.get("lineItems") or {}).get("edges", []):
                line = line_edge["node"]
                outstanding = int(line.get("unfulfilledQuantity") or 0)
                if outstanding > 0:
                    pending_lines.append({**line, "pending_quantity": outstanding})
            if pending_lines:
                orders.append({**order, "pending_lines": pending_lines})

        page_info = connection.get("pageInfo") or {}
        if not page_info.get("hasNextPage"):
            break
        cursor = page_info.get("endCursor")
        if not cursor:
            raise RuntimeError("Shopify pagination indicated another page but returned no cursor.")
    return orders


def shopify_variation_label(line: dict) -> str:
    """Format Shopify variant options in the same readable style as Etsy."""
    options = line.get("variant", {}).get("selectedOptions") or []
    parts = [
        f"{clean_text(option.get('name'))}: {clean_text(option.get('value'))}"
        for option in options
        if clean_text(option.get("name")) or clean_text(option.get("value"))
    ]
    if parts:
        return " | ".join(parts)
    variant_title = clean_text(line.get("variant", {}).get("title"))
    if variant_title and variant_title.lower() != "default title":
        return variant_title
    return "No variation recorded by Shopify"


def summarize_shopify(orders: list[dict]) -> tuple[list[dict], int, int, float]:
    """Convert pending Shopify line items to the shared CSV row structure."""
    totals: dict[tuple, dict] = {}
    total_sales = 0.0
    total_units = 0
    for order in orders:
        for line in order.get("pending_lines", []):
            title = clean_text(line.get("title")) or "(Untitled product)"
            product_gid = (line.get("product") or {}).get("id") or ""
            product_id = product_gid.rsplit("/", 1)[-1] if product_gid else ""
            sku = clean_text(line.get("sku"))
            variation = shopify_variation_label(line)
            quantity = int(line.get("pending_quantity") or 0)
            # Prefer Shopify's total for the still-unfulfilled quantity. This
            # avoids counting already-shipped units and is more accurate than
            # multiplying the original order quantity by a unit price.
            pending_total_set = line.get("unfulfilledDiscountedTotalSet") or {}
            pending_shop_money = pending_total_set.get("shopMoney") or {}
            if pending_shop_money.get("amount") is not None:
                line_total = float(pending_shop_money["amount"])
            else:
                price_set = line.get("discountedUnitPriceSet") or line.get("originalUnitPriceSet") or {}
                shop_money = price_set.get("shopMoney") or {}
                line_total = float(shop_money.get("amount") or 0) * quantity
            key = (str(product_id), title, variation, sku)
            if key not in totals:
                totals[key] = {
                    "listing_id": product_id,
                    "listing_title": title,
                    "variation_options": variation,
                    "sku": sku,
                    "units_sold": 0,
                    "item_sales": 0.0,
                    "source": "Shopify",
                }
            totals[key]["units_sold"] += quantity
            totals[key]["item_sales"] += line_total
            total_units += quantity
            total_sales += line_total

    rows = list(totals.values())
    for row in rows:
        row["item_sales"] = round(row["item_sales"], 2)
    rows.sort(key=lambda row: (-row["units_sold"], row["listing_title"], row["variation_options"]))
    return rows, len(orders), total_units, round(total_sales, 2)


def clean_text(value: object) -> str:
    """Decode common HTML entities in Etsy titles and variation labels."""
    return html.unescape(str(value or "")).strip()


def get_variation_label(transaction: dict) -> str:
    """Build a readable label from the variation options selected in a sale."""
    variation_parts: list[str] = []

    for variation in transaction.get("variations", []) or []:
        name = clean_text(variation.get("formatted_name"))
        value = clean_text(variation.get("formatted_value"))
        if name or value:
            if name and value:
                variation_parts.append(f"{name}: {value}")
            else:
                variation_parts.append(name or value)

    if variation_parts:
        return " | ".join(variation_parts)

    for product in transaction.get("product_data", []) or []:
        name = clean_text(product.get("property_name"))
        values = product.get("values") or []
        values_text = ", ".join(clean_text(v) for v in values if clean_text(v))
        if name or values_text:
            if name and values_text:
                variation_parts.append(f"{name}: {values_text}")
            else:
                variation_parts.append(name or values_text)

    if variation_parts:
        return " | ".join(variation_parts)
    return "No variation recorded by Etsy"


def summarize(receipts: list[dict]) -> tuple[dict, dict, int, float]:
    listing_totals: dict[str, dict] = {}
    variation_totals: dict[tuple, dict] = {}
    unique_receipt_ids: set[int] = set()
    total_sales = 0.0

    for receipt in receipts:
        receipt_id = receipt.get("receipt_id")
        if receipt_id is not None:
            unique_receipt_ids.add(receipt_id)

        for transaction in receipt.get("transactions", []) or []:
            title = clean_text(transaction.get("title")) or "(Untitled listing)"
            listing_id = transaction.get("listing_id", "")
            sku = clean_text(transaction.get("sku"))
            quantity = int(transaction.get("quantity") or 0)
            price_obj = transaction.get("price") or {}
            divisor = float(price_obj.get("divisor") or 100)
            amount = float(price_obj.get("amount") or 0) / divisor
            line_total = amount * quantity
            total_sales += line_total

            if title not in listing_totals:
                listing_totals[title] = {
                    "listing_title": title,
                    "units_sold": 0,
                    "item_sales": 0.0,
                }
            listing_totals[title]["units_sold"] += quantity
            listing_totals[title]["item_sales"] += line_total

            variation_label = get_variation_label(transaction)
            key = (str(listing_id), title, variation_label, sku)
            if key not in variation_totals:
                variation_totals[key] = {
                    "listing_id": listing_id,
                    "listing_title": title,
                    "variation_options": variation_label,
                    "sku": sku,
                    "units_sold": 0,
                    "item_sales": 0.0,
                }
            variation_totals[key]["units_sold"] += quantity
            variation_totals[key]["item_sales"] += line_total

    for row in listing_totals.values():
        row["item_sales"] = round(row["item_sales"], 2)
    for row in variation_totals.values():
        row["item_sales"] = round(row["item_sales"], 2)

    return listing_totals, variation_totals, len(unique_receipt_ids), round(total_sales, 2)


def upload_to_github(local_csv_path: Path) -> None:
    """Commit and push the CSV file directly to GitHub using the REST API."""
    token = required_env("GITHUB_TOKEN").strip().strip('"').strip("'")
    api_url = f"https://api.github.com/repos/{GITHUB_REPO}/contents/{GITHUB_FILE_NAME}"
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }

    # Base64-encode the CSV file content for GitHub's API
    with local_csv_path.open("rb") as f:
        content_bytes = f.read()
    content_b64 = base64.b64encode(content_bytes).decode("utf-8")

    # Fetch file metadata to determine if it already exists (SHA is required to update)
    print(f"Checking existing file on GitHub ({GITHUB_REPO}/{GITHUB_FILE_NAME})...")
    get_res = requests.get(
        api_url,
        headers=headers,
        params={"ref": GITHUB_BRANCH},
        timeout=30,
    )

    sha = None
    if get_res.status_code == 200:
        sha = get_res.json().get("sha")
        print(f"Found existing file with SHA: {sha[:10]}...")
    elif get_res.status_code == 404:
        print("File does not exist on GitHub yet. A new file will be created.")
    else:
        raise RuntimeError(
            f"GitHub check failed ({get_res.status_code}): {get_res.text[:300]}"
        )

    now_str = datetime.now(LOCAL_TZ).strftime("%Y-%m-%d %I:%M %p %Z")
    payload = {
        "message": f"Auto-update Etsy + Shopify pending orders [{now_str}]",
        "content": content_b64,
        "branch": GITHUB_BRANCH,
    }
    if sha:
        payload["sha"] = sha

    print(f"Pushing updated CSV to branch '{GITHUB_BRANCH}'...")
    put_res = requests.put(api_url, headers=headers, json=payload, timeout=30)
    if put_res.status_code in (200, 201):
        print(f"Successfully pushed {GITHUB_FILE_NAME} to GitHub repository {GITHUB_REPO}.")
    else:
        raise RuntimeError(
            f"GitHub upload failed ({put_res.status_code}): {put_res.text[:500]}"
        )


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Combine paid, non-canceled, unshipped Etsy and unfulfilled Shopify orders."
    )
    parser.add_argument("--output-dir", default="weekly_reports", help="Folder for local CSV output.")
    parser.add_argument(
        "--skip-github",
        action="store_true",
        help="Skip uploading the generated CSV to GitHub.",
    )
    args = parser.parse_args()
    end = datetime.now(LOCAL_TZ)

    print(f"Etsy Shop ID: {SHOP_ID}")
    print("Etsy filter: paid, not canceled, and not shipped")
    print("Shopify filter: paid, not canceled, with at least one unfulfilled unit")
    print(f"Checked at: {end:%Y-%m-%d %I:%M %p %Z}")

    print("\nConnecting to Etsy (read-only order retrieval)...")
    etsy_token = get_access_token()
    etsy_receipts = fetch_receipts(etsy_token)
    _, etsy_variations, etsy_order_count, etsy_sales = summarize(etsy_receipts)
    etsy_units = sum(row["units_sold"] for row in etsy_variations.values())
    combined_rows = []
    for row in etsy_variations.values():
        combined_rows.append({**row, "source": "Etsy"})

    print("Connecting to Shopify (read-only order retrieval)...")
    shopify_orders = fetch_shopify_pending_orders()
    shopify_rows, shopify_order_count, shopify_units, shopify_sales = summarize_shopify(shopify_orders)
    combined_rows.extend(shopify_rows)

    combined_units = etsy_units + shopify_units
    combined_sales = round(etsy_sales + shopify_sales, 2)
    print("\nPending order summary")
    print(f"  Etsy:    {etsy_order_count} orders | {etsy_units} units | ${etsy_sales:,.2f}")
    print(f"  Shopify: {shopify_order_count} orders | {shopify_units} unfulfilled units | ${shopify_sales:,.2f}")
    print(f"  TOTAL:   {etsy_order_count + shopify_order_count} orders | {combined_units} units | ${combined_sales:,.2f}")
    print("  Sales are item-level estimates before shipping, tax, fees, and refunds.")

    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    variation_csv = output_dir / GITHUB_FILE_NAME
    with variation_csv.open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.writer(f)
        # The original six columns stay in the same order. `source` is appended
        # so existing readers that use the original columns remain compatible.
        writer.writerow([
            "listing_title", "listing_id", "variation_options", "sku",
            "units_sold", "item_sales", "source",
        ])
        for row in sorted(
            combined_rows,
            key=lambda r: (-r["units_sold"], r["listing_title"], r["variation_options"], r["source"]),
        ):
            writer.writerow([
                row["listing_title"], row["listing_id"], row["variation_options"], row["sku"],
                row["units_sold"], f"{row['item_sales']:.2f}", row["source"],
            ])

    print(f"\nCombined Etsy + Shopify CSV saved locally to: {variation_csv.resolve()}")

    if not args.skip_github:
        print("\nStarting GitHub push...")
        upload_to_github(variation_csv)
    else:
        print("\nSkipping GitHub upload (--skip-github set).")
    return 0

if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (
        requests.RequestException,
        RuntimeError,
        FileNotFoundError,
        KeyError,
        ValueError,
        json.JSONDecodeError,
    ) as exc:
        print(f"\nERROR: {exc}", file=sys.stderr)
        raise SystemExit(1)
