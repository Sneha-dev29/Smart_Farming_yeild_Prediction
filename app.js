// Smart Farming AI - Main Application Logic

let currentLanguage = "en";
let currentStep = 1;
const totalSteps = 12;
let activePredictionResult = null;
let speechSynthUtterance = null;
let charts = {};

document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  initTheme();
  initStateAndDistricts();
  initWizard();
  initDashboard();
  initWeather();
  initGovernmentSchemes();
  initCropLibrary();
  initHistory();
  initAnalytics();
  initDiseaseDoctor();
  initMandiPrices();
  initChatbot();
  initVoiceAssistant();
  setupNavLinks();
});

/* ==========================================================================
   1. Language & Internationalization (9 Regional Indian Languages)
   ========================================================================== */
function initLanguage() {
  const savedLang = localStorage.getItem("smart_farming_lang") || "en";
  setLanguage(savedLang);

  const langSelect = document.getElementById("language-selector");
  if (langSelect) {
    langSelect.value = savedLang;
    langSelect.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }
}

function setLanguage(lang) {
  if (!translations[lang]) lang = "en";
  currentLanguage = lang;
  localStorage.setItem("smart_farming_lang", lang);

  const dict = translations[lang];
  const enDict = translations["en"];

  // Update all elements with data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const text = dict[key] || enDict[key];
    if (text) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    }
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang;
}

/* ==========================================================================
   2. Theme & Accessibility (Dark Mode & High Contrast)
   ========================================================================== */
function initTheme() {
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const contrastToggle = document.getElementById("contrast-toggle");

  const isDark = localStorage.getItem("smart_farming_dark") === "true";
  const isHighContrast = localStorage.getItem("smart_farming_contrast") === "true";

  if (isDark) document.documentElement.classList.add("dark");
  if (isHighContrast) document.documentElement.classList.add("high-contrast");

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
      const active = document.documentElement.classList.contains("dark");
      localStorage.setItem("smart_farming_dark", active);
      updateChartThemes();
    });
  }

  if (contrastToggle) {
    contrastToggle.addEventListener("click", () => {
      document.documentElement.classList.toggle("high-contrast");
      const active = document.documentElement.classList.contains("high-contrast");
      localStorage.setItem("smart_farming_contrast", active);
    });
  }
}

/* ==========================================================================
   3. Dynamic State & District Binding
   ========================================================================== */
function initStateAndDistricts() {
  const stateSelect = document.getElementById("input-state");
  const districtSelect = document.getElementById("input-district");

  if (!stateSelect || !districtSelect) return;

  // Clear and populate states
  stateSelect.innerHTML = '<option value="" disabled selected>Choose your State</option>';
  Object.keys(agriData.statesAndDistricts).forEach(state => {
    const opt = document.createElement("option");
    opt.value = state;
    opt.textContent = state;
    stateSelect.appendChild(opt);
  });

  stateSelect.addEventListener("change", (e) => {
    populateDistricts(e.target.value);
  });
}

function populateDistricts(selectedState) {
  const districtSelect = document.getElementById("input-district");
  if (!districtSelect) return;

  const districts = agriData.statesAndDistricts[selectedState] || [];
  districtSelect.innerHTML = '<option value="" disabled selected>Choose your District</option>';
  
  districts.forEach(dist => {
    const opt = document.createElement("option");
    opt.value = dist;
    opt.textContent = dist;
    districtSelect.appendChild(opt);
  });

  if (districts.length > 0) {
    districtSelect.selectedIndex = 1;
  }
}

/* ==========================================================================
   4. Step-by-Step Prediction Wizard
   ========================================================================== */
