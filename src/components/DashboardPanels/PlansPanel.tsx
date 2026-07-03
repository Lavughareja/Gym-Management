import React, { useState } from "react";
import { Plus, X, Loader } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { createPlanAction, deletePlanAction } from "../../redux/actions/planActions";

interface Props {
  gymName: string;
}

const overlayStyle: React.CSSProperties = {
  position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1000,
  display: "flex", alignItems: "center", justifyContent: "center", padding: 20
};

const PlansPanel: React.FC<Props> = ({ gymName }) => {
  const dispatch = useAppDispatch();
  const { plans, loading } = useAppSelector((state) => state.plan);

  const [showAddPlan, setShowAddPlan] = useState(false);
  const [newPlan, setNewPlan] = useState({ name: "", level: "", basePrice: "", durationMonths: "1", features: "" });
  const [addingPlan, setAddingPlan] = useState(false);

  const handleCreatePlan = async () => {
    if (!newPlan.name || !newPlan.level || !newPlan.basePrice) return;
    setAddingPlan(true);
    const success = await dispatch(createPlanAction({
      name: newPlan.name,
      level: newPlan.level,
      basePrice: Number(newPlan.basePrice),
      durationMonths: Number(newPlan.durationMonths) || 1,
      features: newPlan.features.split(',').map(f => f.trim()).filter(f => f)
    }));
    setAddingPlan(false);
    if (success) {
      setShowAddPlan(false);
      setNewPlan({ name: "", level: "", basePrice: "", durationMonths: "1", features: "" });
    }
  };

  return (
    <div className="page-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 className="page-title">Membership Plans</h2>
          <p className="page-subtitle">Plans currently active at {gymName}.</p>
        </div>
        <button className="btn-blue" onClick={() => setShowAddPlan(true)}>
          <Plus size={16} /> Add Plan
        </button>
      </div>

      {showAddPlan && (
        <div style={overlayStyle}>
          <div className="gym-card" style={{ maxWidth: 440, width: "100%", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Add New Plan</h3>
              <button onClick={() => setShowAddPlan(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label className="form-label">Plan Name</label>
                <input type="text" value={newPlan.name} onChange={e => setNewPlan({ ...newPlan, name: e.target.value })} placeholder="e.g. Gold Plan" className="form-input" />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Level</label>
                  <input type="text" value={newPlan.level} onChange={e => setNewPlan({ ...newPlan, level: e.target.value })} placeholder="e.g. Advanced" className="form-input" />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Base Price</label>
                  <input type="number" value={newPlan.basePrice} onChange={e => setNewPlan({ ...newPlan, basePrice: e.target.value })} placeholder="e.g. 1999" className="form-input" />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Duration</label>
                  <select value={newPlan.durationMonths} onChange={e => setNewPlan({ ...newPlan, durationMonths: e.target.value })} className="form-input">
                    <option value="1">1 Month</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                    <option value="12">12 Months</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label">Features (comma separated)</label>
                <textarea
                  value={newPlan.features}
                  onChange={e => setNewPlan({ ...newPlan, features: e.target.value })}
                  placeholder="BMI Report, Personal Trainer..."
                  className="form-input"
                  rows={3}
                  style={{ resize: "vertical", fontFamily: "inherit" }}
                />
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button className="btn-blue" style={{ flex: 1, justifyContent: "center" }}
                  disabled={addingPlan}
                  onClick={handleCreatePlan}>
                  {addingPlan ? <Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> : "Create Plan"}
                </button>
                <button className="btn-blue-outline" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowAddPlan(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}><Loader size={32} style={{ animation: "spin 1s linear infinite", color: "var(--primary)" }} /></div>
      ) : plans.length === 0 ? (
        <p style={{ color: "var(--text-muted)" }}>No plans created yet. Add one to get started!</p>
      ) : (
        <div className="pricing-grid">
          {plans.map((p: any) => (
            <div key={p._id || p.id} className="gym-card pricing-card" style={{ borderTop: `3px solid var(--primary)` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 className="plan-name">{p.name}</h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Level: {p.level}</p>
                </div>
                <button style={{ background: "none", border: "none", color: "var(--danger)", cursor: "pointer" }} onClick={() => {
                  if (window.confirm("Delete this plan?")) {
                    dispatch(deletePlanAction(p._id || p.id));
                  }
                }}>
                  <X size={16} />
                </button>
              </div>
              <div className="plan-price-wrapper">
                <span className="plan-price" style={{ color: "var(--primary)" }}>₹{p.basePrice}</span>
                <span className="plan-period">/ {p.durationMonths} month(s)</span>
              </div>
              <ul style={{ paddingLeft: 20, fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: 10 }}>
                {p.features?.map((f: string, i: number) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlansPanel;
