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
var ZONE_CONFIG = {
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
var PLANT_DICTIONARY = [
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
    match: ["morgan's beauty", "morgan’s beauty", "morgans beauty", "morgan beauty"]
  },
  {
    preferredName: "Crassula 'Springtime'",
    zone: 1,
    match: ["rupestris springtime", "crassula springtime", "rupestris", "springtime"]
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
    preferredName: "Echeveria 'Red Sky'",
    zone: 1,
    match: ["red sky"]
  },
  {
    preferredName: "Echeveria 'Chroma'",
    zone: 1,
    match: ["chroma"]
  },
  {
    preferredName: "Echeveria 'Lola'",
    zone: 1,
    match: ["echeveria 'lola'", "echeveria lola", "lola"]
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
    preferredName: "Variegated String of pearl",
    zone: 2,
    match: ["little guy", "variegated string of pearl", "variegated string of pearls"]
  },
  {
    preferredName: "String of pearl",
    zone: 2,
    match: ["string of pearl", "string of pearls", "senecio rowleyanus"]
  },
  {
    preferredName: "String of Watermelon",
    zone: 2,
    match: ["string of watermelon", "herreianus"]
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
    preferredName: "Golden Tail Cactus",
    zone: 3,
    match: ["golden tail", "cleistocactus winteri"]
  },
  {
    preferredName: "Monkey Tail Cactus",
    zone: 3,
    match: ["monkey tail", "cleistocactus colademononis", "cleistocactus"]
  },
  {
    preferredName: "Old Man of the Andes Cactus",
    zone: 3,
    match: ["old man of the andes", "oreocereus trollii", "cephalocereus"]
  },
  {
    preferredName: "Joseph Coat cactus",
    zone: 3,
    match: ["opuntia monacantha", "joseph's coat", "joseph coat", "monacantha"]
  },
  {
    preferredName: "Pink Gymnocalycium Cactus",
    zone: 3,
    match: ["rotundulum", "pink cactus"]
  },
  {
    preferredName: "Euphorbia Milli",
    zone: 3,
    match: ["euphorbia milii", "euphorbia", "crown of thorns", "christ plant", "christ thorn"]
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
    preferredName: "Aeonium 'Ice Emerald'",
    zone: 3,
    match: ["emerald ice", "ice emerald", "aeonium emerald"]
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
    preferredName: "Sedum 'Cape Blanco'",
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
    preferredName: "Sedum Adolphi 'Firestorm'",
    zone: 3,
    match: ["firestorm", "sedum adolphi"]
  },
  {
    preferredName: "Sedum",
    zone: 3,
    match: ["sedum"]
  },
  {
    preferredName: "Powder Puff Cactus",
    zone: 3,
    match: ["powder puff", "mammillaria bocasana"]
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
    preferredName: "Baby Toes",
    zone: 4,
    match: ["baby toes", "fenestraria"]
  },
  {
    preferredName: "Ice plant",
    zone: 4,
    match: ["corpuscularia lehmannii", "corpuscularia", "ice plant", "lehmannii"]
  },
  {
    preferredName: "Variegated Scilla socialis",
    zone: 4,
    match: ["rare ledebouria", "ledebouria", "scilla violacea", "scilla socialis", "scilla", "socialis"]
  },
  {
    preferredName: "Variegated Pink Mother of Millions",
    zone: 4,
    match: ["mother of millions"]
  },
  {
    preferredName: "Kalanchoe 'Beharensis Fang'",
    zone: 4,
    match: ["beharensis", "fang"]
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
    .replace(/\b[246]\s*["'”’]?\s*(?:pot|inches|inch)\b/gi, '')
    .replace(/^[246]\s*["'”’]\s*/gi, '')
    .replace(/\b[246]\s*["'”’]\b/gi, '')
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

// =======================================================================
// 5. CUSTOM VARIATION NORMALIZATION & FILTERING RULES
// =======================================================================
/**
 * Custom rule handler for variation filtering and pot sizing.
 * Return null to skip/exclude the variation.
 * Return { varOpt, potSize } to customize.
 */
function normalizePlantVariation(cleanName, varOpt, defaultPotSize, rawTitle) {
  const p = (cleanName || '').toLowerCase();
  const v = (varOpt || '').toLowerCase();
  const t = (rawTitle || '').toLowerCase();

  // Rule: Jade Plant 2G variations (Baby Jade, Tricolor Jade) -> keep potSize as Special (for spec filter) and varOpt as specific Jade name
  if (p.includes('jade') || t.includes('jade')) {
    if (v.includes('baby jade')) {
      return {
        varOpt: '2G Baby Jade',
        potSize: 'Special'
      };
    }
    if (v.includes('tricolor') || v.includes('tri-color')) {
      return {
        varOpt: '2G Tricolor Jade',
        potSize: 'Special'
      };
    }
    if (v.includes('2g') || v.includes('2 gallon') || v.includes('2gallon')) {
      return {
        varOpt: '2G Jade',
        potSize: 'Special'
      };
    }
  }

  // Rule: Crassula Shark Tooth Red Pagoda -> clean variation 4" and 2"
  if (p.includes('shark tooth') || t.includes('shark tooth') || t.includes('red pagoda')) {
    if (v.includes('4"') || defaultPotSize.includes('4"')) {
      return {
        varOpt: '4"',
        potSize: '4"'
      };
    }
    if (v.includes('2"') || defaultPotSize.includes('2"')) {
      return {
        varOpt: '2"',
        potSize: '2"'
      };
    }
  }

  // Rule: Crassula 'Morgan's Beauty' -> combine into a single clean 4" variation
  if (p.includes("morgan's beauty") || p.includes("morgans beauty") || p.includes("morgan beauty") || (t.includes('morgan') && t.includes('beauty'))) {
    return {
      varOpt: '4"',
      potSize: '4"'
    };
  }

  // Rule: Sedum Adolphi Firestorm -> 2" pot
  if (p.includes('firestorm') || t.includes('firestorm')) {
    return {
      varOpt: '2"',
      potSize: '2"'
    };
  }

  // Rule: Peperomia 'Ruby Cascade' -> combine 4" variations into a single clean 4"
  if (p.includes('ruby cascade') || t.includes('ruby cascade') || p.includes('peperomia')) {
    if (v.includes('4"') || defaultPotSize.includes('4"')) {
      return {
        varOpt: '4"',
        potSize: '4"'
      };
    }
    if (v.includes('2"') || defaultPotSize.includes('2"')) {
      return {
        varOpt: '2"',
        potSize: '2"'
      };
    }
  }

  // Rule: Baby Toes -> clean pot size (e.g. 2"), remove Bundle Set
  if (p.includes('baby toes') || t.includes('baby toes') || t.includes('fenestraria')) {
    const size = (v.includes('4"') || v.includes('4 inch') || defaultPotSize.includes('4"')) ? '4"' : '2"';
    return {
      varOpt: size,
      potSize: size
    };
  }

  // Rule 1: Variegated String of pearl (little guy pot)
  // Exclude pot only. Treat all color variations as single 2" pot, combining into a single 2" variation.
  if (p.includes('string of pearl') || t.includes('little guy')) {
    if (v.includes('pot only') && !v.includes('plant')) {
      return null; // Exclude variation
    }
    if (v.includes('pot + plant') || v.includes('pot and plant') || v.includes('plant')) {
      return {
        varOpt: '2"',
        potSize: '2"'
      };
    }
  }

  // Rule 2: Euphorbia Milli
  // Name is Euphorbia Milli. Remove SPEC badge, just set of 3 colors in short.
  if (p.includes('euphorbia') || t.includes('euphorbia')) {
    return {
      varOpt: 'Set of 3 colors',
      potSize: 'Set of 3 colors'
    };
  }

  // Rule 3: Monkey Tail Cactus
  // No need to include "with tails" for 4" pot variation.
  if (p.includes('monkey tail') || t.includes('monkey tail') || t.includes('cleistocactus')) {
    if (v.includes('4"') || defaultPotSize.includes('4"')) {
      return {
        varOpt: '4"',
        potSize: '4"'
      };
    }
  }

  // Rule 4: Variegated Bear Paw
  // Just 2" is enough. Remove the variety set: potted bear paw.
  if (p.includes('bear paw') || t.includes('bear paw') || t.includes('cotyledon tomentosa')) {
    if (v.includes('2"') || defaultPotSize.includes('2"')) {
      return {
        varOpt: '2"',
        potSize: '2"'
      };
    }
  }

  // Rule 5: No variation recorded by Etsy / Shopify Default Title
  // Leave standard pot size (e.g. 2") without extra wording
  if (v.includes('no variation recorded by etsy') || v.includes('default title')) {
    let size = defaultPotSize;
    if (!size || size === 'Special') {
      if (t.includes('6"') || t.includes('6”') || t.includes('6 inch')) size = '6"';
      else if (t.includes('4"') || t.includes('4”') || t.includes('4 inch')) size = '4"';
      else if (t.includes('2"') || t.includes('2”') || t.includes('2 inch')) size = '2"';
      else size = '2"';
    }
    return {
      varOpt: size,
      potSize: size
    };
  }

  // Rule 6: Joseph Coat cactus
  // Just include the pot size (e.g. 2", 4"). Remove "Your choice of:".
  if (p.includes('joseph coat') || p.includes('monacantha') || t.includes('joseph coat') || t.includes('monacantha')) {
    const size = (v.includes('4"') || v.includes('4 inch') || defaultPotSize.includes('4"')) ? '4"' : '2"';
    return {
      varOpt: size,
      potSize: size
    };
  }

  // Rule 7: Tradescantia nanouk pink
  // Just include the pot size (e.g. 2", 4"). Remove "Your choice of:".
  if (p.includes('tradescantia nanouk') || p.includes('nanouk') || t.includes('tradescantia') || t.includes('nanouk')) {
    let size = defaultPotSize || '4"';
    if (v.includes('6"') || v.includes('6 inch')) size = '6"';
    else if (v.includes('4"') || v.includes('4 inch')) size = '4"';
    else if (v.includes('2"') || v.includes('2 inch')) size = '2"';
    return {
      varOpt: size,
      potSize: size
    };
  }

  // Rule 8: Generic "Your choice of:" cleanup if present on any item
  if (v.includes('your choice of')) {
    let cleaned = varOpt.replace(/^your choice of:?\s*/i, '').trim();
    if (cleaned) {
      return {
        varOpt: cleaned,
        potSize: defaultPotSize
      };
    }
  }

  return {
    varOpt: varOpt,
    potSize: defaultPotSize
  };
}

// Attach to window for global access
if (typeof window !== "undefined") {
  window.ZONE_CONFIG = ZONE_CONFIG;
  window.PLANT_DICTIONARY = PLANT_DICTIONARY;
  window.resolvePlantInfo = resolvePlantInfo;
  window.classifyZone = classifyZone;
  window.getUnitPrice = getUnitPrice;
  window.normalizePlantVariation = normalizePlantVariation;
}