function initWizard() {
  // Crop options population
  const cropGrid = document.getElementById("crop-selector-grid");
  if (cropGrid) {
    cropGrid.innerHTML = "";
    agriData.crops.forEach((crop, idx) => {
      const card = document.createElement("div");
      card.className = `selectable-card p-4 rounded-2xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900/30 flex items-center space-x-3 shadow-sm ${idx === 1 ? 'selected' : ''}`;
      card.dataset.value = crop.id;
      card.innerHTML = `
        <span class="text-3xl">${crop.icon}</span>
        <div>
          <div class="font-bold text-slate-800 dark:text-slate-100 text-base">${crop.name}</div>
          <div class="text-xs text-emerald-700 dark:text-emerald-400 font-medium">${crop.season} • Avg ${crop.baseYieldTonsHa} T/Ha</div>
        </div>
      `;
      card.addEventListener("click", () => {
        cropGrid.querySelectorAll(".selectable-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        document.getElementById("selected-crop-id").value = crop.id;
      });
      cropGrid.appendChild(card);
    });
  }

  // Season selector cards
  setupCardGroup("season-selector-group", "selected-season");

  // Soil selector cards
  const soilGrid = document.getElementById("soil-selector-grid");
  if (soilGrid) {
    soilGrid.innerHTML = "";
    agriData.soils.forEach((soil, idx) => {
      const card = document.createElement("div");
      card.className = `selectable-card p-4 rounded-2xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900/30 shadow-sm ${idx === 0 ? 'selected' : ''}`;
      card.dataset.value = soil.id;
      card.innerHTML = `
        <div class="flex items-center space-x-2 mb-1">
          <span class="w-3.5 h-3.5 rounded-full inline-block" style="background-color: ${soil.color};"></span>
          <span class="font-bold text-slate-800 dark:text-slate-100 text-sm">${soil.name}</span>
        </div>
        <div class="text-xs text-amber-700 dark:text-amber-400 font-medium mb-1">${soil.hindi}</div>
        <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">${soil.description}</p>
      `;
      card.addEventListener("click", () => {
        soilGrid.querySelectorAll(".selectable-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        document.getElementById("selected-soil-type").value = soil.id;
      });
      soilGrid.appendChild(card);
    });
  }

  // Irrigation selector cards
  setupCardGroup("irrigation-selector-group", "selected-irrigation");

  // Fertilizer & Pesticide Yes/No toggles
  setupCardGroup("fertilizer-selector-group", "selected-fertilizer");
  setupCardGroup("pesticide-selector-group", "selected-pesticide");

  // Live range slider updates
  setupSliderLiveValue("slider-rainfall", "val-rainfall", " mm");
  setupSliderLiveValue("slider-temperature", "val-temperature", " °C");
  setupSliderLiveValue("slider-humidity", "val-humidity", " %");

  // Wizard navigation buttons
  const btnNext = document.getElementById("btn-wizard-next");
  const btnBack = document.getElementById("btn-wizard-back");
  const btnPredict = document.getElementById("btn-wizard-predict");
  const btnPrefill = document.getElementById("btn-prefill-demo");

  if (btnNext) btnNext.addEventListener("click", () => navigateWizard(1));
  if (btnBack) btnBack.addEventListener("click", () => navigateWizard(-1));
  if (btnPredict) btnPredict.addEventListener("click", executePrediction);
  if (btnPrefill) btnPrefill.addEventListener("click", prefillDemoData);

  updateWizardUI();
}

function setupCardGroup(containerId, hiddenInputId) {
  const container = document.getElementById(containerId);
  const hiddenInput = document.getElementById(hiddenInputId);
  if (!container || !hiddenInput) return;

  container.querySelectorAll(".selectable-card").forEach(card => {
    card.addEventListener("click", () => {
      container.querySelectorAll(".selectable-card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      hiddenInput.value = card.dataset.value;
    });
  });
}

function setupSliderLiveValue(sliderId, displayId, suffix = "") {
  const slider = document.getElementById(sliderId);
  const display = document.getElementById(displayId);
  if (!slider || !display) return;

  const update = () => {
    display.textContent = slider.value + suffix;
  };
  slider.addEventListener("input", update);
  update();
}

function navigateWizard(delta) {
  const nextStep = currentStep + delta;
  if (nextStep < 1 || nextStep > totalSteps) return;
  currentStep = nextStep;
  updateWizardUI();

  // Scroll smoothly to wizard container
  const wizardSection = document.getElementById("wizard-container");
  if (wizardSection) {
    wizardSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function updateWizardUI() {
  // Update step visibility
  for (let i = 1; i <= totalSteps; i++) {
    const stepEl = document.getElementById(`wizard-step-${i}`);
    if (stepEl) {
      if (i === currentStep) {
        stepEl.classList.add("active");
      } else {
        stepEl.classList.remove("active");
      }
    }
  }

  // Update progress bar & indicators
  const progressPercent = ((currentStep) / totalSteps) * 100;
  const progressBar = document.getElementById("wizard-progress-bar");
  if (progressBar) progressBar.style.width = `${progressPercent}%`;

  const stepCountText = document.getElementById("wizard-step-counter");
  if (stepCountText) {
    stepCountText.textContent = `${currentStep} / ${totalSteps}`;
  }

  // Button visibility
  const btnNext = document.getElementById("btn-wizard-next");
  const btnBack = document.getElementById("btn-wizard-back");
  const btnPredict = document.getElementById("btn-wizard-predict");

  if (btnBack) {
    btnBack.style.display = currentStep === 1 ? "none" : "inline-flex";
  }
  if (btnNext) {
    btnNext.style.display = currentStep === totalSteps ? "none" : "inline-flex";
  }
  if (btnPredict) {
    btnPredict.style.display = currentStep === totalSteps ? "inline-flex" : "none";
  }
}

function prefillDemoData() {
  const stateSelect = document.getElementById("input-state");
  if (stateSelect) {
    stateSelect.value = "Punjab";
    populateDistricts("Punjab");
    const districtSelect = document.getElementById("input-district");
    if (districtSelect) districtSelect.value = "Ludhiana";
  }

  // Crop: Wheat
  const cropGrid = document.getElementById("crop-selector-grid");
  if (cropGrid) {
    cropGrid.querySelectorAll(".selectable-card").forEach(c => {
      c.classList.remove("selected");
      if (c.dataset.value === "wheat") c.classList.add("selected");
    });
    document.getElementById("selected-crop-id").value = "wheat";
  }

  // Season: Rabi
  const seasonGroup = document.getElementById("season-selector-group");
  if (seasonGroup) {
    seasonGroup.querySelectorAll(".selectable-card").forEach(c => {
      c.classList.remove("selected");
      if (c.dataset.value === "Rabi") c.classList.add("selected");
    });
    document.getElementById("selected-season").value = "Rabi";
  }

  // Area: 3 Hectares
  const areaInput = document.getElementById("input-farm-area");
  if (areaInput) areaInput.value = "3";

  // Soil: Alluvial
  const soilGrid = document.getElementById("soil-selector-grid");
  if (soilGrid) {
    soilGrid.querySelectorAll(".selectable-card").forEach(c => {
      c.classList.remove("selected");
      if (c.dataset.value === "alluvial") c.classList.add("selected");
    });
    document.getElementById("selected-soil-type").value = "alluvial";
  }

  // Sliders
  const rainSlider = document.getElementById("slider-rainfall");
  if (rainSlider) { rainSlider.value = "520"; rainSlider.dispatchEvent(new Event("input")); }

  const tempSlider = document.getElementById("slider-temperature");
  if (tempSlider) { tempSlider.value = "21"; tempSlider.dispatchEvent(new Event("input")); }

  const humSlider = document.getElementById("slider-humidity");
  if (humSlider) { humSlider.value = "58"; humSlider.dispatchEvent(new Event("input")); }

  // Fertilizer & Pesticide: Yes
  const fertGroup = document.getElementById("fertilizer-selector-group");
  if (fertGroup) {
    fertGroup.querySelectorAll(".selectable-card").forEach(c => {
      c.classList.remove("selected");
      if (c.dataset.value === "yes") c.classList.add("selected");
    });
    document.getElementById("selected-fertilizer").value = "yes";
  }

  const pestGroup = document.getElementById("pesticide-selector-group");
  if (pestGroup) {
    pestGroup.querySelectorAll(".selectable-card").forEach(c => {
      c.classList.remove("selected");
      if (c.dataset.value === "yes") c.classList.add("selected");
    });
    document.getElementById("selected-pesticide").value = "yes";
  }

  // Irrigation: Canal
  const irrigGroup = document.getElementById("irrigation-selector-group");
  if (irrigGroup) {
    irrigGroup.querySelectorAll(".selectable-card").forEach(c => {
      c.classList.remove("selected");
      if (c.dataset.value === "canal") c.classList.add("selected");
    });
    document.getElementById("selected-irrigation").value = "canal";
  }

  // Jump to step 12
  currentStep = 12;
  updateWizardUI();

  // Notification feedback
  showToast("🌾 Prefilled with Punjab Wheat sample parameters!", "success");
}

/* ==========================================================================
   5. Prediction Calculation & Result View
   ========================================================================== */
function executePrediction() {
  const state = document.getElementById("input-state").value || "Punjab";
  const district = document.getElementById("input-district").value || "Ludhiana";
  const cropId = document.getElementById("selected-crop-id").value || "wheat";
  const season = document.getElementById("selected-season").value || "Rabi";
  const area = parseFloat(document.getElementById("input-farm-area").value) || 2.5;
  const areaUnit = document.getElementById("input-area-unit").value || "Hectares";
  const soilType = document.getElementById("selected-soil-type").value || "alluvial";
  const rainfall = parseFloat(document.getElementById("slider-rainfall").value) || 500;
  const temperature = parseFloat(document.getElementById("slider-temperature").value) || 24;
  const humidity = parseFloat(document.getElementById("slider-humidity").value) || 60;
  const fertilizerUsed = document.getElementById("selected-fertilizer").value === "yes";
  const pesticideUsed = document.getElementById("selected-pesticide").value === "yes";
  const irrigation = document.getElementById("selected-irrigation").value || "canal";

  // Show loading indicator
  const btnPredict = document.getElementById("btn-wizard-predict");
  const originalText = btnPredict.innerHTML;
  btnPredict.disabled = true;
  btnPredict.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> AI Analyzing Field Factors...`;

  setTimeout(() => {
    btnPredict.disabled = false;
    btnPredict.innerHTML = originalText;

    const result = YieldEngine.predict({
      state, district, cropId, season, area, areaUnit,
      soilType, rainfall, temperature, humidity,
      fertilizerUsed, pesticideUsed, irrigation
    });

    activePredictionResult = result;
    renderPredictionResults(result);

    // Also auto-save to history
    savePredictionToHistory(result);

    // Scroll to results
    const resultSection = document.getElementById("prediction-result-section");
    if (resultSection) {
      resultSection.classList.remove("hidden");
      resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 900);
}

function renderPredictionResults(res) {
  // Crop & Location tags
  document.getElementById("res-crop-icon").textContent = res.cropIcon;
  document.getElementById("res-crop-title").textContent = res.cropName;
  document.getElementById("res-location-tag").textContent = `📍 ${res.district}, ${res.state} • ${res.season} Season`;

  // Predicted Yield
  document.getElementById("res-yield-value").textContent = res.predictedYieldPerHa;
  document.getElementById("res-yield-acre").textContent = `≈ ${res.predictedYieldPerAcre} Tons / Acre`;
  document.getElementById("res-total-production").textContent = `${res.totalProductionTons} Tons (${res.totalProductionQuintals} Quintals)`;
  document.getElementById("res-area-tag").textContent = `Calculated for ${res.area} ${res.areaUnit}`;

  // Gauge Meter
  renderGaugeMeter(res.confidenceScore);

  // Financial Estimates
  document.getElementById("res-gross-income").textContent = `₹${formatIndianCurrency(res.grossIncome)}`;
  document.getElementById("res-estimated-cost").textContent = `₹${formatIndianCurrency(res.estimatedCost)}`;
  document.getElementById("res-net-profit").textContent = `₹${formatIndianCurrency(res.netProfit)}`;
  document.getElementById("res-profit-margin").textContent = `Profit Margin: ${res.profitMarginPercent}%`;
  document.getElementById("res-mandi-rate").textContent = `₹${res.marketPriceQuintal} / Quintal (MSP: ₹${res.mspQuintal})`;

  // AI Recommendations
  document.getElementById("rec-fertilizer-text").textContent = res.recommendations.fertilizer;
  document.getElementById("rec-irrigation-text").textContent = res.recommendations.irrigation;
  document.getElementById("rec-disease-text").textContent = res.recommendations.disease;
  document.getElementById("rec-harvest-text").textContent = res.recommendations.harvest;
  document.getElementById("rec-storage-text").textContent = res.recommendations.storage;

  // Setup TTS speech trigger
  setupTTSButtons(res);
}

function renderGaugeMeter(confidenceScore) {
  const gaugeNeedle = document.getElementById("gauge-needle");
  const gaugeScoreText = document.getElementById("gauge-score-text");
  const gaugeBadge = document.getElementById("gauge-status-badge");

  if (!gaugeScoreText) return;

  gaugeScoreText.textContent = `${confidenceScore}%`;

  // Needle angle: -90deg to +90deg (180deg range for 0 to 100%)
  const angle = -90 + (confidenceScore / 100) * 180;
  if (gaugeNeedle) {
    gaugeNeedle.style.transform = `rotate(${angle}deg)`;
  }

  if (gaugeBadge) {
    if (confidenceScore >= 90) {
      gaugeBadge.textContent = "High Reliability";
      gaugeBadge.className = "px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300";
    } else if (confidenceScore >= 75) {
      gaugeBadge.textContent = "Moderate Reliability";
      gaugeBadge.className = "px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300";
    } else {
      gaugeBadge.textContent = "Low Reliability";
      gaugeBadge.className = "px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300";
    }
  }
}

function setupTTSButtons(res) {
  const btnRead = document.getElementById("btn-read-aloud");
  const btnStop = document.getElementById("btn-stop-audio");

  if (!btnRead) return;

  btnRead.onclick = () => {
    if (!('speechSynthesis' in window)) {
      showToast("Speech synthesis not supported in this browser.", "warning");
      return;
    }

    window.speechSynthesis.cancel();

    const speechText = `Crop Yield Prediction for ${res.cropName} in ${res.district}, ${res.state}. Predicted Yield is ${res.predictedYieldPerHa} Tons per Hectare, with a total estimated production of ${res.totalProductionTons} Tons. Your estimated net profit is ${res.netProfit} Rupees. Key recommendation: ${res.recommendations.fertilizer}. Irrigation: ${res.recommendations.irrigation}.`;

    speechSynthUtterance = new SpeechSynthesisUtterance(speechText);
    speechSynthUtterance.rate = 0.95;
    speechSynthUtterance.pitch = 1.0;

    // Pick Indian English or regional voice if available
    const voices = window.speechSynthesis.getVoices();
    const indVoice = voices.find(v => v.lang === "en-IN" || v.lang === "hi-IN" || v.name.includes("India"));
    if (indVoice) speechSynthUtterance.voice = indVoice;

    speechSynthUtterance.onstart = () => {
      btnRead.classList.add("hidden");
      if (btnStop) btnStop.classList.remove("hidden");
    };

    speechSynthUtterance.onend = () => {
      btnRead.classList.remove("hidden");
      if (btnStop) btnStop.classList.add("hidden");
    };

    window.speechSynthesis.speak(speechSynthUtterance);
  };

  if (btnStop) {
    btnStop.onclick = () => {
      window.speechSynthesis.cancel();
      btnRead.classList.remove("hidden");
      btnStop.classList.add("hidden");
    };
  }

  // Setup Download PDF / Print button
  const btnPdf = document.getElementById("btn-download-pdf");
  if (btnPdf) {
    btnPdf.onclick = () => {
      window.print();
    };
  }
}

/* ==========================================================================
   6. Farmer Quick Dashboard
   ========================================================================== */
function initDashboard() {
  // Update dashboard status with latest history or default
  const history = getStoredHistory();
  const latest = history[0];

  const dashCrop = document.getElementById("dash-status-crop");
  const dashYield = document.getElementById("dash-status-yield");
  const dashIncome = document.getElementById("dash-status-income");

  if (latest && dashCrop && dashYield && dashIncome) {
    dashCrop.textContent = `${latest.crop} (${latest.district})`;
    dashYield.textContent = `${latest.yieldTonsHa} T/Ha`;
    dashIncome.textContent = `₹${formatIndianCurrency(latest.netProfit || latest.totalIncome)}`;
  }
}

/* ==========================================================================
   7. Local Agricultural Weather Module
   ========================================================================== */
function initWeather() {
  const weatherCityInput = document.getElementById("weather-search-input");
  const btnWeatherSearch = document.getElementById("btn-weather-search");

  if (btnWeatherSearch && weatherCityInput) {
    btnWeatherSearch.addEventListener("click", () => {
      updateWeatherDisplay(weatherCityInput.value.trim() || "Ludhiana");
    });
    weatherCityInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") updateWeatherDisplay(weatherCityInput.value.trim() || "Ludhiana");
    });
  }

  // Render 7-day forecast
  renderWeeklyForecast();
}

function updateWeatherDisplay(cityName) {
  const title = document.getElementById("weather-city-name");
  if (title) title.textContent = `📍 ${cityName}, India`;

  // Generate deterministic realistic weather for city
  const hash = cityName.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const temp = 22 + (hash % 11);
  const rainChance = (hash * 7) % 65;
  const humidity = 45 + (hash % 35);
  const wind = 8 + (hash % 12);

  const tempEl = document.getElementById("weather-temp-main");
  const rainEl = document.getElementById("weather-rain-chance");
  const humEl = document.getElementById("weather-humidity");
  const windEl = document.getElementById("weather-wind");

  if (tempEl) tempEl.textContent = `${temp}°C`;
  if (rainEl) rainEl.textContent = `${rainChance}% (${(rainChance * 0.4).toFixed(1)} mm)`;
  if (humEl) humEl.textContent = `${humidity}%`;
  if (windEl) windEl.textContent = `${wind} km/h WNW`;

  showToast(`Updated weather data for ${cityName}`, "info");
}

function renderWeeklyForecast() {
  const container = document.getElementById("weekly-forecast-container");
  if (!container) return;

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayIdx = new Date().getDay();
  const icons = ["☀️", "⛅", "🌦️", "🌧️", "🌤️", "☀️", "⛅"];
  const temps = ["28° / 17°", "29° / 18°", "26° / 16°", "25° / 15°", "27° / 16°", "30° / 19°", "29° / 18°"];
  const spraySuitability = ["Ideal Spray Day", "Ideal Spray Day", "Rain Expected - Avoid", "Wet Canopy - Avoid", "Moderate", "Ideal Spray Day", "Ideal Spray Day"];

  container.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const dayName = days[(todayIdx + i) % 7];
    const isAvoid = spraySuitability[i].includes("Avoid");

    const col = document.createElement("div");
    col.className = "flex flex-col items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-emerald-100 dark:border-emerald-900/30 text-center shadow-sm";
    col.innerHTML = `
      <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">${i === 0 ? 'Today' : dayName}</span>
      <span class="text-2xl my-2">${icons[i]}</span>
      <span class="text-sm font-bold text-slate-800 dark:text-slate-100">${temps[i]}</span>
      <span class="mt-2 text-[10px] font-medium px-2 py-0.5 rounded-full ${isAvoid ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'}">${spraySuitability[i]}</span>
    `;
    container.appendChild(col);
  }
}

/* ==========================================================================
   8. Government Schemes & Subsidies
   ========================================================================== */
function initGovernmentSchemes() {
  const grid = document.getElementById("schemes-card-grid");
  if (!grid) return;

  grid.innerHTML = "";
  agriData.schemes.forEach(scheme => {
    const card = document.createElement("div");
    card.className = "glass-card p-6 flex flex-col justify-between glass-card-hover";
    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="px-3 py-1 rounded-full text-xs font-bold ${scheme.badgeColor}">${scheme.tag}</span>
          <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">Govt Verified 🇮🇳</span>
        </div>
        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">${scheme.name}</h3>
        <p class="text-sm font-semibold text-emerald-700 dark:text-emerald-300 mb-3">${scheme.benefit}</p>
        <p class="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">${scheme.description}</p>
        
        <div class="border-t border-slate-100 dark:border-slate-800 pt-3 mb-4">
          <div class="text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">Eligibility Checklist:</div>
          <ul class="text-xs text-slate-500 dark:text-slate-400 space-y-1">
            ${scheme.eligibility.map(e => `<li class="flex items-start space-x-1.5"><span class="text-emerald-600 font-bold">✓</span><span>${e}</span></li>`).join("")}
          </ul>
        </div>
      </div>

      <div class="pt-2">
        <button class="w-full py-2.5 px-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center space-x-2 btn-check-eligibility" data-scheme-id="${scheme.id}">
          <span>Check Eligibility & Apply</span>
          <span>→</span>
        </button>
      </div>
    `;

    card.querySelector(".btn-check-eligibility").addEventListener("click", () => {
      openSchemeEligibilityModal(scheme);
    });

    grid.appendChild(card);
  });
}

function openSchemeEligibilityModal(scheme) {
  const modal = document.getElementById("scheme-modal");
  const title = document.getElementById("scheme-modal-title");
  const content = document.getElementById("scheme-modal-body");
  const applyBtn = document.getElementById("scheme-modal-apply-btn");

  if (!modal || !content) return;

  title.textContent = scheme.name;
  content.innerHTML = `
    <div class="space-y-4">
      <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 text-sm font-medium">
        <strong>Benefit:</strong> ${scheme.benefit}
      </div>
      <div>
        <h4 class="font-bold text-sm text-slate-800 dark:text-slate-100 mb-2">Required Documents:</h4>
        <div class="flex flex-wrap gap-2">
          ${scheme.documents.map(d => `<span class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 font-medium">📄 ${d}</span>`).join("")}
        </div>
      </div>
      <div>
        <h4 class="font-bold text-sm text-slate-800 dark:text-slate-100 mb-2">Self-Eligibility Verification:</h4>
        <div class="space-y-2">
          <label class="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer">
            <input type="checkbox" checked class="rounded text-emerald-600 w-4 h-4">
            <span>I possess valid operational agricultural land records</span>
          </label>
          <label class="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer">
            <input type="checkbox" checked class="rounded text-emerald-600 w-4 h-4">
            <span>My Aadhaar card is linked to active DBT bank account</span>
          </label>
        </div>
      </div>
    </div>
  `;

  if (applyBtn) {
    applyBtn.onclick = () => {
      window.open(scheme.applyUrl, "_blank");
    };
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

/* ==========================================================================
   9. Crop Knowledge Library
   ========================================================================== */
function initCropLibrary() {
  const grid = document.getElementById("crop-library-grid");
  const searchInput = document.getElementById("crop-library-search");

  if (!grid) return;

  function render(filter = "") {
    grid.innerHTML = "";
    const term = filter.toLowerCase();
    const filtered = agriData.crops.filter(c => 
      c.name.toLowerCase().includes(term) || 
      c.category.toLowerCase().includes(term) ||
      c.season.toLowerCase().includes(term)
    );

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="col-span-full text-center py-12 text-slate-400">No matching crops found. Try searching for Wheat, Rice, Cotton...</div>`;
      return;
    }

    filtered.forEach(crop => {
      const card = document.createElement("div");
      card.className = "glass-card p-5 glass-card-hover flex flex-col justify-between";
      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-4xl">${crop.icon}</span>
            <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">${crop.season}</span>
          </div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1">${crop.name}</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">${crop.description}</p>
          
          <div class="grid grid-cols-2 gap-2 text-xs bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl mb-3">
            <div>
              <span class="text-slate-400 block text-[10px]">Ideal Temp</span>
              <span class="font-bold text-slate-700 dark:text-slate-200">${crop.idealTemp}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px]">Ideal Rain</span>
              <span class="font-bold text-slate-700 dark:text-slate-200">${crop.idealRainfall}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px]">Growth Days</span>
              <span class="font-bold text-slate-700 dark:text-slate-200">${crop.durationDays}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px]">Expected Yield</span>
              <span class="font-bold text-emerald-600 dark:text-emerald-400">${crop.baseYieldTonsHa} T/Ha</span>
            </div>
          </div>
        </div>

        <button class="w-full py-2 px-3 rounded-lg border border-emerald-600 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-xs font-bold transition-colors btn-view-crop-details" data-crop-id="${crop.id}">
          Full Agronomic Guide →
        </button>
      `;

      card.querySelector(".btn-view-crop-details").addEventListener("click", () => {
        openCropDetailModal(crop);
      });

      grid.appendChild(card);
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => render(e.target.value));
  }

  render();
}

function openCropDetailModal(crop) {
  const modal = document.getElementById("crop-detail-modal");
  const title = document.getElementById("crop-detail-title");
  const body = document.getElementById("crop-detail-body");

  if (!modal || !body) return;

  title.textContent = `${crop.icon} ${crop.name} - Detailed Agronomic Profile`;
  body.innerHTML = `
    <div class="space-y-4 text-sm">
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed">${crop.description}</p>
      
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-center">
          <div class="text-xs text-slate-500 dark:text-slate-400">Duration</div>
          <div class="font-bold text-emerald-800 dark:text-emerald-200">${crop.durationDays}</div>
        </div>
        <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-center">
          <div class="text-xs text-slate-500 dark:text-slate-400">Soil Type</div>
          <div class="font-bold text-emerald-800 dark:text-emerald-200">${crop.preferredSoil}</div>
        </div>
        <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-center">
          <div class="text-xs text-slate-500 dark:text-slate-400">Mandi Price</div>
          <div class="font-bold text-emerald-800 dark:text-emerald-200">₹${crop.mandiPriceQuintal}/Qtl</div>
        </div>
        <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-center">
          <div class="text-xs text-slate-500 dark:text-slate-400">Govt MSP</div>
          <div class="font-bold text-emerald-800 dark:text-emerald-200">₹${crop.mspQuintal}/Qtl</div>
        </div>
      </div>

      <div class="border-t border-slate-100 dark:border-slate-800 pt-3">
        <div class="font-bold text-slate-800 dark:text-slate-200 mb-1">Recommended Fertilizer Dosage:</div>
        <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200 font-medium">
          🌱 ${crop.fertilizerDosage}
        </div>
      </div>

      <div>
        <div class="font-bold text-slate-800 dark:text-slate-200 mb-1">Common Diseases to Monitor:</div>
        <div class="flex flex-wrap gap-2">
          ${crop.diseases.map(d => `<span class="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs font-medium">⚠️ ${d}</span>`).join("")}
        </div>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

/* ==========================================================================
   10. Farmer History Records & Export (CSV & PDF)
   ========================================================================== */
function getStoredHistory() {
  const raw = localStorage.getItem("smart_farming_history");
  if (!raw) {
    localStorage.setItem("smart_farming_history", JSON.stringify(agriData.initialHistory));
    return agriData.initialHistory;
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    return agriData.initialHistory;
  }
}

function savePredictionToHistory(res) {
  const history = getStoredHistory();
  const newItem = {
    id: `PRD-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    date: new Date().toISOString().split("T")[0],
    state: res.state,
    district: res.district,
    crop: res.cropName.split(" ")[0],
    season: res.season,
    area: res.area,
    areaUnit: res.areaUnit,
    soil: res.soilType,
    yieldTonsHa: res.predictedYieldPerHa,
    totalProductionTons: res.totalProductionTons,
    confidence: res.confidenceScore,
    marketPrice: res.marketPriceQuintal,
    totalIncome: res.grossIncome,
    netProfit: res.netProfit,
    irrigation: res.irrigation
  };

  history.unshift(newItem);
  localStorage.setItem("smart_farming_history", JSON.stringify(history));
  renderHistoryTable();
  initDashboard();
}

function initHistory() {
  renderHistoryTable();

  const searchInput = document.getElementById("history-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderHistoryTable(e.target.value);
    });
  }

  const btnExportCsv = document.getElementById("btn-export-csv");
  if (btnExportCsv) {
    btnExportCsv.addEventListener("click", exportHistoryToCSV);
  }
}

function renderHistoryTable(filter = "") {
  const tbody = document.getElementById("history-table-body");
  const mobileList = document.getElementById("history-mobile-cards");
  if (!tbody) return;

  const history = getStoredHistory();
  const term = filter.toLowerCase();
  const filtered = history.filter(h => 
    h.crop.toLowerCase().includes(term) ||
    h.district.toLowerCase().includes(term) ||
    h.state.toLowerCase().includes(term)
  );

  tbody.innerHTML = "";
  if (mobileList) mobileList.innerHTML = "";

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-8 text-slate-400">No predictions recorded.</td></tr>`;
    return;
  }

  filtered.forEach(item => {
    // Desktop row
    const tr = document.createElement("tr");
    tr.className = "border-b border-slate-100 dark:border-slate-800 hover:bg-emerald-50/40 dark:hover:bg-slate-800/40 transition-colors";
    tr.innerHTML = `
      <td class="py-3 px-4 text-xs font-mono text-slate-500">${item.date}</td>
      <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">${item.crop}</td>
      <td class="py-3 px-4 text-xs text-slate-600 dark:text-slate-300">${item.district}, ${item.state}</td>
      <td class="py-3 px-4 text-xs">${item.area} ${item.areaUnit}</td>
      <td class="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">${item.yieldTonsHa} T/Ha</td>
      <td class="py-3 px-4 font-semibold text-slate-700 dark:text-slate-200">₹${formatIndianCurrency(item.netProfit || item.totalIncome)}</td>
      <td class="py-3 px-4 text-right">
        <button class="text-rose-500 hover:text-rose-700 text-xs font-bold px-2 py-1 rounded btn-delete-history" data-id="${item.id}">Delete</button>
      </td>
    `;
    tr.querySelector(".btn-delete-history").addEventListener("click", () => deleteHistoryItem(item.id));
    tbody.appendChild(tr);

    // Mobile Card
    if (mobileList) {
      const card = document.createElement("div");
      card.className = "p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-3 shadow-sm";
      card.innerHTML = `
        <div class="flex justify-between items-start mb-2">
          <div>
            <div class="font-bold text-slate-800 dark:text-slate-100 text-base">${item.crop}</div>
            <div class="text-xs text-slate-500">${item.district}, ${item.state} • ${item.date}</div>
          </div>
          <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">${item.yieldTonsHa} T/Ha</span>
        </div>
        <div class="flex justify-between items-center text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700 pt-2 mt-2">
          <span>Area: <strong>${item.area} ${item.areaUnit}</strong></span>
          <span>Profit: <strong class="text-emerald-600">₹${formatIndianCurrency(item.netProfit || item.totalIncome)}</strong></span>
          <button class="text-rose-500 text-xs font-bold btn-delete-history" data-id="${item.id}">Delete</button>
        </div>
      `;
      card.querySelector(".btn-delete-history").addEventListener("click", () => deleteHistoryItem(item.id));
      mobileList.appendChild(card);
    }
  });
}

function deleteHistoryItem(id) {
  let history = getStoredHistory();
  history = history.filter(h => h.id !== id);
  localStorage.setItem("smart_farming_history", JSON.stringify(history));
  renderHistoryTable();
  initDashboard();
  showToast("Record deleted from history", "info");
}

function exportHistoryToCSV() {
  const history = getStoredHistory();
  if (history.length === 0) {
    showToast("No history to export.", "warning");
    return;
  }

  const headers = ["ID", "Date", "State", "District", "Crop", "Season", "Area", "Soil", "Yield (Tons/Ha)", "Total Tons", "Confidence %", "Net Profit (Rs)"];
  const rows = history.map(h => [
    h.id, h.date, `"${h.state}"`, `"${h.district}"`, `"${h.crop}"`, h.season, h.area, `"${h.soil}"`, h.yieldTonsHa, h.totalProductionTons, h.confidence, h.netProfit || h.totalIncome
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `smart_farming_predictions_${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast("Exported CSV file successfully!", "success");
}

/* ==========================================================================
   11. Visual Analytics Charts (Chart.js)
   ========================================================================== */
function initAnalytics() {
  if (typeof Chart === "undefined") return;

  const isDark = document.documentElement.classList.contains("dark");
  const textColor = isDark ? "#cbd5e1" : "#475569";
  const gridColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";

  // Chart 1: Monthly Prediction Trend
  const ctxMonthly = document.getElementById("chart-monthly-trend");
  if (ctxMonthly) {
    charts.monthly = new Chart(ctxMonthly, {
      type: "bar",
      data: {
        labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
        datasets: [{
          label: "Average Harvest Yield (Tons/Ha)",
          data: [3.8, 4.1, 4.4, 4.6, 4.9, 4.8, 5.0, 5.2, 4.7, 4.3],
          backgroundColor: "#16a34a",
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: textColor } } },
        scales: {
          x: { ticks: { color: textColor }, grid: { color: gridColor } },
          y: { ticks: { color: textColor }, grid: { color: gridColor }, beginAtZero: true }
        }
      }
    });
  }

  // Chart 2: Crop Profitability Comparison
  const ctxCrop = document.getElementById("chart-crop-comparison");
  if (ctxCrop) {
    charts.crop = new Chart(ctxCrop, {
      type: "doughnut",
      data: {
        labels: ["Wheat", "Rice (Paddy)", "Cotton", "Sugarcane", "Soybean"],
        datasets: [{
          data: [42, 38, 55, 68, 34],
          backgroundColor: ["#f59e0b", "#10b981", "#6366f1", "#06b6d4", "#ec4899"],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom", labels: { color: textColor, boxWidth: 12 } },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ₹${ctx.raw},000 Net Profit/Ha`
            }
          }
        }
      }
    });
  }

  // Chart 3: Rainfall vs Yield Response Curve
  const ctxRain = document.getElementById("chart-rainfall-yield");
  if (ctxRain) {
    charts.rain = new Chart(ctxRain, {
      type: "line",
      data: {
        labels: ["200mm", "400mm", "600mm", "800mm", "1000mm", "1200mm", "1500mm"],
        datasets: [{
          label: "Yield Sensitivity Curve",
          data: [2.1, 3.4, 4.9, 5.2, 5.0, 4.4, 3.7],
          borderColor: "#0284c7",
          backgroundColor: "rgba(2, 132, 199, 0.15)",
          fill: true,
          tension: 0.4,
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: textColor } } },
        scales: {
          x: { ticks: { color: textColor }, grid: { color: gridColor } },
          y: { ticks: { color: textColor }, grid: { color: gridColor }, beginAtZero: false }
        }
      }
    });
  }
}

