import { initMap, addMapClickHandler } from './map.js';
import { initializePoints, addPointToList, isPointInList, highlightMarkerPoint } from './points.js';
import { addMarker, hasMarker, clusterGroup } from './markerManager.js';

window.selectedPoint = null;

const map = initMap();
map.addLayer(clusterGroup);

initializePoints(handlePointClick);
addMapClickHandler(handleMapClick);

function handlePointClick(name) {
    if (!isPointInList(name)) return;

    window.selectedPoint = name;

    highlightMarkerPoint(name);

    document.body.style.cursor = 'crosshair';
}


function handleMapClick(latlng) {
    const name = window.selectedPoint;
    if (!name || !isPointInList(name)) {
        window.selectedPoint = null;
        document.body.style.cursor = 'default';
        return;
    }

    if (hasMarker(name)) {
        alert('This point already has a marker.');
        window.selectedPoint = null;
        document.body.style.cursor = 'default';
        return;
    }

    addMarker(name, latlng);
    highlightMarkerPoint(name);
    window.selectedPoint = null;
    document.body.style.cursor = 'default';
}

document.getElementById('add-point').addEventListener('click', () => {
    const input = document.getElementById('point-input');
    const name = input.value.trim();
    if (name) {
        addPointToList(name, handlePointClick);
        input.value = '';
    }
});
