
import L from 'leaflet';
import 'leaflet.markercluster';
import { map } from './map.js';
import { markPointAsPlaced, unmarkPoint } from './points.js';

export const clusterGroup = L.markerClusterGroup();
const markers = {};

export function hasMarker(name) {
    return !!markers[name];
}


export function addMarker(name, latlng) {
    if (markers[name]) return;

    const marker = L.marker(latlng).bindPopup(name);
    marker.addTo(clusterGroup);
    markers[name] = marker;

    markPointAsPlaced(name);
}

export function removeMarker(name) {
    const marker = markers[name];
    if (marker) {
        clusterGroup.removeLayer(marker);
        delete markers[name];

        unmarkPoint(name);
    }
}

export function highlightMarkerPoint(name) {
    import('./points.js').then(({ highlightMarkerPoint }) => {
        highlightMarkerPoint(name);
    });
}
