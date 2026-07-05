import React, { useState, useEffect } from "react";
import { LogOut, Activity, Dumbbell, BarChart3, Clock, Play, Square, Loader, Menu, X, Moon, Sun, LayoutDashboard, CreditCard, ChevronRight, CheckCircle2, User, KeyRound, Sparkles, ShoppingCart, FileText, Target, ClipboardList, TrendingUp, ShieldCheck, PenLine, Eye, Trash2, BookOpen, UserCheck, Calendar, Salad, Ruler, ChevronDown, ChevronUp } from "lucide-react";
import UserProfileModal from "../components/UserProfileModal/UserProfileModal";
import PurchaseAICreditsModal from "../components/PurchaseAICreditsModal/PurchaseAICreditsModal";
import ConfirmationModal from "../components/ConfirmationModal/ConfirmationModal";
import { getTodayAttendanceApi } from "../services/apis/attendanceApis";
import { getWorkoutsApi, createWorkoutApi, logWorkoutApi, getWorkoutReportApi, deleteWorkoutApi } from "../services/apis/workoutApis";
import { getMeApi } from "../services/apis/memberApis";
import { getPlansApi } from "../services/apis/planApis";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { showSnackbar } from "../redux/slices/snackbarSlice";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getWeeklyStatsApi } from "../services/apis/memberApis";
import { getLatestBmiReportApi } from "../services/apis/bmiApis";
import { getMemberDietHistoryApi, generateDietPlanApi, generateDietPlanFromWorkoutApi } from "../services/apis/dietApis";
import WorkoutLibraryPage from "../components/WorkoutLibrary/WorkoutLibraryPage";
import {
  fetchMemberPtInfoAction,
  fetchPtWorkoutPlansAction,
  fetchPtDietPlansAction,
  fetchPtMeasurementsAction,
} from "../redux/actions/ptActions";

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

type Tab = "overview" | "workouts" | "reports" | "plans" | "diet" | "library" | "pt";

