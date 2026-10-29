/**
 * =======================================================================
 * MY SUCCULENT CORNER - PLANT DICTIONARY & ZONE CONFIGURATION
 * =======================================================================
 * 
 * Edit this file to customize:
 *  1. Preferred Names: Converts long Etsy listing titles into clean names.
 *  2. Zones (1 to 4): Controls nursery zone sorting & color banners.
 *  3. Pricing: Default unit purchase costs per plant & pot size.
 *
 * HOW TO ADD A NEW PLANT:
 * Add an object to the PLANT_DICTIONARY array:
 *   {
 *     preferredName: "Your Preferred Name",
 *     zone: 1, // 1, 2, 3, or 4
 *     match: ["keyword 1", "keyword 2"] // Words found in Etsy title
 *   },
 */

// =======================================================================
// 1. ZONE CONFIGURATION & COLORS
// =======================================================================
const ZONE_CONFIG = {
  1: {
    name: "Zone 1: Echeveria, Crassula, Nanouk & Lilac Mist",
    color: "bg-emerald-900 text-white border-emerald-700"
  },
  2: {
    name: "Zone 2: String of Hearts & Trailing Plants",
    color: "bg-teal-900 text-white border-teal-700"
  },
  3: {
    name: "Zone 3: Cactus, Jade, Aeonium, Sedum & Key Lime",
    color: "bg-amber-900 text-white border-amber-700"
  },
  4: {
    name: "Zone 4: Other Succulents & Specialty Decor",
    color: "bg-indigo-950 text-white border-indigo-800"
  }
};

