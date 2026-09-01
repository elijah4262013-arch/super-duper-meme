/**
 * Weather Radar Pro - Main Application
 * Advanced Weather Radar Visualization Tool with NWS API Integration
 * 
 * @namespace WeatherRadar
 * @version: 2.0.0
 * @license: MPL 2.0
 * @author: elijah4262013-arch
 * @repository: https://github.com/elijah4262013-arch/super-duper-meme
 * 
 * Data Sources:
 * - NOAA NWS ArcGIS MapServer (https://idpgis.ncep.noaa.gov/)
 */

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    reflectivity: {
        name: 'Reflectivity',
        unit: 'dBZ',
        colors: [
            { value: 5, color: '#000000' },
            { value: 10, color: '#000080' },
            { value: 20, color: '#0000ff' },
            { value: 30, color: '#0080ff' },
            { value: 40, color: '#00ffff' },
            { value: 45, color: '#80ffff' },
            { value: 50, color: '#ffffff' },
            { value: 55, color: '#ffff80' },
            { value: 60, color: '#ff8000' },
            { value: 65, color: '#ff0000' },
            { value: 70, color: '#800000' },
            { value: 75, color: '#ff00ff' }
        ],
        legendTitle: 'Reflectivity (dBZ)'
    },
    velocity: {
        name: 'Velocity',
        unit: 'm/s',
        colors: [
            { value: -50, color: '#000080' },
            { value: -30, color: '#0000ff' },
            { value: -15, color: '#0080ff' },
            { value: -5, color: '#00ffff' },
            { value: 0, color: '#808080' },
            { value: 5, color: '#ffff00' },
            { value: 15, color: '#ff8000' },
            { value: 30, color: '#ff0000' },
            { value: 50, color: '#800000' }
        ],
        legendTitle: 'Doppler Velocity (m/s)'
    }
};

// NOAA/NWS ArcGIS MapServer URLs
const NWS_API = {
    reflectivity: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/radar_base_reflectivity/MapServer/tile/{z}/{y}/{x}',
    velocity: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/radar_base_velocity/MapServer/tile/{z}/{y}/{x}'
};

// ============================================
// GLOBAL STATE
// ============================================

let map;
let currentMode = 'reflectivity';
let opacity = 0.7;
let userMarker = null;
let isLocating = false;
let radarTileLayers = {};
let radarData = {
    us: {
        center: [39.8283, -98.5795],
        zoom: 4,
        name: 'US National Radar'
    },
    custom: {
        center: [0, 0],
        zoom: 2,
        name: 'Custom Location'
    }
};

// ============================================
// MAP INITIALIZATION
// ============================================

function initMap() {
    map = L.map('map', {
        center: radarData.us.center,
        zoom: radarData.us.zoom,
        minZoom: 2,
        maxZoom: 12,
        worldCopyJump: true
    });

    // Base layers
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    });

    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles © Esri',
        maxZoom: 17
    });

    const darkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CartoDB',
        maxZoom: 19
    });

    L.control.layers({
        'OpenStreetMap': osmLayer,
        'Satellite': satelliteLayer,
        'Dark Matter': darkLayer
    }).addTo(map);

    // Add base layer
    osmLayer.addTo(map);

    // Initialize radar layers
    initRadarLayers();

    // Map events
    map.on('zoomend', function() {
        document.getElementById('status-zoom').textContent = map.getZoom();
        updateRadarLayers();
    });

    map.on('moveend', function() {
        const center = map.getCenter();
        document.getElementById('status-coords').textContent = 
            `${center.lat.toFixed(2)}, ${center.lng.toFixed(2)}`;
    });

    // Hide loading
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 1000);
}

// ============================================
// RADAR LAYERS
// ============================================

function initRadarLayers() {
    // Initialize tile layers
    radarTileLayers.reflectivity = null;
    radarTileLayers.velocity = null;
    
    // Start with reflectivity
    setMode('reflectivity');
}

function updateRadarLayers() {
    // Remove existing layers
    for (const mode in radarTileLayers) {
        if (radarTileLayers[mode]) {
            map.removeLayer(radarTileLayers[mode]);
            radarTileLayers[mode] = null;
        }
    }

    // Add layer for current mode
    switch (currentMode) {
        case 'reflectivity':
            addNWSReflectivityLayer();
            break;
        case 'velocity':
            addNWSVelocityLayer();
            break;
    }
}

