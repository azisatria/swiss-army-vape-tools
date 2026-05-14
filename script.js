// Navigation functionality
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const targetSection = this.getAttribute('data-section');

        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tool-section').forEach(s => s.classList.remove('active'));

        this.classList.add('active');
        document.getElementById(targetSection).classList.add('active');
    });
});

// Ohm's Law Calculator
function calculateOhmsLaw() {
    const voltage = parseFloat(document.getElementById('voltage').value);
    const current = parseFloat(document.getElementById('current').value);
    const resistance = parseFloat(document.getElementById('resistance').value);
    const power = parseFloat(document.getElementById('power').value);

    const resultDiv = document.getElementById('ohms-law-result');
    let hasInput = false;

    if (!isNaN(voltage)) hasInput = true;
    if (!isNaN(current)) hasInput = true;
    if (!isNaN(resistance)) hasInput = true;
    if (!isNaN(power)) hasInput = true;

    if (!hasInput) {
        resultDiv.innerHTML = 'Enter at least one value to calculate.';
        return;
    }

    let calculated = [];

    if (!isNaN(voltage) && !isNaN(current) && isNaN(resistance) && isNaN(power)) {
        const r = voltage / current;
        const p = voltage * current;
        calculated = [
            `Resistance: <strong>${r.toFixed(2)} Ω</strong>`,
            `Power: <strong>${p.toFixed(2)} W</strong>`
        ];
    } else if (!isNaN(voltage) && !isNaN(resistance) && isNaN(current) && isNaN(power)) {
        const i = voltage / resistance;
        const p = voltage * i;
        calculated = [
            `Current: <strong>${i.toFixed(2)} A</strong>`,
            `Power: <strong>${p.toFixed(2)} W</strong>`
        ];
    } else if (!isNaN(current) && !isNaN(resistance) && isNaN(voltage) && isNaN(power)) {
        const v = current * resistance;
        const p = v * current;
        calculated = [
            `Voltage: <strong>${v.toFixed(2)} V</strong>`,
            `Power: <strong>${p.toFixed(2)} W</strong>`
        ];
    } else if (!isNaN(voltage) && !isNaN(power) && isNaN(current) && isNaN(resistance)) {
        const i = power / voltage;
        const r = voltage / i;
        calculated = [
            `Current: <strong>${i.toFixed(2)} A</strong>`,
            `Resistance: <strong>${r.toFixed(2)} Ω</strong>`
        ];
    } else if (!isNaN(current) && !isNaN(power) && isNaN(voltage) && isNaN(resistance)) {
        const v = power / current;
        const r = v / current;
        calculated = [
            `Voltage: <strong>${v.toFixed(2)} V</strong>`,
            `Resistance: <strong>${r.toFixed(2)} Ω</strong>`
        ];
    } else if (!isNaN(resistance) && !isNaN(power) && isNaN(voltage) && isNaN(current)) {
        const v = Math.sqrt(power * resistance);
        const i = v / resistance;
        calculated = [
            `Voltage: <strong>${v.toFixed(2)} V</strong>`,
            `Current: <strong>${i.toFixed(2)} A</strong>`
        ];
    } else if (!isNaN(voltage) && !isNaN(current) && !isNaN(resistance)) {
        const expectedV = current * resistance;
        const expectedI = voltage / resistance;
        const expectedR = voltage / current;
        const tolerance = 0.05;
        let warn = '';
        if (Math.abs(voltage - expectedV) / expectedV > tolerance ||
            Math.abs(current - expectedI) / expectedI > tolerance ||
            Math.abs(resistance - expectedR) / expectedR > tolerance) {
            warn = '<br><em style="color: #d97706;">Note: Values are inconsistent – only two independent variables can be used at once.</em>';
        }
        const p = voltage * current;
        calculated = [
            `Power: <strong>${p.toFixed(2)} W</strong>${warn}`
        ];
    } else {
        calculated = ['Please provide exactly two known values (Voltage, Current, Resistance, or Power) or one value to derive others.'];
    }

    resultDiv.innerHTML = calculated.join('<br>');
}

function clearOhmsLaw() {
    document.getElementById('voltage').value = '';
    document.getElementById('current').value = '';
    document.getElementById('resistance').value = '';
    document.getElementById('power').value = '';
    document.getElementById('ohms-law-result').innerHTML = '';
}