// =======================================================================
// 2. PLANT DICTIONARY (PREFERRED NAMES & ZONE ASSIGNMENTS)
// =======================================================================
const PLANT_DICTIONARY = [
  // ---------------------------------------------------------------------
  // ZONE 1: Echeveria, Crassula, Nanouk, Lilac Mist
  // ---------------------------------------------------------------------
  {
    preferredName: "Echeveria 'Red Devotion'",
    zone: 1,
    match: ["red devotion"]
  },
  {
    preferredName: "Echeveria 'Princess Blue'",
    zone: 1,
    match: ["princess blue"]
  },
  {
    preferredName: "Echeveria 'Cubic Frost'",
    zone: 1,
    match: ["cubic frost"]
  },
  {
    preferredName: "Crested Echeveria 'Frosty'",
    zone: 1,
    match: ["frosty", "crested echeveria"]
  },
  {
    preferredName: "Echeveria Pulidonis",
    zone: 1,
    match: ["pulidonis"]
  },
  {
    preferredName: "Crassula Baby Necklace",
    zone: 1,
    match: ["baby necklace"]
  },
  {
    preferredName: "Crassula 'Morgan's Beauty'",
    zone: 1,
    match: ["morgan's beauty", "morgans beauty"]
  },
  {
    preferredName: "Crassula 'Dorothy'",
    zone: 1,
    match: ["dorothy"]
  },
  {
    preferredName: "Crassula 'Tiger Jade'",
    zone: 1,
    match: ["tiger jade"]
  },
  {
    preferredName: "Crassula 'Calico Kitten'",
    zone: 1,
    match: ["calico kitten"]
  },
  {
    preferredName: "Crassula 'String of Buttons'",
    zone: 1,
    match: ["string of buttons"]
  },
  {
    preferredName: "Crassula Variegated Shark Tooth",
    zone: 1,
    match: ["variegated shark tooth", "shark tooth variegated"]
  },
  {
    preferredName: "Crassula Shark Tooth Red Pagoda",
    zone: 1,
    match: ["shark tooth", "red pagoda"]
  },
  {
    preferredName: "Crassula spiralis 'Estagnol'",
    zone: 1,
    match: ["estagnol", "crassula spiralis"]
  },
  {
    preferredName: "Pondo Cliff",
    zone: 1,
    match: ["pondo cliff", "pondo"]
  },
  {
    preferredName: "Tradescantia nanouk pink",
    zone: 1,
    match: ["nanouk"]
  },
  {
    preferredName: "Callisia Repens 'Pink Panther'",
    zone: 1,
    match: ["pink panther", "callisia repens"]
  },
  {
    preferredName: "Lilac Mist",
    zone: 1,
    match: ["lilac mist"]
  },
  {
    preferredName: "Pink Moonstone",
    zone: 1,
    match: ["moonstone"]
  },
  {
    preferredName: "Echeveria",
    zone: 1,
    match: ["echeveria"]
  },
  {
    preferredName: "Crassula",
    zone: 1,
    match: ["crassula"]
  },

  // ---------------------------------------------------------------------
  // ZONE 2: String of Hearts & Trailing Plants
  // ---------------------------------------------------------------------
  {
    preferredName: "Variegated String of Hearts",
    zone: 2,
    match: ["vsoh", "variegated string of hearts", "string of hearts", "sweetheart vine", "rosary vine"]
  },
  {
    preferredName: "Peperomia 'Ruby Cascade'",
    zone: 2,
    match: ["ruby cascade"]
  },
  {
    preferredName: "Cotyledon pendens ('Cliff Hanger')",
    zone: 2,
    match: ["cliff hanger", "cotyledon pendens", "pendens"]
  },
  {
    preferredName: "3D Printed 'Little Guy' Pot with Variegated String of Pearls",
    zone: 2,
    match: ["little guy", "string of pearl"]
  },
  {
    preferredName: "String of Watermelon",
    zone: 2,
    match: ["string of watermelon", "herreianus"]
  },
  {
    preferredName: "String of Pearls",
    zone: 2,
    match: ["string of pearls"]
  },
  {
    preferredName: "Trailing Succulent",
    zone: 2,
    match: ["string of bananas", "string of dolphins", "trailing"]
  },

  // ---------------------------------------------------------------------
  // ZONE 3: Cactus, Jade, Aeonium, Sedum & Key Lime, Euphorbia
  // ---------------------------------------------------------------------
  {
    preferredName: "Brain Cactus",
    zone: 3,
    match: ["brain cactus", "mammillaria cristata"]
  },
  {
    preferredName: "Crested Blue Candle Cactus",
    zone: 3,
    match: ["crested blue candle", "blue candle cactus", "myrtillocactus"]
  },
  {
    preferredName: "Variegated Christmas Cactus",
    zone: 3,
    match: ["christmas cactus", "schlumbergera"]
  },
  {
    preferredName: "Monkey Tail Cactus",
    zone: 3,
    match: ["monkey tail", "cleistocactus"]
  },
  {
    preferredName: "Old Man of the Andes Cactus",
    zone: 3,
    match: ["old man of the andes", "oreocereus trollii", "cephalocereus"]
  },
  {
    preferredName: "Pink Gymnocalycium Cactus",
    zone: 3,
    match: ["rotundulum", "pink cactus"]
  },
  {
    preferredName: "Set of 3 Colors Euphorbia milii",
    zone: 3,
    match: ["euphorbia milii", "crown of thorns", "christ plant", "christ thorn"]
  },
  {
    preferredName: "Key Lime Pie",
    zone: 3,
    match: ["key lime"]
  },
  {
    preferredName: "Dragon Eggs",
    zone: 3,
    match: ["dragon egg"]
  },
  {
    preferredName: "Calico Hearts",
    zone: 3,
    match: ["calico heart"]
  },
  {
    preferredName: "Jade Plant",
    zone: 3,
    match: ["jade plant", "crassula ovata", "jade succulent"]
  },
  {
    preferredName: "Aeonium 'Bonsai'",
    zone: 3,
    match: ["bonsai"]
  },
  {
    preferredName: "Aeonium 'Kiwi'",
    zone: 3,
    match: ["kiwi"]
  },
  {
    preferredName: "Aeonium",
    zone: 3,
    match: ["aeonium"]
  },
  {
    preferredName: "Sedum Lucidum Obesum",
    zone: 3,
    match: ["sedum lucidum", "lucidum obesum"]
  },
  {
    preferredName: "Sedum 'Pink Form'",
    zone: 3,
    match: ["pink form"]
  },
  {
    preferredName: "Pink Jelly Beans",
    zone: 3,
    match: ["jelly bean", "rubrotinctum aurora"]
  },
  {
    preferredName: "Sedum Spathulifolium 'Cape Blanco'",
    zone: 3,
    match: ["cape blanco", "spathulifolium"]
  },
  {
    preferredName: "Sedum Sunsparkler 'Wild Fire'",
    zone: 3,
    match: ["sunsparkler", "wild fire"]
  },
  {
    preferredName: "Burro's Tail",
    zone: 3,
    match: ["burro's tail", "burros tail", "donkey tail"]
  },
  {
    preferredName: "Sedum",
    zone: 3,
    match: ["sedum"]
  },
  {
    preferredName: "Cactus",
    zone: 3,
    match: ["cactus"]
  },

  // ---------------------------------------------------------------------
  // ZONE 4: Other Succulents & Specialty Decor
  // ---------------------------------------------------------------------
  {
    preferredName: "Variegated Pink Mother of Millions",
    zone: 4,
    match: ["mother of millions"]
  },
  {
    preferredName: "Tiger Kalanchoe humilis",
    zone: 4,
    match: ["tiger kalanchoe", "kalanchoe humilis"]
  },
  {
    preferredName: "Kalanchoe longiflora",
    zone: 4,
    match: ["kalanchoe longiflora", "red kalanchoe"]
  },
  {
    preferredName: "Variegated Bear Paw",
    zone: 4,
    match: ["bear paw", "bear claw", "cotyledon tomentosa"]
  },
  {
    preferredName: "Haworthia retusa",
    zone: 4,
    match: ["haworthia retusa", "haworthia"]
  },
  {
    preferredName: "Tiger Striped Succulent Pumpkin",
    zone: 4,
    match: ["pumpkin", "tiger stripe"]
  }
];