function addNWSReflectivityLayer() {
    try {
        if (!radarTileLayers.reflectivity) {
            radarTileLayers.reflectivity = L.tileLayer(NWS_API.reflectivity, {
                attribution: 'NOAA NWS Radar Reflectivity',
                opacity: opacity,
                zIndex: 100,
                maxZoom: 12
            }).addTo(map);
        } else {
            radarTileLayers.reflectivity.addTo(map);
        }
        radarTileLayers.reflectivity.setOpacity(opacity);
    } catch (error) {
        console.error('Error adding NWS reflectivity layer:', error);
        showNotification('Error loading NWS reflectivity data. Using fallback.', 'error');
        addFallbackLayer('reflectivity');
    }
}

function addNWSVelocityLayer() {
    try {
        if (!radarTileLayers.velocity) {
            radarTileLayers.velocity = L.tileLayer(NWS_API.velocity, {
                attribution: 'NOAA NWS Radar Velocity',
                opacity: opacity,
                zIndex: 100,
                maxZoom: 12
            }).addTo(map);
        } else {
            radarTileLayers.velocity.addTo(map);
        }
        radarTileLayers.velocity.setOpacity(opacity);
    } catch (error) {
        console.error('Error adding NWS velocity layer:', error);
        showNotification('Error loading NWS velocity data. Using fallback.', 'error');
        addFallbackLayer('velocity');
    }
}

function addFallbackLayer(mode) {
    // Fallback to OpenStreetMap if NWS layers fail
    const bounds = map.getBounds();
    const center = map.getCenter();
    const cellSize = 0.5;
    
    generateSimulatedData(bounds, cellSize, center, mode);
}

// ============================================
// SIMULATED DATA (Fallback)
// ============================================

function generateSimulatedData(bounds, cellSize, center, mode) {
    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();
    const config = CONFIG[mode];

    for (let lat = southWest.lat; lat <= northEast.lat; lat += cellSize) {
        for (let lng = southWest.lng; lng <= northEast.lng; lng += cellSize) {
            const distance = calculateDistance(center.lat, center.lng, lat, lng);
            if (distance > 500) continue;

            const value = generateSimulatedValue(lat, lng, center, mode);
            if (value !== null) {
                const color = getColorForValue(value, config.colors);
                if (color) {
                    const radius = Math.max(2, 10 - map.getZoom());
                    L.circleMarker([lat, lng], {
                        radius: radius,
                        fillColor: color,
                        color: color,
                        weight: 0,
                        fillOpacity: opacity,
                        opacity: opacity
                    }).addTo(map);
                }
            }
        }
    }
}

