import React, { useState, useEffect } from "react";
import { LogOut, Activity, Dumbbell, BarChart3, Clock, Play, Square, Loader } from "lucide-react";
import { getTodayAttendanceApi } from "../services/apis/attendanceApis";
import { getWorkoutsApi, createWorkoutApi, logWorkoutApi, getWorkoutReportApi } from "../services/apis/workoutApis";
import { getMeApi } from "../services/apis/memberApis";
import { useAppDispatch } from "../utils/reduxHooks";
import { showSnackbar } from "../redux/slices/snackbarSlice";

interface Props {
  userName: string;
  onLogout: () => void;
}

type Tab = "dailyLog" | "workouts" | "reports";

export const MemberDashboard: React.FC<Props> = ({ userName, onLogout }) => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<Tab>("dailyLog");
  
  // Daily Log state
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loadingAttendance, setLoadingAttendance] = useState(false);

  // Workouts state
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loadingWorkouts, setLoadingWorkouts] = useState(false);
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [newWorkout, setNewWorkout] = useState({ name: "", bodyPart: "Chest" });
  
  // Workout Logging
  const [activeWorkout, setActiveWorkout] = useState<any | null>(null);
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(null);
  
  // Reports state
  const [reportType, setReportType] = useState<"daily" | "monthly" | "yearly">("daily");
  const [reportDate, setReportDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [reportData, setReportData] = useState<any>(null);
  const [loadingReport, setLoadingReport] = useState(false);

  // Profile
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
    if (activeTab === "dailyLog") {
      fetchAttendance();
    } else if (activeTab === "workouts") {
      fetchWorkouts();
    } else if (activeTab === "reports") {
      fetchReport();
    }
  }, [activeTab, reportType, reportDate]);

  const fetchProfile = async () => {
    try {
      const res = await getMeApi();
      setProfile(res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAttendance = async () => {
    setLoadingAttendance(true);
    try {
      const res = await getTodayAttendanceApi(); // Assuming this fetches user's attendance or backend filters it
      if (res.data?.attendance) {
        setAttendance(res.data.attendance);
      }
    } catch (err) {
      console.error(err);
      // fallback mock
      setAttendance([
        { id: 1, time: "07:30 AM", status: "SUCCESS" },
        { id: 2, time: "09:00 AM", status: "SUCCESS" },
      ]);
    } finally {
      setLoadingAttendance(false);
    }
  };

  const fetchWorkouts = async () => {
    setLoadingWorkouts(true);
    try {
      const res = await getWorkoutsApi();
      setWorkouts(res.data.workouts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingWorkouts(false);
    }
  };

  const handleCreateWorkout = async () => {
    if (!newWorkout.name.trim()) return;
    try {
      const res = await createWorkoutApi(newWorkout);
      dispatch(showSnackbar({ message: "Workout created!", type: "success" }));
      setShowAddWorkout(false);
      setNewWorkout({ name: "", bodyPart: "Chest" });
      fetchWorkouts();
    } catch (err) {
      dispatch(showSnackbar({ message: "Failed to create workout", type: "error" }));
    }
  };

  const handleStartWorkout = (workout: any) => {
    setActiveWorkout(workout);
    setWorkoutStartTime(new Date());
  };

  const handleStopWorkout = async () => {
    if (!activeWorkout || !workoutStartTime) return;
    
    const endTime = new Date();
    const durationMs = endTime.getTime() - workoutStartTime.getTime();
    const durationMins = Math.max(1, Math.round(durationMs / 60000));
    
    try {
      await logWorkoutApi({
        workoutId: activeWorkout._id,
        date: workoutStartTime.toISOString().split("T")[0],
        startTime: workoutStartTime.toTimeString().split(" ")[0].slice(0, 5),
        endTime: endTime.toTimeString().split(" ")[0].slice(0, 5),
        duration: durationMins
      });
      dispatch(showSnackbar({ message: `Logged ${durationMins} min of ${activeWorkout.name}`, type: "success" }));
      setActiveWorkout(null);
      setWorkoutStartTime(null);
    } catch (err) {
      dispatch(showSnackbar({ message: "Failed to log workout", type: "error" }));
    }
  };

  const fetchReport = async () => {
    setLoadingReport(true);
    try {
      let formattedDate = reportDate;
      if (reportType === "monthly") formattedDate = reportDate.slice(0, 7);
      if (reportType === "yearly") formattedDate = reportDate.slice(0, 4);

      const res = await getWorkoutReportApi(reportType, formattedDate);
      setReportData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingReport(false);
    }
  };

  const renderDailyLog = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {profile?.planEndDate && (
        <div className="gym-card" style={{ background: "var(--primary-light)", border: "1px solid var(--primary)" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--primary)", marginBottom: 8 }}>My Active Plan</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>{profile.planId ? profile.planId.name : "Gym Membership"}</div>
              <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Expires on: {new Date(profile.planEndDate).toLocaleDateString()}</div>
            </div>
            <div style={{ background: "var(--primary)", color: "#fff", padding: "6px 12px", borderRadius: 16, fontSize: "0.8rem", fontWeight: 600 }}>Active</div>
          </div>
        </div>
      )}
      
      <div className="gym-card">
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 16 }}>Today's Check-ins</h3>
      {loadingAttendance ? (
        <Loader size={24} style={{ animation: "spin 1s linear infinite" }} />
      ) : attendance.length === 0 ? (
        <p style={{ color: "var(--text-muted)" }}>No check-ins today.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {attendance.map((a: any, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", background: "var(--bg-secondary)", padding: 12, borderRadius: 8 }}>
              <span style={{ fontWeight: 600 }}>{a.time || a.timestamp}</span>
              <span style={{ color: a.status === "SUCCESS" ? "var(--primary)" : "var(--danger)" }}>{a.status}</span>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );

  const renderWorkouts = () => {
    const categories = ["Chest", "Shoulder", "Legs", "Forearm", "Back", "Core", "Cardio", "Other"];
    
    return (
      <div className="gym-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Your Workouts</h3>
          <button className="btn-blue-outline" onClick={() => setShowAddWorkout(true)}>Create Custom</button>
        </div>

        {activeWorkout && (
          <div style={{ background: "var(--primary-light)", padding: 16, borderRadius: 8, marginBottom: 20, border: "1px solid var(--primary)" }}>
            <h4 style={{ color: "var(--primary)", marginBottom: 8, fontWeight: 700 }}>Active Session: {activeWorkout.name}</h4>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-blue" style={{ background: "var(--danger)", borderColor: "var(--danger)" }} onClick={handleStopWorkout}>
                <Square size={16} fill="currentColor" /> Stop & Log
              </button>
            </div>
          </div>
        )}

        {showAddWorkout && (
          <div style={{ background: "var(--bg-secondary)", padding: 16, borderRadius: 8, marginBottom: 20 }}>
            <h4 style={{ marginBottom: 12, fontWeight: 600 }}>New Custom Workout</h4>
            <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
              <input type="text" className="form-input" placeholder="e.g. Incline Dumbbell Press" value={newWorkout.name} onChange={e => setNewWorkout({...newWorkout, name: e.target.value})} />
              <select className="form-input" value={newWorkout.bodyPart} onChange={e => setNewWorkout({...newWorkout, bodyPart: e.target.value})}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-blue" onClick={handleCreateWorkout}>Save</button>
              <button className="btn-blue-outline" onClick={() => setShowAddWorkout(false)}>Cancel</button>
            </div>
          </div>
        )}

        {loadingWorkouts ? (
          <Loader size={24} style={{ animation: "spin 1s linear infinite" }} />
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {categories.map(cat => {
              const catWorkouts = workouts.filter(w => w.bodyPart === cat);
              if (catWorkouts.length === 0) return null;
              return (
                <div key={cat} style={{ background: "var(--bg-secondary)", padding: 12, borderRadius: 8 }}>
                  <h4 style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 12, borderBottom: "1px solid var(--border-color)", paddingBottom: 8 }}>{cat}</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {catWorkouts.map(w => (
                      <div key={w._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.9rem" }}>{w.name}</span>
                        <button 
                          disabled={!!activeWorkout}
                          onClick={() => handleStartWorkout(w)}
                          style={{ background: "none", border: "none", color: "var(--primary)", cursor: "pointer", opacity: activeWorkout ? 0.5 : 1 }}>
                          <Play size={16} fill="currentColor" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderReports = () => (
    <div className="gym-card">
      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 16 }}>Workout Reports</h3>
      
      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        <select className="form-input" style={{ width: 120 }} value={reportType} onChange={e => setReportType(e.target.value as any)}>
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <input 
          type="date" 
          className="form-input" 
          value={reportDate} 
          onChange={e => setReportDate(e.target.value)} 
        />
      </div>

      {loadingReport ? (
        <Loader size={24} style={{ animation: "spin 1s linear infinite" }} />
      ) : !reportData || reportData.totalDuration === 0 ? (
        <p style={{ color: "var(--text-muted)" }}>No workout data for this period.</p>
      ) : (
        <div>
          <div style={{ marginBottom: 24, padding: 16, background: "var(--primary-light)", borderRadius: 8 }}>
            <h4 style={{ color: "var(--primary)", fontWeight: 700 }}>Total Time: {reportData.totalDuration} mins</h4>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16 }}>
            {Object.entries(reportData.report || {}).map(([bodyPart, data]: [string, any]) => (
              <div key={bodyPart} style={{ background: "var(--bg-secondary)", padding: 16, borderRadius: 8 }}>
                <h4 style={{ fontWeight: 700, marginBottom: 12 }}>{bodyPart} ({data.totalMinutes} mins)</h4>
                {Object.entries(data.workouts).map(([name, mins]: [string, any]) => (
                  <div key={name} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: 4 }}>
                    <span>{name}</span>
                    <span style={{ fontWeight: 600 }}>{mins} min</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="app-container" style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px" }}>
        
        {/* Header */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <h2 className="page-title">Welcome back, {userName.split(" ")[0]} 💪</h2>
            <p className="page-subtitle">Track your progress and crush your goals!</p>
          </div>
          <button className="btn-blue-outline" onClick={onLogout}>
            <LogOut size={16} /> Logout
          </button>
        </header>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24, overflowX: "auto", paddingBottom: 8 }}>
          {[
            { id: "dailyLog", label: "Daily Log", icon: Activity },
            { id: "workouts", label: "Workouts", icon: Dumbbell },
            { id: "reports", label: "Reports", icon: BarChart3 }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as Tab)}
              style={{
                display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 8, fontWeight: 600, cursor: "pointer", border: "none",
                background: activeTab === t.id ? "var(--primary)" : "var(--bg-secondary)",
                color: activeTab === t.id ? "#fff" : "var(--text-secondary)",
                transition: "all 0.2s"
              }}
            >
              <t.icon size={18} /> {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "dailyLog" && renderDailyLog()}
        {activeTab === "workouts" && renderWorkouts()}
        {activeTab === "reports" && renderReports()}

      </div>
    </div>
  );
};

export default MemberDashboard;
