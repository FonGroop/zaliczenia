export let map;

export function initMap() {
    map = L.map('map').setView([50, 20], 6); // Center: Warsaw
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    return map;
}

export function addMapClickHandler(callback) {
    map.on('click', (e) => {
        callback(e.latlng);
    });
}
