var map = L.map('map').setView([-10.261, -76.641], 5).setZoom(5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

const getData = async () => {
  await fetch('http://127.0.0.1:5000/api/geojson').then(res => res.json()).then(res => {
    res.forEach(gson => {
      console.log(gson)
      L.geoJSON(gson, {
        onEachFeature: function (features, layer) {
        },
        style: {
          fillColor: gson.features[0].properties.color,
          fillOpacity: .4,
          color: gson.features[0].properties.color,
          opacity: .2
        }
      }).bindPopup(`
        <div> 
          <h2>Temperature</h2>
          <div>
            <p class='temperature'>${Math.round(gson.features[0].properties.temperature * 100)/100.00}º</p>
          </div>
        </div>
      `).addTo(map)
    })
    const spinner = document.getElementById('spinner')
    const mapa = document.getElementById('map')
    spinner.style.display = 'none'
    mapa.style.visibility = 'visible'
  });
}

getData()