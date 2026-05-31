// ===============================
// LEAFLET MAP SCRIPT (SAFE)
// ===============================

const map = L.map("map").setView([22.7196, 75.8577], 13);

// Map tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap"
}).addTo(map);

// House data
const houses = [
  {
    lat: 22.720,
    lng: 75.860,
    price: "₹15k",
    title: "2BHK Vijaynagar"
  },
  {
    lat: 22.715,
    lng: 75.855,
    price: "₹9k",
    title: "1RK Bhawarkua"
  },
  {
    lat: 22.725,
    lng: 75.865,
    price: "₹22k",
    title: "3BHK Palasia"
  }
];

// Airbnb-style dot markers
houses.forEach(h => {
  L.circleMarker([h.lat, h.lng], {
    radius: 9,
    fillColor: "#ff6b00",
    fillOpacity: 1,
    color: "#fff",
    weight: 2
  })
  .addTo(map)
  .bindPopup(`<b>${h.title}</b><br>${h.price}`);
});