export const MemberDashboard: React.FC<Props> = ({ userName, onLogout, gymName = "Trainix Gym" }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const ptState = useAppSelector((s) => s.pt);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark-theme"));
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Daily Log / Overview state
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [weeklyStats, setWeeklyStats] = useState<{ dailyData: any[]; trends: any[] } | null>(null);

  // Workouts state
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loadingWorkouts, setLoadingWorkouts] = useState(false);
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [newWorkout, setNewWorkout] = useState({ name: "", bodyPart: "Chest" });
  const [workoutToDelete, setWorkoutToDelete] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletedDefaults, setDeletedDefaults] = useState<string[]>(() => {
    const saved = localStorage.getItem("deletedDefaults");
    return saved ? JSON.parse(saved) : [];
  });

  // Workout Logging
  const [activeWorkout, setActiveWorkout] = useState<any | null>(() => {
    const saved = localStorage.getItem("activeWorkout");
    return saved ? JSON.parse(saved) : null;
  });
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(() => {
    const saved = localStorage.getItem("workoutStartTime");
    return saved ? new Date(saved) : null;
  });
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

  // Diet state
  const [dietPlans, setDietPlans] = useState<any[]>([]);
  const [latestBmiPhoto, setLatestBmiPhoto] = useState<any>(null);
  const [loadingDiet, setLoadingDiet] = useState(false);
  const [isGeneratingDiet, setIsGeneratingDiet] = useState(false);
  const [dietGoal, setDietGoal] = useState("Weight Loss");
  const [showAiModal, setShowAiModal] = useState(false);

  // New Workout Diet state
  const [isGeneratingWorkoutDiet, setIsGeneratingWorkoutDiet] = useState(false);
  const [workoutDietGoal, setWorkoutDietGoal] = useState("Weight Loss");
  const [memberAge, setMemberAge] = useState<number | "">("");
  const [memberHeight, setMemberHeight] = useState<number | "">("");
  const [memberWeight, setMemberWeight] = useState<number | "">("");

  // Profile
  const [profile, setProfile] = useState<any>(null);
  // PT date selector
  const [ptDate, setPtDate] = useState<string>(new Date().toISOString().split("T")[0]);

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
    } else if (activeTab === "diet") {
      fetchDietData();
    } else if (activeTab === "pt" && profile?._id) {
      dispatch(fetchPtWorkoutPlansAction(profile._id, ptDate));
      dispatch(fetchPtDietPlansAction(profile._id, ptDate));
      dispatch(fetchPtMeasurementsAction(profile._id, ptDate));
    }
  }, [activeTab, reportType, reportDate, profile?._id]);

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
      // Fetch PT info right after getting the member ID
      if (res.data.user?._id) {
        dispatch(fetchMemberPtInfoAction(res.data.user._id));
      }
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

      const mergedWorkouts = [...DEFAULT_WORKOUTS.filter(dw => !deletedDefaults.includes(dw._id))];
      for (const cw of customWorkouts) {
        if (!mergedWorkouts.some(dw => dw.name.toLowerCase() === cw.name.toLowerCase() && dw.bodyPart === cw.bodyPart)) {
          mergedWorkouts.push(cw);
        }
      }
      setWorkouts(mergedWorkouts);
    } catch (err) {
      console.error(err);
      setWorkouts(DEFAULT_WORKOUTS.filter(dw => !deletedDefaults.includes(dw._id)));
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

  const fetchDietData = async () => {
    if (!profile?._id) return;
    setLoadingDiet(true);
    try {
      const [dietRes, bmiRes] = await Promise.all([
        getMemberDietHistoryApi(profile._id),
        getLatestBmiReportApi(profile._id)
      ]);
      setDietPlans(dietRes.data.dietPlans || []);
      setLatestBmiPhoto(bmiRes.data.report || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDiet(false);
    }
  };



  const handleGenerateDiet = async (bmiReportId: string) => {
    if ((profile?.aiCredits || 0) < 1) {
      dispatch(showSnackbar({ message: "Not enough AI credits! Please purchase credits first.", type: "error" }));
      setShowAiModal(true);
      return;
    }

    setIsGeneratingDiet(true);
    try {
      const res = await generateDietPlanApi({ bmiReportId, goal: dietGoal });
      dispatch(showSnackbar({ message: "Diet Plan Generated!", type: "success" }));
      // Update credits locally
      if (res.data.remainingCredits !== undefined) {
        setProfile((prev: any) => ({ ...prev, aiCredits: res.data.remainingCredits }));
      }
      fetchDietData();
    } catch (err: any) {
      dispatch(showSnackbar({ message: err?.response?.data?.message || "Failed to generate diet plan", type: "error" }));
    } finally {
      setIsGeneratingDiet(false);
    }
  };

  const handleGenerateWorkoutDiet = async () => {
    if (!memberAge || !memberHeight || !memberWeight) {
      dispatch(showSnackbar({ message: "Please fill in age, height, and weight.", type: "error" }));
      return;
    }
    if ((profile?.aiCredits || 0) < 1) {
      dispatch(showSnackbar({ message: "Not enough AI credits! Please purchase credits first.", type: "error" }));
      setShowAiModal(true);
      return;
    }

    setIsGeneratingWorkoutDiet(true);
    try {
      const res = await generateDietPlanFromWorkoutApi({ 
        age: Number(memberAge), 
        height: Number(memberHeight), 
        weight: Number(memberWeight), 
        goal: workoutDietGoal 
      });
      dispatch(showSnackbar({ message: "Workout Diet Plan Generated!", type: "success" }));
      if (res.data.remainingCredits !== undefined) {
        setProfile((prev: any) => ({ ...prev, aiCredits: res.data.remainingCredits }));
      }
      fetchDietData();
    } catch (err: any) {
      dispatch(showSnackbar({ message: err?.response?.data?.message || "Failed to generate diet plan", type: "error" }));
    } finally {
      setIsGeneratingWorkoutDiet(false);
    }
  };

  const handleCreateWorkout = async () => {
    if (!newWorkout.name.trim()) {
      dispatch(showSnackbar({ message: "Please enter a workout name", type: "error" }));
      return;
    }
    try {
      await createWorkoutApi(newWorkout);
      dispatch(showSnackbar({ message: "Workout created!", type: "success" }));
      setShowAddWorkout(false);
      setNewWorkout({ name: "", bodyPart: "Chest" });
      fetchWorkouts();
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to create workout";
      dispatch(showSnackbar({ message: msg, type: "error" }));
    }
  };

  const handleDeleteWorkout = async () => {
    if (!workoutToDelete) return;
    
    if (workoutToDelete._id.startsWith("def_")) {
      const updated = [...deletedDefaults, workoutToDelete._id];
      setDeletedDefaults(updated);
      localStorage.setItem("deletedDefaults", JSON.stringify(updated));
      dispatch(showSnackbar({ message: "Workout deleted successfully", type: "success" }));
      setWorkoutToDelete(null);
      // We don't necessarily need to call fetchWorkouts from backend here, 
      // but let's just manually update state for instant feedback.
      setWorkouts(prev => prev.filter(w => w._id !== workoutToDelete._id));
      return;
    }

    try {
      await deleteWorkoutApi(workoutToDelete._id);
      dispatch(showSnackbar({ message: "Workout deleted successfully", type: "success" }));
      fetchWorkouts();
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to delete workout";
      dispatch(showSnackbar({ message: msg, type: "error" }));
    } finally {
      setWorkoutToDelete(null);
    }
  };

  const handleStartWorkout = (workout: any) => {
    setActiveWorkout(workout);
    const startTime = new Date();
    setWorkoutStartTime(startTime);
    localStorage.setItem("activeWorkout", JSON.stringify(workout));
    localStorage.setItem("workoutStartTime", startTime.toISOString());
  };

  const handleStopWorkout = async () => {
    if (!activeWorkout || !workoutStartTime) return;

    const endTime = new Date();
    const durationMs = endTime.getTime() - workoutStartTime.getTime();
    const durationMins = Math.max(1, Math.round(durationMs / 60000));

    try {
      await logWorkoutApi({
        workoutName: activeWorkout.name,
        bodyPart: activeWorkout.bodyPart,
        date: workoutStartTime.toISOString().split("T")[0],
        startTime: workoutStartTime.toTimeString().split(" ")[0].slice(0, 5),
        endTime: endTime.toTimeString().split(" ")[0].slice(0, 5),
        duration: durationMins
      });
      dispatch(showSnackbar({ message: `Logged ${durationMins} min of ${activeWorkout.name}`, type: "success" }));
      setActiveWorkout(null);
      setWorkoutStartTime(null);
      setElapsedSeconds(0);
      localStorage.removeItem("activeWorkout");
      localStorage.removeItem("workoutStartTime");
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

    if (reportType === "daily") {
      csvContent += "Category,Workout Name,Minutes Logged\r\n";
      Object.entries(reportData.report || {}).forEach(([bodyPart, data]: [string, any]) => {
        Object.entries(data.workouts).forEach(([name, mins]: [string, any]) => {
          csvContent += `"${bodyPart}","${name}","${mins}"\r\n`;
        });
      });
    } else {
      csvContent += "Date,Category,Workout Name,Minutes Logged\r\n";
      const logs = reportData.logs || [];
      const sortedLogs = [...logs].sort((a: any, b: any) => b.date.localeCompare(a.date));
      sortedLogs.forEach((log: any) => {
        csvContent += `"${log.date}","${log.bodyPart}","${log.workoutName}","${log.duration}"\r\n`;
      });
    }

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
                <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Expires on: {new Date(profile.planEndDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}</div>
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
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorWorkout" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
                <input type="text" className="form-input" placeholder="e.g. Incline Dumbbell Press" value={newWorkout.name} onChange={e => setNewWorkout({ ...newWorkout, name: e.target.value })} />
              </div>
              <div style={{ flex: 1, minWidth: 150 }}>
                <label className="form-label">Category</label>
                <select className="form-input" value={newWorkout.bodyPart} onChange={e => setNewWorkout({ ...newWorkout, bodyPart: e.target.value })}>
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
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <button
                            className="btn-blue-outline"
                            onClick={() => {
                              setWorkoutToDelete(w);
                              setShowDeleteModal(true);
                            }}
                            style={{ padding: "8px", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--danger)", color: "var(--danger)" }}>
                            <Trash2 size={16} />
                          </button>
                          <button
                            className="btn-blue"
                            disabled={!!activeWorkout}
                            onClick={() => handleStartWorkout(w)}
                            style={{ padding: "8px", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", opacity: activeWorkout ? 0.5 : 1 }}>
                            <Play size={16} fill="currentColor" style={{ marginLeft: 2 }} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setWorkoutToDelete(null);
          }}
          onConfirm={handleDeleteWorkout}
          title="Delete Workout"
          message={`Are you sure you want to delete the workout "${workoutToDelete?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          isDestructive={true}
        />
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

          {reportType !== "daily" && reportData.logs && reportData.logs.length > 0 && (
            <div style={{ marginTop: 32 }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 16 }}>Day-wise Breakdown</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {Object.entries(
                  reportData.logs.reduce((acc: any, log: any) => {
                    if (!acc[log.date]) acc[log.date] = [];
                    acc[log.date].push(log);
                    return acc;
                  }, {})
                ).sort((a: any, b: any) => b[0].localeCompare(a[0]))
                  .map(([date, logs]: [string, any]) => (
                    <div key={date} className="gym-card" style={{ padding: "16px 20px" }}>
                      <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--primary)", borderBottom: "1px solid var(--border-color)", paddingBottom: 8, marginBottom: 12 }}>
                        {new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {logs.map((log: any, idx: number) => (
                          <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.95rem" }}>
                            <span style={{ color: "var(--text-primary)" }}>
                              {log.workoutName} <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginLeft: 4 }}>({log.bodyPart})</span>
                            </span>
                            <span style={{ fontWeight: 600 }}>{log.duration} m</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
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
                    {(Array.isArray(p.features) ? p.features.join(",").split(/[\n,]/) : (p.features || "").split(/[\n,]/)).filter((f: string) => f.trim() && !f.trim().toLowerCase().startsWith('features:')).map((f: string, i: number) => (
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

  const navItems: { id: Tab; label: string; icon: React.FC<{ size?: number }> }[] = [
    { id: "overview",  label: "Overview",   icon: LayoutDashboard as any },
    { id: "workouts",  label: "Workouts",   icon: Dumbbell as any },
    { id: "library",   label: "Workout Video",    icon: BookOpen as any },
    { id: "reports",   label: "Reports",    icon: BarChart3 as any },
    { id: "diet",      label: "My Diet",    icon: Activity as any },
    { id: "plans",     label: "Gym Plans",  icon: CreditCard as any },
    // Only shown if member has an active PT
    ...(ptState.memberPtInfo ? [{ id: "pt" as Tab, label: "Personal Trainer", icon: UserCheck as any }] : []),
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
          <div className="brand-icon-wrapper" style={{ background: 'none', boxShadow: 'none', padding: 0 }}>
            <img src="/logo.png" alt="IronPulse Logo" style={{ width: 44, height: 44, objectFit: 'contain', borderRadius: 10 }} />
          </div>
          <div>
            <h1 className="brand-name">TRAINIX</h1>
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
            <div
              style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
              onClick={() => setShowChangePassword(true)}
              title="Click to change password"
            >
              <div className="profile-avatar">
                {userName.slice(0, 2).toUpperCase()}
              </div>
              <div className="profile-info">
                <span className="profile-name">{userName}</span>
                <span className="profile-email" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <User size={10} /> View Profile
                </span>
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

  const downloadDietPDF = () => {
    const element = document.getElementById('diet-plan-container');
    if (!element) return;

    const loadHtml2Pdf = () => new Promise((resolve) => {
      if ((window as any).html2pdf) return resolve((window as any).html2pdf);
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      script.onload = () => resolve((window as any).html2pdf);
      document.body.appendChild(script);
    });

    loadHtml2Pdf().then((html2pdf: any) => {
      const opt = {
        margin: 10,
        filename: 'My_7_Day_Diet_Plan.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    });
  };

  const DietPanel = (
    <div className="page-container" style={{ padding: "16px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <header className="page-header" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", alignItems: "center", marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ background: "var(--bg-card)", padding: "10px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: "1px solid var(--border-color)" }}>
            <Activity size={24} style={{ color: "#10b981" }} />
          </div>
          <div>
            <h2 className="page-title" style={{ marginBottom: "2px", fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)" }}>My Diet & Health</h2>
            <p className="page-subtitle" style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>Track your nutrition and physical progress.</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "8px 16px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
            <Sparkles size={18} style={{ color: "#f59e0b" }} />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
              <span style={{ fontSize: "0.7rem", color: "var(--primary)", fontWeight: 700 }}>AI Credits</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>{profile?.aiCredits || 0} credit{profile?.aiCredits !== 1 ? 's' : ''}</span>
            </div>
          </div>
          <button className="btn-blue" onClick={() => setShowAiModal(true)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "10px", background: "linear-gradient(135deg, #6366f1, #4f46e5)", color: "white", fontWeight: 600, border: "none", cursor: "pointer", boxShadow: "0 4px 10px rgba(99, 102, 241, 0.3)", fontSize: "0.9rem" }}>
            <ShoppingCart size={16} /> Buy Credits
          </button>
        </div>
      </header>

      {loadingDiet ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}><Loader size={32} style={{ animation: "spin 1s linear infinite", color: "var(--primary)" }} /></div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Hero Banner */}
          <div style={{ background: "var(--bg-card)", borderRadius: "20px", padding: "32px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", overflow: "hidden", border: "1px solid var(--border-color)", boxShadow: "0 2px 10px rgba(139, 92, 246, 0.05)" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)" }} />
            <div style={{ position: "absolute", top: "20px", left: "60%", color: "#fcd34d", opacity: 0.8, fontSize: "1.2rem" }}>✨</div>
            <div style={{ position: "absolute", bottom: "30px", left: "55%", color: "#fcd34d", opacity: 0.8, fontSize: "1.5rem" }}>✨</div>
            <div style={{ position: "absolute", top: "10%", left: "75%", color: "#fcd34d", opacity: 0.8, fontSize: "1rem" }}>✨</div>

            <div style={{ zIndex: 1, flex: 1, maxWidth: "60%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", padding: "10px", borderRadius: "50%", color: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}>
                  <Sparkles size={20} />
                </div>
                <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-primary)", margin: 0, letterSpacing: "-0.5px" }}>Generate Your Diet Plan</h3>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "24px", fontWeight: 500, lineHeight: 1.5 }}>Get a personalized 7-day diet plan tailored to your goals using your latest BMI report.</p>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", gap: "16px" }}>
                    {/* Latest BMI Report Card */}
                    <div style={{ background: "var(--bg-secondary)", padding: "12px 16px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "12px", border: "1px solid var(--border-color)", boxShadow: "0 2px 4px rgba(0,0,0,0.02)", width: "260px", position: "relative" }}>
                      {latestBmiPhoto ? (
                        <div style={{ width: "36px", height: "36px", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border-color)", flexShrink: 0 }}>
                          <img src={latestBmiPhoto.reportImageUrl.startsWith("http") ? latestBmiPhoto.reportImageUrl : `http://localhost:5000${latestBmiPhoto.reportImageUrl}`} alt="BMI Report" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      ) : (
                        <div style={{ background: "rgba(16, 185, 129, 0.15)", padding: "8px", borderRadius: "8px", color: "#10b981", flexShrink: 0 }}>
                          <FileText size={20} />
                        </div>
                      )}
                      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "2px" }}>Latest BMI Report</span>
                        {latestBmiPhoto ? (
                          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>Uploaded on <strong style={{ color: "var(--text-secondary)" }}>{new Date(latestBmiPhoto.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}</strong></span>
                        ) : (
                          <span style={{ fontSize: "0.7rem", color: "#ef4444", fontWeight: 500 }}>No report uploaded</span>
                        )}
                      </div>
                      {latestBmiPhoto && (
                        <button
                          onClick={() => window.open(latestBmiPhoto.reportImageUrl.startsWith("http") ? latestBmiPhoto.reportImageUrl : `http://localhost:5000${latestBmiPhoto.reportImageUrl}`, "_blank")}
                          style={{ background: "var(--bg-hover)", border: "none", padding: "6px", borderRadius: "6px", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
                          onMouseOver={(e) => e.currentTarget.style.background = "var(--border-color)"}
                          onMouseOut={(e) => e.currentTarget.style.background = "var(--bg-hover)"}
                          title="View Report"
                        >
                          <Eye size={16} />
                        </button>
                      )}
                    </div>

                    {/* Goal Dropdown */}
                    <div style={{ background: "var(--bg-secondary)", padding: "8px 16px", borderRadius: "12px", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", justifyContent: "center", width: "160px", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                      <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginBottom: "2px", fontWeight: 600 }}>Your Goal</span>
                      <select value={dietGoal} onChange={e => setDietGoal(e.target.value)} style={{ border: "none", background: "transparent", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", outline: "none", cursor: "pointer", padding: 0 }}>
                        <option>Weight Loss</option>
                        <option>Weight Gain</option>
                        <option>Maintain Weight</option>
                      </select>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button
                    disabled={isGeneratingDiet || !latestBmiPhoto}
                    onClick={() => handleGenerateDiet(latestBmiPhoto?._id)}
                    style={{
                      background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                      color: "white",
                      border: "none",
                      borderRadius: "20px",
                      padding: "8px 16px",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      cursor: (isGeneratingDiet || !latestBmiPhoto) ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      width: "fit-content",
                      boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
                      opacity: (!latestBmiPhoto) ? 0.6 : 1,
                      transition: "all 0.2s"
                    }}
                    onMouseOver={(e) => { if (!isGeneratingDiet && latestBmiPhoto) e.currentTarget.style.transform = "translateY(-1px)" }}
                    onMouseOut={(e) => { if (!isGeneratingDiet && latestBmiPhoto) e.currentTarget.style.transform = "translateY(0)" }}
                  >
                    {isGeneratingDiet ? <Loader size={14} style={{ animation: "spin 1s linear infinite" }} /> : <><Sparkles size={14} /> Generate 7-Day Plan (1 Credit)</>}
                  </button>
                </div>
              </div>
            </div>

            <div style={{ zIndex: 1, width: "35%", display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
              <img src="/hero_diet_illustration.png" alt="Diet Plan Illustration" style={{ width: "100%", maxWidth: "250px", objectFit: "contain", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))" }} />
            </div>
          </div>



          {/* Hero Banner 2 (Workout Diet) */}
          <div style={{ background: "var(--bg-card)", borderRadius: "20px", padding: "32px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", overflow: "hidden", border: "1px solid var(--border-color)", boxShadow: "0 2px 10px rgba(16, 185, 129, 0.05)" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)" }} />
            <div style={{ position: "absolute", top: "20px", left: "60%", color: "#34d399", opacity: 0.8, fontSize: "1.2rem" }}>✨</div>
            <div style={{ position: "absolute", bottom: "30px", left: "55%", color: "#34d399", opacity: 0.8, fontSize: "1.5rem" }}>✨</div>

            <div style={{ zIndex: 1, flex: 1, maxWidth: "60%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div style={{ background: "linear-gradient(135deg, #10b981, #059669)", padding: "10px", borderRadius: "50%", color: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(16,185,129,0.3)" }}>
                  <Dumbbell size={20} />
                </div>
                <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-primary)", margin: 0, letterSpacing: "-0.5px" }}>Post-Workout Diet Plan</h3>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "24px", fontWeight: 500, lineHeight: 1.5 }}>Get a personalized 1-day diet plan tailored to today's logged workouts.</p>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-end" }}>
                <div style={{ display: "flex", gap: "12px", flexDirection: "column" }}>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ background: "var(--bg-secondary)", padding: "8px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", width: "100px" }}>
                      <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 600, display: "block", marginBottom: "2px" }}>Age</span>
                      <input type="number" placeholder="yrs" value={memberAge} onChange={e => setMemberAge(e.target.value ? Number(e.target.value) : "")} style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontWeight: 700, fontSize: "0.85rem" }} />
                    </div>
                    <div style={{ background: "var(--bg-secondary)", padding: "8px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", width: "100px" }}>
                      <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 600, display: "block", marginBottom: "2px" }}>Height</span>
                      <input type="number" placeholder="cm" value={memberHeight} onChange={e => setMemberHeight(e.target.value ? Number(e.target.value) : "")} style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontWeight: 700, fontSize: "0.85rem" }} />
                    </div>
                    <div style={{ background: "var(--bg-secondary)", padding: "8px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", width: "100px" }}>
                      <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 600, display: "block", marginBottom: "2px" }}>Weight</span>
                      <input type="number" placeholder="kg" value={memberWeight} onChange={e => setMemberWeight(e.target.value ? Number(e.target.value) : "")} style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontWeight: 700, fontSize: "0.85rem" }} />
                    </div>
                    <div style={{ background: "var(--bg-secondary)", padding: "8px 12px", borderRadius: "10px", border: "1px solid var(--border-color)", width: "140px" }}>
                      <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 600, display: "block", marginBottom: "2px" }}>Goal</span>
                      <select value={workoutDietGoal} onChange={e => setWorkoutDietGoal(e.target.value)} style={{ border: "none", background: "transparent", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", outline: "none", cursor: "pointer", padding: 0, width: "100%" }}>
                        <option>Weight Loss</option>
                        <option>Weight Gain</option>
                        <option>Maintain Weight</option>
                      </select>
                    </div>
                  </div>
                  <button
                    disabled={isGeneratingWorkoutDiet}
                    onClick={handleGenerateWorkoutDiet}
                    style={{
                      background: "linear-gradient(135deg, #10b981, #059669)",
                      color: "white",
                      border: "none",
                      borderRadius: "20px",
                      padding: "8px 16px",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      cursor: isGeneratingWorkoutDiet ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      width: "fit-content",
                      boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                      transition: "all 0.2s"
                    }}
                  >
                    {isGeneratingWorkoutDiet ? <Loader size={14} style={{ animation: "spin 1s linear infinite" }} /> : <><Sparkles size={14} /> Generate 1-Day Plan (1 Credit)</>}
                  </button>
                </div>
              </div>
            </div>
            
            <div style={{ zIndex: 1, width: "35%", display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
              <img src="/hero_diet_illustration.png" alt="Workout Diet Illustration" style={{ width: "100%", maxWidth: "220px", objectFit: "contain", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))" }} />
            </div>
          </div>

          {/* Current Diet Plan Card */}
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", padding: "32px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", borderBottom: "1px solid var(--border-color)", paddingBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ background: "rgba(79, 70, 229, 0.1)", color: "#4f46e5", padding: "10px", borderRadius: "10px" }}><PenLine size={20} /></div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>Current Diet Plan</h3>
              </div>
              {dietPlans.length > 0 && dietPlans[0].days && (
                <button onClick={downloadDietPDF} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", padding: "8px 16px", borderRadius: "10px", color: "var(--text-primary)", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem", boxShadow: "0 1px 2px rgba(0,0,0,0.05)", transition: "all 0.2s" }} onMouseOver={(e) => e.currentTarget.style.background = "var(--bg-hover)"} onMouseOut={(e) => e.currentTarget.style.background = "var(--bg-secondary)"}>
                  Download PDF
                </button>
              )}
            </div>

            {dietPlans.length > 0 && dietPlans[0].days ? (
              <div id="diet-plan-container">
                {/* General Recommendations & Foods to Avoid */}
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
                  {(dietPlans[0].foodsToAvoid?.length > 0) && (
                    <div style={{ flex: 1, minWidth: "280px", background: "#fef2f2", border: "1px solid #fecaca", padding: "16px", borderRadius: "12px" }}>
                      <h4 style={{ color: "#dc2626", fontWeight: 800, marginBottom: "8px", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "6px" }}>🚫 Foods to Avoid</h4>
                      <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "0.85rem", color: "#7f1d1d", lineHeight: 1.5 }}>
                        {dietPlans[0].foodsToAvoid.map((food: string, i: number) => <li key={i}>{food}</li>)}
                      </ul>
                    </div>
                  )}
                  {(dietPlans[0].generalRecommendations?.length > 0) && (
                    <div style={{ flex: 1, minWidth: "280px", background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "16px", borderRadius: "12px" }}>
                      <h4 style={{ color: "#059669", fontWeight: 800, marginBottom: "8px", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "6px" }}>💡 General Recommendations</h4>
                      <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "0.85rem", color: "#065f46", lineHeight: 1.5 }}>
                        {dietPlans[0].generalRecommendations.map((rec: string, i: number) => <li key={i}>{rec}</li>)}
                      </ul>
                    </div>
                  )}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
                  {dietPlans[0].days.map((day: any) => (
                    <div key={day.dayNumber} style={{ background: "var(--bg-secondary)", padding: "20px", borderRadius: "12px", border: "1px solid var(--border-color)", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", marginBottom: "16px" }}>
                        <h4 style={{ color: "#4f46e5", fontWeight: 800, fontSize: "1.1rem", margin: 0 }}>Day {day.dayNumber}</h4>
                        <div style={{ fontSize: "0.75rem", display: "flex", gap: "8px", fontWeight: 700, color: "var(--text-muted)", flexWrap: "wrap", background: "var(--bg-hover)", padding: "4px 8px", borderRadius: "6px" }}>
                          <span title="Calories">🔥 {day.calories} kcal</span>
                          <span title="Protein">🥩 {day.protein}g P</span>
                          <span title="Carbs">🍞 {day.carbs}g C</span>
                          <span title="Fats">🥑 {day.fats}g F</span>
                        </div>
                      </div>

                      <div style={{ fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "12px" }}>
                        {day.breakfast && <div><strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "2px" }}>Breakfast</strong> <span style={{ color: "var(--text-secondary)", lineHeight: 1.4 }}>{day.breakfast}</span></div>}
                        {day.morningSnack && <div><strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "2px" }}>Morning Snack</strong> <span style={{ color: "var(--text-secondary)", lineHeight: 1.4 }}>{day.morningSnack}</span></div>}
                        {day.lunch && <div><strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "2px" }}>Lunch</strong> <span style={{ color: "var(--text-secondary)", lineHeight: 1.4 }}>{day.lunch}</span></div>}
                        {day.eveningSnack && <div><strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "2px" }}>Evening Snack</strong> <span style={{ color: "var(--text-secondary)", lineHeight: 1.4 }}>{day.eveningSnack}</span></div>}
                        {day.dinner && <div><strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "2px" }}>Dinner</strong> <span style={{ color: "var(--text-secondary)", lineHeight: 1.4 }}>{day.dinner}</span></div>}
                        {day.bedtimeSnack && <div><strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "2px" }}>Bedtime</strong> <span style={{ color: "var(--text-secondary)", lineHeight: 1.4 }}>{day.bedtimeSnack}</span></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0" }}>
                <img src="/empty_diet_plan_illustration.png" alt="No Diet Plan" style={{ width: "180px", marginBottom: "24px", opacity: 0.9, filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.05))" }} />
                <h4 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "8px", margin: 0 }}>No Diet Plan Yet</h4>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "24px", fontWeight: 500 }}>Generate your first AI diet plan to view it here.</p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  style={{ background: "var(--bg-secondary)", border: "2px solid #6366f1", color: "#6366f1", padding: "10px 24px", borderRadius: "12px", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem", transition: "all 0.2s", boxShadow: "0 4px 12px rgba(99,102,241,0.1)" }}
                  onMouseOver={(e) => { e.currentTarget.style.background = "var(--bg-hover)"; e.currentTarget.style.transform = "translateY(-2px)" }}
                  onMouseOut={(e) => { e.currentTarget.style.background = "var(--bg-secondary)"; e.currentTarget.style.transform = "translateY(0)" }}
                >
                  Generate Your Plan
                </button>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );

  // ── Personal Trainer Panel (member view) ────────────────────────────────
  const handlePtDateChange = (newDate: string) => {
    setPtDate(newDate);
    if (profile?._id) {
      dispatch(fetchPtWorkoutPlansAction(profile._id, newDate));
      dispatch(fetchPtDietPlansAction(profile._id, newDate));
      dispatch(fetchPtMeasurementsAction(profile._id, newDate));
    }
  };

  const PersonalTrainerPanel = (
    <div className="page-container">
      <header className="page-header" style={{ marginBottom: 24 }}>
        <div>
          <h2 className="page-title" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <UserCheck size={24} color="#6366f1" /> Personal Trainer
          </h2>
          <p className="page-subtitle">Plans and measurements created by your assigned trainer</p>
        </div>
      </header>

      {/* Trainer Info Card */}
      {ptState.memberPtInfo && (
        <div style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))",
          border: "1.5px solid rgba(99,102,241,0.3)",
          borderRadius: 16, padding: "20px 24px", marginBottom: 24,
          display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 800, fontSize: 20, flexShrink: 0,
          }}>
            {(ptState.memberPtInfo.trainerId?.fullName || "PT").slice(0, 2).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>
              {ptState.memberPtInfo.trainerId?.fullName || "Your Trainer"}
            </p>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)" }}>
              Your Personal Trainer · Assigned by {ptState.memberPtInfo.assignedBy?.fullName || "—"}
            </p>
          </div>
          <div style={{ padding: "6px 14px", background: "rgba(99,102,241,0.15)", borderRadius: 20, color: "#6366f1", fontWeight: 700, fontSize: 13 }}>
            Active PT
          </div>
        </div>
      )}

      {/* Date Picker */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", background: "var(--bg-card)", borderRadius: 12, border: "1.5px solid var(--border-color)" }}>
          <Calendar size={16} color="var(--text-muted)" />
          <input
            type="date"
            value={ptDate}
            onChange={e => handlePtDateChange(e.target.value)}
            style={{ border: "none", background: "none", color: "var(--text-primary)", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          />
        </div>
        {ptState.loading && <Loader size={18} style={{ animation: "spin 1s linear infinite", color: "var(--text-muted)" }} />}
      </div>

      {/* Workout Plan Card */}
      <div className="gym-card" style={{ marginBottom: 16 }}>
        <h3 style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, fontSize: 16, fontWeight: 700 }}>
          <Dumbbell size={18} color="#6366f1" /> Today's Workout Plan
        </h3>
        {ptState.workoutPlans.length === 0 ? (
          <div style={{ textAlign: "center", padding: "24px 0", color: "var(--text-muted)" }}>
            <Dumbbell size={32} style={{ opacity: 0.3, marginBottom: 8 }} />
            <p style={{ margin: 0, fontSize: 14 }}>No workout plan for {ptDate}</p>
          </div>
        ) : ptState.workoutPlans.map((plan: any) => (
          <div key={plan._id} style={{ marginBottom: 12 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ color: "var(--text-muted)", fontSize: 12 }}>
                  <th style={{ textAlign: "left", paddingBottom: 8, fontWeight: 600 }}>Exercise</th>
                  <th style={{ textAlign: "center", paddingBottom: 8, fontWeight: 600 }}>Sets</th>
                  <th style={{ textAlign: "center", paddingBottom: 8, fontWeight: 600 }}>Reps</th>
                  <th style={{ textAlign: "center", paddingBottom: 8, fontWeight: 600 }}>Weight</th>
                </tr>
              </thead>
              <tbody>
                {plan.exercises?.map((ex: any, i: number) => (
                  <tr key={i} style={{ borderTop: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "8px 0", fontWeight: 600 }}>{ex.name}</td>
                    <td style={{ textAlign: "center", padding: "8px 0" }}>{ex.sets}</td>
                    <td style={{ textAlign: "center", padding: "8px 0" }}>{ex.reps}</td>
                    <td style={{ textAlign: "center", padding: "8px 0", color: "var(--text-muted)" }}>{ex.weight || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {plan.generalNotes && <p style={{ margin: "10px 0 0", fontSize: 13, color: "var(--text-muted)", fontStyle: "italic" }}>Note: {plan.generalNotes}</p>}
          </div>
        ))}
      </div>

      {/* Diet Plan Card */}
      <div className="gym-card" style={{ marginBottom: 16 }}>
        <h3 style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, fontSize: 16, fontWeight: 700 }}>
          <Salad size={18} color="#22c55e" /> Today's Diet Plan
        </h3>
        {ptState.dietPlans.length === 0 ? (
          <div style={{ textAlign: "center", padding: "24px 0", color: "var(--text-muted)" }}>
            <Salad size={32} style={{ opacity: 0.3, marginBottom: 8 }} />
            <p style={{ margin: 0, fontSize: 14 }}>No diet plan for {ptDate}</p>
          </div>
        ) : ptState.dietPlans.map((plan: any) => (
          <div key={plan._id}>
            {plan.meals?.map((meal: any, i: number) => (
              <div key={i} style={{
                display: "flex", gap: 12, padding: "10px 0",
                borderTop: i === 0 ? "none" : "1px solid var(--border-color)",
                flexWrap: "wrap",
              }}>
                <span style={{ minWidth: 120, fontWeight: 700, fontSize: 13, color: "#22c55e" }}>{meal.mealType}</span>
                <span style={{ flex: 1, fontSize: 14, lineHeight: 1.5 }}>{meal.foodItems}</span>
                {meal.calories && <span style={{ fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap", alignSelf: "center" }}>{meal.calories} kcal</span>}
              </div>
            ))}
            {plan.waterIntake && <p style={{ margin: "10px 0 0", fontSize: 13, color: "#06b6d4" }}>💧 Water intake: {plan.waterIntake}L</p>}
            {plan.generalNotes && <p style={{ margin: "8px 0 0", fontSize: 13, color: "var(--text-muted)", fontStyle: "italic" }}>Note: {plan.generalNotes}</p>}
          </div>
        ))}
      </div>

      {/* Measurements Card */}
      <div className="gym-card">
        <h3 style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, fontSize: 16, fontWeight: 700 }}>
          <Ruler size={18} color="#f59e0b" /> Measurements — {ptDate}
        </h3>
        {ptState.measurements.length === 0 ? (
          <div style={{ textAlign: "center", padding: "24px 0", color: "var(--text-muted)" }}>
            <Ruler size={32} style={{ opacity: 0.3, marginBottom: 8 }} />
            <p style={{ margin: 0, fontSize: 14 }}>No measurements recorded for {ptDate}</p>
          </div>
        ) : ptState.measurements.map((m: any) => (
          <div key={m._id}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10, marginBottom: 12 }}>
              {[
                ["Weight", m.weight, "kg"], ["Height", m.height, "cm"],
                ["Chest", m.chest, "cm"], ["Waist", m.waist, "cm"],
                ["Hips", m.hips, "cm"], ["Arms", m.arms, "cm"],
                ["Thighs", m.thighs, "cm"], ["Shoulders", m.shoulders, "cm"],
                ["Body Fat", m.bodyFat, "%"], ["BMI", m.bmi, ""],
              ].filter(([, val]) => val != null).map(([label, val, unit]) => (
                <div key={String(label)} style={{ background: "var(--bg-secondary)", borderRadius: 10, padding: "10px 14px", border: "1px solid var(--border-color)" }}>
                  <p style={{ margin: 0, fontSize: 11, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</p>
                  <p style={{ margin: "4px 0 0", fontSize: 20, fontWeight: 800 }}>
                    {val}<span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: 2 }}>{unit}</span>
                  </p>
                </div>
              ))}
            </div>
            {m.notes && <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)", fontStyle: "italic" }}>Note: {m.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );

  const panels: Record<Tab, React.ReactNode> = {
    overview: OverviewPanel,
    workouts: WorkoutsPanel,
    reports: ReportsPanel,
    plans: PlansPanel,
    diet: DietPanel,
    library: <WorkoutLibraryPage />,
    pt: PersonalTrainerPanel,
  };

  return (
    <div className="app-container">
      {showChangePassword && (
        <UserProfileModal
          user={{ fullName: userName, email: (user?.email as string) || profile?.email || "", role: "member" }}
          onClose={() => setShowChangePassword(false)}
        />
      )}
      {showAiModal && (
        <PurchaseAICreditsModal
          userEmail={(user?.email as string) || profile?.email || ""}
          onClose={() => setShowAiModal(false)}
          onSuccess={(newTotalCredits) => setProfile((prev: any) => ({ ...prev, aiCredits: newTotalCredits }))}
        />
      )}
      {Sidebar}

      <div className="main-content">
        {/* Mobile header */}
        <header className="mobile-header">
          <button className="menu-toggle-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src="/logo.png" alt="Logo" style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 8 }} />
            <span className="brand-name" style={{ fontSize: "1rem" }}>TRAINIX</span>
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
