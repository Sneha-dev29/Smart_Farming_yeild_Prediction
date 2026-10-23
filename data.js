// Smart Farming AI - Agricultural Master Data

const agriData = {
  // Indian States and Agricultural Districts
  statesAndDistricts: {
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Bathinda", "Patiala", "Sangrur", "Firozpur", "Gurdaspur"],
    "Haryana": ["Karnal", "Kurukshetra", "Ambala", "Hisar", "Rohtak", "Sirsa", "Sonipat", "Fatehabad"],
    "Uttar Pradesh": ["Meerut", "Varanasi", "Lucknow", "Agra", "Prayagraj", "Bareilly", "Gorakhpur", "Aligarh", "Muzaffarnagar"],
    "Maharashtra": ["Nashik", "Pune", "Aurangabad (Chh. Sambhajinagar)", "Nagpur", "Solapur", "Kolhapur", "Ahmednagar", "Amravati", "Jalgaon"],
    "Madhya Pradesh": ["Indore", "Ujjain", "Bhopal", "Jabalpur", "Gwalior", "Sagar", "Hoshangabad (Narmadapuram)", "Dewas", "Ratlam"],
    "Gujarat": ["Rajkot", "Surat", "Ahmedabad", "Vadodara", "Junagadh", "Mehsana", "Anand", "Amreli", "Banaskantha"],
    "Karnataka": ["Belagavi", "Mysuru", "Dharwad", "Mandya", "Shimoga", "Hassan", "Vijayapura", "Bellary", "Raichur"],
    "Andhra Pradesh": ["Guntur", "Krishna", "East Godavari", "Kurnool", "West Godavari", "Anantapur", "Nellore", "Prakasam"],
    "Tamil Nadu": ["Thanjavur", "Madurai", "Coimbatore", "Erode", "Tiruchirappalli", "Salem", "Tirunelveli", "Dindigul"],
    "West Bengal": ["Burdwan (Purba Bardhaman)", "Hooghly", "Nadia", "Murshidabad", "Birbhum", "North 24 Parganas", "Malda"],
    "Rajasthan": ["Ganganagar", "Kota", "Jaipur", "Alwar", "Jodhpur", "Bharatpur", "Bikaner", "Barmer", "Nagaur"],
    "Bihar": ["Patna", "Muzaffarpur", "Gaya", "Nalanda", "Samastipur", "Bhagalpur", "Begusarai", "Rohtas"]
  },

  // Crop Information Repository
  crops: [
    {
      id: "rice",
      name: "Rice (Paddy / धान)",
      icon: "🌾",
      category: "Cereals",
      season: "Kharif",
      durationDays: "115 - 140 Days",
      idealTemp: "22°C - 34°C",
      idealRainfall: "1000 - 1600 mm",
      preferredSoil: "Clay / Alluvial",
      baseYieldTonsHa: 4.5,
      mandiPriceQuintal: 2320,
      mspQuintal: 2300,
      costPerHa: 38000,
      diseases: ["Blast (Pyricularia oryzae)", "Bacterial Leaf Blight", "Brown Planthopper", "Stem Borer"],
      fertilizerDosage: "120 kg N : 60 kg P2O5 : 40 kg K2O per Hectare",
      description: "Paddy is India's principal staple cereal, thriving in warm, high-humidity climates with standing water management during tillering."
    },
    {
      id: "wheat",
      name: "Wheat (गेहूं)",
      icon: "🌾",
      category: "Cereals",
      season: "Rabi",
      durationDays: "120 - 135 Days",
      idealTemp: "14°C - 24°C",
      idealRainfall: "350 - 650 mm",
      preferredSoil: "Loamy / Alluvial",
      baseYieldTonsHa: 4.8,
      mandiPriceQuintal: 2475,
      mspQuintal: 2425,
      costPerHa: 32000,
      diseases: ["Yellow / Stripe Rust", "Karnal Bunt", "Loose Smut", "Aphids"],
      fertilizerDosage: "120 kg N : 60 kg P2O5 : 40 kg K2O per Hectare",
      description: "The primary winter cereal crop of North India. Requires cool vegetative growth and warm dry ripening weather."
    },
    {
      id: "sugarcane",
      name: "Sugarcane (गन्ना)",
      icon: "🎋",
      category: "Commercial / Cash",
      season: "Zaid / Kharif (Annual)",
      durationDays: "300 - 365 Days",
      idealTemp: "25°C - 38°C",
      idealRainfall: "1200 - 2200 mm",
      preferredSoil: "Deep Alluvial / Black Loam",
      baseYieldTonsHa: 78.0,
      mandiPriceQuintal: 340,
      mspQuintal: 315,
      costPerHa: 95000,
      diseases: ["Red Rot (Colletotrichum falcatum)", "Smut", "Early Shoot Borer", "Pyrilla"],
      fertilizerDosage: "250 kg N : 115 kg P2O5 : 115 kg K2O per Hectare",
      description: "Long-duration perennial cash crop requiring substantial water availability, warm sunshine, and high biomass management."
    },
    {
      id: "cotton",
      name: "Cotton (कपास)",
      icon: "☁️",
      category: "Fibre / Cash",
      season: "Kharif",
      durationDays: "150 - 180 Days",
      idealTemp: "21°C - 35°C",
      idealRainfall: "500 - 900 mm",
      preferredSoil: "Black Cotton (Regur)",
      baseYieldTonsHa: 2.2,
      mandiPriceQuintal: 7200,
      mspQuintal: 7122,
      costPerHa: 42000,
      diseases: ["Pink Bollworm", "Cotton Leaf Curl Virus (CLCuV)", "Bacterial Blight", "Whitefly"],
      fertilizerDosage: "120 kg N : 60 kg P2O5 : 60 kg K2O per Hectare",
      description: "White gold of Indian drylands. Highly susceptible to excessive monsoon logging; thrives in deep moisture-retentive black soil."
    },
    {
      id: "maize",
      name: "Maize (Corn / मक्का)",
      icon: "🌽",
      category: "Cereals",
      season: "Kharif / Rabi",
      durationDays: "95 - 110 Days",
      idealTemp: "18°C - 30°C",
      idealRainfall: "500 - 800 mm",
      preferredSoil: "Well-drained Loam",
      baseYieldTonsHa: 5.2,
      mandiPriceQuintal: 2280,
      mspQuintal: 2225,
      costPerHa: 30000,
      diseases: ["Fall Armyworm (Spodoptera frugiperda)", "Turcicum Leaf Blight", "Maydis Blight"],
      fertilizerDosage: "120 kg N : 60 kg P2O5 : 40 kg K2O per Hectare",
      description: "Highly versatile cereal with excellent yield potential for poultry feed, starch production, and bio-fuel ethanol blending."
    },
    {
      id: "soybean",
      name: "Soybean (सोयाबीन)",
      icon: "🫘",
      category: "Oilseeds / Legumes",
      season: "Kharif",
      durationDays: "90 - 105 Days",
      idealTemp: "20°C - 32°C",
      idealRainfall: "600 - 950 mm",
      preferredSoil: "Deep Black / Clay Loam",
      baseYieldTonsHa: 2.4,
      mandiPriceQuintal: 4850,
      mspQuintal: 4892,
      costPerHa: 26000,
      diseases: ["Yellow Mosaic Virus", "Charcoal Rot", "Stem Fly", "Girdle Beetle"],
      fertilizerDosage: "25 kg N : 60 kg P2O5 : 40 kg K2O + Rhizobium inoculant",
      description: "Rich protein & oil legume that enriches soil through atmospheric nitrogen fixation; heart of Malwa & Vidarbha agriculture."
    },
    {
      id: "millets",
      name: "Millets (Bajra & Jowar / बाजरा)",
      icon: "🥣",
      category: "Nutri-Cereals (Shree Anna)",
      season: "Kharif",
      durationDays: "80 - 95 Days",
      idealTemp: "25°C - 36°C",
      idealRainfall: "350 - 550 mm",
      preferredSoil: "Sandy / Light Loam",
      baseYieldTonsHa: 2.1,
      mandiPriceQuintal: 2650,
      mspQuintal: 2625,
      costPerHa: 18000,
      diseases: ["Downy Mildew (Green Ear)", "Ergot", "Blast"],
      fertilizerDosage: "80 kg N : 40 kg P2O5 : 20 kg K2O per Hectare",
      description: "Climate-resilient super-crop requiring minimal water and surviving high ambient heat with rich mineral and calcium density."
    },
    {
      id: "groundnut",
      name: "Groundnut (Peanut / मूंगफली)",
      icon: "🥜",
      category: "Oilseeds",
      season: "Kharif / Zaid",
      durationDays: "105 - 120 Days",
      idealTemp: "22°C - 32°C",
      idealRainfall: "500 - 750 mm",
      preferredSoil: "Sandy Loam / Red Sandy",
      baseYieldTonsHa: 2.6,
      mandiPriceQuintal: 6850,
      mspQuintal: 6783,
      costPerHa: 34000,
      diseases: ["Tikka Leaf Spot (Cercospora)", "Collar Rot", "Spodoptera litura"],
      fertilizerDosage: "20 kg N : 40 kg P2O5 : 40 kg K2O + Gypsum (400 kg/Ha)",
      description: "Important oilseed crop with underground pod formation requiring friable soil texture to permit seamless peg penetration."
    },
    {
      id: "mustard",
      name: "Mustard (सरसों)",
      icon: "🌼",
      category: "Oilseeds",
      season: "Rabi",
      durationDays: "110 - 130 Days",
      idealTemp: "12°C - 25°C",
      idealRainfall: "250 - 450 mm",
      preferredSoil: "Loamy / Alluvial",
      baseYieldTonsHa: 2.0,
      mandiPriceQuintal: 5950,
      mspQuintal: 5650,
      costPerHa: 22000,
      diseases: ["White Rust (Albugo candida)", "Alternaria Blight", "Mustard Aphids"],
      fertilizerDosage: "80 kg N : 40 kg P2O5 : 40 kg K2O + 20 kg Sulphur",
      description: "Crucial rabi oilseed offering premium culinary oil and high oil extraction cake for livestock feed."
    },
    {
      id: "tomato",
      name: "Tomato (टमाटर)",
      icon: "🍅",
      category: "Horticulture",
      season: "Rabi / Kharif / Zaid",
      durationDays: "90 - 110 Days",
      idealTemp: "18°C - 28°C",
      idealRainfall: "600 - 800 mm",
      preferredSoil: "Well-drained Loamy / Red Loam",
      baseYieldTonsHa: 28.5,
      mandiPriceQuintal: 1950,
      mspQuintal: 1600,
      costPerHa: 65000,
      diseases: ["Early Blight (Alternaria solani)", "Late Blight", "Tomato Leaf Curl Virus (ToLCV)"],
      fertilizerDosage: "150 kg N : 100 kg P2O5 : 100 kg K2O per Hectare",
      description: "High-value horticulture crop giving quick seasonal turnaround with responsiveness to drip fertigation and mulching."
    }
  ],

  // Soil Profiles
  soils: [
    {
      id: "alluvial",
      name: "Alluvial Soil",
      hindi: "जलोढ़ मिट्टी",
      color: "#c29b61",
      description: "Deposited by rivers in the Indo-Gangetic plains. Highly fertile, rich in potash and lime; ideal for Wheat, Rice, Sugarcane.",
      waterRetention: "High",
      organicMatter: "Medium - High"
    },
    {
      id: "black",
      name: "Black Soil (Regur)",
      hindi: "काली मिट्टी",
      color: "#383633",
      description: "Formed from volcanic basalt rocks of Deccan plateau. Rich in clay, expands when wet and cracks when dry; best for Cotton, Soybean.",
      waterRetention: "Very High",
      organicMatter: "Medium"
    },
    {
      id: "red",
      name: "Red & Yellow Soil",
      hindi: "लाल मिट्टी",
      color: "#b45309",
      description: "Rich in iron oxide giving reddish hue. Well drained, porous; excellent for Groundnut, Millets, Pulses with proper fertilizing.",
      waterRetention: "Moderate",
      organicMatter: "Low - Medium"
    },
    {
      id: "clay",
      name: "Clay Loamy Soil",
      hindi: "चिकनी मिट्टी",
      color: "#78716c",
      description: "Heavy texture with fine mineral particles. Holds nutrients and moisture firmly; outstanding for Paddy cultivation.",
      waterRetention: "Maximum",
      organicMatter: "High"
    },
    {
      id: "loamy",
      name: "Rich Loamy Soil",
      hindi: "दोमट मिट्टी",
      color: "#854d0e",
      description: "The gold standard of farming soil. Perfect balance of sand, silt, and clay. Excellent aeration and nutrient exchange.",
      waterRetention: "Optimal",
      organicMatter: "Very High"
    },
    {
      id: "sandy",
      name: "Sandy / Arid Soil",
      hindi: "बलुई मिट्टी",
      color: "#d97706",
      description: "Coarse texture with rapid drainage. Well suited for drought-hardy crops like Bajra, Guar, Watermelons with drip irrigation.",
      waterRetention: "Low",
      organicMatter: "Low"
    }
  ],

  // Government Schemes & Subsidies
  schemes: [
    {
      id: "pm-kisan",
      name: "PM-KISAN Samman Nidhi",
      tag: "Direct Cash Benefit",
      benefit: "₹6,000 / Year (3 Installments)",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      description: "Income support scheme by Government of India providing ₹2,000 every 4 months directly transferred into the farmer's bank account via Aadhaar-linked DBT.",
      eligibility: [
        "Small & marginal landholding farmer families",
        "Valid Aadhaar card linked with active bank account",
        "Up-to-date Land Records (Khatauni / e-KYC verified)"
      ],
      documents: ["Aadhaar Card", "Land Mutation Document", "Bank Passbook"],
      applyUrl: "https://pmkisan.gov.in"
    },
    {
      id: "pmfby",
      name: "PM Fasal Bima Yojana (PMFBY)",
      tag: "Comprehensive Crop Insurance",
      benefit: "Coverage up to 100% sum insured against natural perils",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
      description: "Protection against non-preventable natural risks like drought, flood, hailstorm, localized unseasonal cyclone, and post-harvest losses. Premium is just 2% for Kharif and 1.5% for Rabi crops.",
      eligibility: [
        "All farmers growing notified crops in notified areas",
        "Includes sharecroppers and tenant farmers",
        "Application within cutoff dates of sowing season"
      ],
      documents: ["Sowing Certificate", "Khasra / Land Papers", "Bank Account Details"],
      applyUrl: "https://pmfby.gov.in"
    },
    {
      id: "soil-health",
      name: "Soil Health Card Scheme",
      tag: "Nutrient Diagnosis",
      benefit: "Free 12-Parameter Laboratory Soil Test",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
      description: "Provides farmers with a customized Soil Health Card containing test results of N, P, K, secondary nutrients (S), and micro-nutrients (Zn, Fe, Cu, Mn, Bo) plus customized fertilizer recommendations.",
      eligibility: [
        "All land-holding farmers across every Indian state",
        "Sample collected by agricultural field staff once every 2 years"
      ],
      documents: ["Land Location Details", "Farmer ID / Aadhaar"],
      applyUrl: "https://soilhealth.dac.gov.in"
    },
    {
      id: "kisan-credit",
      name: "Kisan Credit Card (KCC)",
      tag: "Subsidized Agriculture Loan",
      benefit: "Up to ₹3,00,000 at 4% Effective Interest",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
      description: "Timely and hassle-free institutional credit to meet crop production expenses, post-harvest costs, and maintenance of agricultural assets with interest subvention.",
      eligibility: [
        "Individual / Joint borrower farmers",
        "Owner cultivators as well as tenant farmers / oral lessees",
        "Age 18 to 75 years"
      ],
      documents: ["Identity & Address Proof", "Land Ownership Proof", "No Due Certificate"],
      applyUrl: "https://www.myscheme.gov.in/schemes/kcc"
    },
    {
      id: "per-drop",
      name: "Per Drop More Crop (Micro-Irrigation)",
      tag: "Irrigation Equipment Subsidy",
      benefit: "45% to 55% Government Subsidy on Drip & Sprinkler",
      badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-300",
      description: "Subsidies for installing drip irrigation, micro-sprinklers, and portable rainguns. Conserves up to 60% irrigation water while boosting crop yields by 25-40%.",
      eligibility: [
        "Farmers possessing assured water source on their land",
        "Priority for small and marginal farmers, SC/ST, and women farmers"
      ],
      documents: ["Electricity connection / pump proof", "Land RTC / 7/12 extract", "Quotation from approved vendor"],
      applyUrl: "https://pmksy.gov.in"
    },
    {
      id: "pm-kusum",
      name: "PM-KUSUM (Solar Agriculture Pumps)",
      tag: "Solar Energy Subsidy",
      benefit: "Up to 90% Subsidy on Standalone Solar Pumps",
      badgeColor: "bg-orange-100 text-orange-800 border-orange-300",
      description: "De-dieselization of farm irrigation by providing subsidized standalone solar agricultural pumps (3HP to 7.5HP) with zero fuel cost and dependable daytime power.",
      eligibility: [
        "Farmers with agricultural land without grid electricity connection",
        "Replacement of existing diesel pumps"
      ],
      documents: ["Aadhaar", "Land title record", "Bank account"],
      applyUrl: "https://pmkusum.mnre.gov.in"
    }
  ],

  // APMC Mandi Live Rates
  mandiPrices: [
    { mandi: "Khanna (Punjab)", crop: "Wheat", modalPrice: 2480, msp: 2425, change: "+ ₹25", status: "up" },
    { mandi: "Ludhiana (Punjab)", crop: "Paddy (Basmati)", modalPrice: 3820, msp: 2300, change: "+ ₹50", status: "up" },
    { mandi: "Karnal (Haryana)", crop: "Rice (PR-126)", modalPrice: 2360, msp: 2300, change: "- ₹15", status: "down" },
    { mandi: "Indore (Madhya Pradesh)", crop: "Soybean", modalPrice: 4890, msp: 4892, change: "+ ₹40", status: "up" },
    { mandi: "Ujjain (Madhya Pradesh)", crop: "Wheat (Sharbati)", modalPrice: 2850, msp: 2425, change: "+ ₹70", status: "up" },
    { mandi: "Nashik (Maharashtra)", crop: "Tomato", modalPrice: 1980, msp: 1600, change: "- ₹35", status: "down" },
    { mandi: "Rajkot (Gujarat)", crop: "Cotton (Shankar-6)", modalPrice: 7280, msp: 7122, change: "+ ₹110", status: "up" },
    { mandi: "Junagadh (Gujarat)", crop: "Groundnut", modalPrice: 6920, msp: 6783, change: "+ ₹30", status: "up" },
    { mandi: "Guntur (Andhra Pradesh)", crop: "Chilli / Cotton", modalPrice: 7350, msp: 7122, change: "+ ₹85", status: "up" },
    { mandi: "Burdwan (West Bengal)", crop: "Paddy (Swarna)", modalPrice: 2340, msp: 2300, change: "+ ₹10", status: "up" },
    { mandi: "Kota (Rajasthan)", crop: "Mustard", modalPrice: 5980, msp: 5650, change: "+ ₹45", status: "up" },
    { mandi: "Patna (Bihar)", crop: "Maize", modalPrice: 2310, msp: 2225, change: "- ₹10", status: "down" }
  ],

  // Crop Diseases for AI Doctor
  diseases: [
    {
      id: "rice-blast",
      crop: "Rice",
      name: "Rice Leaf Blast (Pyricularia oryzae)",
      severity: "High",
      confidence: 96,
      symptoms: "Spindle-shaped elliptical lesions with gray or whitish centers and brown margins on leaf blades. Lesions coalesce rapidly, causing complete leaf desiccation.",
      organicTreatment: "Spray Pseudomonas fluorescens @ 10g/Litre or 5% Neem seed kernel extract (NSKE). Avoid excessive nitrogen fertilizer.",
      chemicalTreatment: "Tricyclazole 75% WP @ 0.6g/Litre or Isoprothiolane 40% EC @ 1.5ml/Litre water.",
      prevention: "Treat seeds with Carbendazim (2g/kg) and maintain balanced potassium nutrition to strengthen leaf epidermis."
    },
    {
      id: "wheat-rust",
      crop: "Wheat",
      name: "Yellow / Stripe Rust (Puccinia striiformis)",
      severity: "High",
      confidence: 94,
      symptoms: "Bright yellow pustules (uredinia) arranged in distinct linear stripes along leaf veins. Yellow dust adheres to fingers upon rubbing.",
      organicTreatment: "Dusting with wettable sulfur @ 2.5 kg/ha; spray sour buttermilk (chaas) solution diluted 1:10 with water as traditional preventive.",
      chemicalTreatment: "Propiconazole 25% EC (Tilt) @ 1 ml/Litre of water at initial appearance of yellow stripes.",
      prevention: "Cultivate rust-resistant varieties such as HD-2967, PBW-550, or DBW-187. Avoid late sowing."
    },
    {
      id: "tomato-blight",
      crop: "Tomato",
      name: "Early Blight (Alternaria solani)",
      severity: "Medium",
      confidence: 93,
      symptoms: "Concentric dark brown rings resembling a 'target board' or bullseye on older leaves, surrounded by yellow chlorotic halo.",
      organicTreatment: "Foliar spray of Trichoderma harzianum @ 5g/Litre or copper soap spray. Prune bottom leaves to eliminate soil splashing.",
      chemicalTreatment: "Mancozeb 75% WP @ 2.5g/Litre or Chlorothalonil 75% WP @ 2g/Litre water.",
      prevention: "Practice 3-year crop rotation with non-solanaceous crops and implement drip irrigation to keep foliage dry."
    },
    {
      id: "cotton-bollworm",
      crop: "Cotton",
      name: "Pink Bollworm (Pectinophora gossypiella)",
      severity: "Critical",
      confidence: 95,
      symptoms: "Rosetted flower buds ('rosette flowers') that fail to open normally; boreholes on developing green bolls with staining inside lint.",
      organicTreatment: "Install delta pheromone traps @ 5 traps/acre for monitoring; release Trichogramma egg parasitoids @ 60,000/acre weekly.",
      chemicalTreatment: "Profenophos 50% EC @ 2 ml/Litre or Emamectin Benzoate 5% SG @ 0.4g/Litre water during peak moth flights.",
      prevention: "Terminate cotton crop before December to disrupt pest hibernation cycle; avoid growing ratoon cotton."
    }
  ],

  // Sample History Items
  initialHistory: [
    {
      id: "PRD-2026-901",
      date: "2026-10-18",
      state: "Punjab",
      district: "Ludhiana",
      crop: "Wheat",
      season: "Rabi",
      area: 4.5,
      areaUnit: "Hectares",
      soil: "Alluvial Soil",
      yieldTonsHa: 4.92,
      totalProductionTons: 22.14,
      confidence: 95,
      marketPrice: 2480,
      totalIncome: 549072,
      netProfit: 405072,
      irrigation: "Canal / River Water"
    },
    {
      id: "PRD-2026-874",
      date: "2026-10-12",
      state: "Maharashtra",
      district: "Nashik",
      crop: "Soybean",
      season: "Kharif",
      area: 3.0,
      areaUnit: "Hectares",
      soil: "Black Soil",
      yieldTonsHa: 2.38,
      totalProductionTons: 7.14,
      confidence: 92,
      marketPrice: 4890,
      totalIncome: 349146,
      netProfit: 271146,
      irrigation: "Rainfed"
    },
    {
      id: "PRD-2026-832",
      date: "2026-09-28",
      state: "Gujarat",
      district: "Rajkot",
      crop: "Cotton",
      season: "Kharif",
      area: 5.0,
      areaUnit: "Hectares",
      soil: "Black Soil",
      yieldTonsHa: 2.35,
      totalProductionTons: 11.75,
      confidence: 93,
      marketPrice: 7280,
      totalIncome: 855400,
      netProfit: 645400,
      irrigation: "Drip Irrigation"
    },
    {
      id: "PRD-2026-790",
      date: "2026-09-15",
      state: "West Bengal",
      district: "Burdwan",
      crop: "Rice (Paddy)",
      season: "Kharif",
      area: 2.5,
      areaUnit: "Hectares",
      soil: "Clay Loamy Soil",
      yieldTonsHa: 4.75,
      totalProductionTons: 11.88,
      confidence: 94,
      marketPrice: 2340,
      totalIncome: 277992,
      netProfit: 182992,
      irrigation: "Tubewell"
    }
  ]
};
