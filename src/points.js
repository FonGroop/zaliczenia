
const pointsList = document.getElementById('points-list');
let pointElements = {};

export function isPointInList(name) {
    return !!pointElements[name];
}


export function initializePoints(onClick) {
    for (let i = 1; i <= 10; i++) {
        addPointToList(`Point ${i}`, onClick);
    }
}

export function addPointToList(name, onClick) {
    const li = document.createElement('li');
    li.textContent = name;
    li.addEventListener('click', () => onClick(name));
    li.addEventListener('dblclick', () => {
        removePointFromList(name);
    });
    pointElements[name] = li;
    pointsList.appendChild(li);
}

export function removePointFromList(name) {
    const li = pointElements[name];
    if (li) {
        li.remove();
        delete pointElements[name];
    }

    if (window.selectedPoint === name) {
        window.selectedPoint = null;
        document.body.style.cursor = 'default';
    }

    import('./markerManager.js').then(({ removeMarker }) => {
        removeMarker(name);
    });
}


export function highlightMarkerPoint(name) {
    Object.values(pointElements).forEach(el => el.classList.remove('selected'));
    if (pointElements[name]) {
        pointElements[name].classList.add('selected');
    }
}

export function markPointAsPlaced(name) {
    if (pointElements[name]) {
        pointElements[name].classList.add('marked');
    }
}

export function unmarkPoint(name) {
    if (pointElements[name]) {
        pointElements[name].classList.remove('marked');
    }
}