// Battery Safety Calculator
function calculateBatterySafety() {
    const voltage = parseFloat(document.getElementById('battery-voltage').value);
    const capacity = parseFloat(document.getElementById('battery-capacity').value);
    const resistance = parseFloat(document.getElementById('battery-resistance').value);
    const wattage = parseFloat(document.getElementById('battery-watts').value);

    const resultDiv = document.getElementById('battery-result');
    const results = [];

    // If voltage and resistance are given, calculate current and power
    if (!isNaN(voltage) && !isNaN(resistance)) {
        const ampDraw = voltage / resistance;
        results.push(`Amp Draw: <strong>${ampDraw.toFixed(2)} A</strong>`);

        if (!isNaN(capacity)) {
            const theoreticalRuntime = (capacity / ampDraw).toFixed(1);
            results.push(`Theoretical Runtime: <strong>${theoreticalRuntime} hours</strong>`);
        }
    }

    // If wattage and voltage are given, calculate resistance needed for that wattage
    if (!isNaN(wattage) && !isNaN(voltage)) {
        const neededResistance = (voltage * voltage) / wattage;
        results.push(`For ${wattage}W at ${voltage}V, use coil ≥ <strong>${neededResistance.toFixed(2)} Ω</strong>`);
    }

    // If wattage and resistance are given, calculate voltage/amp needed
    if (!isNaN(wattage) && !isNaN(resistance)) {
        const neededVoltage = Math.sqrt(wattage * resistance);
        const neededAmps = wattage / neededVoltage;
        results.push(`To achieve ${wattage}W with ${resistance}Ω, need <strong>${neededVoltage.toFixed(2)}V</strong> and <strong>${neededAmps.toFixed(2)}A</strong>`);
    }

    // Battery safety check
    if (!isNaN(voltage) && !isNaN(resistance)) {
        const ampDraw = voltage / resistance;
        if (ampDraw > 10) {
            results.push('<br><em style="color: #ef4444;">WARNING: Amp draw exceeds 10A! Check battery limits.</em>');
        }
    }

    if (results.length === 0) {
        results = ['Enter at least two values: Battery Voltage + Coil Resistance, or Wattage + Voltage, etc.'];
    }

    resultDiv.innerHTML = results.join('<br>');
}

function clearBatterySafety() {
    document.getElementById('battery-voltage').value = '';
    document.getElementById('battery-capacity').value = '';
    document.getElementById('battery-resistance').value = '';
    document.getElementById('battery-watts').value = '';
    document.getElementById('battery-result').innerHTML = '';
}

// Coil Wrapping Calculator
const wireResistanceData = {
    kanthal: { 12: 0.00521, 14: 0.00828, 16: 0.0132, 18: 0.0209, 20: 0.0335, 22: 0.0529, 24: 0.0842, 26: 0.134, 28: 0.213, 30: 0.341, 32: 0.542, 34: 0.867, 36: 1.38, 38: 2.2, 40: 3.51 },
    nichrome80: { 12: 0.0047, 14: 0.0075, 16: 0.0119, 18: 0.0189, 20: 0.0304, 22: 0.0479, 24: 0.0761, 26: 0.121, 28: 0.193, 30: 0.309, 32: 0.491, 34: 0.788, 36: 1.25, 38: 1.99, 40: 3.17 },
    nichrome60: { 12: 0.0062, 14: 0.0098, 16: 0.0156, 18: 0.0248, 20: 0.040, 22: 0.0634, 24: 0.101, 26: 0.160, 28: 0.255, 30: 0.408, 32: 0.649, 34: 1.04, 36: 1.65, 38: 2.63, 40: 4.18 },
    stainless: { 12: 0.00585, 14: 0.00930, 16: 0.0148, 18: 0.0235, 20: 0.0376, 22: 0.0593, 24: 0.0943, 26: 0.150, 28: 0.239, 30: 0.382, 32: 0.607, 34: 0.972, 36: 1.54, 38: 2.46, 40: 3.92 },
    nickel: { 28: 0.140, 30: 0.219, 32: 0.349, 34: 0.557, 36: 0.890, 38: 1.42, 40: 2.26 },
    titanium: { 12: 0.0114, 14: 0.0181, 16: 0.0287, 18: 0.0457, 20: 0.0729, 22: 0.115, 24: 0.184, 26: 0.293, 28: 0.467, 30: 0.743 }
};

