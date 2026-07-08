import React, { useState } from 'react';
import { Download, Calculator, Info, CheckCircle2, X, AlertCircle } from 'lucide-react';

const BMICalculator: React.FC = () => {
  // Input states
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [age, setAge] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [bodyFat, setBodyFat] = useState<number | "">("");

  // Toggles
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
  // For ft/in inputs
  const [heightFt, setHeightFt] = useState<number | "">("");
  const [heightIn, setHeightIn] = useState<number | "">("");

  // Modal states
  const [showEstimator, setShowEstimator] = useState(false);
  const [waist, setWaist] = useState<number | "">("");
  const [neck, setNeck] = useState<number | "">("");
  const [hip, setHip] = useState<number | "">("");
  const [estimatorError, setEstimatorError] = useState("");
  const [estimatedBf, setEstimatedBf] = useState<number | null>(null);

  // Result states
  const [report, setReport] = useState<any>(null);
  const [useAsianCutoff, setUseAsianCutoff] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleEstimateBF = () => {
    setEstimatorError("");
    setEstimatedBf(null);
    if (!waist || !neck || (gender === "Female" && !hip)) {
      setEstimatorError("Please fill all required measurements.");
      return;
    }
    if (neck >= waist) {
      setEstimatorError("Neck circumference must be less than waist circumference.");
      return;
    }

    let hCm = 0;
    if (heightUnit === "cm") {
      hCm = Number(height);
    } else {
      hCm = (Number(heightFt) * 30.48) + (Number(heightIn) * 2.54);
    }

    if (!hCm || hCm <= 0) {
      setEstimatorError("Please enter your height in the main form first.");
      return;
    }

    const w = Number(waist);
    const n = Number(neck);
    const h = Number(hip);

    let bf = 0;
    if (gender === "Male") {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(hCm)) - 450;
    } else {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(w + h - n) + 0.22100 * Math.log10(hCm)) - 450;
    }

    if (isNaN(bf) || bf < 2 || bf > 70) {
      setEstimatorError("Calculation resulted in out of range value. Check your inputs.");
      return;
    }

    setEstimatedBf(Math.round(bf * 10) / 10);
  };

  const applyEstimation = () => {
    if (estimatedBf !== null) {
      setBodyFat(estimatedBf);
      setShowEstimator(false);
    }
  };

  const handleCalculate = () => {
    setValidationError("");
    if (!bodyFat) {
      setValidationError("Please enter your Body Fat % or use the estimator.");
      return;
    }
    if (!age || Number(age) < 18 || Number(age) > 100) {
      setValidationError("Age must be between 18 and 100. Standard BMI categories do not apply to children or teens.");
      return;
    }
    
    let wKg = weightUnit === "kg" ? Number(weight) : Number(weight) * 0.453592;
    let hCm = heightUnit === "cm" ? Number(height) : (Number(heightFt) * 30.48) + (Number(heightIn) * 2.54);

    if (!wKg || wKg < 20 || wKg > 300) {
      setValidationError("Please enter a valid weight (20-300 kg).");
      return;
    }
    if (!hCm || hCm < 100 || hCm > 250) {
      setValidationError("Please enter a valid height (100-250 cm).");
      return;
    }

    const hM = hCm / 100;
    const bmiVal = wKg / (hM * hM);
    const bmi = Math.round(bmiVal * 10) / 10;

    let bmiCategory = "";
    let bmiColor = "";
    if (useAsianCutoff) {
      if (bmi < 18.5) { bmiCategory = "Underweight"; bmiColor = "#3b82f6"; }
      else if (bmi < 23) { bmiCategory = "Normal"; bmiColor = "#22c55e"; }
      else if (bmi < 25) { bmiCategory = "Overweight"; bmiColor = "#eab308"; }
      else { bmiCategory = "Obese"; bmiColor = "#ef4444"; }
    } else {
      if (bmi < 16) { bmiCategory = "Severe Thinness"; bmiColor = "#1d4ed8"; }
      else if (bmi < 17) { bmiCategory = "Moderate Thinness"; bmiColor = "#3b82f6"; }
      else if (bmi < 18.5) { bmiCategory = "Mild Thinness"; bmiColor = "#38bdf8"; }
      else if (bmi < 25) { bmiCategory = "Normal"; bmiColor = "#22c55e"; }
      else if (bmi < 30) { bmiCategory = "Overweight"; bmiColor = "#eab308"; }
      else if (bmi < 35) { bmiCategory = "Obese Class I"; bmiColor = "#f97316"; }
      else if (bmi < 40) { bmiCategory = "Obese Class II"; bmiColor = "#ef4444"; }
      else { bmiCategory = "Obese Class III"; bmiColor = "#dc2626"; }
    }

    let bfCategory = "";
    let bfColor = "";
    if (bodyFat) {
      const bf = Number(bodyFat);
      if (gender === "Male") {
        if (bf < 2) bfCategory = "Too Low";
        else if (bf <= 5) { bfCategory = "Essential Fat"; bfColor = "#3b82f6"; }
        else if (bf <= 13) { bfCategory = "Athletes"; bfColor = "#10b981"; }
        else if (bf <= 17) { bfCategory = "Fitness"; bfColor = "#84cc16"; }
        else if (bf <= 24) { bfCategory = "Average"; bfColor = "#f59e0b"; }
        else { bfCategory = "Obese"; bfColor = "#ef4444"; }
      } else {
        if (bf < 10) bfCategory = "Too Low";
        else if (bf <= 13) { bfCategory = "Essential Fat"; bfColor = "#3b82f6"; }
        else if (bf <= 20) { bfCategory = "Athletes"; bfColor = "#10b981"; }
        else if (bf <= 24) { bfCategory = "Fitness"; bfColor = "#84cc16"; }
        else if (bf <= 31) { bfCategory = "Average"; bfColor = "#f59e0b"; }
        else { bfCategory = "Obese"; bfColor = "#ef4444"; }
      }
      if (!bfColor) bfColor = "#ef4444";
    }

    const minWeight = 18.5 * (hM * hM);
    const maxWeight = (useAsianCutoff ? 22.9 : 24.9) * (hM * hM);
    
    let minWDisp = weightUnit === "kg" ? minWeight : minWeight * 2.20462;
    let maxWDisp = weightUnit === "kg" ? maxWeight : maxWeight * 2.20462;

    setReport({
      bmi,
      bmiCategory,
      bmiColor,
      bodyFat: bodyFat ? Number(bodyFat) : null,
      bfCategory,
      bfColor,
      idealMin: Math.round(minWDisp * 10) / 10,
      idealMax: Math.round(maxWDisp * 10) / 10,
      unit: weightUnit
    });
  };

  const downloadReport = () => {
    const element = document.getElementById('bmi-report-content');
    if (!element) return;
    const loadHtml2Pdf = () => new Promise((resolve) => {
      if ((window as any).html2pdf) return resolve((window as any).html2pdf);
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      script.onload = () => resolve((window as any).html2pdf);
      document.body.appendChild(script);
    });
    loadHtml2Pdf().then((html2pdf: any) => {
      html2pdf().set({
        margin: 10, filename: 'Health_Monitor_Report.pdf', image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(element).save();
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Input Form Card */}
      <div className="gym-card" style={{ padding: "32px", border: "1px solid var(--border-color)", borderRadius: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', fontWeight: 700, marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <Calculator size={20} color="var(--primary)" /> Calculator Inputs
        </h3>

        {validationError && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px', borderRadius: '8px', color: '#dc2626', marginBottom: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} /> {validationError}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          
          {/* Gender */}
          <div>
            <label className="form-label" style={{ fontWeight: 600 }}>Gender</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setGender("Male")} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `2px solid ${gender === "Male" ? "var(--primary)" : "var(--border-color)"}`, background: gender === "Male" ? "rgba(99, 102, 241, 0.1)" : "var(--bg-secondary)", color: gender === "Male" ? "var(--primary)" : "var(--text-primary)", fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>Male</button>
              <button onClick={() => setGender("Female")} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `2px solid ${gender === "Female" ? "var(--primary)" : "var(--border-color)"}`, background: gender === "Female" ? "rgba(99, 102, 241, 0.1)" : "var(--bg-secondary)", color: gender === "Female" ? "var(--primary)" : "var(--text-primary)", fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>Female</button>
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="form-label" style={{ fontWeight: 600 }}>Age (years)</label>
            <input type="number" min="18" max="100" className="form-input" placeholder="e.g. 25" value={age} onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")} style={{ background: 'var(--bg-secondary)' }} />
          </div>

          {/* Weight */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label className="form-label" style={{ fontWeight: 600 }}>Weight</label>
              <div style={{ fontSize: '0.8rem', display: 'flex', gap: '4px', cursor: 'pointer' }}>
                <span onClick={() => setWeightUnit("kg")} style={{ fontWeight: weightUnit === "kg" ? 800 : 500, color: weightUnit === "kg" ? "var(--primary)" : "var(--text-muted)" }}>kg</span>
                <span style={{ color: "var(--border-color)" }}>|</span>
                <span onClick={() => setWeightUnit("lb")} style={{ fontWeight: weightUnit === "lb" ? 800 : 500, color: weightUnit === "lb" ? "var(--primary)" : "var(--text-muted)" }}>lb</span>
              </div>
            </div>
            <input type="number" min="0" className="form-input" placeholder={weightUnit === "kg" ? "e.g. 70" : "e.g. 154"} value={weight} onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : "")} style={{ background: 'var(--bg-secondary)' }} />
          </div>

          {/* Height */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label className="form-label" style={{ fontWeight: 600 }}>Height</label>
              <div style={{ fontSize: '0.8rem', display: 'flex', gap: '4px', cursor: 'pointer' }}>
                <span onClick={() => setHeightUnit("cm")} style={{ fontWeight: heightUnit === "cm" ? 800 : 500, color: heightUnit === "cm" ? "var(--primary)" : "var(--text-muted)" }}>cm</span>
                <span style={{ color: "var(--border-color)" }}>|</span>
                <span onClick={() => setHeightUnit("ft")} style={{ fontWeight: heightUnit === "ft" ? 800 : 500, color: heightUnit === "ft" ? "var(--primary)" : "var(--text-muted)" }}>ft/in</span>
              </div>
            </div>
            {heightUnit === "cm" ? (
              <input type="number" min="0" className="form-input" placeholder="e.g. 175" value={height} onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : "")} style={{ background: 'var(--bg-secondary)' }} />
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)', paddingRight: '12px' }}>
                  <input type="number" min="0" placeholder="ft" style={{ width: '100%', background: 'transparent', border: 'none', padding: '10px 12px', outline: 'none', color: 'var(--text-primary)' }} value={heightFt} onChange={e => setHeightFt(e.target.value ? Number(e.target.value) : "")} />
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>ft</span>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)', paddingRight: '12px' }}>
                  <input type="number" min="0" max="11" placeholder="in" style={{ width: '100%', background: 'transparent', border: 'none', padding: '10px 12px', outline: 'none', color: 'var(--text-primary)' }} value={heightIn} onChange={e => setHeightIn(e.target.value ? Number(e.target.value) : "")} />
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>in</span>
                </div>
              </div>
            )}
          </div>

          {/* Body Fat % */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label className="form-label" style={{ fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
              Body Fat % (Required)
              <span onClick={() => setShowEstimator(true)} style={{ color: 'var(--primary)', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 700 }}>
                I don't know my body fat %
              </span>
            </label>
            <input type="number" min="0" max="100" className="form-input" placeholder="e.g. 15" value={bodyFat} onChange={(e) => setBodyFat(e.target.value ? Number(e.target.value) : "")} style={{ background: 'var(--bg-secondary)', maxWidth: '240px' }} />
          </div>

          {/* Options */}
          <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" id="asian-cutoff" checked={useAsianCutoff} onChange={e => setUseAsianCutoff(e.target.checked)} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
            <label htmlFor="asian-cutoff" style={{ fontSize: '0.9rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>Use WHO Asian-specific BMI cutoffs (Normal &lt;23)</label>
          </div>
        </div>

        <button className="btn-blue" onClick={handleCalculate} style={{ marginTop: '24px', padding: '12px 24px', width: '100%', justifyContent: 'center', fontSize: '1rem' }}>
          Calculate Report
        </button>
      </div>

      {/* Estimator Modal */}
      {showEstimator && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setShowEstimator(false)}></div>
          <div className="gym-card" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '400px', padding: '24px', background: 'var(--bg-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Estimate Body Fat %</h3>
              <button onClick={() => setShowEstimator(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>
            
            <div style={{ marginBottom: '16px', padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <strong>Method:</strong> US Navy Body Fat Calculator.<br/>
              Pre-filled from main form:<br/>
              Gender: <strong>{gender}</strong> <br/>
              Height: <strong>{heightUnit === "cm" ? `${height} cm` : `${heightFt}'${heightIn}"`}</strong>
            </div>

            {estimatorError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '8px', borderRadius: '6px', color: '#dc2626', marginBottom: '16px', fontSize: '0.85rem' }}>
                {estimatorError}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label className="form-label">Neck circumference (cm)</label>
                <input type="number" min="0" className="form-input" value={neck} onChange={e => setNeck(e.target.value ? Number(e.target.value) : "")} />
              </div>
              <div>
                <label className="form-label">Waist circumference (cm)</label>
                <input type="number" min="0" className="form-input" placeholder="at narrowest point" value={waist} onChange={e => setWaist(e.target.value ? Number(e.target.value) : "")} />
              </div>
              {gender === "Female" && (
                <div>
                  <label className="form-label">Hip circumference (cm)</label>
                  <input type="number" min="0" className="form-input" placeholder="at widest point" value={hip} onChange={e => setHip(e.target.value ? Number(e.target.value) : "")} />
                </div>
              )}
            </div>

            {estimatedBf !== null ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', padding: '16px', borderRadius: '12px', textAlign: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Estimated Body Fat</span>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', margin: '4px 0' }}>{estimatedBf}%</div>
                <button className="btn-blue" onClick={applyEstimation} style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>OK, Got it</button>
              </div>
            ) : (
              <button className="btn-blue" onClick={handleEstimateBF} style={{ width: '100%', justifyContent: 'center' }}>Calculate Estimation</button>
            )}
          </div>
        </div>
      )}

      {/* Report Section */}
      {report && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-blue-outline" onClick={downloadReport} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Download size={16} /> Download Report as PDF
            </button>
          </div>

          <div id="bmi-report-content" className="gym-card" style={{ padding: "40px", border: "1px solid var(--border-color)", borderRadius: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", background: '#fff' }}>
            {/* Using #fff for pdf export clarity if body is dark, but normally would use var(--bg-card) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e5e7eb', paddingBottom: '20px', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, color: '#111827' }}>Health Report</h2>
              <img src="/logo.png" alt="Trainix" style={{ height: '40px', objectFit: 'contain' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '40px' }}>
              {/* BMI Widget */}
              <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 24px 0', color: '#111827' }}>BMI Result</h3>
                
                {/* Visual Gauge */}
                <div style={{ width: '100%', position: 'relative', marginBottom: '32px', padding: '0 10px' }}>
                  {/* Gauge Bar */}
                  <div style={{ display: 'flex', width: '100%', height: '24px', borderRadius: '0', overflow: 'hidden' }}>
                    {!useAsianCutoff ? (
                      <>
                        <div style={{ flex: 1, background: '#1d4ed8' }}></div>
                        <div style={{ flex: 1, background: '#3b82f6' }}></div>
                        <div style={{ flex: 1, background: '#38bdf8' }}></div>
                        <div style={{ flex: 4, background: '#22c55e' }}></div>
                        <div style={{ flex: 3, background: '#eab308' }}></div>
                        <div style={{ flex: 3, background: '#f97316' }}></div>
                        <div style={{ flex: 3, background: '#ef4444' }}></div>
                        <div style={{ flex: 1.5, background: '#dc2626' }}></div>
                      </>
                    ) : (
                      <>
                        <div style={{ flex: 2, background: '#3b82f6' }}></div>
                        <div style={{ flex: 3, background: '#22c55e' }}></div>
                        <div style={{ flex: 2, background: '#eab308' }}></div>
                        <div style={{ flex: 3, background: '#ef4444' }}></div>
                      </>
                    )}
                  </div>
                  
                  {/* Ticks */}
                  {!useAsianCutoff ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280', marginTop: '8px', padding: '0 5%' }}>
                      <span>16</span>
                      <span>17</span>
                      <span>18.5</span>
                      <span>25</span>
                      <span>30</span>
                      <span>35</span>
                      <span>40</span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280', marginTop: '8px', padding: '0 15%' }}>
                      <span>18.5</span>
                      <span>23</span>
                      <span>25</span>
                    </div>
                  )}

                  {/* Marker Pointer */}
                  <div style={{ 
                    position: 'absolute', 
                    left: `${!useAsianCutoff 
                      ? Math.min(95, Math.max(5, (report.bmi <= 16 ? 5 : report.bmi >= 40 ? 95 : 
                        report.bmi < 17 ? 5 + ((report.bmi - 16)/1) * 5 :
                        report.bmi < 18.5 ? 10 + ((report.bmi - 17)/1.5) * 5 :
                        report.bmi < 25 ? 15 + ((report.bmi - 18.5)/6.5) * 25 :
                        report.bmi < 30 ? 40 + ((report.bmi - 25)/5) * 15 :
                        report.bmi < 35 ? 55 + ((report.bmi - 30)/5) * 15 :
                        70 + ((report.bmi - 35)/5) * 20
                      ))) 
                      : Math.min(95, Math.max(5, (report.bmi < 18.5 ? 10 : report.bmi >= 25 ? 85 : 
                        report.bmi < 23 ? 20 + ((report.bmi - 18.5)/4.5) * 35 :
                        55 + ((report.bmi - 23)/2) * 20
                      )))}%`,
                    top: '-12px', 
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <div style={{ width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '12px solid #4b5563' }}></div>
                  </div>
                </div>

                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <span style={{ fontSize: '1rem', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Your BMI is...</span>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111827', lineHeight: 1 }}>{report.bmi.toFixed(2)}<span style={{ fontSize: '1.2rem', fontWeight: 700 }}>kg/m2</span></div>
                  <div style={{ color: report.bmiColor, fontWeight: 600, fontSize: '1.1rem', marginTop: '8px' }}>{report.bmiCategory}</div>
                </div>

                {/* BMI Table */}
                <div style={{ width: '100%', background: '#fff', border: '1px solid #f3f4f6', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                  <h4 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 600, color: '#111827' }}>BMI table for adults</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#111827', fontWeight: 600, marginBottom: '12px', fontSize: '0.9rem' }}>
                    <span>Category</span>
                    <span>BMI range -kg/m2</span>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                    {!useAsianCutoff ? (
                      [
                        { label: "Severe Thinness", range: "<16" },
                        { label: "Moderate Thinness", range: "16-17" },
                        { label: "Mild Thinness", range: "17-18.5" },
                        { label: "Normal", range: "18.5-25" },
                        { label: "Overweight", range: "25-30" },
                        { label: "Obese Class I", range: "30-35" },
                        { label: "Obese Class II", range: "35-40" },
                        { label: "Obese Class III", range: ">40" }
                      ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: report.bmiCategory === item.label ? report.bmiColor : '#374151' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {report.bmiCategory === item.label ? <div style={{ width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: `6px solid ${report.bmiColor}` }}></div> : <div style={{ width: '6px' }}></div>}
                            {item.label}
                          </span>
                          <span>{item.range}</span>
                        </div>
                      ))
                    ) : (
                      [
                        { label: "Underweight", range: "<18.5" },
                        { label: "Normal", range: "18.5-23" },
                        { label: "Overweight", range: "23-25" },
                        { label: "Obese", range: "≥25" }
                      ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: report.bmiCategory === item.label ? report.bmiColor : '#374151' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {report.bmiCategory === item.label ? <div style={{ width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: `6px solid ${report.bmiColor}` }}></div> : <div style={{ width: '6px' }}></div>}
                            {item.label}
                          </span>
                          <span>{item.range}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Body Fat Widget */}
              <div style={{ background: '#f9fafb', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Body Fat %</span>
                {report.bodyFat !== null ? (
                  <>
                    <div style={{ fontSize: '3.5rem', fontWeight: 900, color: report.bfColor, lineHeight: 1 }}>{report.bodyFat}<span style={{ fontSize: '1.5rem' }}>%</span></div>
                    <div style={{ background: `${report.bfColor}20`, color: report.bfColor, padding: '4px 12px', borderRadius: '20px', fontWeight: 800, fontSize: '0.9rem', marginTop: '12px' }}>{report.bfCategory}</div>
                  </>
                ) : (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                    <Info size={32} style={{ marginBottom: '8px' }} />
                    <span style={{ fontSize: '0.9rem' }}>Not Provided</span>
                  </div>
                )}
              </div>
            </div>

            {/* Ideal Weight */}
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <div style={{ background: '#10b981', color: 'white', padding: '12px', borderRadius: '50%' }}>
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#065f46', fontWeight: 800 }}>Ideal Weight Range</h4>
                <p style={{ margin: '4px 0 0', color: '#047857', fontSize: '0.95rem' }}>Based on your height, your healthy weight range is <strong>{report.idealMin} {report.unit} — {report.idealMax} {report.unit}</strong>.</p>
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.5, borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
              <strong>Disclaimer:</strong> BMI and body fat estimates provided by this calculator are for informational purposes only and do not constitute a medical diagnosis. The standard BMI categories are intended for adults (18+). For a comprehensive health assessment, please consult a healthcare professional.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