function updateChartThemes() {
  const isDark = document.documentElement.classList.contains("dark");
  const textColor = isDark ? "#cbd5e1" : "#475569";
  const gridColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";

  Object.values(charts).forEach(chart => {
    if (chart && chart.options) {
      if (chart.options.plugins && chart.options.plugins.legend) {
        chart.options.plugins.legend.labels.color = textColor;
      }
      if (chart.options.scales) {
        if (chart.options.scales.x) {
          chart.options.scales.x.ticks.color = textColor;
          chart.options.scales.x.grid.color = gridColor;
        }
        if (chart.options.scales.y) {
          chart.options.scales.y.ticks.color = textColor;
          chart.options.scales.y.grid.color = gridColor;
        }
      }
      chart.update();
    }
  });
}

/* ==========================================================================
   12. AI Crop Doctor (Leaf Disease Detection)
   ========================================================================== */
function initDiseaseDoctor() {
  const sampleBtns = document.querySelectorAll(".btn-sample-disease");
  const fileInput = document.getElementById("disease-file-input");
  const resultCard = document.getElementById("disease-result-card");

  sampleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const diseaseId = btn.dataset.diseaseId;
      const disease = agriData.diseases.find(d => d.id === diseaseId);
      if (disease) runDiseaseDiagnosis(disease);
    });
  });

  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        // Randomly diagnose as one of the realistic diseases
        const randomIdx = Math.floor(Math.random() * agriData.diseases.length);
        const disease = agriData.diseases[randomIdx];
        runDiseaseDiagnosis(disease);
      }
    });
  }
}

