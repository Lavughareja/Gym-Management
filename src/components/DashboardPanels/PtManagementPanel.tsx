import React, { useState, useEffect } from "react";
import {
  UserCheck, Users, Plus, ChevronLeft, Trash2, Calendar,
  Dumbbell, Salad, Ruler, X, Loader, ChevronDown, ChevronUp, UserMinus, Mail, Eye
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import {
  fetchAllPtAssignmentsAction,
  fetchMyPtMembersAction,
  assignPtAction,
  removePtAssignmentAction,
  fetchPtWorkoutPlansAction,
  createPtWorkoutPlanAction,
  deletePtWorkoutPlanAction,
  fetchPtDietPlansAction,
  createPtDietPlanAction,
  deletePtDietPlanAction,
  fetchPtMeasurementsAction,
  createPtMeasurementAction,
  deletePtMeasurementAction,
  clearMemberPtData,
} from "../../redux/actions/ptActions";

interface Props {
  role: string;
  userId?: string;
}

const TODAY = new Date().toISOString().split("T")[0];

const MEAL_TYPES = ["Breakfast", "Morning Snack", "Lunch", "Evening Snack", "Dinner", "Bedtime"];

// ─── Small reusable overlay ────────────────────────────────────────────────
const Overlay: React.FC<{ onClose: () => void; children: React.ReactNode }> = ({ onClose, children }) => (
  <div style={{
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 1100,
    display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
  }} onClick={onClose}>
    <div onClick={e => e.stopPropagation()} style={{
      background: "var(--bg-card)", borderRadius: 16, padding: 28,
      width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto",
      boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
    }}>
      {children}
    </div>
  </div>
);

// ─── Confirmation Modal for Self Assignment ──────────────────────────────────
const ConfirmSelfAssignModal: React.FC<{
  member: any;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}> = ({ member, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
    onClose();
  };

  return (
    <Overlay onClose={onClose}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Confirm Assignment</h3>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
      </div>

      <div style={{ padding: "16px", background: "rgba(99,102,241,0.08)", borderRadius: 12, border: "1.5px solid rgba(99,102,241,0.2)", marginBottom: 24 }}>
        <p style={{ margin: 0, fontSize: 15, color: "var(--text-primary)", lineHeight: 1.5 }}>
          You will be assigned as the Personal Trainer for <strong>{member.name || member.fullName}</strong>.
        </p>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={onClose} disabled={loading} style={{ flex: 1, padding: "12px", borderRadius: 10, border: "1.5px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Cancel</button>
        <button onClick={handleConfirm} disabled={loading} style={{ flex: 1, padding: "12px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {loading ? <Loader size={16} className="spin" /> : <UserCheck size={16} />}
          {loading ? "Assigning..." : "Assign to Me"}
        </button>
      </div>
    </Overlay>
  );
};


// ─── Workout Plan Form ─────────────────────────────────────────────────────
const WorkoutPlanForm: React.FC<{
  memberId: string; date: string;
  onSave: (data: any) => Promise<boolean>;
  onClose: () => void;
}> = ({ memberId, date, onSave, onClose }) => {
  const [exercises, setExercises] = useState([{ name: "", sets: 3, reps: "10", weight: "", notes: "" }]);
  const [generalNotes, setGeneralNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const addExercise = () => setExercises([...exercises, { name: "", sets: 3, reps: "10", weight: "", notes: "" }]);
  const removeExercise = (i: number) => setExercises(exercises.filter((_, idx) => idx !== i));
  const updateExercise = (i: number, field: string, val: any) => {
    const updated = [...exercises];
    updated[i] = { ...updated[i], [field]: val };
    setExercises(updated);
  };

  const handleSubmit = async () => {
    const valid = exercises.every(e => e.name.trim());
    if (!valid) return;
    setLoading(true);
    const ok = await onSave({ memberId, date, exercises, generalNotes });
    setLoading(false);
    if (ok) onClose();
  };

  return (
    <Overlay onClose={onClose}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
          <Dumbbell size={20} color="#6366f1" /> Add Workout Plan — {date}
        </h3>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
      </div>

      {exercises.map((ex, i) => (
        <div key={i} style={{ background: "var(--bg-hover)", borderRadius: 10, padding: 14, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontWeight: 600, fontSize: 13, color: "var(--text-muted)" }}>Exercise {i + 1}</span>
            {exercises.length > 1 && (
              <button onClick={() => removeExercise(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#f87171" }}><X size={16} /></button>
            )}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", gap: 8, marginBottom: 8 }}>
            <input placeholder="Exercise name *" value={ex.name} onChange={e => updateExercise(i, "name", e.target.value)}
              style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)", fontSize: 13 }} />
            <input type="number" placeholder="Sets" value={ex.sets} onChange={e => updateExercise(i, "sets", Number(e.target.value))}
              style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)", fontSize: 13 }} />
            <input placeholder="Reps" value={ex.reps} onChange={e => updateExercise(i, "reps", e.target.value)}
              style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)", fontSize: 13 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <input placeholder="Weight (e.g. 20kg)" value={ex.weight} onChange={e => updateExercise(i, "weight", e.target.value)}
              style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)", fontSize: 13 }} />
            <input placeholder="Notes" value={ex.notes} onChange={e => updateExercise(i, "notes", e.target.value)}
              style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)", fontSize: 13 }} />
          </div>
        </div>
      ))}

      <button onClick={addExercise} style={{
        width: "100%", padding: "10px", borderRadius: 10, border: "2px dashed var(--border-color)",
        background: "none", color: "var(--text-muted)", cursor: "pointer", marginBottom: 14, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 6
      }}>
        <Plus size={16} /> Add Another Exercise
      </button>

      <textarea placeholder="General notes (optional)" value={generalNotes} onChange={e => setGeneralNotes(e.target.value)}
        rows={2} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)", fontSize: 13, resize: "vertical", marginBottom: 14, boxSizing: "border-box" }} />

      <button onClick={handleSubmit} disabled={loading}
        style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        {loading ? <Loader size={18} className="spin" /> : <Dumbbell size={18} />}
        {loading ? "Saving..." : "Save Workout Plan"}
      </button>
    </Overlay>
  );
};

// ─── Diet Plan Form ────────────────────────────────────────────────────────
const DietPlanForm: React.FC<{
  memberId: string; date: string;
  onSave: (data: any) => Promise<boolean>;
  onClose: () => void;
}> = ({ memberId, date, onSave, onClose }) => {
  const [meals, setMeals] = useState([{ mealType: "Breakfast", foodItems: "", calories: "", notes: "" }]);
  const [waterIntake, setWaterIntake] = useState("");
  const [generalNotes, setGeneralNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const addMeal = () => setMeals([...meals, { mealType: "Lunch", foodItems: "", calories: "", notes: "" }]);
  const removeMeal = (i: number) => setMeals(meals.filter((_, idx) => idx !== i));
  const updateMeal = (i: number, field: string, val: string) => {
    const updated = [...meals];
    updated[i] = { ...updated[i], [field]: val };
    setMeals(updated);
  };

  const handleSubmit = async () => {
    const valid = meals.every(m => m.foodItems.trim());
    if (!valid) return;
    setLoading(true);
    const ok = await onSave({
      memberId, date,
      meals: meals.map(m => ({ ...m, calories: m.calories ? Number(m.calories) : undefined })),
      waterIntake: waterIntake ? Number(waterIntake) : undefined,
      generalNotes,
    });
    setLoading(false);
    if (ok) onClose();
  };

  return (
    <Overlay onClose={onClose}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
          <Salad size={20} color="#22c55e" /> Add Diet Plan — {date}
        </h3>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
      </div>

      {meals.map((meal, i) => (
        <div key={i} style={{ background: "var(--bg-hover)", borderRadius: 10, padding: 14, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <select value={meal.mealType} onChange={e => updateMeal(i, "mealType", e.target.value)}
              style={{ padding: "7px 12px", borderRadius: 8, border: "1.5px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)", fontSize: 13 }}>
              {MEAL_TYPES.map(mt => <option key={mt} value={mt}>{mt}</option>)}
            </select>
            {meals.length > 1 && (
              <button onClick={() => removeMeal(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#f87171" }}><X size={16} /></button>
            )}
          </div>
          <textarea placeholder="Food items (e.g. 2 roti, 1 bowl dal, salad) *" value={meal.foodItems} onChange={e => updateMeal(i, "foodItems", e.target.value)}
            rows={2} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1.5px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)", fontSize: 13, resize: "vertical", marginBottom: 8, boxSizing: "border-box" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <input type="number" placeholder="Calories (optional)" value={meal.calories} onChange={e => updateMeal(i, "calories", e.target.value)}
              style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)", fontSize: 13 }} />
            <input placeholder="Notes" value={meal.notes} onChange={e => updateMeal(i, "notes", e.target.value)}
              style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)", fontSize: 13 }} />
          </div>
        </div>
      ))}

      <button onClick={addMeal} style={{
        width: "100%", padding: "10px", borderRadius: 10, border: "2px dashed var(--border-color)",
        background: "none", color: "var(--text-muted)", cursor: "pointer", marginBottom: 14, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 6
      }}>
        <Plus size={16} /> Add Meal
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
        <input type="number" placeholder="Water intake (litres)" value={waterIntake} onChange={e => setWaterIntake(e.target.value)}
          style={{ padding: "10px 12px", borderRadius: 8, border: "1.5px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)", fontSize: 13 }} />
        <input placeholder="General notes" value={generalNotes} onChange={e => setGeneralNotes(e.target.value)}
          style={{ padding: "10px 12px", borderRadius: 8, border: "1.5px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)", fontSize: 13 }} />
      </div>

      <button onClick={handleSubmit} disabled={loading}
        style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#16a34a,#22c55e)", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        {loading ? <Loader size={18} className="spin" /> : <Salad size={18} />}
        {loading ? "Saving..." : "Save Diet Plan"}
      </button>
    </Overlay>
  );
};

// ─── Measurement Form ──────────────────────────────────────────────────────
const MeasurementForm: React.FC<{
  memberId: string; date: string;
  onSave: (data: any) => Promise<boolean>;
  onClose: () => void;
}> = ({ memberId, date, onSave, onClose }) => {
  const [form, setForm] = useState({
    weight: "", height: "", chest: "", waist: "", hips: "",
    arms: "", thighs: "", shoulders: "", bodyFat: "", bmi: "", notes: ""
  });
  const [loading, setLoading] = useState(false);

  const update = (field: string, val: string) => setForm(prev => ({ ...prev, [field]: val }));

  const handleSubmit = async () => {
    setLoading(true);
    const payload: any = { memberId, date, notes: form.notes };
    const numFields = ["weight","height","chest","waist","hips","arms","thighs","shoulders","bodyFat","bmi"];
    numFields.forEach(f => { if ((form as any)[f]) payload[f] = Number((form as any)[f]); });
    const ok = await onSave(payload);
    setLoading(false);
    if (ok) onClose();
  };

  const fields = [
    { key: "weight", label: "Weight (kg)" },
    { key: "height", label: "Height (cm)" },
    { key: "chest", label: "Chest (cm)" },
    { key: "waist", label: "Waist (cm)" },
    { key: "hips", label: "Hips (cm)" },
    { key: "arms", label: "Arms (cm)" },
    { key: "thighs", label: "Thighs (cm)" },
    { key: "shoulders", label: "Shoulders (cm)" },
    { key: "bodyFat", label: "Body Fat (%)" },
    { key: "bmi", label: "BMI" },
  ];

  return (
    <Overlay onClose={onClose}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
          <Ruler size={20} color="#f59e0b" /> Add Measurements — {date}
        </h3>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        {fields.map(f => (
          <div key={f.key}>
            <label style={{ fontSize: 12, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>{f.label}</label>
            <input type="number" step="0.1" placeholder="—" value={(form as any)[f.key]} onChange={e => update(f.key, e.target.value)}
              style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1.5px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)", fontSize: 13, boxSizing: "border-box" }} />
          </div>
        ))}
      </div>
      <textarea placeholder="Notes (optional)" value={form.notes} onChange={e => update("notes", e.target.value)} rows={2}
        style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)", fontSize: 13, resize: "vertical", marginBottom: 14, boxSizing: "border-box" }} />

      <button onClick={handleSubmit} disabled={loading}
        style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#f59e0b,#f97316)", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        {loading ? <Loader size={18} className="spin" /> : <Ruler size={18} />}
        {loading ? "Saving..." : "Save Measurements"}
      </button>
    </Overlay>
  );
};

// ─── Member Detail View ────────────────────────────────────────────────────
const MemberDetailView: React.FC<{
  assignment: any; role: string; onBack: () => void;
}> = ({ assignment, role, onBack }) => {
  const dispatch = useAppDispatch();
  const { workoutPlans, dietPlans, measurements, loading } = useAppSelector(s => s.pt);
  const memberId = assignment.memberId?._id || assignment.memberId;
  const memberName = assignment.memberId?.fullName || "Member";
  const trainerName = assignment.trainerId?.fullName || "Trainer";

  const [date, setDate] = useState(TODAY);
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [showDietForm, setShowDietForm] = useState(false);
  const [showMeasurementForm, setShowMeasurementForm] = useState(false);
  const [expandWorkout, setExpandWorkout] = useState(true);
  const [expandDiet, setExpandDiet] = useState(true);
  const [expandMeasure, setExpandMeasure] = useState(true);

  useEffect(() => {
    dispatch(clearMemberPtData());
    dispatch(fetchPtWorkoutPlansAction(memberId, date));
    dispatch(fetchPtDietPlansAction(memberId, date));
    dispatch(fetchPtMeasurementsAction(memberId, date));
  }, [memberId, date]);

  const canEdit = role === "admin" || role === "gymmanager" || role === "trainer";

  const CardSection = ({ icon, title, color, expanded, toggle, onAdd, children }: any) => (
    <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 20, border: "1px solid var(--border-color)", marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${color}15`, color: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {React.cloneElement(icon, { size: 28, strokeWidth: 2 })}
        </div>
        
        <div style={{ flex: 1, minWidth: 0, marginTop: 4 }}>
          <button onClick={toggle} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, color: "var(--text-primary)", fontSize: 18, fontWeight: 700, padding: 0, marginBottom: 8 }}>
            {title}
            {expanded ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
          </button>
          
          <div>
            {children}
          </div>
        </div>

        {canEdit && onAdd && (
          <button onClick={onAdd} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", marginTop: 4,
            borderRadius: 8, border: `1px solid ${color}`, background: "transparent", color: color,
            fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "background 0.2s"
          }}>
            <Plus size={16} /> Add
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: "0 0 16px 0", display: "inline-flex", alignItems: "center", gap: 4, color: "var(--text-muted)", fontWeight: 600, fontSize: 14 }}>
          <ChevronLeft size={16} /> Back
        </button>
        <div>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>{memberName}</h2>
          <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--text-muted)" }}>
            PT: <strong style={{ color: "var(--text-primary)" }}>{trainerName}</strong>
            &nbsp;· Assigned by: {assignment.assignedBy?.fullName || "—"}
          </p>
        </div>
      </div>

      {/* Date Picker */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
        <div 
          onClick={() => {
            try {
              (document.getElementById('web-date-input-panel') as HTMLInputElement)?.showPicker?.();
            } catch (e) {}
          }}
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", background: "var(--bg-hover)", borderRadius: 10, border: "1.5px solid var(--border-color)", cursor: "pointer" }}
        >
          <Calendar size={16} color="var(--text-muted)" />
          <input 
            id="web-date-input-panel"
            type="date" 
            value={date} 
            onChange={e => setDate(e.target.value)}
            style={{ border: "none", background: "none", color: "var(--text-primary)", fontSize: 14, fontWeight: 600, cursor: "pointer" }} 
          />
        </div>
        {loading && <Loader size={18} className="spin" color="var(--text-muted)" />}
      </div>

      {/* Workout Plans */}
      <CardSection icon={<Dumbbell />} title="Workout Plan" color="#6366f1" expanded={expandWorkout} toggle={() => setExpandWorkout((p: boolean) => !p)} onAdd={() => setShowWorkoutForm(true)}>
        {workoutPlans.length === 0
          ? <p style={{ color: "var(--text-muted)", fontSize: 14, margin: 0 }}>No workout plan for {date}.</p>
          : expandWorkout ? workoutPlans.map((plan: any) => (
            <div key={plan._id} style={{ background: "var(--bg-hover)", borderRadius: 10, padding: 14, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Created by {plan.trainerId?.fullName || "—"}</span>
                  {canEdit && (
                    <button onClick={() => dispatch(deletePtWorkoutPlanAction(plan._id))} style={{ background: "none", border: "none", cursor: "pointer", color: "#f87171" }}><Trash2 size={15} /></button>
                  )}
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ color: "var(--text-muted)" }}>
                      <th style={{ textAlign: "left", paddingBottom: 6, fontWeight: 600 }}>Exercise</th>
                      <th style={{ textAlign: "center", paddingBottom: 6, fontWeight: 600 }}>Sets</th>
                      <th style={{ textAlign: "center", paddingBottom: 6, fontWeight: 600 }}>Reps</th>
                      <th style={{ textAlign: "center", paddingBottom: 6, fontWeight: 600 }}>Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan.exercises?.map((ex: any, i: number) => (
                      <tr key={i} style={{ borderTop: "1px solid var(--border-color)" }}>
                        <td style={{ padding: "6px 0" }}>{ex.name}</td>
                        <td style={{ textAlign: "center", padding: "6px 0" }}>{ex.sets}</td>
                        <td style={{ textAlign: "center", padding: "6px 0" }}>{ex.reps}</td>
                        <td style={{ textAlign: "center", padding: "6px 0" }}>{ex.weight || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {plan.generalNotes && <p style={{ margin: "10px 0 0", fontSize: 12, color: "var(--text-muted)", fontStyle: "italic" }}>Note: {plan.generalNotes}</p>}
              </div>
            )) : null}
      </CardSection>

      {/* Diet Plans */}
      <CardSection icon={<Salad />} title="Diet Plan" color="#22c55e" expanded={expandDiet} toggle={() => setExpandDiet((p: boolean) => !p)} onAdd={() => setShowDietForm(true)}>
        {dietPlans.length === 0
          ? <p style={{ color: "var(--text-muted)", fontSize: 14, margin: 0 }}>No diet plan for {date}.</p>
          : expandDiet ? dietPlans.map((plan: any) => (
            <div key={plan._id} style={{ background: "var(--bg-hover)", borderRadius: 10, padding: 14, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>By {plan.trainerId?.fullName || "—"}{plan.waterIntake ? ` · 💧 ${plan.waterIntake}L water` : ""}</span>
                  {canEdit && (
                    <button onClick={() => dispatch(deletePtDietPlanAction(plan._id))} style={{ background: "none", border: "none", cursor: "pointer", color: "#f87171" }}><Trash2 size={15} /></button>
                  )}
                </div>
                {plan.meals?.map((meal: any, i: number) => (
                  <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderTop: i === 0 ? "none" : "1px solid var(--border-color)", flexWrap: "wrap" }}>
                    <span style={{ minWidth: 120, fontWeight: 600, fontSize: 13, color: "#22c55e" }}>{meal.mealType}</span>
                    <span style={{ flex: 1, fontSize: 13 }}>{meal.foodItems}</span>
                    {meal.calories && <span style={{ fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{meal.calories} kcal</span>}
                  </div>
                ))}
                {plan.generalNotes && <p style={{ margin: "10px 0 0", fontSize: 12, color: "var(--text-muted)", fontStyle: "italic" }}>Note: {plan.generalNotes}</p>}
              </div>
            )) : null}
      </CardSection>

      {/* Measurements */}
      <CardSection icon={<Ruler />} title="Measurements" color="#f59e0b" expanded={expandMeasure} toggle={() => setExpandMeasure((p: boolean) => !p)} onAdd={() => setShowMeasurementForm(true)}>
        {measurements.length === 0
          ? <p style={{ color: "var(--text-muted)", fontSize: 14, margin: 0 }}>No measurements for {date}.</p>
          : expandMeasure ? measurements.map((m: any) => (
            <div key={m._id} style={{ background: "var(--bg-hover)", borderRadius: 10, padding: 14, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>By {m.trainerId?.fullName || "—"}</span>
                  {canEdit && (
                    <button onClick={() => dispatch(deletePtMeasurementAction(m._id))} style={{ background: "none", border: "none", cursor: "pointer", color: "#f87171" }}><Trash2 size={15} /></button>
                  )}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 8 }}>
                  {[
                    ["Weight", m.weight, "kg"], ["Height", m.height, "cm"], ["Chest", m.chest, "cm"],
                    ["Waist", m.waist, "cm"], ["Hips", m.hips, "cm"], ["Arms", m.arms, "cm"],
                    ["Thighs", m.thighs, "cm"], ["Shoulders", m.shoulders, "cm"],
                    ["Body Fat", m.bodyFat, "%"], ["BMI", m.bmi, ""]
                  ].filter(([, val]) => val != null).map(([label, val, unit]) => (
                    <div key={String(label)} style={{ background: "var(--bg-card)", borderRadius: 8, padding: "8px 12px" }}>
                      <p style={{ margin: 0, fontSize: 11, color: "var(--text-muted)" }}>{label}</p>
                      <p style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{val}<span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 2 }}>{unit}</span></p>
                    </div>
                  ))}
                </div>
                {m.notes && <p style={{ margin: "10px 0 0", fontSize: 12, color: "var(--text-muted)", fontStyle: "italic" }}>Note: {m.notes}</p>}
              </div>
            )) : null}
      </CardSection>

      {/* Modals */}
      {showWorkoutForm && <WorkoutPlanForm memberId={memberId} date={date} onSave={data => dispatch(createPtWorkoutPlanAction(data)) as any} onClose={() => setShowWorkoutForm(false)} />}
      {showDietForm && <DietPlanForm memberId={memberId} date={date} onSave={data => dispatch(createPtDietPlanAction(data)) as any} onClose={() => setShowDietForm(false)} />}
      {showMeasurementForm && <MeasurementForm memberId={memberId} date={date} onSave={data => dispatch(createPtMeasurementAction(data)) as any} onClose={() => setShowMeasurementForm(false)} />}
    </div>
  );
};

// ─── Trainer Member Row (for trainer's "assign me" view) ──────────────────
const TrainerMemberRow: React.FC<{
  member: any; currentPt: string | null;
  onAssign: (memberId: string) => Promise<void>;
}> = ({ member, currentPt, onAssign }) => {
  const [assigning, setAssigning] = useState(false);
  return (
    <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: "14px 18px", border: "1.5px solid var(--border-color)", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 15, flexShrink: 0 }}>
        {(member.name || member.fullName || "?").slice(0, 2).toUpperCase()}
      </div>
      <div style={{ flex: 1, minWidth: 120 }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>{member.name || member.fullName}</p>
        <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)" }}>{member.email}</p>
      </div>
      <span style={{ fontSize: 13, color: currentPt ? "#22c55e" : "var(--text-muted)", fontWeight: 600, flexShrink: 0, display: "flex", alignItems: "center", gap: 4 }}>
        {currentPt ? <><UserCheck size={13} />{currentPt}</> : "No PT"}
      </span>
      <button
        disabled={assigning}
        onClick={async () => { setAssigning(true); await onAssign(member._id || member.id); setAssigning(false); }}
        style={{ padding: "7px 16px", borderRadius: 8, border: "none", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontWeight: 600, fontSize: 13, cursor: assigning ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
        {assigning ? <Loader size={14} style={{ animation: "spin 1s linear infinite" }} /> : <UserCheck size={14} />}
        {assigning ? "Assigning..." : "Assign Me"}
      </button>
    </div>
  );
};

// ─── MAIN PANEL ────────────────────────────────────────────────────────────
const PtManagementPanel: React.FC<Props> = ({ role, userId }) => {
  const dispatch = useAppDispatch();
  const { assignments, myMembers, loading } = useAppSelector(s => s.pt);
  const { members } = useAppSelector(s => s.member);
  const { trainers } = useAppSelector(s => s.trainer);

  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [selectedMemberForAssign, setSelectedMemberForAssign] = useState<any>(null);
  const [memberWarningPtName, setMemberWarningPtName] = useState<{member: any, ptName: string} | null>(null);
  const [memberSearch, setMemberSearch] = useState("");
  const [viewTab, setViewTab] = useState<"all" | "assigned">("assigned");

  const isTrainer = role === "trainer";
  const isAdminOrManager = role === "admin" || role === "gymmanager";

  useEffect(() => {
    if (isTrainer) {
      dispatch(fetchMyPtMembersAction());
    } else {
      dispatch(fetchAllPtAssignmentsAction());
    }
  }, [role]);

  // List to show depends on role
  const assignmentList = isTrainer ? myMembers : assignments;

  // Members not yet assigned (for "assign" view)
  const assignedMemberIds = new Set(assignments.filter((a: any) => a.isActive).map((a: any) => a.memberId?._id || a.memberId));

  const filteredMembers = members.filter((m: any) =>
    (m.name || m.fullName || "").toLowerCase().includes(memberSearch.toLowerCase()) ||
    (m.email || "").toLowerCase().includes(memberSearch.toLowerCase())
  );

  const getMemberCurrentPt = (memberId: string) => {
    const a = assignments.find((a: any) => (a.memberId?._id || a.memberId) === memberId && a.isActive);
    return a ? (a.trainerId?.fullName || "—") : null;
  };

  // If a member detail is selected, show detail view
  if (selectedAssignment) {
    return <MemberDetailView assignment={selectedAssignment} role={role} onBack={() => setSelectedAssignment(null)} />;
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 className="page-title">PT Management</h2>
          <p className="page-subtitle">
            {assignmentList.filter((a: any) => a.isActive).length} {isTrainer ? "members under your training" : "active PT assignments"}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {[
          ["assigned", isTrainer ? "My Members" : "Active Assignments", <Users size={16} />],
          ["all", "All Members", <Users size={16} />]
        ].map(([key, label, icon]) => (
          <button key={key as string} onClick={() => setViewTab(key as any)}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 14,
              background: "transparent",
              border: viewTab === key ? "1px solid #c7d2fe" : "1px solid var(--border-color)",
              color: viewTab === key ? "#6366f1" : "var(--text-muted)",
              transition: "all 0.2s"
            }}>
            {icon}
            {label as string}
          </button>
        ))}
      </div>

      {/* ── Active Assignments / My Members tab ─────────────────────────────────────────────── */}
      {viewTab === "assigned" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {loading && <div style={{ textAlign: "center", padding: 40 }}><Loader size={28} className="spin" /></div>}
          {!loading && assignmentList.filter((a: any) => a.isActive !== false).length === 0 && (
            <div style={{ textAlign: "center", padding: 60, color: "var(--text-muted)" }}>
              <Users size={48} style={{ marginBottom: 12, opacity: 0.4 }} />
              <p style={{ fontSize: 16 }}>{isTrainer ? "No members assigned to you yet." : "No active PT assignments."}</p>
              <p style={{ fontSize: 13 }}>Go to "All Members" tab to assign PTs.</p>
            </div>
          )}
          {assignmentList.filter((a: any) => a.isActive !== false).map((assignment: any) => {
            const member = assignment.memberId;
            const trainer = assignment.trainerId;
            return (
              <div
                key={assignment._id}
                onClick={() => setSelectedAssignment(assignment)}
                style={{
                  background: "var(--bg-card)", borderRadius: 12, padding: "16px 20px",
                  border: "1px solid var(--border-color)", display: "flex", alignItems: "center",
                  gap: 16, cursor: "pointer", transition: "all 0.15s", flexWrap: "wrap",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#6366f1")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border-color)")}
              >
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
                  {(member?.fullName || "?").slice(0, 2).toUpperCase()}
                </div>
                
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 16 }}>{member?.fullName || "—"}</p>
                  <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}>
                     <Mail size={14} /> {member?.email || "—"}
                  </p>
                </div>

                {!isTrainer && (
                  <>
                    <div style={{ width: 1, height: 40, background: "var(--border-color)", margin: "0 16px" }}></div>
                    <div style={{ flex: 1, minWidth: 150 }}>
                      <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>Trainer</p>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{trainer?.fullName || "—"}</p>
                    </div>
                  </>
                )}

                <div style={{ flexShrink: 0, display: "flex", gap: 12, alignItems: "center" }}>
                  <button style={{ padding: "8px 16px", borderRadius: 8, background: "#eff6ff", color: "#6366f1", border: "1px solid #dbeafe", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                    <Eye size={16} /> View Details
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); dispatch(removePtAssignmentAction(assignment._id)); }}
                    style={{ padding: "8px", borderRadius: 8, border: "1px solid #fecaca", background: "none", color: "#f87171", cursor: "pointer", display: "flex", alignItems: "center" }}>
                    <UserMinus size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── All Members tab ──────────────────────────────────────────── */}
      {viewTab === "all" && (
        <div>
          <input
            placeholder="Search members..."
            value={memberSearch}
            onChange={e => setMemberSearch(e.target.value)}
            style={{ width: "100%", padding: "10px 16px", borderRadius: 12, border: "1.5px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)", fontSize: 14, boxSizing: "border-box", marginBottom: 16 }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filteredMembers.map((member: any) => {
              const currentPt = getMemberCurrentPt(member._id || member.id);
              // Check if the current logged-in user is the PT for this member
              const isMine = assignmentList.some(a => 
                a.isActive && 
                (a.memberId?._id || a.memberId) === (member._id || member.id) && 
                (a.trainerId?._id || a.trainerId) === userId
              );
              
              return (
                <div key={member._id || member.id} style={{
                  background: "var(--bg-card)", borderRadius: 14, padding: "14px 18px",
                  border: "1.5px solid var(--border-color)", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
                }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 15, flexShrink: 0 }}>
                    {(member.name || member.fullName || "?").slice(0, 2).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 120 }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>{member.name || member.fullName}</p>
                    <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)" }}>{member.email}</p>
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    {currentPt
                      ? <span style={{ fontSize: 13, color: isMine ? "#22c55e" : "var(--text-muted)", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}><UserCheck size={14} /> {isMine ? "Under you" : `PT: ${currentPt}`}</span>
                      : <span style={{ fontSize: 13, color: "var(--text-muted)" }}>No PT assigned</span>}
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    {!isMine && (
                      <button
                        onClick={() => {
                          if (currentPt) {
                            setMemberWarningPtName({ member, ptName: currentPt });
                          } else {
                            setSelectedMemberForAssign(member);
                          }
                        }}
                        style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                        <UserCheck size={14} /> Assign to Me
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            {filteredMembers.length === 0 && <p style={{ color: "var(--text-muted)", textAlign: "center", padding: 32 }}>No members found.</p>}
          </div>
        </div>
      )}

      {/* Confirmation Modal — shown when a member's "Assign to Me" is clicked */}
      {selectedMemberForAssign && (
        <ConfirmSelfAssignModal
          member={selectedMemberForAssign}
          onClose={() => setSelectedMemberForAssign(null)}
          onConfirm={async () => {
            await dispatch(assignPtAction(selectedMemberForAssign._id || selectedMemberForAssign.id, ""));
          }}
        />
      )}

      {/* Warning Modal — shown when trying to assign an already assigned member */}
      {memberWarningPtName && (
        <Overlay onClose={() => setMemberWarningPtName(null)}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#ef4444", display: "flex", alignItems: "center", gap: 8 }}>
              Already Assigned
            </h3>
            <button onClick={() => setMemberWarningPtName(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
          </div>
          <div style={{ padding: "16px", background: "rgba(239,68,68,0.08)", borderRadius: 12, border: "1.5px solid rgba(239,68,68,0.2)", marginBottom: 24 }}>
            <p style={{ margin: 0, fontSize: 15, color: "var(--text-primary)", lineHeight: 1.5 }}>
              <strong>{memberWarningPtName.member.name || memberWarningPtName.member.fullName}</strong> is already assigned to trainer <strong>{memberWarningPtName.ptName}</strong>. 
              <br/><br/>
              Please remove the existing assignment from the "Active Assignments" tab first before assigning them to yourself.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => setMemberWarningPtName(null)} style={{ padding: "10px 24px", borderRadius: 10, border: "none", background: "#ef4444", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              Understood
            </button>
          </div>
        </Overlay>
      )}
    </div>
  );
};

export default PtManagementPanel;

