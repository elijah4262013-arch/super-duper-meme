# Weather Radar Pro 

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-brightgreen)](https://elijah4262013-arch.github.io/super-duper-meme/)
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-blue.svg)](https://opensource.org/licenses/MPL-2.0)
[![HTML5](https://img.shields.io/badge/HTML-5-orange)](https://html5.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-green)](https://leafletjs.com/)

**Advanced Weather Radar Visualization Tool** - A web-based application for viewing real-time weather radar data with multiple visualization modes including reflectivity, velocity, and OpenMeteo precipitation data.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Radar Modes](#radar-modes)
- [Configuration](#configuration)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Features

### Core Functionality

- **Multiple Radar Modes**: Switch between different weather data visualization modes
- **Interactive Map**: Pan, zoom, and explore weather patterns globally
- **Real-time Updates**: Animated radar data with adjustable speed
- **Location Services**: Auto-detect your location or select predefined regions
- **Custom Coordinates**: Set any location as your radar center point

### Radar Modes

| Mode | Description | Unit | Color Scale |
|------|-------------|------|-------------|
| **Reflectivity** | Measures precipitation intensity | dBZ | Blue (light) to Purple (extreme) |
| **Velocity** | Doppler radar showing wind motion | m/s | Blue (toward) to Red (away) |
| **OpenMeteo** | Precipitation forecast data | mm/h | Blue (light) to Red (heavy) |
| **Composite** | Combined view of all modes | - | Multi-layer overlay |

### User Interface

- **Responsive Design**: Works on desktop and mobile devices
- **Layer Control**: Choose between OpenStreetMap, Satellite, and Dark Matter base maps
- **Opacity Control**: Adjust radar overlay transparency
- **Animation Controls**: Modify animation speed for smoother or faster updates
- **Status Panel**: Real-time display of current mode, zoom level, coordinates, and frame number
- **Legend**: Visual color scale reference for each radar mode
- **Radar Information**: Shows current radar name, time, and range

---

## Demo

The application is automatically deployed to GitHub Pages:

🌐 **[Live Demo](https://elijah4262013-arch.github.io/super-duper-meme/)**

### Screenshots

The application features a modern dark theme interface with:
- Header with application title and subtitle
- Sidebar with control panels
- Interactive map display
- Loading indicators
- Status and information panels

---

## Installation

### Quick Start

No installation required! Simply open the `index.html` file in your web browser.

```bash
# Clone the repository
git clone https://github.com/elijah4262013-arch/super-duper-meme.git
cd super-duper-meme

# Open in browser (using Python HTTP server)
python -m http.server 8000
# Then navigate to http://localhost:8000
```

### Development Setup

For development, you can use any local web server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

### Deployment

The project is configured for automatic deployment to GitHub Pages. Any push to the `main` branch will trigger a deployment via the GitHub Actions workflow.

---

## Usage

### Basic Controls

1. **Select Radar Mode**: Click on the mode buttons in the "Radar Mode" panel
   - 🌧️ Reflectivity
   - 🔭 Velocity
   - 🌍 OpenMeteo
   - 🌪️ Composite

2. **Adjust Settings**:
   - **Opacity**: Slide to change radar overlay transparency (10-100%)
   - **Animation Speed**: Control how fast the radar data animates (1-10)
   - **Location**: Choose from United States, Europe, or Custom Coordinates

3. **Locate Me**: Click the "Locate Me" button to center the map on your current position

4. **Map Navigation**:
   - **Pan**: Click and drag the map
   - **Zoom**: Use mouse wheel or pinch gestures
   - **Layer Switch**: Use the layer control in the top-right corner

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `+` / `-` | Zoom in/out |
| Arrow Keys | Pan map |

### Touch Gestures (Mobile)

- **Pinch**: Zoom in/out
- **Drag**: Pan the map
- **Double-tap**: Zoom in

---

## Radar Modes

### Reflectivity Mode 🌧️

**Purpose**: Shows precipitation intensity

**Color Scale (dBZ)**:
- **Black**: 5 dBZ (Very light)
- **Dark Blue**: 10-20 dBZ (Light rain)
- **Blue**: 30-40 dBZ (Moderate rain)
- **Cyan**: 45-50 dBZ (Heavy rain)
- **White**: 55 dBZ (Very heavy)
- **Yellow**: 60 dBZ (Intense)
- **Orange**: 65 dBZ (Extreme)
- **Red**: 70+ dBZ (Severe storms)

**Interpretation**:
- < 20 dBZ: Light precipitation, possibly virga
- 20-40 dBZ: Light to moderate rain
- 40-50 dBZ: Moderate to heavy rain
- 50-60 dBZ: Heavy rain, possible hail
- > 60 dBZ: Intense storms, likely hail

### Velocity Mode 🔭

**Purpose**: Shows wind motion using Doppler effect

**Color Scale (m/s)**:
- **Dark Blue**: -50 m/s (Strong toward radar)
- **Blue**: -30 to -15 m/s (Moderate toward)
- **Cyan**: -5 m/s (Light toward)
- **Gray**: 0 m/s (No movement)
- **Yellow**: 5 m/s (Light away)
- **Orange**: 15 m/s (Moderate away)
- **Red**: 30-50 m/s (Strong away)

**Interpretation**:
- Blue shades: Wind moving toward the radar
- Red shades: Wind moving away from the radar
- Gray: No detectable motion
- Rotation patterns may indicate tornadoes or mesocyclones

### OpenMeteo Mode 🌍

**Purpose**: Displays precipitation forecast data from OpenMeteo

**Color Scale (mm/h)**:
- **Black**: 0 mm/h (No precipitation)
- **Dark Blue**: 0.1-1 mm/h (Very light)
- **Blue**: 5 mm/h (Light)
- **Cyan**: 10-20 mm/h (Moderate)
- **White**: 30 mm/h (Heavy)
- **Yellow**: 50 mm/h (Very heavy)
- **Orange**: 100 mm/h (Extreme)
- **Red**: 200 mm/h (Exceptional)

**Interpretation**:
- < 1 mm/h: Drizzle or very light rain
- 1-10 mm/h: Light to moderate rain
- 10-50 mm/h: Heavy rain
- > 50 mm/h: Torrential rain, potential flooding

### Composite Mode 🌪️

**Purpose**: Overlays all three modes for comprehensive analysis

**Features**:
- Shows reflectivity as primary layer
- Overlays velocity data at reduced opacity
- Includes OpenMeteo precipitation data
- Provides most complete picture of weather conditions

---

## Configuration

### Custom Locations

To add custom radar locations, modify the `radarData` object in the JavaScript:

```javascript
const radarData = {
    us: {
        center: [39.8283, -98.5795],
        zoom: 4,
        range: 250,
        name: 'US National Radar'
    },
    europe: {
        center: [48.8566, 12.3522],
        zoom: 4,
        range: 250,
        name: 'European Radar'
    },
    // Add custom locations here
    australia: {
        center: [-25.2744, 133.7751],
        zoom: 4,
        range: 250,
        name: 'Australian Radar'
    }
};
```

### Color Scales

Each radar mode has its own color configuration. To customize colors, modify the `CONFIG` object:

```javascript
const CONFIG = {
    reflectivity: {
        name: 'Reflectivity',
        unit: 'dBZ',
        colors: [
            { value: 5, color: '#000000' },
            { value: 10, color: '#000080' },
            // ... more color mappings
        ]
    }
};
```

### Map Settings

- **Default Center**: Modify `radarData.us.center`
- **Default Zoom**: Modify `radarData.us.zoom`
- **Radar Range**: Adjust the `range` property (in kilometers)
- **Max/Min Zoom**: Change in `initMap()` function

---

## Technologies

### Frontend

- **[HTML5](https://html5.org/)**: Markup language
- **[CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)**: Styling with gradients and animations
- **[JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)**: Application logic

### Libraries

- **[Leaflet 1.9.4](https://leafletjs.com/)**: Interactive maps
  - OpenStreetMap base layer
  - Satellite imagery layer
  - Dark Matter theme
  - Layer control

### APIs

- **[OpenStreetMap](https://www.openstreetmap.org/)**: Free map tiles
- **[Esri](https://www.esri.com/)**: Satellite imagery
- **[CartoDB](https://cartodb.com/)**: Dark Matter base map

### Build & Deployment

- **[GitHub Pages](https://pages.github.com/)**: Static site hosting
- **[GitHub Actions](https://github.com/features/actions)**: CI/CD pipeline

---

## Project Structure

```
super-duper-meme/
├── index.html              # Main application file
├── README.md               # Project documentation
├── LICENSE                 # MPL 2.0 license
├── .github/
│   ├── workflows/
│   │   └── deploy-pages.yml # GitHub Actions deployment
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md   # Bug report template
│       └── feature_request.md # Feature request template
```

### index.html Structure

```
┌─────────────────────────────────────────────────────────┐
│  Header (Title, Subtitle)                                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐    ┌─────────────────────────────────┐  │
│  │ Sidebar  │    │          Main Content             │  │
│  │          │    │    ┌─────────────────────────┐    │  │
│  │•Radar Mode│    │    │      Interactive Map      │    │  │
│  │•Settings  │    │    │    (Leaflet Canvas)      │    │  │
│  │•Legend    │    │    │                         │    │  │
│  │•Status    │    │    └─────────────────────────┘    │  │
│  └──────────┘    │    ┌─────────────────────────┐    │  │
│                  │    │     Loading/Info Panel     │    │  │
│                  │    └─────────────────────────┘    │  │
│                  └─────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test locally
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style

- Use consistent indentation (4 spaces)
- Add comments for complex logic
- Keep functions focused and small
- Use descriptive variable names

---

## License

This project is licensed under the **Mozilla Public License 2.0 (MPL 2.0)** - see the [LICENSE](LICENSE) file for details.

### MPL 2.0 Summary

- **Permissions**: Commercial use, modification, distribution, patent use
- **Conditions**: License and copyright notice must be included
- **Limitations**: Liability, warranty
- **File-based Copyleft**: Modifications must be open-sourced under MPL 2.0

---

## Acknowledgments

- **[Leaflet](https://leafletjs.com/)**: Excellent mapping library
- **[OpenStreetMap](https://www.openstreetmap.org/)**: Free, open map data
- **[Esri](https://www.esri.com/)**: Satellite imagery
- **[CartoDB](https://cartodb.com/)**: Beautiful map themes
- **[OpenMeteo](https://open-meteo.com/)**: Weather data inspiration

### Inspired By

- National Weather Service radar displays
- Weather.com interactive maps
- Various open-source weather visualization projects

---

## Support

### Reporting Issues

- Use the [Bug Report](https://github.com/elijah4262013-arch/super-duper-meme/issues/new?template=bug_report.md) template
- Include screenshots when possible
- Provide steps to reproduce
- Specify browser and OS

### Requesting Features

- Use the [Feature Request](https://github.com/elijah4262013-arch/super-duper-meme/issues/new?template=feature_request.md) template
- Describe the problem you're trying to solve
- Explain your proposed solution
- Include mockups if available

### Getting Help

- Check this README for usage instructions
- Review the [GitHub Issues](https://github.com/elijah4262013-arch/super-duper-meme/issues) for known problems
- Open a new issue for specific questions

---

<p align="center">
  Made with ❤️ for weather enthusiasts everywhere
</p>

<p align="center">
  <a href="https://github.com/elijah4262013-arch/super-duper-meme">
    <img src="https://img.shields.io/github/stars/elijah4262013-arch/super-duper-meme?style=social" alt="GitHub Stars">
  </a>
  <a href="https://github.com/elijah4262013-arch/super-duper-meme/fork">
    <img src="https://img.shields.io/github/forks/elijah4262013-arch/super-duper-meme?style=social" alt="GitHub Forks">
  </a>
</p>