function runDiseaseDiagnosis(disease) {
  const resultCard = document.getElementById("disease-result-card");
  if (!resultCard) return;

  resultCard.classList.remove("hidden");
  resultCard.innerHTML = `
    <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 border-2 border-emerald-500 shadow-xl space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300">Severity: ${disease.severity}</span>
          <span class="ml-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">AI Confidence: ${disease.confidence}%</span>
        </div>
        <span class="text-xs text-slate-400 font-mono">ICAR Diagnostic Model</span>
      </div>

      <h3 class="text-2xl font-bold text-slate-900 dark:text-white">🚨 ${disease.name}</h3>

      <div>
        <h4 class="font-bold text-sm text-slate-800 dark:text-slate-100 mb-1">Visible Symptoms:</h4>
        <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${disease.symptoms}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
          <div class="font-bold text-sm text-emerald-900 dark:text-emerald-200 mb-1">🌿 Organic & Bio-Cure:</div>
          <p class="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">${disease.organicTreatment}</p>
        </div>
        <div class="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50">
          <div class="font-bold text-sm text-blue-900 dark:text-blue-200 mb-1">🧪 Recommended Chemical Spray:</div>
          <p class="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">${disease.chemicalTreatment}</p>
        </div>
      </div>

      <div class="pt-2">
        <div class="font-bold text-xs text-slate-700 dark:text-slate-300 mb-1">Preventive Agricultural Measure:</div>
        <p class="text-xs text-slate-500 dark:text-slate-400">${disease.prevention}</p>
      </div>
    </div>
  `;

  resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  showToast(`Disease Diagnosis Complete: ${disease.name}`, "info");
}

