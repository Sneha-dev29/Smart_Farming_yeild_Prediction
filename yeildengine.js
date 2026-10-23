// Smart Farming AI - Crop Yield Prediction & Recommendation Engine

const YieldEngine = {
  // Main Prediction Function
  predict(inputs) {
    const cropId = inputs.cropId || "wheat";
    const crop = agriData.crops.find(c => c.id === cropId) || agriData.crops[1]; // default wheat
    
    // Normalize area to hectares
    let areaInHectares = parseFloat(inputs.area) || 2.5;
    if (inputs.areaUnit === "acres" || inputs.areaUnit === "Acre") {
      areaInHectares = areaInHectares / 2.47105;
    }

    const rainfall = parseFloat(inputs.rainfall) || 500;
    const temperature = parseFloat(inputs.temperature) || 24;
    const humidity = parseFloat(inputs.humidity) || 60;
    const soilType = inputs.soilType || "alluvial";
    const season = inputs.season || "Rabi";
    const irrigation = inputs.irrigation || "canal";
    const fertilizerUsed = Boolean(inputs.fertilizerUsed);
    const pesticideUsed = Boolean(inputs.pesticideUsed);

    // 1. Soil Suitability Factor
    let soilFactor = 1.0;
    switch (cropId) {
      case "rice":
        soilFactor = (soilType === "clay" || soilType === "alluvial") ? 1.15 : (soilType === "sandy" ? 0.72 : 0.95);
        break;
      case "wheat":
        soilFactor = (soilType === "loamy" || soilType === "alluvial") ? 1.18 : (soilType === "sandy" ? 0.80 : 1.02);
        break;
      case "cotton":
        soilFactor = (soilType === "black") ? 1.25 : (soilType === "alluvial" ? 1.05 : 0.85);
        break;
      case "soybean":
        soilFactor = (soilType === "black" || soilType === "clay") ? 1.18 : 0.92;
        break;
      case "sugarcane":
        soilFactor = (soilType === "alluvial" || soilType === "loamy") ? 1.15 : 0.90;
        break;
      case "groundnut":
        soilFactor = (soilType === "sandy" || soilType === "red" || soilType === "loamy") ? 1.20 : 0.82;
        break;
      case "millets":
        soilFactor = (soilType === "sandy" || soilType === "red") ? 1.15 : 1.0;
        break;
      case "mustard":
        soilFactor = (soilType === "alluvial" || soilType === "loamy") ? 1.12 : 0.94;
        break;
      case "tomato":
        soilFactor = (soilType === "loamy" || soilType === "red") ? 1.16 : 0.90;
        break;
      default:
        soilFactor = 1.0;
    }

    // 2. Rainfall & Irrigation Interaction Factor
    let rainFactor = 1.0;
    const hasAssureIrrigation = (irrigation === "drip" || irrigation === "tubewell" || irrigation === "canal" || irrigation === "sprinkler");

    if (cropId === "rice") {
      if (rainfall >= 1000 && rainfall <= 1600) rainFactor = 1.10;
      else if (rainfall < 800 && !hasAssureIrrigation) rainFactor = 0.65;
      else if (hasAssureIrrigation) rainFactor = 1.05;
    } else if (cropId === "wheat") {
      if (rainfall >= 350 && rainfall <= 650) rainFactor = 1.08;
      else if (rainfall > 800) rainFactor = 0.92; // excess winter rain creates fungus
      else if (rainfall < 300 && !hasAssureIrrigation) rainFactor = 0.75;
      else rainFactor = 1.04;
    } else if (cropId === "cotton") {
      if (rainfall >= 500 && rainfall <= 850) rainFactor = 1.10;
      else if (rainfall > 1100) rainFactor = 0.82; // boll rot
      else rainFactor = 1.0;
    } else {
      rainFactor = 1.02;
    }

    // 3. Temperature Suitability Factor
    let tempFactor = 1.0;
    if (cropId === "wheat") {
      tempFactor = (temperature >= 15 && temperature <= 25) ? 1.10 : (temperature > 32 ? 0.82 : 0.95);
    } else if (cropId === "rice" || cropId === "cotton" || cropId === "sugarcane") {
      tempFactor = (temperature >= 24 && temperature <= 35) ? 1.10 : 0.92;
    } else {
      tempFactor = (temperature >= 18 && temperature <= 32) ? 1.05 : 0.94;
    }

    // 4. Irrigation Efficiency Factor
    let irrigFactor = 1.0;
    switch (irrigation) {
      case "drip": irrigFactor = 1.24; break;
      case "sprinkler": irrigFactor = 1.15; break;
      case "canal": irrigFactor = 1.08; break;
      case "tubewell": irrigFactor = 1.10; break;
      case "rainfed": irrigFactor = 0.88; break;
      default: irrigFactor = 1.0;
    }

    // 5. Fertilizer & Pesticide Factor
    const fertFactor = fertilizerUsed ? 1.12 : 0.88;
    const pestFactor = pesticideUsed ? 1.08 : 0.90;

    // 6. Base Yield & Balanced Agronomic Dampening (Diminishing Marginal Returns)
    // Avoid over-compounding by calculating the blended multiplier
    const factorDeltas = (soilFactor - 1) * 0.7 + (rainFactor - 1) * 0.7 + (tempFactor - 1) * 0.7 + (irrigFactor - 1) * 0.8 + (fertFactor - 1) + (pestFactor - 1);
    const combinedMultiplier = Math.max(0.65, Math.min(1.45, 1.0 + factorDeltas));
    
    // Add micro-variance based on state/district seed
    const districtHash = (inputs.district || "Default").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const variance = 0.98 + ((districtHash % 5) / 100); // 0.98 to 1.02
    
    let predictedYieldPerHa = crop.baseYieldTonsHa * combinedMultiplier * variance;
    predictedYieldPerHa = Math.round(predictedYieldPerHa * 100) / 100;

    // Yield per acre
    const predictedYieldPerAcre = Math.round((predictedYieldPerHa / 2.47105) * 100) / 100;

    // Total production
    const totalProductionTons = Math.round(predictedYieldPerHa * areaInHectares * 100) / 100;
    const totalProductionQuintals = Math.round(totalProductionTons * 10);

    // 7. Financial Estimations
    const mandiPrice = crop.mandiPriceQuintal;
    const grossIncome = Math.round(totalProductionQuintals * mandiPrice);
    
    // Cost calculation per hectare
    let adjustedCostPerHa = crop.costPerHa;
    if (fertilizerUsed) adjustedCostPerHa += 4500;
    if (pesticideUsed) adjustedCostPerHa += 2500;
    if (irrigation === "drip") adjustedCostPerHa -= 1500; // water & labor savings
    
    const totalCost = Math.round(adjustedCostPerHa * areaInHectares);
    const netProfit = Math.max(10000, grossIncome - totalCost);
    const profitMarginPercent = Math.round((netProfit / grossIncome) * 100);

    // 8. Model Confidence Score (88% to 96%)
    let confidence = 92;
    if (hasAssureIrrigation && fertilizerUsed) confidence += 3;
    if (pesticideUsed) confidence += 1;
    if (rainfall > 300 && rainfall < 1800) confidence += 1;
    confidence = Math.min(97, Math.max(88, confidence));

    // 9. Generate AI Tailored Farming Recommendations
    const recommendations = this.generateRecommendations(crop, soilType, irrigation, rainfall, fertilizerUsed);

    return {
      cropId: crop.id,
      cropName: crop.name,
      cropIcon: crop.icon,
      state: inputs.state || "Punjab",
      district: inputs.district || "Ludhiana",
      season: season,
      area: parseFloat(inputs.area) || 2.5,
      areaUnit: inputs.areaUnit || "Hectares",
      areaInHectares: areaInHectares,
      soilType: soilType,
      irrigation: irrigation,
      predictedYieldPerHa: predictedYieldPerHa,
      predictedYieldPerAcre: predictedYieldPerAcre,
      totalProductionTons: totalProductionTons,
      totalProductionQuintals: totalProductionQuintals,
      confidenceScore: confidence,
      marketPriceQuintal: mandiPrice,
      mspQuintal: crop.mspQuintal,
      grossIncome: grossIncome,
      estimatedCost: totalCost,
      netProfit: netProfit,
      profitMarginPercent: profitMarginPercent,
      recommendations: recommendations
    };
  },

  generateRecommendations(crop, soilType, irrigation, rainfall, fertilizerUsed) {
    let recFertilizer = "";
    let recIrrigation = "";
    let recDisease = "";
    let recHarvest = "";
    let recStorage = "";

    switch (crop.id) {
      case "wheat":
        recFertilizer = "Apply 1/3 Nitrogen (Urea) + full DAP & Potash as basal dressing. Top-dress remaining Nitrogen in 2 equal splits: at first irrigation (CRI stage) and before panicle initiation.";
        recIrrigation = (irrigation === "drip") ? "Run drip for 45 minutes every 4 days. Critical stage: Crown Root Initiation (21 days after sowing)." : "Provide 4-5 irrigations at CRI, tillering, jointing, flowering, and milk stages. Avoid flooding during late grain filling to prevent lodging.";
        recDisease = "Regularly inspect northern field edges for Yellow Rust (bright yellow dust on leaves). At first sign, spray Propiconazole 25% EC @ 1ml/Litre water.";
        recHarvest = "Harvest when spikes turn golden brown, straw becomes dry and brittle, and grain moisture drops below 13-14% to prevent storage fungi.";
        recStorage = "Dry harvested grains under direct sun for 2 days. Store in hermetic bags (PUSA bins or grain bags) with 10g aluminum phosphide tablet per ton of grain against weevils.";
        break;

      case "rice":
        recFertilizer = "Apply 50% Urea + full DAP & MOP at transplanting. Top-dress 25% Urea at active tillering and remaining 25% at panicle initiation. Apply 25 kg Zinc Sulphate per hectare.";
        recIrrigation = "Maintain 2-3 cm shallow standing water during early tillering. Drain water 7 days before harvest for uniform ripening.";
        recDisease = "Watch for Rice Blast and Brown Planthopper. Treat nursery with Trichoderma and maintain balanced Potash nutrition.";
        recHarvest = "Harvest when 80-85% grains in panicles have turned golden straw yellow and grain moisture is around 20-22%.";
        recStorage = "Thresh promptly and sun-dry paddy to 13% moisture level before bagging in clean gunny bags stacked on wooden pallets.";
        break;

      case "cotton":
        recFertilizer = "Split Nitrogen into 4 applications: Basal, Square formation, Peak flowering, and Early boll development. Spray 2% Potassium Nitrate (13:0:45) at boll bursting.";
        recIrrigation = (irrigation === "drip") ? "Drip fertigation twice a week; saves 50% water and prevents vegetative excess." : "Irrigate every 12-15 days depending on black soil moisture cracks. Avoid water stagnation.";
        recDisease = "Install 5 pheromone traps per acre to monitor Pink Bollworm moths. Spray Neem oil (1500 ppm) @ 5ml/Litre at first square stage.";
        recHarvest = "Pick cotton cleanly when bolls are fully fluffed open during warm dry morning hours. Keep trash and dry bracts separate.";
        recStorage = "Store picked seed cotton (Kapas) in clean, moisture-free covered sheds on elevated plastic sheets.";
        break;

      case "soybean":
        recFertilizer = "Inoculate seeds with Rhizobium japonicum and PSB culture. Apply 20 kg N + 60 kg P2O5 + 40 kg K2O + 20 kg Sulphur per hectare.";
        recIrrigation = "Soybean is mainly rainfed; if dry spell exceeds 15 days during pod development, provide one life-saving sprinkler irrigation.";
        recDisease = "Spray Chlorantraniliprole 18.5% SC @ 0.3ml/Litre for stem fly and semi-looper caterpillars.";
        recHarvest = "Harvest when pods turn brown and rattle upon shaking, and leaves drop naturally. Avoid delayed harvest to stop pod shattering.";
        recStorage = "Store with moisture content under 10-12% in cool dry rooms. Do not stack bags more than 6 layers high.";
        break;

      default:
        recFertilizer = crop.fertilizerDosage + ". Integrate 5 tons of well-decomposed FYM (Farm Yard Manure) per hectare before sowing.";
        recIrrigation = "Maintain soil moisture at 60-70% field capacity. Avoid water logging and drought stress during flowering.";
        recDisease = "Use certified disease-free treated seed. Spray preventive bio-fungicide Pseudomonas fluorescens @ 10g/Litre.";
        recHarvest = "Harvest during cool morning hours at full physiological maturity when seeds/fruits attain characteristic color.";
        recStorage = "Ensure thorough drying and store in moisture-proof, rodent-proof storage bins.";
    }

    return {
      fertilizer: recFertilizer,
      irrigation: recIrrigation,
      disease: recDisease,
      harvest: recHarvest,
      storage: recStorage
    };
  }
};
