# Smart_Farming_yeild_Prediction
# 🌾 Smart Farming AI
### AI Powered Crop Yield Prediction & Farming Assistant
> **Predict Better. Grow Better. Earn Better.**

A modern, premium, mobile-first, multilingual Smart Farming web platform crafted specifically for Indian farmers. Designed with professional AgriTech standards (comparable to Google, CropIn, DeHaat, and Agrivi) while remaining supremely simple, intuitive, and accessible to farmers with basic smartphone knowledge.

---

## 🌟 Key Features

### 🚜 1. Crop Yield Prediction Engine (Core Feature)
- **12-Step Visual Wizard**:
  1. **Select State**: Dropdown with major agricultural states (Punjab, Haryana, UP, Maharashtra, MP, Gujarat, Karnataka, etc.)
  2. **Select District**: Dynamically filters real agro-climatic districts for the selected state.
  3. **Select Crop**: Visual cards with icons (Wheat, Rice, Sugarcane, Cotton, Maize, Soybean, Millets/Bajra, Groundnut, Mustard, Tomato).
  4. **Season**: Kharif (Monsoon), Rabi (Winter), Zaid (Summer).
  5. **Farm Area**: Numeric input with quick presets (1, 2.5, 5, 10) and Hectares/Acres toggle.
  6. **Soil Type**: Visual swatches for Alluvial, Black, Red, Clay, Loamy, and Sandy soils.
  7. **Rainfall Slider**: 200 mm to 2500 mm with live numeric badge.
  8. **Temperature Slider**: 10°C to 45°C with seasonal thermal indicator.
  9. **Humidity Slider**: 20% to 95% with moisture rating.
  10. **Fertilizer Used**: Large Yes / No toggle.
  11. **Pesticide Used**: Large Yes / No toggle.
  12. **Irrigation Method**: Rainfed, Drip, Canal, Sprinkler, and Tubewell.
- **⚡ One-Click Prefill**: "Prefill Sample (Wheat, Punjab)" button for instant 1-second demonstration.
- **Dynamic Yield Calculation**: Multi-factor agronomic algorithm calibrated to ICAR benchmark data.

### 📊 2. High-Impact Prediction Result Page
- **Large Predicted Yield Display**: Tons/Hectare and Tons/Acre with total farm production.
- **SVG Semi-Circular Confidence Gauge**: Color-coded Red (<60%), Yellow (60-80%), Green (>80%) with animated needle and accuracy score (e.g. 94%).
- **Financial Projections Card**:
  - Estimated Net Profit (highlighted in bold green)
  - Gross Market Revenue
  - Estimated Production Cost
  - Current Mandi Modal Price vs Govt MSP
- **Actionable AI Recommendations**:
  - ✅ Best Fertilizer Schedule (NPK timing and basal/top-dress splits)
  - ✅ Irrigation Frequency (critical growth stage watering)
  - ✅ Disease Prevention Tips
  - ✅ Optimal Harvest Time (moisture level indicator)
  - ✅ Best Storage Method (hermetic bags, pest protection)
- **🔊 Voice Readout (TTS)**: Web Speech Synthesis reads prediction and advice aloud in natural voice.
- **📄 Download PDF / Print**: Formatted printable report.

### 🌤️ 3. Local Agricultural Weather
- Localized weather search by state/district.
- Real-time temperature, rainfall probability, humidity, wind speed, sunrise and sunset times.
- **⚠️ Active Rain Alert Banner**: Agricultural precautions (e.g. postponing urea application before rain).
- **7-Day Farm Forecast**: Daily cards with pesticide spray suitability badges.

### 🏛️ 4. Government Schemes & Subsidies (Sarkari Yojana)
- Direct benefit schemes: PM-KISAN, PMFBY (Crop Insurance), Soil Health Card, Kisan Credit Card (KCC), Per Drop More Crop (Drip/Sprinkler 55% subsidy), PM-KUSUM (Solar pumps 90% subsidy).
- Interactive **"Check Eligibility & Apply"** modal with document checklist and direct links to official government portals.

### 📚 5. Agricultural Crop Library
- Searchable repository of Indian crops.
- Full agronomic profiles: Ideal Temperature, Ideal Rainfall, Soil Suitability, Growth Days, Expected National Yield, Mandi & MSP prices, Recommended Fertilizer Dosages, and Common Diseases.