// =======================================================================
// 3. DICTIONARY RESOLVER & CLASSIFICATION LOGIC
// =======================================================================

/**
 * Resolves any raw Etsy listing title or user input to its clean preferred name and zone.
 * @param {string} rawTitle - Raw Etsy title or manual plant name
 * @returns {{ name: string, zone: number }}
 */
function resolvePlantInfo(rawTitle) {
  if (!rawTitle) return { name: "Unknown Plant", zone: 4 };

  const lower = rawTitle.toLowerCase();

  // Search dictionary for keyword matches (prioritize longest keyword match for high precision)
  let bestMatch = null;
  let longestMatchLength = 0;

  for (const entry of PLANT_DICTIONARY) {
    for (const keyword of entry.match) {
      const kw = keyword.toLowerCase();
      if (lower.includes(kw)) {
        if (kw.length > longestMatchLength) {
          longestMatchLength = kw.length;
          bestMatch = entry;
        }
      }
    }
  }

  if (bestMatch) {
    return {
      name: bestMatch.preferredName,
      zone: bestMatch.zone
    };
  }

  // Fallback: clean extraneous words if no dictionary keyword matched
  const cleaned = rawTitle.trim()
    .replace(/\b[246]\s*["']?\s*(?:pot|inches|inch)\b/gi, '')
    .replace(/\b[246]\s*["']\b/gi, '')
    .replace(/\b2\s*gallons?\b/gi, '')
    .replace(/^[-|/\s]+|[-|/\s]+$/g, '') || rawTitle.trim();

  return {
    name: cleaned,
    zone: classifyZoneFallback(cleaned)
  };
}

/**
 * Fallback zone classifier for unknown plants not yet in PLANT_DICTIONARY.
 */
function classifyZoneFallback(plantName) {
  const n = (plantName || "").toLowerCase();
  if (n.includes('echeveria') || n.includes('crassula') || n.includes('nanouk') || n.includes('lilac mist') || n.includes('moonstone') || n.includes('pondo')) return 1;
  if (n.includes('hearts') || n.includes('ruby cascade') || n.includes('pendens') || n.includes('pearls') || n.includes('peperomia') || n.includes('trailing')) return 2;
  if (n.includes('cactus') || n.includes('jade') || n.includes('aeonium') || n.includes('sedum') || n.includes('key lime') || n.includes('dragon egg') || n.includes('euphorbia') || n.includes('burro') || n.includes('jelly') || n.includes('calico heart')) return 3;
  return 4;
}

/**
 * Compatibility wrapper for classifyZone
 */
function classifyZone(plantName) {
  return resolvePlantInfo(plantName).zone;
}

// =======================================================================
// 4. UNIT PRICING LOGIC
// =======================================================================
function getUnitPrice(plantName, varName, size) {
  const p = (plantName || "").toLowerCase();
  const v = (varName || "").toLowerCase();
  const s = (size || "").toLowerCase();
  if (p.includes("euphorbia") || p.includes("euphoria") || p.includes("crown of thorns")) return 18.00;
  if (p.includes("string of hearts") || p.includes("vsoh")) {
    return (s.includes("2") || v.includes("2")) ? 1.50 : 3.50;
  }
  if (s.includes("gallon") || v.includes("gallon") || s.includes("2g") || v.includes("2g")) return 20.00;
  if (s.includes("6") || v.includes("6")) return 6.00;
  if (s.includes("4") || v.includes("4")) return 2.50;
  if (s.includes("2") || v.includes("2")) return 1.00;
  return 5.00;
}

// Attach to window for global access
if (typeof window !== "undefined") {
  window.ZONE_CONFIG = ZONE_CONFIG;
  window.PLANT_DICTIONARY = PLANT_DICTIONARY;
  window.resolvePlantInfo = resolvePlantInfo;
  window.classifyZone = classifyZone;
  window.getUnitPrice = getUnitPrice;
}