function calculateCoilLength() {
    const wireType = document.getElementById('wire-type').value;
    const gauge = parseInt(document.getElementById('wire-gauge').value);
    const coilDiameter = parseFloat(document.getElementById('coil-diameter').value);
    const numWraps = parseInt(document.getElementById('number-of-wraps').value);

    const resultDiv = document.getElementById('coil-result');

    if (!coilDiameter || !numWraps) {
        resultDiv.innerHTML = 'Please enter coil diameter and number of wraps.';
        return;
    }

    const resistancePerCm = wireResistanceData[wireType][gauge];
    if (!resistancePerCm) {
        resultDiv.innerHTML = 'Wire type/gauge combination not available.';
        return;
    }

    const coilRadius = coilDiameter / 2;
    const meanLoopCircumference = 2 * Math.PI * (coilRadius + (getWireDiameter(gauge) / 2));
    const wireLengthMm = meanLoopCircumference * numWraps;
    const estimatedResistance = (wireLengthMm / 10) * resistancePerCm;

    resultDiv.innerHTML = `
        <strong>Estimated Wire Length:</strong> ${wireLengthMm.toFixed(0)} mm<br>
        <strong>Estimated Resistance:</strong> ${estimatedResistance.toFixed(2)} Ω<br>
        <small style="color:#666;">Note: Actual resistance may vary due to wire batch, coil spacing, and measurement tolerances.</small>
    `;
}

function getWireDiameter(gauge) {
    const diameters = {
        12: 2.053, 14: 1.628, 16: 1.291, 18: 1.024, 20: 0.8128,
        22: 0.6438, 24: 0.5105, 26: 0.4049, 28: 0.3206, 30: 0.2540,
        32: 0.2019, 34: 0.1601, 36: 0.1270, 38: 0.1009, 40: 0.07991
    };
    return diameters[gauge] || 0.2;
}

function clearCoilWrapping() {
    document.getElementById('wire-type').value = 'kanthal';
    document.getElementById('wire-gauge').value = '24';
    document.getElementById('coil-diameter').value = '';
    document.getElementById('number-of-wraps').value = '';
    document.getElementById('coil-result').innerHTML = '';
}

// E-Liquid Mixer Calculator
function calculateELiquidMixer() {
    const targetML = parseFloat(document.getElementById('target-ml').value);
    const nicBaseStrength = parseFloat(document.getElementById('nic-base-strength').value);
    const targetNicStrength = parseFloat(document.getElementById('target-nic-strength').value);
    const pgRatio = parseFloat(document.getElementById('pg-ratio').value);
    const vgRatio = parseFloat(document.getElementById('vg-ratio').value);

    const resultDiv = document.getElementById('e-liquid-result');

    if (isNaN(targetML) || isNaN(nicBaseStrength) || isNaN(targetNicStrength)) {
        resultDiv.innerHTML = 'Please enter Target Volume, Base Nic Strength, and Target Nic Strength.';
        return;
    }

    if (pgRatio !== undefined && vgRatio !== undefined && (pgRatio + vgRatio !== 100)) {
        resultDiv.innerHTML = '<span style="color:#ef4444;">PG + VG must equal 100%</span>';
        return;
    }

    const nicBaseVolume = (targetML * targetNicStrength) / nicBaseStrength;
    const flavorVolume = 0; // Simple version: assume no flavorings or user calculates separately
    const pgBaseVolume = (pgRatio !== undefined) ? (targetML * pgRatio / 100) : 0;
    const vgBaseVolume = (vgRatio !== undefined) ? (targetML * vgRatio / 100) : 0;

    resultDiv.innerHTML = `
        <strong>Nicotine Base Needed:</strong> ${nicBaseVolume.toFixed(2)} mL<br>
        <strong>PG:</strong> ${pgBaseVolume.toFixed(2)} mL<br>
        <strong>VG:</strong> ${vgBaseVolume.toFixed(2)} mL<br>
        <strong>Flavorings (optional):</strong> add separately<br>
        <strong>Total:</strong> ${(nicBaseVolume + pgBaseVolume + vgBaseVolume).toFixed(2)} mL
    `;
}

function clearELiquidMixer() {
    document.getElementById('target-ml').value = '';
    document.getElementById('nic-base-strength').value = '';
    document.getElementById('target-nic-strength').value = '';
    document.getElementById('pg-ratio').value = '';
    document.getElementById('vg-ratio').value = '';
    document.getElementById('e-liquid-result').innerHTML = '';
}

