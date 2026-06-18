import React, { useState, useEffect } from "react";
import { LogOut, Activity, Dumbbell, BarChart3, Clock, Play, Square, Loader, Menu, X, Moon, Sun, LayoutDashboard, CreditCard, ChevronRight, CheckCircle2 } from "lucide-react";
import { getTodayAttendanceApi } from "../services/apis/attendanceApis";
import { getWorkoutsApi, createWorkoutApi, logWorkoutApi, getWorkoutReportApi } from "../services/apis/workoutApis";
import { getMeApi } from "../services/apis/memberApis";
import { getPlansApi } from "../services/apis/planApis";
import { useAppDispatch } from "../utils/reduxHooks";
import { showSnackbar } from "../redux/slices/snackbarSlice";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getWeeklyStatsApi } from "../services/apis/memberApis";

const DEFAULT_WORKOUTS = [
  { _id: "def_chest_1", name: "Bench Press", bodyPart: "Chest" },
  { _id: "def_chest_2", name: "Incline Dumbbell Press", bodyPart: "Chest" },
  { _id: "def_chest_3", name: "Cable Crossovers", bodyPart: "Chest" },
  { _id: "def_shoulder_1", name: "Shoulder Press", bodyPart: "Shoulder" },
  { _id: "def_shoulder_2", name: "Lateral Raises", bodyPart: "Shoulder" },
  { _id: "def_shoulder_3", name: "Front Raises", bodyPart: "Shoulder" },
  { _id: "def_legs_1", name: "Squats", bodyPart: "Legs" },
  { _id: "def_legs_2", name: "Leg Press", bodyPart: "Legs" },
  { _id: "def_legs_3", name: "Leg Extensions", bodyPart: "Legs" },
  { _id: "def_back_1", name: "Pull-ups", bodyPart: "Back" },
  { _id: "def_back_2", name: "Deadlifts", bodyPart: "Back" },
  { _id: "def_back_3", name: "Lat Pulldowns", bodyPart: "Back" },
  { _id: "def_core_1", name: "Crunches", bodyPart: "Core" },
  { _id: "def_core_2", name: "Plank", bodyPart: "Core" },
  { _id: "def_cardio_1", name: "Treadmill", bodyPart: "Cardio" },
  { _id: "def_cardio_2", name: "Cycling", bodyPart: "Cardio" },
  { _id: "def_forearm_1", name: "Wrist Curls", bodyPart: "Forearm" }
];

interface Props {
  userName: string;
  onLogout: () => void;
  gymName?: string;
}

type Tab = "overview" | "workouts" | "reports" | "plans";

