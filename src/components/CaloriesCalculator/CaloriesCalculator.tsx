import React, { useState } from 'react';
import { Download, Calculator, Info, CheckCircle2, X, AlertCircle, ChevronDown, ChevronRight, Activity, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  BMR: 1,
  Sedentary: 1.2,
  Light: 1.375,
  Moderate: 1.55,
  Active: 1.725,
  "Very Active": 1.9,
  "Extra Active": 2.375
};

const MACRO_COLORS = {
  protein: "#3b82f6", // Blue
  carbs: "#f97316",   // Orange
  fat: "#10b981",     // Green
};

const CaloriesCalculator: React.FC = () => {
  // Input states
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [activity, setActivity] = useState<string>("Sedentary");
  
  // Unit toggles
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");

  // Output states
  const [showResults, setShowResults] = useState(false);
  const [tdee, setTdee] = useState<number | null>(null);
  const [showGain, setShowGain] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // PDF Export
  const [exportingPDF, setExportingPDF] = useState(false);

  const calculateResults = () => {
    const ageNum = Number(age);
    let weightKg = Number(weight);
    let heightCm = Number(height);

    if (weightUnit === "lb") weightKg = weightKg * 0.453592;
    if (heightUnit === "ft") {
      // height could be in format "5.9" for 5 ft 9 inches
      const parts = height.split(".");
      const ft = Number(parts[0]) || 0;
      const inch = Number(parts[1]) || 0;
      heightCm = (ft * 30.48) + (inch * 2.54);
    }

    if (!ageNum || ageNum < 15 || ageNum > 100 || !weightKg || weightKg < 20 || weightKg > 300 || !heightCm || heightCm < 50 || heightCm > 300) {
      alert("Please enter valid values. Age (15-100), Weight (20-300kg), Height (50-300cm).");
      return;
    }

    // Mifflin-St Jeor BMR
    let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * ageNum);
    bmr += (gender === "Male") ? 5 : -161;

    let calcTdee = bmr;
    if (activity !== "BMR") {
      calcTdee = bmr * ACTIVITY_MULTIPLIERS[activity];
    }

    setTdee(calcTdee);
    setShowResults(true);
  };

  const handleExportPDF = async () => {
    setExportingPDF(true);
    try {
      const element = document.getElementById("calories-report-content");
      if (!element) return;

      const loadHtml2Pdf = () => new Promise((resolve) => {
        if ((window as any).html2pdf) return resolve((window as any).html2pdf);
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
        script.onload = () => resolve((window as any).html2pdf);
        document.body.appendChild(script);
      });

      const html2pdf: any = await loadHtml2Pdf();

      const opt = {
        margin: 10,
        filename: 'calories_report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      setExportingPDF(false);
    }
  };

  const formatNum = (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const getMacros = (calories: number) => {
    return {
      protein: (calories * 0.3) / 4,
      carbs: (calories * 0.4) / 4,
      fat: (calories * 0.3) / 9
    };
  };

  const renderMacroBreakdown = (calories: number) => {
    const macros = getMacros(calories);
    const data = [
      { name: 'Protein', value: macros.protein, color: MACRO_COLORS.protein },
      { name: 'Carbs', value: macros.carbs, color: MACRO_COLORS.carbs },
      { name: 'Fat', value: macros.fat, color: MACRO_COLORS.fat }
    ];

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "24px", padding: "16px", background: "rgba(0,0,0,0.02)", borderRadius: "12px", marginTop: "12px" }}>
        <div style={{ width: "120px", height: "120px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value.toFixed(1)}g`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "4px" }}>Recommended Macros (30/40/30)</div>
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: MACRO_COLORS.protein }} />
              <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>Protein (30%)</span>
            </div>
            <span style={{ fontWeight: 800 }}>{macros.protein.toFixed(0)}g</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: MACRO_COLORS.carbs }} />
              <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>Carbs (40%)</span>
            </div>
            <span style={{ fontWeight: 800 }}>{macros.carbs.toFixed(0)}g</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: MACRO_COLORS.fat }} />
              <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>Fat (30%)</span>
            </div>
            <span style={{ fontWeight: 800 }}>{macros.fat.toFixed(0)}g</span>
          </div>
        </div>
      </div>
    );
  };

  const renderCard = (title: string, subtext: string, value: number, isMaintain: boolean, id: string) => {
    if (!tdee) return null;
    const percentage = Math.round((value / tdee) * 100);
    const bgColor = isMaintain ? "#dcfce7" : "#ffedd5"; // Light green vs Light orange/peach
    const borderColor = "#f97316"; // Orange/red border
    const isExpanded = expandedCard === id;

    return (
      <div 
        key={id} 
        style={{ 
          border: `1px solid ${borderColor}`, 
          borderRadius: "16px", 
          marginBottom: "16px", 
          overflow: "hidden",
          cursor: "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
          boxShadow: isExpanded ? "0 4px 12px rgba(249, 115, 22, 0.15)" : "0 2px 4px rgba(0,0,0,0.02)"
        }}
        onClick={() => setExpandedCard(isExpanded ? null : id)}
        onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
        onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
      >
        <div style={{ display: "flex", minHeight: "80px", position: "relative" }}>
          
          {/* Left Side */}
          <div style={{ flex: 1, background: "#fff", padding: "16px 20px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)" }}>{title}</h4>
              {isMaintain && <CheckCircle2 size={18} color="#10b981" />}
            </div>
            {subtext && <p style={{ margin: "4px 0 0 0", fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 500 }}>{subtext}</p>}
          </div>

          {/* Arrow Divider */}
          <div style={{
             position: "absolute",
             left: "50%",
             top: "50%",
             transform: "translate(-50%, -50%)",
             width: 0,
             height: 0,
             borderTop: "15px solid transparent",
             borderBottom: "15px solid transparent",
             borderLeft: "15px solid #fff",
             zIndex: 10
          }} />

          {/* Right Side */}
          <div style={{ flex: 1, background: bgColor, padding: "16px 20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.5px" }}>{formatNum(value)}</span>
              <span style={{ background: "rgba(0,0,0,0.06)", padding: "2px 6px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-primary)" }}>{percentage}%</span>
            </div>
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 600, marginTop: "2px" }}>Calories/day</span>
          </div>
        </div>

        {/* Expanded Macro Breakdown */}
        {isExpanded && (
          <div style={{ padding: "0 20px 20px 20px", background: "#fff", borderTop: "1px dashed var(--border-color)" }}>
            {renderMacroBreakdown(value)}
          </div>
        )}
      </div>
    );
  };

  if (showResults && tdee) {
    return (
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 32px", background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button 
              onClick={() => setShowResults(false)}
              style={{ background: "var(--bg-hover)", border: "none", width: "40px", height: "40px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-primary)" }}
            >
              <ChevronRight size={20} style={{ transform: "rotate(180deg)" }} />
            </button>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>Calories Result</h3>
          </div>
          <button 
            onClick={handleExportPDF}
            disabled={exportingPDF}
            style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--primary)", color: "white", border: "none", padding: "10px 16px", borderRadius: "10px", fontWeight: 600, fontSize: "0.9rem", cursor: exportingPDF ? "not-allowed" : "pointer", opacity: exportingPDF ? 0.7 : 1 }}
          >
            <Download size={18} />
            {exportingPDF ? "Exporting..." : "Download PDF"}
          </button>
        </div>

        {/* Report Content */}
        <div id="calories-report-content" style={{ padding: "32px", maxWidth: "700px", margin: "0 auto", background: "var(--bg-card)" }}>
          <p style={{ textAlign: "center", fontSize: "1.1rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "32px" }}>
            The results show a number of daily calorie estimates.
          </p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {renderCard("Maintain weight", "", tdee, true, "maintain")}
            {renderCard("Mild weight loss", "0.25 kg/week", tdee - 250, false, "mild_loss")}
            {renderCard("Weight loss", "0.5 kg/week", tdee - 500, false, "loss")}
            {renderCard("Extreme weight loss", "1 kg/week", tdee - 1000, false, "extreme_loss")}
            
            <button 
              onClick={() => setShowGain(!showGain)}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "transparent", border: "none", color: "var(--primary)", fontWeight: 700, fontSize: "1rem", cursor: "pointer", padding: "16px", marginTop: "8px", transition: "all 0.2s", borderRadius: "12px" }}
              onMouseOver={e => e.currentTarget.style.background = "var(--bg-hover)"}
              onMouseOut={e => e.currentTarget.style.background = "transparent"}
            >
              Show info for weight gain
              <ChevronDown size={20} style={{ transform: showGain ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }} />
            </button>

            {showGain && (
              <div style={{ marginTop: "16px", animation: "fadeIn 0.3s ease-out" }}>
                {renderCard("Mild weight gain", "0.25 kg/week", tdee + 250, false, "mild_gain")}
                {renderCard("Weight gain", "0.5 kg/week", tdee + 500, false, "gain")}
                {renderCard("Extreme weight gain", "1 kg/week", tdee + 1000, false, "extreme_gain")}
              </div>
            )}
          </div>

          <div style={{ marginTop: "40px", padding: "20px", background: "rgba(249, 115, 22, 0.05)", borderRadius: "12px", border: "1px solid rgba(249, 115, 22, 0.1)", display: "flex", gap: "12px" }}>
            <AlertCircle color="#f97316" size={24} style={{ flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              <strong>Disclaimer:</strong> This is an estimate based on standard formulas (Mifflin-St Jeor) and is not medical advice. Consult a nutritionist or doctor for personalized plans, especially if you have health conditions.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 32px", background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ background: "rgba(249, 115, 22, 0.1)", color: "#f97316", padding: "12px", borderRadius: "12px" }}>
            <Zap size={24} />
          </div>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>Calories Calculator</h3>
        </div>
      </div>

      {/* Form Content */}
      <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px", maxWidth: "600px" }}>
        
        {/* Activity Level */}
        <div>
          <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>Activity Level</label>
          <div style={{ position: "relative" }}>
            <select 
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              style={{ width: "100%", padding: "14px 16px", borderRadius: "12px", border: "1px solid var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)", fontSize: "0.95rem", outline: "none", appearance: "none", cursor: "pointer", fontWeight: 500 }}
            >
              <option value="BMR">Basal Metabolic Rate (BMR)</option>
              <option value="Sedentary">Sedentary: little or no exercise</option>
              <option value="Light">Light: exercise 1-3 times/week</option>
              <option value="Moderate">Moderate: exercise 4-5 times/week</option>
              <option value="Active">Active: daily exercise or intense exercise 3-4 times/week</option>
              <option value="Very Active">Very Active: intense exercise 6-7 times/week</option>
              <option value="Extra Active">Extra Active: very intense exercise daily, or physical job</option>
            </select>
            <ChevronDown size={18} color="var(--text-muted)" style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
          </div>
        </div>

        {/* Gender Toggle */}
        <div>
          <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>Gender</label>
          <div style={{ display: "flex", gap: "12px", background: "var(--bg-secondary)", padding: "6px", borderRadius: "14px", border: "1px solid var(--border-color)" }}>
            {(["Male", "Female"] as const).map(g => (
              <button
                key={g}
                onClick={() => setGender(g)}
                style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "none", background: gender === g ? "var(--bg-card)" : "transparent", color: gender === g ? "var(--text-primary)" : "var(--text-secondary)", fontWeight: gender === g ? 700 : 500, cursor: "pointer", boxShadow: gender === g ? "0 2px 8px rgba(0,0,0,0.05)" : "none", transition: "all 0.2s" }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          {/* Age */}
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>Age (years)</label>
            <input 
              type="number" 
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g. 25"
              style={{ width: "100%", padding: "14px 16px", borderRadius: "12px", border: "1px solid var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }}
            />
            {Number(age) > 0 && Number(age) < 18 && (
              <span style={{ fontSize: "0.75rem", color: "#f97316", display: "block", marginTop: "6px", fontWeight: 500 }}>* Results may be less accurate for growing teens.</span>
            )}
          </div>

          {/* Weight */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>Weight</label>
              <div style={{ display: "flex", background: "var(--bg-secondary)", borderRadius: "6px", border: "1px solid var(--border-color)", overflow: "hidden" }}>
                <button onClick={() => setWeightUnit("kg")} style={{ border: "none", padding: "4px 8px", fontSize: "0.75rem", fontWeight: 600, background: weightUnit === "kg" ? "var(--border-color)" : "transparent", color: weightUnit === "kg" ? "var(--text-primary)" : "var(--text-muted)", cursor: "pointer" }}>kg</button>
                <button onClick={() => setWeightUnit("lb")} style={{ border: "none", padding: "4px 8px", fontSize: "0.75rem", fontWeight: 600, background: weightUnit === "lb" ? "var(--border-color)" : "transparent", color: weightUnit === "lb" ? "var(--text-primary)" : "var(--text-muted)", cursor: "pointer" }}>lb</button>
              </div>
            </div>
            <input 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={`e.g. ${weightUnit === "kg" ? "70" : "154"}`}
              style={{ width: "100%", padding: "14px 16px", borderRadius: "12px", border: "1px solid var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }}
            />
          </div>
        </div>

        {/* Height */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <label style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>Height</label>
            <div style={{ display: "flex", background: "var(--bg-secondary)", borderRadius: "6px", border: "1px solid var(--border-color)", overflow: "hidden" }}>
              <button onClick={() => setHeightUnit("cm")} style={{ border: "none", padding: "4px 8px", fontSize: "0.75rem", fontWeight: 600, background: heightUnit === "cm" ? "var(--border-color)" : "transparent", color: heightUnit === "cm" ? "var(--text-primary)" : "var(--text-muted)", cursor: "pointer" }}>cm</button>
              <button onClick={() => setHeightUnit("ft")} style={{ border: "none", padding: "4px 8px", fontSize: "0.75rem", fontWeight: 600, background: heightUnit === "ft" ? "var(--border-color)" : "transparent", color: heightUnit === "ft" ? "var(--text-primary)" : "var(--text-muted)", cursor: "pointer" }}>ft/in</button>
            </div>
          </div>
          <input 
            type={heightUnit === "cm" ? "number" : "text"}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder={heightUnit === "cm" ? "e.g. 175" : "e.g. 5.9 (5 ft 9 in)"}
            style={{ width: "100%", padding: "14px 16px", borderRadius: "12px", border: "1px solid var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }}
          />
        </div>

        {/* Action Button */}
        <button 
          onClick={calculateResults}
          style={{ background: "var(--primary)", color: "white", padding: "16px", borderRadius: "12px", border: "none", fontSize: "1.05rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "8px", boxShadow: "0 4px 12px rgba(99, 102, 241, 0.2)" }}
        >
          <Calculator size={20} />
          Calculate
        </button>

      </div>
    </div>
  );
};

export default CaloriesCalculator;