// Heat Flux / Sweet Spot Estimator
function calculateHeatFlux() {
     const wireType = document.getElementById('hf-wire-type').value;
     const gauge = parseInt(document.getElementById('hf-wire-gauge').value);
     const coilDiameter = parseFloat(document.getElementById('hf-coil-diameter').value);
     const numWraps = parseInt(document.getElementById('hf-number-of-wraps').value);
     const wattage = parseFloat(document.getElementById('hf-wattage').value);

     const resultDiv = document.getElementById('heat-flux-result');
     const barContainer = document.getElementById('heat-flux-bar');
     const barFill = document.getElementById('hf-bar-fill');

if (!coilDiameter || !numWraps || !wattage) {
          resultDiv.innerHTML = 'Please fill in all fields: Coil Diameter, Wraps, and Wattage.';
          barContainer.style.display = 'none';
          return;
      }

     // Get wire diameter in mm from AWG
     const wireDiameterMm = getWireDiameter(gauge);

     // Calculate total wire length (same as coil wrapping calc)
     const coilRadius = coilDiameter / 2;
     const meanLoopCircumference = 2 * Math.PI * (coilRadius + (wireDiameterMm / 2));
     const wireLengthMm = meanLoopCircumference * numWraps;

     // Surface area of the wire cylinder (ignoring ends — just the side surface)
     // SA = π * d * L per wrap, total = π * d * L_total
     const surfaceAreaMm2 = Math.PI * wireDiameterMm * wireLengthMm;

     // Heat Flux = Power / Surface Area (W/mm²)
     const heatFlux = wattage / surfaceAreaMm2;

     // Also calculate estimated coil resistance and current draw for reference
     const resistancePerCm = wireResistanceData[wireType]?.[gauge];
     let resistance = null;
     if (resistancePerCm) {
         resistance = (wireLengthMm / 10) * resistancePerCm;
     }

     // Determine zone
     let zone, zoneClass, zoneLabel;
if (heatFlux < 0.5) {
          zone = 'Cool'; zoneClass = 'cool'; zoneLabel = '❄️ Cool — Flavor Chaser';
      } else if (heatFlux < 1.5) {
          zone = 'Warm'; zoneClass = 'warm'; zoneLabel = '🔥 Warm — Sweet Spot';
      } else {
          zone = 'Hot'; zoneClass = 'hot'; zoneLabel = '🌋 Hot — Cloud Chaser';
      }

     // Update bar
     barContainer.style.display = 'block';
     // Map heatFlux to bar position (0–100%). Clamp typical range 0–3 W/mm²
     const barPercent = Math.min(100, Math.max(0, (heatFlux / 3) * 100));
     barFill.style.width = barPercent + '%';
     barFill.className = 'hf-bar-fill ' + zoneClass;

     // Build result HTML
let html = `
          <div class="hf-zone-badge ${zoneClass}">${zoneLabel}</div>
          <br>
          <strong>Heat Flux:</strong> <span class="unit">${heatFlux.toFixed(3)} W/mm²</span><br>
          <strong>Wire Surface Area:</strong> <span class="unit">${surfaceAreaMm2.toFixed(1)} mm²</span><br>
          <strong>Total Wire Length:</strong> <span class="unit">${wireLengthMm.toFixed(0)} mm</span><br>
          <strong>Wire Diameter:</strong> <span class="unit">${wireDiameterMm} mm</span><br>
          <strong>Wattage:</strong> <span class="unit">${wattage} W</span>
      `;

      if (resistance !== null) {
          const voltage = Math.sqrt(wattage * resistance);
          const current = wattage / voltage;
          html += `<br><strong>Est. Resistance:</strong> <span class="unit">${resistance.toFixed(2)} Ω</span>`;
          html += `<br><strong>Est. Voltage:</strong> <span class="unit">${voltage.toFixed(2)} V</span>`;
          html += `<br><strong>Est. Current:</strong> <span class="unit">${current.toFixed(2)} A</span>`;
      }

      html += `<br><small style="color:#64748b;">💡 Cool &lt; 0.5 | Warm 0.5–1.5 | Hot &gt; 1.5 W/mm²</small>`;

     resultDiv.innerHTML = html;
 }

 function clearHeatFlux() {
     document.getElementById('hf-wire-type').value = 'kanthal';
     document.getElementById('hf-wire-gauge').value = '28';
     document.getElementById('hf-coil-diameter').value = '';
     document.getElementById('hf-number-of-wraps').value = '';
     document.getElementById('hf-wattage').value = '';
     document.getElementById('heat-flux-result').innerHTML = '';
     document.getElementById('heat-flux-bar').style.display = 'none';
 }

 // Auto-calculate on input change
function setupAutoCalculate() {
    const sections = ['ohms-law', 'battery-safety', 'coil-wrapping', 'e-liquid-mixer', 'heat-flux'];
}