export const MemberDashboard: React.FC<Props> = ({ userName, onLogout, gymName = "IronPulse Gym" }) => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark-theme"));
  
  // Daily Log / Overview state
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [weeklyStats, setWeeklyStats] = useState<{ dailyData: any[]; trends: any[] } | null>(null);

  // Workouts state
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loadingWorkouts, setLoadingWorkouts] = useState(false);
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [newWorkout, setNewWorkout] = useState({ name: "", bodyPart: "Chest" });
  
  // Workout Logging
  const [activeWorkout, setActiveWorkout] = useState<any | null>(null);
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Custom Categories
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  
  // Reports state
  const [reportType, setReportType] = useState<"daily" | "monthly" | "yearly">("daily");
  const [reportDate, setReportDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [reportData, setReportData] = useState<any>(null);
  const [loadingReport, setLoadingReport] = useState(false);

  // Plans state
  const [plans, setPlans] = useState<any[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(false);

  // Profile
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
    if (activeTab === "overview") {
      fetchAttendance();
    } else if (activeTab === "workouts") {
      fetchWorkouts();
    } else if (activeTab === "reports") {
      fetchReport();
    } else if (activeTab === "plans") {
      fetchPlans();
    }
  }, [activeTab, reportType, reportDate]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (activeWorkout && workoutStartTime) {
      interval = setInterval(() => {
        setElapsedSeconds(Math.floor((new Date().getTime() - workoutStartTime.getTime()) / 1000));
      }, 1000);
    } else {
      setElapsedSeconds(0);
    }
    return () => clearInterval(interval);
  }, [activeWorkout, workoutStartTime]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

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
      const resAtt = await getTodayAttendanceApi();
      if (resAtt.data?.attendance) {
        setAttendance(resAtt.data.attendance);
      }
    } catch (err) {
      console.error("Attendance fetch error", err);
      setAttendance([
        { id: 1, time: "07:30 AM", status: "SUCCESS" },
        { id: 2, time: "09:00 AM", status: "SUCCESS" },
      ]);
    }

    try {
      const resStats = await getWeeklyStatsApi();
      if (resStats.data) {
        setWeeklyStats(resStats.data);
      }
    } catch (err) {
      console.error("Weekly stats fetch error", err);
    }

    setLoadingAttendance(false);
  };

  const fetchWorkouts = async () => {
    setLoadingWorkouts(true);
    try {
      const res = await getWorkoutsApi();
      const customWorkouts = res.data.workouts || [];
      
      // Merge with default workouts, ensuring no duplicate names in the same category
      const mergedWorkouts = [...DEFAULT_WORKOUTS];
      for (const cw of customWorkouts) {
        if (!mergedWorkouts.some(dw => dw.name.toLowerCase() === cw.name.toLowerCase() && dw.bodyPart === cw.bodyPart)) {
          mergedWorkouts.push(cw);
        }
      }
      setWorkouts(mergedWorkouts);
    } catch (err) {
      console.error(err);
      setWorkouts(DEFAULT_WORKOUTS);
    } finally {
      setLoadingWorkouts(false);
    }
  };

  const fetchPlans = async () => {
    setLoadingPlans(true);
    try {
      const res = await getPlansApi();
      setPlans(res.data.plans || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPlans(false);
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
      setElapsedSeconds(0);
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

  const downloadReportCSV = () => {
    if (!reportData || reportData.totalDuration === 0) {
      dispatch(showSnackbar({ message: "No data to download", type: "info" }));
      return;
    }
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Category,Workout Name,Minutes Logged\r\n";
    
    Object.entries(reportData.report || {}).forEach(([bodyPart, data]: [string, any]) => {
      Object.entries(data.workouts).forEach(([name, mins]: [string, any]) => {
        csvContent += `"${bodyPart}","${name}","${mins}"\r\n`;
      });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `workout_report_${reportType}_${reportDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  };

  // ── Panels ───────────────────────────────────────────────────────────────
  
  const OverviewPanel = (
    <div className="page-container">
      <header className="page-header">
        <div>
          <h2 className="page-title">Welcome back, {userName.split(" ")[0]} 💪</h2>
          <p className="page-subtitle">Track your progress and crush your goals!</p>
        </div>
      </header>

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
        
        {weeklyStats && (
          <div className="gym-card" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <BarChart3 size={20} color="var(--primary)" /> Weekly Overview
            </h3>
            
            <div style={{ height: 300, width: "100%", marginBottom: 24 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyStats.dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGym" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorWorkout" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { weekday: 'short' })} style={{ fontSize: 12, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
                  <YAxis style={{ fontSize: 12, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", background: "var(--bg-primary)", color: "var(--text-primary)" }} />
                  <Area type="monotone" dataKey="gymMinutes" name="Gym Time (min)" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorGym)" />
                  <Area type="monotone" dataKey="workoutMinutes" name="Workout Time (min)" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorWorkout)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <h4 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 12 }}>Muscle Group Trends (vs Last Week)</h4>
            {weeklyStats.trends.length === 0 ? (
              <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>No trend data available yet.</div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                {weeklyStats.trends.map((t: any) => (
                  <div key={t.bodyPart} style={{ background: "var(--bg-secondary)", padding: 16, borderRadius: 12, border: "1px solid var(--border-color)" }}>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: 4, fontWeight: 600 }}>{t.bodyPart}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <span style={{ fontSize: "1.2rem", fontWeight: 700 }}>{t.currentWeekMins}m</span>
                      {t.status === 'gain' ? (
                        <span style={{ color: "#10b981", fontSize: "0.8rem", fontWeight: 600, display: "flex", alignItems: "center" }}>
                          <ChevronRight size={14} style={{ transform: "rotate(-90deg)" }} /> +{t.currentWeekMins - t.lastWeekMins}m
                        </span>
                      ) : t.status === 'loss' ? (
                        <span style={{ color: "var(--danger)", fontSize: "0.8rem", fontWeight: 600, display: "flex", alignItems: "center" }}>
                          <ChevronRight size={14} style={{ transform: "rotate(90deg)" }} /> {t.currentWeekMins - t.lastWeekMins}m
                        </span>
                      ) : (
                        <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 600 }}>No change</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className="gym-card">
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 16 }}>Today's Check-ins</h3>
          {loadingAttendance ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
              <Loader size={24} style={{ animation: "spin 1s linear infinite", color: "var(--primary)" }} />
            </div>
          ) : attendance.length === 0 ? (
            <div style={{ textAlign: "center", padding: "30px 0" }}>
              <Clock size={32} style={{ color: "var(--border-color)", margin: "0 auto 12px" }} />
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>No check-ins today.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {attendance.map((a: any, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", background: "var(--bg-secondary)", padding: 12, borderRadius: 8, border: "1px solid var(--border-color)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ background: "var(--primary-light)", padding: 8, borderRadius: 8, color: "var(--primary)" }}>
                      <CheckCircle2 size={18} />
                    </div>
                    <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{a.time || a.timestamp}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ color: a.status === "SUCCESS" ? "#10b981" : "var(--danger)", fontSize: "0.85rem", fontWeight: 700, padding: "4px 8px", background: a.status === "SUCCESS" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", borderRadius: 12 }}>
                      {a.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const WorkoutsPanel = (() => {
    const baseCategories = ["Chest", "Shoulder", "Legs", "Forearm", "Back", "Core", "Cardio", "Other"];
    const categories = Array.from(new Set([...baseCategories, ...customCategories, ...workouts.map(w => w.bodyPart)])).filter(Boolean);
    
    return (
      <div className="page-container">
        <header className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 className="page-title">Your Workouts</h2>
            <p className="page-subtitle">Track your sets and reps</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn-blue-outline" onClick={() => setShowAddCategory(true)}>Add Category</button>
            <button className="btn-blue-outline" onClick={() => setShowAddWorkout(true)}>Create Custom</button>
          </div>
        </header>

        {showAddCategory && (
          <div className="gym-card" style={{ marginBottom: 24, border: "1px dashed var(--primary)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h4 style={{ fontWeight: 700, fontSize: "1.1rem" }}>Add New Category</h4>
              <button onClick={() => setShowAddCategory(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <label className="form-label">Category Name</label>
                <input type="text" className="form-input" placeholder="e.g. Plyometrics" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-blue" onClick={() => {
                if (newCategoryName.trim()) {
                  setCustomCategories([...customCategories, newCategoryName.trim()]);
                  setNewCategoryName("");
                  setShowAddCategory(false);
                  dispatch(showSnackbar({ message: "Category added!", type: "success" }));
                }
              }}>Save Category</button>
              <button className="btn-blue-outline" onClick={() => setShowAddCategory(false)}>Cancel</button>
            </div>
          </div>
        )}

        {activeWorkout && (
          <div className="gym-card" style={{ background: "var(--primary-light)", borderColor: "var(--primary)", borderStyle: "solid", borderWidth: 1, marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h4 style={{ color: "var(--primary)", marginBottom: 4, fontWeight: 700, fontSize: "1.1rem" }}>Active Session: {activeWorkout.name}</h4>
                <div style={{ color: "var(--primary)", fontSize: "1.1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                  <Clock size={16} /> {formatTime(elapsedSeconds)}
                </div>
              </div>
              <button className="btn-blue" style={{ background: "var(--danger)", borderColor: "var(--danger)", padding: "10px 16px" }} onClick={handleStopWorkout}>
                <Square size={16} fill="currentColor" /> Stop & Log
              </button>
            </div>
          </div>
        )}

        {showAddWorkout && (
          <div className="gym-card" style={{ marginBottom: 24, border: "1px dashed var(--primary)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h4 style={{ fontWeight: 700, fontSize: "1.1rem" }}>New Custom Workout</h4>
              <button onClick={() => setShowAddWorkout(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
              <div style={{ flex: 2, minWidth: 200 }}>
                <label className="form-label">Workout Name</label>
                <input type="text" className="form-input" placeholder="e.g. Incline Dumbbell Press" value={newWorkout.name} onChange={e => setNewWorkout({...newWorkout, name: e.target.value})} />
              </div>
              <div style={{ flex: 1, minWidth: 150 }}>
                <label className="form-label">Category</label>
                <select className="form-input" value={newWorkout.bodyPart} onChange={e => setNewWorkout({...newWorkout, bodyPart: e.target.value})}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-blue" onClick={handleCreateWorkout}>Save Workout</button>
              <button className="btn-blue-outline" onClick={() => setShowAddWorkout(false)}>Cancel</button>
            </div>
          </div>
        )}

        {loadingWorkouts ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
            <Loader size={32} style={{ animation: "spin 1s linear infinite", color: "var(--primary)" }} />
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {categories.map(cat => {
              const catWorkouts = workouts.filter(w => w.bodyPart === cat);
              if (catWorkouts.length === 0) return null;
              return (
                <div key={cat} className="gym-card" style={{ padding: 0, overflow: "hidden" }}>
                  <div style={{ background: "var(--bg-secondary)", padding: "16px 20px", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "1.1rem" }}>{cat}</h4>
                    <span style={{ fontSize: "0.75rem", background: "var(--bg-primary)", padding: "2px 8px", borderRadius: 12, fontWeight: 600, color: "var(--text-secondary)", border: "1px solid var(--border-color)" }}>{catWorkouts.length}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {catWorkouts.map((w, idx) => (
                      <div key={w._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: idx < catWorkouts.length - 1 ? "1px solid var(--border-color)" : "none", transition: "background 0.2s" }} className="hover-bg-secondary">
                        <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>{w.name}</span>
                        <button 
                          className="btn-blue"
                          disabled={!!activeWorkout}
                          onClick={() => handleStartWorkout(w)}
                          style={{ padding: "8px", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", opacity: activeWorkout ? 0.5 : 1 }}>
                          <Play size={16} fill="currentColor" style={{ marginLeft: 2 }} />
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
  })();

  const ReportsPanel = (
    <div className="page-container">
      <header className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h2 className="page-title">Workout Reports</h2>
          <p className="page-subtitle">Analyze your training volume</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <select className="form-input" style={{ width: 140, cursor: "pointer" }} value={reportType} onChange={e => setReportType(e.target.value as any)}>
            <option value="daily">Daily Report</option>
            <option value="monthly">Monthly Report</option>
            <option value="yearly">Yearly Report</option>
          </select>
          <input 
            type={reportType === "yearly" ? "number" : reportType === "monthly" ? "month" : "date"} 
            className="form-input" 
            style={{ width: 160 }}
            value={reportDate} 
            onChange={e => setReportDate(e.target.value)} 
          />
          <button className="btn-blue-outline" onClick={downloadReportCSV}>Download CSV</button>
        </div>
      </header>

      {loadingReport ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
          <Loader size={32} style={{ animation: "spin 1s linear infinite", color: "var(--primary)" }} />
        </div>
      ) : !reportData || reportData.totalDuration === 0 ? (
        <div className="gym-card" style={{ textAlign: "center", padding: "60px 20px" }}>
          <BarChart3 size={48} style={{ color: "var(--border-color)", margin: "0 auto 16px" }} />
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 8 }}>No data available</h3>
          <p style={{ color: "var(--text-muted)" }}>You haven't logged any workouts for this period.</p>
        </div>
      ) : (
        <div>
          <div className="gym-card" style={{ marginBottom: 24, padding: "24px 32px", background: "linear-gradient(135deg, var(--primary), #1e40af)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h4 style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: "0.95rem", marginBottom: 4 }}>Total Training Time</h4>
              <div style={{ fontSize: "2.5rem", fontWeight: 800 }}>{reportData.totalDuration} <span style={{ fontSize: "1.2rem", fontWeight: 600, opacity: 0.8 }}>mins</span></div>
            </div>
            <Activity size={48} style={{ opacity: 0.2 }} />
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {Object.entries(reportData.report || {}).map(([bodyPart, data]: [string, any]) => (
              <div key={bodyPart} className="gym-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, borderBottom: "1px solid var(--border-color)", paddingBottom: 12 }}>
                  <h4 style={{ fontWeight: 700, fontSize: "1.1rem", display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--primary)" }}></div>
                    {bodyPart}
                  </h4>
                  <span style={{ fontWeight: 800, color: "var(--primary)" }}>{data.totalMinutes} min</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {Object.entries(data.workouts).map(([name, mins]: [string, any]) => (
                    <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.95rem" }}>
                      <span style={{ color: "var(--text-secondary)" }}>{name}</span>
                      <span style={{ fontWeight: 600 }}>{mins} m</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const PlansPanel = (
    <div className="page-container">
      <header className="page-header">
        <h2 className="page-title">Available Gym Plans</h2>
        <p className="page-subtitle">Discover memberships crafted for your goals.</p>
      </header>

      {loadingPlans ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
          <Loader size={32} style={{ animation: "spin 1s linear infinite", color: "var(--primary)" }} />
        </div>
      ) : plans.length === 0 ? (
        <div className="gym-card" style={{ textAlign: "center", padding: "60px 20px" }}>
          <CreditCard size={48} style={{ color: "var(--border-color)", margin: "0 auto 16px" }} />
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 8 }}>No plans available</h3>
          <p style={{ color: "var(--text-muted)" }}>The gym owner hasn't created any plans yet.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {plans.map(p => (
            <div key={p._id} className="gym-card" style={{ display: "flex", flexDirection: "column", padding: 0, overflow: "hidden", border: "1px solid var(--border-color)" }}>
              <div style={{ padding: "24px", background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)", textAlign: "center" }}>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>{p.name}</h3>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4 }}>
                  <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary)" }}>₹{p.basePrice}</span>
                  <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>/ {p.durationMonths} mo</span>
                </div>
              </div>
              <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 700, color: "var(--text-muted)", marginBottom: 16 }}>Includes</h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                    {(p.features || "").split(",").filter((f: string) => f.trim()).map((f: string, i: number) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                        <CheckCircle2 size={16} style={{ color: "#10b981", flexShrink: 0, marginTop: 2 }} />
                        <span style={{ lineHeight: 1.4 }}>{f.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="btn-blue-outline" style={{ width: "100%", marginTop: 24, justifyContent: "center" }} onClick={() => dispatch(showSnackbar({ message: "Contact gym admin to enroll in this plan.", type: "info" }))}>
                  Inquire Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const navItems: { id: Tab; label: string; icon: React.FC<{size?: number}> }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard as any },
    { id: "workouts", label: "Workouts", icon: Dumbbell as any },
    { id: "reports", label: "Reports", icon: BarChart3 as any },
    { id: "plans", label: "Gym Plans", icon: CreditCard as any },
  ];

  const Sidebar = (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay show"
          style={{ display: "block" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="brand-icon-wrapper">
            <Dumbbell size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="brand-name">{gymName.toUpperCase().slice(0, 10)}</h1>
            <p className="brand-subtitle">Member Portal</p>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <ul className="sidebar-menu">
            {navItems.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <a
                  className={`sidebar-menu-item ${activeTab === id ? "active" : ""}`}
                  onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          {/* Theme */}
          <div className="theme-switch-container">
            <span className="theme-switch-label">
              {isDark ? <Moon size={16} /> : <Sun size={16} />}
              <span>{isDark ? "Dark Mode" : "Light Mode"}</span>
            </span>
            <label className="switch">
              <input type="checkbox" checked={isDark} onChange={toggleTheme} />
              <span className="slider" />
            </label>
          </div>

          {/* Profile */}
          <div className="profile-card" style={{ justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="profile-avatar">
                {userName.slice(0, 2).toUpperCase()}
              </div>
              <div className="profile-info">
                <span className="profile-name">{userName}</span>
                <span className="profile-email">Member</span>
              </div>
            </div>
            <button
              onClick={onLogout}
              title="Logout"
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4, borderRadius: 6, transition: "color 0.15s" }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );

  const panels: Record<Tab, React.ReactNode> = {
    overview: OverviewPanel,
    workouts: WorkoutsPanel,
    reports: ReportsPanel,
    plans: PlansPanel,
  };

  return (
    <div className="app-container">
      {Sidebar}

      <div className="main-content">
        {/* Mobile header */}
        <header className="mobile-header">
          <button className="menu-toggle-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="brand-icon-wrapper" style={{ width: 32, height: 32 }}>
              <Dumbbell size={16} />
            </div>
            <span className="brand-name" style={{ fontSize: "1rem" }}>{gymName.toUpperCase().slice(0, 10)}</span>
          </div>
          <div style={{ width: 40 }} />
        </header>

        {/* Active panel */}
        {panels[activeTab]}
      </div>
    </div>
  );
};

export default MemberDashboard;
