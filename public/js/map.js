const coordinates = JSON.parse(coordinatesStr);
mapboxgl.accessToken = mapboxToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});

// Create popup
const popup = new mapboxgl.Popup({ offset: 25 })
    .setHTML(`
      <h4 style="font-weight: 600; margin-bottom: 4px; font-family: 'Inter', sans-serif;">${listingTitle}</h4>
      <p style="font-size: 12px; margin: 0; color: #52525b; font-family: 'Inter', sans-serif;">Exact Location provided after booking</p>
    `);

// Create marker and add to map    
const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(coordinates)
    .setPopup(popup) // attach popup to marker
    .addTo(map);
