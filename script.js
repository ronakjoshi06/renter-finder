
function goToNext() {
  // placeholder for next page (listing.html)
  alert("Next page will open here!");
  // window.location.href = "listing.html";
}
/* ======================
   RENTER MAP SCRIPT
   ====================== */

// Map initialize (India view)
const map = L.map('map').setView([20.5937, 78.9629], 5);

// Map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

async function fetchHouses() {
  const selectedCity = document.getElementById("city").value;
  const selectedArea = document.getElementById("area").value;

  // Purane markers remove karo
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  const snapshot = await db.collection("houses")
    .where("city", "==", selectedCity)
    .where("area", "==", selectedArea)
    .get();

  if (snapshot.empty) {
    alert("No houses found!");
    return;
  }

  snapshot.forEach(doc => {
    const data = doc.data();

    L.marker([data.lat, data.lng])
      .addTo(map)
      .bindPopup(`
        <b>${data.type}</b><br>
        Rent: ₹${data.rent}<br>
        Owner: ${data.ownerName}
      `);
  });
}
