# Swiss Army Vape Tools

A comprehensive, all-in-one web-based toolkit for vaping enthusiasts. This simple app provides essential calculators for Ohm's Law, battery safety, coil building, e-liquid mixing, and heat flux estimation, everything you need to build and vape safely.

## Background

I'm a vaper who still keeps several old vape devices around. The problem with some of these older devices is that they only display voltage when explicitly in voltage mode,  otherwise, you're flying blind. Since I typically vape around 3.7–3.8V, I needed a quick way to estimate what my battery is actually putting out based on other measurable values. That's why I built this tool: to make those back-of-the-envelope calculations easier and safer.

## Features

- **Ohm's Law Calculator** — Calculate voltage, current, resistance, or power from any two known values
- **Battery Safety Calculator** — Determine amp draw, theoretical runtime, and safe coil resistance limits
- **Coil Wrapping Calculator** — Estimate wire length and resistance for various wire types and gauges
- **E-Liquid Mixer** — Calculate nicotine dilution and PG/VG ratios for DIY e-liquid
- **Heat Flux / Sweet Spot Estimator** — Visual estimator to determine if your vape setup is cool, warm, or hot

## Getting Started

1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. No installation, build steps, or dependencies required — works completely offline

## File Structure

```
vape-tools/
├── index.html      # Main HTML structure and UI
├── style.css       # Application styling (blue theme)
└── script.js       # Calculator logic and interactions
```

## Calculator Details

### Ohm's Law
Enter any two values (Voltage, Current, Resistance, Power) to calculate the remaining two. Supports both manual entry and verification of existing builds.

### Battery Safety
- Input battery voltage and coil resistance to calculate amp draw
- Get theoretical battery runtime based on capacity
- Calculate required coil resistance for desired wattage
- Warnings when amp draw exceeds 10A

### Coil Wrapping
Supports multiple wire types:
- Kanthal A1
- Nichrome 80/60
- Stainless Steel 316L
- Nickel (Ni200)
- Titanium

Select gauge (AWG 12–40), coil diameter, and number of wraps to estimate total wire length and resistance.

### E-Liquid Mixer
Calculate nicotine base volume needed for target strength and volume. Specify PG/VG ratios to balance your DIY e-liquid recipes.

### Heat Flux Estimator
Combines coil geometry and wattage to estimate heat flux (W/mm²). Visual bar indicator shows where your setup falls:
- 🔹 **Cool** (< 0.5 W/mm²) — Flavor-focused
- 🔸 **Warm** (0.5–1.5 W/mm²) — Sweet spot
- 🔺 **Hot** (> 1.5 W/mm²) — Cloud-focused

## Safety Disclaimer

**Vaping involves electrical and chemical risks. Use these calculators at your own risk. Always:**
- Check battery manufacturer specifications and never exceed continuous discharge rating
- Use an Ohm's Law calculator to verify coil builds before use
- Employ proper battery safety practices (married pairs, protected cells, etc.)
- Follow local regulations regarding nicotine and vaping products

The developer is not responsible for any damage, injury, or harm resulting from the use of this tool.

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). No internet connection required after initial load.

## License

MIT License — feel free to modify and distribute. Attribution appreciated but not required.

## Contributing

Contributions are welcome! Submit issues or pull requests for bug fixes, new features, or improvements to calculator accuracy.

---

*Swiss Army Vape Tools © 2026 — Vape safely*