### 🔬 6. AI Crop Disease Doctor
- Drag-and-drop or photograph leaf image from phone camera.
- 4 instant test sample presets:
  1. Rice Leaf Blast
  2. Wheat Stripe Rust
  3. Tomato Early Blight
  4. Cotton Pink Bollworm
- Comprehensive diagnosis report with symptoms, organic bio-treatments, chemical spray recommendations, and prevention steps.

### 📈 7. Live APMC Mandi Rates
- Live price ticker across agricultural mandis (Khanna, Ludhiana, Karnal, Indore, Nashik, Rajkot, Guntur, Kota, etc.).
- Modal prices, daily change indicators, and MSP comparison.

### 📁 8. Farmer Prediction History & Data Export
- Stored locally in browser LocalStorage (works offline).
- Search and filter records by crop or district.
- **📊 Download Excel (CSV)** export.
- **📄 Print / PDF** export.
- Delete individual records.

### 📊 9. Visual Farm Analytics (Chart.js)
- **Seasonal Production Trend** (monthly harvest yield bar chart).
- **Crop Profitability Comparison** (doughnut chart of profit per hectare).
- **Rainfall vs Yield Response Curve** (sensitivity line chart).
- Plain-language farmer takeaways with zero machine learning jargon.

### 💬 10. Floating Smart AI Chatbot ("🌾 Kisan AI Sahayak")
- Floating green bubble with pulsating ring.
- Expandable chat drawer with one-click questions:
  - *"How much Urea for Wheat?"*
  - *"Why are my paddy leaves turning yellow?"*
  - *"When is the best time to harvest?"*
  - *"How to receive PM-KISAN ₹6,000?"*
- Natural language agricultural answers.

### 🌐 11. 9 Indian Regional Languages + English
- Instant translation across the entire platform:
  - English
  - Hindi (हिंदी)
  - Marathi (मराठी)
  - Tamil (தமிழ்)
  - Telugu (తెలుగు)
  - Kannada (ಕನ್ನಡ)
  - Gujarati (ગુજરાતી)
  - Punjabi (ਪੰਜਾਬੀ)
  - Bengali (বাংলা)

### ♿ 12. Accessibility & Farmer-First Design
- **Large Touch Targets & Buttons**: Big buttons designed for mobile screens.
- **High-Contrast Mode**: Enhances readability in bright sunlight outdoors.
- **Dark Mode**: Reduces glare during evening farm planning.
- **🎙️ Voice Assistant**: Web Speech Recognition to speak crop or queries.
- **Offline Friendly**: Works 100% in browser without required backend installations.

---

## 🚀 How to Run the Website

### Option 1: Double-Click (Zero Install)
Simply double-click `index.html` in your file explorer to open it in Chrome, Edge, Safari, or Firefox!

### Option 2: Run with Local Server (Node.js)
```bash
# Inside the smart-farming-ai directory:
npx serve . -l 3000
```
Then visit: `http://localhost:3000`

### Option 3: Run with Python
```bash
python -m http.server 3000
```
Then visit: `http://localhost:3000`

---

## 📂 Project Directory Structure

```
smart-farming-ai/
├── index.html              # Main Single-Page AgriTech Application
├── package.json            # Node dev scripts
├── README.md               # Documentation & User Guide
├── css/
│   └── style.css           # Custom glassmorphism, sliders, gauge meter & print styles
├── js/
│   ├── translations.js     # 9 Indian regional languages dictionary
│   ├── data.js             # Indian states, crops, soils, schemes, mandi rates & diseases
│   ├── yieldEngine.js      # Agronomic multi-factor crop yield estimation engine
│   └── app.js              # Application logic, wizard, speech synthesis, charts & chatbot
└── assets/                 # Icons & image assets
```

---

## 🌾 Design Philosophy
- **Colors**: Deep Forest Green (`#14532d`), Vibrant Emerald (`#16a34a`), Earth Amber (`#b45309`), Warm Sand (`#fef3c7`), Crisp Clean Whites.
- **Typography**: Big readable fonts (`Plus Jakarta Sans` & `Outfit`) with Noto Sans regional fallbacks.
- **Cards**: Soft 20px rounded corners, glassmorphism, soft organic shadows, zero clutter.
- **Language**: Farmer-friendly, respectful, avoiding complex technical machine-learning terms like "Random Forest", "RMSE", or "One-Hot Encoding".