function generateSimulatedValue(lat, lng, center, mode) {
    const distance = calculateDistance(center.lat, center.lng, lat, lng);
    const noise = Math.sin(lat * 10) * Math.cos(lng * 10) * 0.5;

    switch (mode) {
        case 'reflectivity':
            const band1 = Math.exp(-Math.pow(distance - 50, 2) / 2000) * 40;
            const band2 = Math.exp(-Math.pow(distance - 100, 2) / 3000) * 50;
            return Math.max(0, Math.min(75, band1 + band2 + noise * 20));
        case 'velocity':
            const angle = Math.atan2(lng - center.lng, lat - center.lat);
            const windSpeed = Math.sin(Date.now() / 10000 + distance / 100) * 20;
            return Math.max(-50, Math.min(50, windSpeed * Math.cos(angle) + noise * 10));
        default:
            return 0;
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getColorForValue(value, colorScale) {
    for (let i = colorScale.length - 1; i >= 0; i--) {
        if (value >= colorScale[i].value) {
            return colorScale[i].color;
        }
    }
    return colorScale[0].color;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// ============================================
// MODE & UI CONTROLS
// ============================================

function setMode(mode) {
    if (!CONFIG[mode]) return;

    document.querySelectorAll('.mode-buttons .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`btn-${mode}`).classList.add('active');

    currentMode = mode;
    document.getElementById('status-mode').textContent = CONFIG[mode].name;
    updateLegend(mode);
    updateRadarLayers();
}

function updateLegend(mode) {
    const config = CONFIG[mode];
    document.getElementById('legend-title').textContent = config.legendTitle;

    let gradient = 'linear-gradient(to top, ';
    config.colors.forEach((entry, index) => {
        gradient += `${entry.color} ${index * (100 / (config.colors.length - 1))}%,`;
    });
    gradient = gradient.slice(0, -1) + ')';
    document.getElementById('legend-scale').style.background = gradient;

    const labels = document.querySelectorAll('#legend .legend-labels span');
    if (labels.length >= 2) {
        labels[0].textContent = config.colors[0].value + ' ' + config.unit;
        labels[1].textContent = config.colors[config.colors.length - 1].value + ' ' + config.unit;
    }
}

function updateOpacity(value) {
    opacity = value / 100;
    for (const mode in radarTileLayers) {
        if (radarTileLayers[mode]) {
            radarTileLayers[mode].setOpacity(opacity);
        }
    }
}

function changeLocation(loc) {
    const data = radarData[loc];
    if (!data || !map) return;

    map.setView(data.center, data.zoom);
    document.getElementById('radar-name').textContent = data.name;
    updateRadarLayers();
}

function locateMe() {
    if (isLocating) return;
    isLocating = true;

    const loadingEl = document.getElementById('loading');
    if (loadingEl) {
        loadingEl.style.display = 'block';
        loadingEl.textContent = 'Locating...';
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                if (userMarker) {
                    map.removeLayer(userMarker);
                }

                userMarker = L.marker([lat, lng], {
                    icon: L.divIcon({
                        className: 'user-marker',
                        html: '📍',
                        iconSize: [30, 30]
                    })
                }).addTo(map);

                map.setView([lat, lng], 10);
                radarData.custom.center = [lat, lng];
                radarData.custom.zoom = 10;
                radarData.custom.name = `User Location (${lat.toFixed(2)}, ${lng.toFixed(2)})`;
                
                document.getElementById('location').value = 'custom';
                document.getElementById('radar-name').textContent = radarData.custom.name;

                if (loadingEl) loadingEl.style.display = 'none';
                isLocating = false;
                updateRadarLayers();
            },
            function(error) {
                showNotification(getGeolocationErrorMessage(error), 'error');
                if (loadingEl) loadingEl.style.display = 'none';
                isLocating = false;
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    } else {
        showNotification('Geolocation not supported', 'error');
        if (loadingEl) loadingEl.style.display = 'none';
        isLocating = false;
    }
}

function getGeolocationErrorMessage(error) {
    const messages = {
        1: 'Location access denied. Enable location services.',
        2: 'Unable to get location. Try again.',
        3: 'Request timed out. Try again.',
        0: 'Unknown location error.'
    };
    return messages[error.code] || error.message || 'Location error';
}

function updateRadarInfo(center) {
    const now = new Date();
    const hours = now.getUTCHours().toString().padStart(2, '0');
    const minutes = now.getUTCMinutes().toString().padStart(2, '0');
    document.getElementById('radar-time').textContent = `Time: ${hours}:${minutes} UTC`;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; padding: 15px 25px;
        border-radius: 8px; z-index: 10000; box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: ${type === 'error' ? '#ff4444' : type === 'success' ? '#44ff44' : '#4444ff'};
        color: ${type === 'success' ? '#000' : '#fff'}; animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ============================================
// INITIALIZATION
// ============================================

window.onload = function() {
    initMap();
    updateLegend('reflectivity');
    document.getElementById('status-mode').textContent = CONFIG.reflectivity.name;
    updateRadarInfo(map.getCenter());
};

window.addEventListener('resize', function() {
    setTimeout(() => {
        if (map) {
            map.invalidateSize();
            updateRadarLayers();
        }
    }, 250);
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
    switch(e.key) {
        case '1': setMode('reflectivity'); break;
        case '2': setMode('velocity'); break;
        case '+': case '=': map.zoomIn(); break;
        case '-': case '_': map.zoomOut(); break;
        case 'l': case 'L': locateMe(); break;
    }
});

console.log('Weather Radar Pro - NWS API Integration\nKeyboard: 1=Reflectivity, 2=Velocity, +/- = Zoom, L=Locate');