/* ==========================================================================
   13. Live APMC Mandi Prices
   ========================================================================== */
function initMandiPrices() {
  const tbody = document.getElementById("mandi-prices-tbody");
  if (!tbody) return;

  tbody.innerHTML = "";
  agriData.mandiPrices.forEach(item => {
    const isUp = item.status === "up";
    const tr = document.createElement("tr");
    tr.className = "border-b border-slate-100 dark:border-slate-800 hover:bg-emerald-50/30 dark:hover:bg-slate-800/30 transition-colors";
    tr.innerHTML = `
      <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100 text-sm">${item.mandi}</td>
      <td class="py-3 px-4 font-semibold text-emerald-700 dark:text-emerald-300 text-sm">${item.crop}</td>
      <td class="py-3 px-4 font-bold text-slate-900 dark:text-white text-base">₹${item.modalPrice}</td>
      <td class="py-3 px-4 text-xs text-slate-500 dark:text-slate-400 font-mono">₹${item.msp}</td>
      <td class="py-3 px-4 text-right">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${isUp ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'}">
          ${item.change}
        </span>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

/* ==========================================================================
   14. Floating AI Chatbot ("🌾 Kisan AI Sahayak")
   ========================================================================== */
function initChatbot() {
  const bubble = document.getElementById("chatbot-bubble");
  const modal = document.getElementById("chatbot-modal");
  const closeBtn = document.getElementById("chatbot-close-btn");
  const sendBtn = document.getElementById("chatbot-send-btn");
  const input = document.getElementById("chatbot-input");
  const messagesList = document.getElementById("chatbot-messages");
  const chipBtns = document.querySelectorAll(".chatbot-preset-chip");

  if (!bubble || !modal) return;

  bubble.addEventListener("click", () => {
    modal.classList.toggle("hidden");
    if (!modal.classList.contains("hidden") && input) {
      input.focus();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  }

  chipBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const text = btn.textContent.replace(/^['"]|['"]$/g, "").trim();
      handleChatbotSend(text);
    });
  });

  if (sendBtn && input) {
    sendBtn.addEventListener("click", () => {
      const q = input.value.trim();
      if (q) {
        handleChatbotSend(q);
        input.value = "";
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const q = input.value.trim();
        if (q) {
          handleChatbotSend(q);
          input.value = "";
        }
      }
    });
  }
}

function handleChatbotSend(question) {
  const messagesList = document.getElementById("chatbot-messages");
  if (!messagesList) return;

  // Add user bubble
  const userBubble = document.createElement("div");
  userBubble.className = "flex justify-end mb-3";
  userBubble.innerHTML = `
    <div class="bg-emerald-600 text-white rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[85%] text-xs font-medium shadow-sm">
      ${escapeHtml(question)}
    </div>
  `;
  messagesList.appendChild(userBubble);
  messagesList.scrollTop = messagesList.scrollHeight;

  // Generate intelligent response
  setTimeout(() => {
    const answer = generateKisanAnswer(question);
    const botBubble = document.createElement("div");
    botBubble.className = "flex justify-start mb-3";
    botBubble.innerHTML = `
      <div class="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[85%] text-xs leading-relaxed shadow-sm">
        ${answer}
      </div>
    `;
    messagesList.appendChild(botBubble);
    messagesList.scrollTop = messagesList.scrollHeight;
  }, 500);
}

function generateKisanAnswer(q) {
  const query = q.toLowerCase();

  if (query.includes("fertilizer") || query.includes("urea") || query.includes("dap") || query.includes("खाद")) {
    return "🌾 <strong>Fertilizer Recommendation:</strong> For cereal crops like Wheat and Rice, standard balanced N:P:K is 120:60:40 kg per Hectare. Always apply full Phosphorus and Potash at sowing as basal dose, and split Urea into 2 top-dressings at first irrigation and panicle stage.";
  }
  if (query.includes("yellow") || query.includes("leaf") || query.includes("पीली")) {
    return "🍃 <strong>Yellow Leaves Diagnostic:</strong> If older lower leaves turn yellow from tip upwards in a 'V' shape, it is <strong>Nitrogen deficiency</strong> (top-dress Urea). If young leaves turn pale yellow with green veins, it indicates <strong>Iron/Zinc deficiency</strong> (spray 0.5% Zinc Sulphate + 2% Urea). If yellow dust rubs off on fingers, inspect for <strong>Stripe Rust</strong>!";
  }
  if (query.includes("harvest") || query.includes("कटाई") || query.includes("when to harvest")) {
    return "🚜 <strong>Harvest Timing:</strong> Harvest when 85% of crop ear-heads or pods turn characteristic golden brown and grain moisture drops to 14-16%. Avoid harvesting during moist mornings or just before predicted rains.";
  }
  if (query.includes("pm kisan") || query.includes("subsidy") || query.includes("योजना") || query.includes("6000")) {
    return "🏛️ <strong>PM-KISAN Scheme:</strong> Beneficiary farmers receive ₹6,000 annually in 3 installments of ₹2,000 directly into Aadhaar-seeded bank accounts. Check your e-KYC status at pmkisan.gov.in or visit your nearest CSC center.";
  }
  if (query.includes("water") || query.includes("irrigation") || query.includes("सिंचाई")) {
    return "💧 <strong>Irrigation Advisory:</strong> Adopting Drip or Micro-Sprinkler irrigation can save 45-60% water and fetch up to 55% government subsidy under 'Per Drop More Crop'. Avoid standing water in cotton, and avoid water stress during flowering.";
  }
  return "🌱 <strong>Kisan Advice:</strong> Thank you for your question! For optimal farm results, always test your soil once every two seasons, use certified treated seeds, and check the daily Rain Alert on our Weather page before spraying chemicals.";
}

/* ==========================================================================
   15. Voice Assistant & Accessibility
   ========================================================================== */
function initVoiceAssistant() {
  const voiceNavBtn = document.getElementById("btn-voice-nav");
  if (!voiceNavBtn) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    voiceNavBtn.title = "Voice recognition not available on this browser";
    voiceNavBtn.style.opacity = "0.6";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-IN";
  recognition.interimResults = false;

  voiceNavBtn.addEventListener("click", () => {
    try {
      voiceNavBtn.classList.add("animate-pulse", "ring-4", "ring-emerald-400");
      showToast("🎙️ Listening... Speak your crop, state, or question", "info");
      recognition.start();
    } catch (e) {
      recognition.stop();
    }
  });

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    voiceNavBtn.classList.remove("animate-pulse", "ring-4", "ring-emerald-400");
    showToast(`Heard: "${transcript}"`, "success");

    // Route to chatbot or prefill
    const chatbotModal = document.getElementById("chatbot-modal");
    if (chatbotModal) {
      chatbotModal.classList.remove("hidden");
      handleChatbotSend(transcript);
    }
  };

  recognition.onerror = () => {
    voiceNavBtn.classList.remove("animate-pulse", "ring-4", "ring-emerald-400");
  };

  recognition.onend = () => {
    voiceNavBtn.classList.remove("animate-pulse", "ring-4", "ring-emerald-400");
  };
}

/* ==========================================================================
   16. Helper Utilities
   ========================================================================== */
function setupNavLinks() {
  // Smooth scroll to anchor tags
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileNavMenu = document.getElementById("mobile-nav-menu");
  if (mobileMenuBtn && mobileNavMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileNavMenu.classList.toggle("hidden");
    });

    mobileNavMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => mobileNavMenu.classList.add("hidden"));
    });
  }
}

function formatIndianCurrency(num) {
  if (isNaN(num)) return "0";
  return num.toLocaleString('en-IN');
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toast-container");
  if (!toastContainer) return;

  const toast = document.createElement("div");
  const bg = type === "success" ? "bg-emerald-700 text-white" : (type === "warning" ? "bg-amber-600 text-white" : "bg-slate-900 text-white");
  toast.className = `${bg} px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center space-x-2 transition-all transform duration-300 translate-y-2 opacity-0`;
  toast.innerHTML = `<span>${message}</span>`;

  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove("translate-y-2", "opacity-0");
  }, 10);

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
