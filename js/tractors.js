/* =========================================================
   DOMAKI MOTORS — TRACTOR DATA
   Images come from DOMAKI_CONFIG.images.tractors in config.js
   so you never edit images here. Just edit config.js.
   ========================================================= */

(function () {
  const CFG = window.DOMAKI_CONFIG || {};
  const TRACTOR_IMAGES = (CFG.images && CFG.images.tractors) || [];
  const HERO = (CFG.images && CFG.images.hero) || "";
  const APPS = (CFG.images && CFG.images) || {};

  function imgAt(i) {
    return TRACTOR_IMAGES[i] || "";
  }

  const tractors = [
    { id: 1, brand: "Massey Ferguson", model: "MF 385", horsepower: 85, drive: "2WD", transmission: "Manual", fuel: "Diesel", price: 2850000, condition: "New", image: imgAt(0), availability: "Available", type: "Utility Tractor", description: "A dependable utility tractor suited to a wide range of farm operations, from ploughing to transport.", idealFor: ["Large Farms", "Ploughing", "Transport", "Commercial Agriculture", "Heavy Work"] },
    { id: 2, brand: "Massey Ferguson", model: "MF 375", horsepower: 75, drive: "2WD", transmission: "Manual", fuel: "Diesel", price: 2550000, condition: "New", image: imgAt(1), availability: "Available", type: "Utility Tractor", description: "Reliable mid-range tractor for general farm work and implement handling.", idealFor: ["Medium Farms", "Ploughing", "Transport"] },
    { id: 3, brand: "Massey Ferguson", model: "MF 290", horsepower: 80, drive: "2WD", transmission: "Manual", fuel: "Diesel", price: 2450000, condition: "New", image: imgAt(2), availability: "Limited Stock", type: "Farm Tractor", description: "A practical farm tractor with strong performance for daily agricultural tasks.", idealFor: ["Medium Farms", "Ploughing", "General Farm Work"] },
    { id: 4, brand: "New Holland", model: "TT75", horsepower: 75, drive: "4WD", transmission: "Synchro", fuel: "Diesel", price: 3150000, condition: "New", image: imgAt(3), availability: "Available", type: "Utility Tractor", description: "Four-wheel drive utility tractor offering traction and versatility across varied terrain.", idealFor: ["Medium Farms", "Ploughing", "Transport"] },
    { id: 5, brand: "New Holland", model: "TD90", horsepower: 90, drive: "4WD", transmission: "Synchro", fuel: "Diesel", price: 3650000, condition: "New", image: imgAt(4), availability: "Available", type: "Agricultural Tractor", description: "A robust agricultural tractor built for demanding field operations and heavy implements.", idealFor: ["Large Farms", "Commercial Agriculture", "Heavy Work"] },
    { id: 6, brand: "John Deere", model: "5075E", horsepower: 75, drive: "4WD", transmission: "Power Shuttle", fuel: "Diesel", price: 4250000, condition: "New", image: imgAt(5), availability: "Limited Stock", type: "Utility Tractor", description: "Advanced utility tractor with power shuttle transmission for efficient operation.", idealFor: ["Medium Farms", "Commercial Agriculture", "Transport"] },
    { id: 7, brand: "Kubota", model: "M7040", horsepower: 70, drive: "4WD", transmission: "Synchro", fuel: "Diesel", price: 3950000, condition: "New", image: imgAt(6), availability: "Available", type: "Utility Tractor", description: "Compact and efficient utility tractor known for reliability and fuel economy.", idealFor: ["Small Farms", "Medium Farms", "Landscaping"] },
    { id: 8, brand: "Farmtrac", model: "6055", horsepower: 60, drive: "4WD", transmission: "Manual", fuel: "Diesel", price: 2950000, condition: "New", image: imgAt(7), availability: "Available", type: "Utility Tractor", description: "A dependable compact tractor suited to small and medium farm operations.", idealFor: ["Small Farms", "Landscaping", "General Farm Work"] },
    { id: 9, brand: "Solis", model: "75", horsepower: 75, drive: "4WD", transmission: "Synchro", fuel: "Diesel", price: 2750000, condition: "New", image: imgAt(8), availability: "Available", type: "Utility Tractor", description: "Value-focused utility tractor offering strong performance for everyday farm tasks.", idealFor: ["Medium Farms", "Ploughing", "Transport"] },
    { id: 10, brand: "Deutz-Fahr", model: "5100 G", horsepower: 100, drive: "4WD", transmission: "Power Shuttle", fuel: "Diesel", price: 5200000, condition: "New", image: imgAt(9), availability: "Limited Stock", type: "Agricultural Tractor", description: "High-horsepower agricultural tractor for intensive commercial farming operations.", idealFor: ["Large Farms", "Commercial Agriculture", "Heavy Work"] }
  ];

  const machinery = [
    { name: "Ploughs", desc: "Primary tillage implements for soil preparation.", image: imgAt(0) },
    { name: "Disc Harrows", desc: "Secondary tillage for breaking clods and levelling.", image: imgAt(1) },
    { name: "Trailers", desc: "Agricultural transport trailers for farm produce and materials.", image: imgAt(2) },
    { name: "Planters", desc: "Precision planting equipment for row crops.", image: imgAt(3) },
    { name: "Cultivators", desc: "Inter-row cultivation and weed control.", image: imgAt(4) },
    { name: "Rotary Slashers", desc: "Vegetation control for fields and grounds.", image: imgAt(5) },
    { name: "Balers", desc: "Hay and straw baling for livestock operations.", image: imgAt(6) },
    { name: "Seeders", desc: "Seed placement equipment for efficient sowing.", image: imgAt(7) },
    { name: "Sprayers", desc: "Crop protection and liquid application equipment.", image: imgAt(8) },
    { name: "Loaders", desc: "Front-end material handling for farms.", image: imgAt(9) }
  ];

  window.DOMAKI_TRACTORS = tractors;
  window.DOMAKI_MACHINERY = machinery;
  window.DOMAKI_HERO_IMAGE = HERO;
  window.DOMAKI_APP_IMAGES = APPS;
})();