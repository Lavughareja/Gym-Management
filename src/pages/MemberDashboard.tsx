import React, { useState, useEffect } from "react";
import { LogOut, Activity, Dumbbell, BarChart3, Clock, Play, Square, Loader, Menu, X, Moon, Sun, LayoutDashboard, CreditCard, ChevronRight, CheckCircle2, User, Sparkles, ShoppingCart, FileText, Target, ClipboardList, ShieldCheck, PenLine, Eye, Trash2, BookOpen, UserCheck, Calendar, Salad, Ruler, ChevronDown, ChevronUp, Flame, Upload, Download, CheckCircle, Bell } from "lucide-react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import UserProfileModal from "../components/UserProfileModal/UserProfileModal";
import PurchaseAICreditsModal from "../components/PurchaseAICreditsModal/PurchaseAICreditsModal";
import ConfirmationModal from "../components/ConfirmationModal/ConfirmationModal";
import { getTodayAttendanceApi, getMemberAttendanceHistoryApi } from "../services/apis/attendanceApis";
import { getWorkoutsApi, createWorkoutApi, logWorkoutApi, getWorkoutReportApi, deleteWorkoutApi } from "../services/apis/workoutApis";
import { getMeApi } from "../services/apis/memberApis";
import { getPlansApi } from "../services/apis/planApis";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { showSnackbar } from "../redux/slices/snackbarSlice";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getWeeklyStatsApi, getStreakStatsApi, completeChallengeApi } from "../services/apis/memberApis";
import { getLatestBmiReportApi, uploadBmiReportApi } from "../services/apis/bmiApis";
import { getMemberDietHistoryApi, generateDietPlanApi, generateDietPlanFromWorkoutApi } from "../services/apis/dietApis";
import WorkoutLibraryPage from "../components/WorkoutLibrary/WorkoutLibraryPage";
import { fetchMemberPtInfoAction, fetchPtWorkoutPlansAction, fetchPtDietPlansAction, fetchPtMeasurementsAction, acceptPtAssignmentAction, rejectPtAssignmentAction } from "../redux/actions/ptActions";
import BMICalculator from "../components/BMICalculator/BMICalculator";
import CaloriesCalculator from "../components/CaloriesCalculator/CaloriesCalculator";
import WaterReminder from "../components/WaterReminder/WaterReminder";
import EventsViewPanel from "../components/DashboardPanels/EventsViewPanel";
import MemberPlanInvoicesPanel from "../components/DashboardPanels/MemberPlanInvoicesPanel";
import "./MemberDashboard.css";
const DEFAULT_WORKOUTS = [{
  _id: "def_chest_1",
  name: "Bench Press",
  bodyPart: "Chest"
}, {
  _id: "def_chest_2",
  name: "Incline Dumbbell Press",
  bodyPart: "Chest"
}, {
  _id: "def_chest_3",
  name: "Cable Crossovers",
  bodyPart: "Chest"
}, {
  _id: "def_shoulder_1",
  name: "Shoulder Press",
  bodyPart: "Shoulder"
}, {
  _id: "def_shoulder_2",
  name: "Lateral Raises",
  bodyPart: "Shoulder"
}, {
  _id: "def_shoulder_3",
  name: "Front Raises",
  bodyPart: "Shoulder"
}, {
  _id: "def_legs_1",
  name: "Squats",
  bodyPart: "Legs"
}, {
  _id: "def_legs_2",
  name: "Leg Press",
  bodyPart: "Legs"
}, {
  _id: "def_legs_3",
  name: "Leg Extensions",
  bodyPart: "Legs"
}, {
  _id: "def_back_1",
  name: "Pull-ups",
  bodyPart: "Back"
}, {
  _id: "def_back_2",
  name: "Deadlifts",
  bodyPart: "Back"
}, {
  _id: "def_back_3",
  name: "Lat Pulldowns",
  bodyPart: "Back"
}, {
  _id: "def_core_1",
  name: "Crunches",
  bodyPart: "Core"
}, {
  _id: "def_core_2",
  name: "Plank",
  bodyPart: "Core"
}, {
  _id: "def_cardio_1",
  name: "Treadmill",
  bodyPart: "Cardio"
}, {
  _id: "def_cardio_2",
  name: "Cycling",
  bodyPart: "Cardio"
}, {
  _id: "def_forearm_1",
  name: "Wrist Curls",
  bodyPart: "Forearm"
}];
export const genericDietPlan = [{
  dayNumber: 1,
  calories: 2850,
  protein: 165,
  carbs: 355,
  fats: 72,
  morningSnack: "150g Oats + 1 Scoop Whey",
  breakfast: "2 Brown Bread + Peanut Butter + 1 Banana",
  lunch: "200g Rice + 100g Veggies + 100g Paneer",
  eveningSnack: "1 Apple + 20 Almonds",
  preWorkout: "2 Bananas",
  postWorkout: "1 Scoop Whey + 200g Rice",
  dinner: "Dal + 2 Roti + 100g Veggies + 100g Paneer",
  bedtimeSnack: "250ml Milk"
}, {
  dayNumber: 2,
  calories: 2780,
  protein: 160,
  carbs: 345,
  fats: 70,
  morningSnack: "150g Poha + 1 Scoop Whey",
  breakfast: "2 Multigrain Toast + Peanut Butter + Apple",
  lunch: "3 Roti + 100g Paneer + Veggies",
  eveningSnack: "Mixed Fruits + 20 Peanuts",
  preWorkout: "2 Bananas",
  postWorkout: "1 Scoop Whey + 200g Rice",
  dinner: "Dal + Rice + Salad",
  bedtimeSnack: "250ml Milk"
}, {
  dayNumber: 3,
  calories: 2900,
  protein: 168,
  carbs: 360,
  fats: 73,
  morningSnack: "150g Upma + 1 Scoop Whey",
  breakfast: "Vegetable Sandwich + 1 Banana",
  lunch: "200g Rice + Dal + Veggies",
  eveningSnack: "Apple + 15 Cashews",
  preWorkout: "Banana + Black Coffee",
  postWorkout: "1 Scoop Whey + 200g Sweet Potato",
  dinner: "2 Roti + Paneer + Veggies",
  bedtimeSnack: "250ml Milk"
}, {
  dayNumber: 4,
  calories: 2820,
  protein: 162,
  carbs: 350,
  fats: 71,
  morningSnack: "150g Oats + 1 Scoop Whey",
  breakfast: "Oats Chilla + Peanut Butter",
  lunch: "3 Roti + Soya Chunks + Veggies",
  eveningSnack: "Orange + Roasted Chana",
  preWorkout: "2 Bananas",
  postWorkout: "1 Scoop Whey + 200g Rice",
  dinner: "Dal + 2 Roti + Mixed Veg",
  bedtimeSnack: "250ml Milk"
}, {
  dayNumber: 5,
  calories: 2870,
  protein: 166,
  carbs: 355,
  fats: 72,
  morningSnack: "150g Poha + 1 Scoop Whey",
  breakfast: "2 Brown Bread + Almond Butter + Banana",
  lunch: "200g Rice + Rajma + Veggies",
  eveningSnack: "Banana + Almonds",
  preWorkout: "Banana + Dates",
  postWorkout: "1 Scoop Whey + 200g Rice",
  dinner: "Paneer Bhurji + 2 Roti",
  bedtimeSnack: "250ml Milk"
}, {
  dayNumber: 6,
  calories: 2750,
  protein: 158,
  carbs: 340,
  fats: 69,
  morningSnack: "150g Dalia + 1 Scoop Whey",
  breakfast: "Vegetable Poha + Apple",
  lunch: "3 Roti + Paneer Bhurji + Veggies",
  eveningSnack: "Fruit Bowl",
  preWorkout: "2 Bananas",
  postWorkout: "1 Scoop Whey + 200g Sweet Potato",
  dinner: "Khichdi + Curd",
  bedtimeSnack: "250ml Milk"
}, {
  dayNumber: 7,
  calories: 2800,
  protein: 160,
  carbs: 345,
  fats: 70,
  morningSnack: "150g Oats + 1 Scoop Whey",
  breakfast: "Paneer Sandwich + Banana",
  lunch: "Rice + Chole + Salad",
  eveningSnack: "Apple + Walnuts",
  preWorkout: "Banana + Peanut Butter",
  postWorkout: "1 Scoop Whey + 200g Rice",
  dinner: "Dal + 2 Roti + Paneer",
  bedtimeSnack: "250ml Milk"
}];

// ── Route map for member panels ───────────────────────────────────────────────
const MEMBER_PANEL_ROUTES: Record<string, string> = {
  overview: "/member/overview",
  my_plan: "/member/plan-invoices",
  health_monitor: "/member/health-monitor",
  workouts: "/member/workouts",
  library: "/member/workout-video",
  reports: "/member/reports",
  diet: "/member/diet",
  plans: "/member/plans",
  challenges: "/member/challenges",
  events: "/member/announcements",
  pt: "/member/personal-trainer"
};
function getMemberPanelFromPath(pathname: string): string {
  const seg = pathname.replace("/member/", "").split("/")[0];
  const map: Record<string, string> = {
    overview: "overview",
    "plan-invoices": "my_plan",
    "health-monitor": "health_monitor",
    workouts: "workouts",
    "workout-video": "library",
    reports: "reports",
    diet: "diet",
    plans: "plans",
    challenges: "challenges",
    announcements: "events",
    "personal-trainer": "pt"
  };
  if (pathname === "/member" || pathname === "/member/") return "overview";
  return map[seg] || "not_found";
}
type Tab = "overview" | "health_monitor" | "workouts" | "reports" | "plans" | "diet" | "library" | "pt" | "challenges" | "events" | "my_plan";
export const MemberDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const {
    user
  } = useAppSelector(state => state.auth);
  const ptState = useAppSelector(s => s.pt);
  const {
    branding
  } = useSelector((state: RootState) => state.whiteLabel);

  // Read user info from localStorage
  const localUserStr = localStorage.getItem("dashUser");
  const localUser = localUserStr ? JSON.parse(localUserStr) : null;
  const userName = (user as any)?.fullName || localUser?.ownerName || "Member";
  const gymName = localUser?.gymId?.name || "Trainix Gym";

  // Derive active tab from URL
  const activeTab = getMemberPanelFromPath(location.pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarDietExpanded, setSidebarDietExpanded] = useState(false);
  const [sidebarHealthExpanded, setSidebarHealthExpanded] = useState(false);
  const [healthMonitorSection, setHealthMonitorSection] = useState<"bmi" | "calories" | "water" | "health_kit">("bmi");
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark-theme"));
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Redirect /member root to /member/overview and handle subroutes
  useEffect(() => {
    if (location.pathname === "/member" || location.pathname === "/member/") {
      navigate("/member/overview", {
        replace: true
      });
      return;
    }
    const parts = location.pathname.split("/");
    if (parts.length > 3) {
      const subPath = parts[3];
      if (activeTab === "health_monitor") {
        if (subPath === "bmi") setHealthMonitorSection("bmi");else if (subPath === "calories") setHealthMonitorSection("calories");else if (subPath === "water-reminder") setHealthMonitorSection("water");else if (subPath === "health-kit") setHealthMonitorSection("health_kit");
        setSidebarHealthExpanded(true);
      } else if (activeTab === "diet") {
        if (subPath === "normal") setExpandedMainSections({
          normalDiet: true,
          aiDiet: false
        });else if (subPath === "premium") setExpandedMainSections({
          normalDiet: false,
          aiDiet: true
        });
        setSidebarDietExpanded(true);
      }
    }
  }, [location.pathname, activeTab, navigate]);

  /** Navigate to a member panel by id */
  const goToPanel = (id: string, subId?: string) => {
    let path = MEMBER_PANEL_ROUTES[id] || "/member/overview";
    if (subId) {
      path = `${path}/${subId}`;
    }
    navigate(path);
    setSidebarOpen(false);
  };
  const handleLogout = async () => {
    const {
      removeFcmToken
    } = await import("../utils/firebase");
    await removeFcmToken().catch(() => {});
    const {
      logoutAction
    } = await import("../redux/actions/authActions");
    await dispatch(logoutAction());
    localStorage.removeItem("dashUser");
    navigate("/login", {
      replace: true
    });
  };

  // Daily Log / Overview state
  const [attendance, setAttendance] = useState<any[]>([]);
  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [weeklyStats, setWeeklyStats] = useState<{
    dailyData: any[];
    trends: any[];
  } | null>(null);
  const [streakStats, setStreakStats] = useState<{
    currentStreak: number;
    milestones: any[];
  } | null>(null);

  // Workouts state
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loadingWorkouts, setLoadingWorkouts] = useState(false);
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    name: "",
    bodyPart: "Chest"
  });
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
  const [uploadingBmi, setUploadingBmi] = useState(false);
  const [isGeneratingDiet, setIsGeneratingDiet] = useState(false);
  const [selectedDietDay, setSelectedDietDay] = useState(1);
  const [selectedGenericDay, setSelectedGenericDay] = useState(1);
  const [expandedMainSections, setExpandedMainSections] = useState({
    normalDiet: true,
    aiDiet: false
  });
  const [expandedDietMeals, setExpandedDietMeals] = useState<Record<string, boolean>>({});
  const toggleDietMeal = (key: string) => {
    setExpandedDietMeals(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
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
  const handlePtDateChange = (newDate: string) => {
    setPtDate(newDate);
    if (profile?._id) {
      dispatch(fetchPtWorkoutPlansAction(profile._id, newDate));
      dispatch(fetchPtDietPlansAction(profile._id, newDate));
      dispatch(fetchPtMeasurementsAction(profile._id, newDate));
    }
  };

  // Challenges state
  const [dailyChallenges, setDailyChallenges] = useState([{
    id: 1,
    text: "Complete a workout session today",
    xp: 10,
    completed: false
  }, {
    id: 2,
    text: "Generate a Diet Plan",
    xp: 20,
    completed: false
  }, {
    id: 3,
    text: "Maintain a 30-day streak",
    xp: 80,
    completed: false
  }]);
  const [generatedDietPlanToday, setGeneratedDietPlanToday] = useState(false);
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
    const m = Math.floor(totalSeconds % 3600 / 60);
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
      setAttendance([{
        id: 1,
        time: "07:30 AM",
        status: "SUCCESS"
      }, {
        id: 2,
        time: "09:00 AM",
        status: "SUCCESS"
      }]);
    }
    try {
      const historyRes = await getMemberAttendanceHistoryApi();
      if (historyRes.data?.attendance) {
        setAttendanceHistory(historyRes.data.attendance);
      }
    } catch (err) {
      console.error("History fetch error", err);
    }
    try {
      const resStats = await getWeeklyStatsApi();
      if (resStats.data) {
        setWeeklyStats(resStats.data);
      }
    } catch (err) {
      console.error("Weekly stats fetch error", err);
    }
    try {
      const resStreak = await getStreakStatsApi();
      if (resStreak.data) {
        setStreakStats(resStreak.data);
      }
    } catch (err) {
      console.error("Streak stats fetch error", err);
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
      const [dietRes, bmiRes] = await Promise.all([getMemberDietHistoryApi(profile._id), getLatestBmiReportApi(profile._id)]);
      setDietPlans(dietRes.data.dietPlans || []);
      setLatestBmiPhoto(bmiRes.data.report || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDiet(false);
    }
  };
  const handleDownloadReport = async (url: string) => {
    try {
      if (url.includes('cloudinary.com')) {
        const parts = url.split('/upload/');
        if (parts.length === 2) {
          const downloadUrl = `${parts[0]}/upload/fl_attachment/${parts[1]}`;
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = '';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return;
        }
      }
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = url.split('/').pop() || 'report';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed", error);
      window.open(url, '_blank');
    }
  };
  const handleUploadBmi = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    if (!profile?._id) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("memberId", profile._id);
    formData.append("goal", dietGoal);
    setUploadingBmi(true);
    try {
      await uploadBmiReportApi(formData);
      dispatch(showSnackbar({
        message: "BMI Report uploaded successfully!",
        type: "success"
      }));
      fetchDietData();
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to upload BMI Report";
      dispatch(showSnackbar({
        message: msg,
        type: "error"
      }));
    } finally {
      setUploadingBmi(false);
    }
  };
  const handleGenerateDiet = async (bmiReportId: string) => {
    if ((profile?.aiCredits || 0) < 1) {
      dispatch(showSnackbar({
        message: "Not enough AI credits! Please purchase credits first.",
        type: "error"
      }));
      setShowAiModal(true);
      return;
    }
    setIsGeneratingDiet(true);
    try {
      const res = await generateDietPlanApi({
        bmiReportId,
        goal: dietGoal
      });
      dispatch(showSnackbar({
        message: "Diet Plan Generated!",
        type: "success"
      }));
      // Update credits locally
      if (res.data.remainingCredits !== undefined) {
        setProfile((prev: any) => ({
          ...prev,
          aiCredits: res.data.remainingCredits
        }));
      }
      setGeneratedDietPlanToday(true);
      fetchDietData();
    } catch (err: any) {
      dispatch(showSnackbar({
        message: err?.response?.data?.message || "Failed to generate diet plan",
        type: "error"
      }));
    } finally {
      setIsGeneratingDiet(false);
    }
  };
  const handleGenerateWorkoutDiet = async () => {
    if (!memberAge || !memberHeight || !memberWeight) {
      dispatch(showSnackbar({
        message: "Please fill in age, height, and weight.",
        type: "error"
      }));
      return;
    }
    if ((profile?.aiCredits || 0) < 1) {
      dispatch(showSnackbar({
        message: "Not enough AI credits! Please purchase credits first.",
        type: "error"
      }));
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
      dispatch(showSnackbar({
        message: "Workout Diet Plan Generated!",
        type: "success"
      }));
      if (res.data.remainingCredits !== undefined) {
        setProfile((prev: any) => ({
          ...prev,
          aiCredits: res.data.remainingCredits
        }));
      }
      setGeneratedDietPlanToday(true);
      fetchDietData();
    } catch (err: any) {
      dispatch(showSnackbar({
        message: err?.response?.data?.message || "Failed to generate diet plan",
        type: "error"
      }));
    } finally {
      setIsGeneratingWorkoutDiet(false);
    }
  };
  const handleCreateWorkout = async () => {
    if (!newWorkout.name.trim()) {
      dispatch(showSnackbar({
        message: "Please enter a workout name",
        type: "error"
      }));
      return;
    }
    try {
      await createWorkoutApi(newWorkout);
      dispatch(showSnackbar({
        message: "Workout created!",
        type: "success"
      }));
      setShowAddWorkout(false);
      setNewWorkout({
        name: "",
        bodyPart: "Chest"
      });
      fetchWorkouts();
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to create workout";
      dispatch(showSnackbar({
        message: msg,
        type: "error"
      }));
    }
  };
  const handleDeleteWorkout = async () => {
    if (!workoutToDelete) return;
    if (workoutToDelete._id.startsWith("def_")) {
      const updated = [...deletedDefaults, workoutToDelete._id];
      setDeletedDefaults(updated);
      localStorage.setItem("deletedDefaults", JSON.stringify(updated));
      dispatch(showSnackbar({
        message: "Workout deleted successfully",
        type: "success"
      }));
      setWorkoutToDelete(null);
      // We don't necessarily need to call fetchWorkouts from backend here, 
      // but let's just manually update state for instant feedback.
      setWorkouts(prev => prev.filter(w => w._id !== workoutToDelete._id));
      return;
    }
    try {
      await deleteWorkoutApi(workoutToDelete._id);
      dispatch(showSnackbar({
        message: "Workout deleted successfully",
        type: "success"
      }));
      fetchWorkouts();
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to delete workout";
      dispatch(showSnackbar({
        message: msg,
        type: "error"
      }));
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
      dispatch(showSnackbar({
        message: `Logged ${durationMins} min of ${activeWorkout.name}`,
        type: "success"
      }));
      setActiveWorkout(null);
      setWorkoutStartTime(null);
      setElapsedSeconds(0);
      localStorage.removeItem("activeWorkout");
      localStorage.removeItem("workoutStartTime");
    } catch (err) {
      dispatch(showSnackbar({
        message: "Failed to log workout",
        type: "error"
      }));
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
      dispatch(showSnackbar({
        message: "No data to download",
        type: "info"
      }));
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

  // Calendar Helpers
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const prevMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth - 1, 1));
  };
  const nextMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Convert history array to a set of date strings for easy lookup
  const attendedDates = new Set(attendanceHistory.map(a => a.date));

  // Get logs for the selected date
  const selectedDateString = selectedDate.toISOString().split("T")[0];
  const selectedDateLogs = attendanceHistory.filter(a => a.date === selectedDateString).sort((a, b) => a.time.localeCompare(b.time));
  const OverviewPanel = <div className="page-container">
      <header className="page-header">
        <div>
          <h2 className="page-title">Welcome back, {userName.split(" ")[0]} 💪</h2>
          <p className="page-subtitle">Track your progress and crush your goals!</p>
        </div>
      </header>

      <div className="member-dashboard-inline-1">
        {profile?.planEndDate && <div className="gym-card member-dashboard-inline-2">
            <h3 className="member-dashboard-inline-3">My Active Plan</h3>
            <div className="member-dashboard-inline-4">
              <div>
                <div className="member-dashboard-inline-5">{profile.planId ? profile.planId.name : "Gym Membership"}</div>
                <div className="member-dashboard-inline-6">Expires on: {new Date(profile.planEndDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
              })}</div>
              </div>
              <div className="member-dashboard-inline-7">Active</div>
            </div>
          </div>}

        <div className="member-dashboard-inline-8">
          {/* Calendar side */}
          <div className="member-dashboard-inline-9">
            <div className="gym-card">
              <div className="member-dashboard-inline-10">
                <h3 className="member-dashboard-inline-11">Attendance Calendar</h3>
                <div className="member-dashboard-inline-12">
                  <button onClick={prevMonth} className="member-dashboard-inline-13"><ChevronRight size={20} className="member-dashboard-inline-14" /></button>
                  <span className="member-dashboard-inline-15">{selectedDate.toLocaleString('default', {
                    month: 'short',
                    year: 'numeric'
                  })}</span>
                  <button onClick={nextMonth} className="member-dashboard-inline-16"><ChevronRight size={20} /></button>
                </div>
              </div>
              
              {loadingAttendance ? <div className="member-dashboard-inline-17">
                  <Loader size={24} className="member-dashboard-inline-18" />
                </div> : <div className="member-dashboard-inline-19">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => <div key={day} className="member-dashboard-inline-20">{day}</div>)}
                  
                  {Array.from({
                length: firstDay
              }).map((_, i) => <div key={`empty-${i}`} />)}
                  
                  {Array.from({
                length: daysInMonth
              }).map((_, i) => {
                const day = i + 1;
                const dateObj = new Date(currentYear, currentMonth, day);
                const localDate = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000).toISOString().split("T")[0];
                const isAttended = attendedDates.has(localDate);
                const isSelected = selectedDateString === localDate;
                const isPastOrToday = new Date().toISOString().split("T")[0] >= localDate;
                let bg = "var(--bg-secondary)";
                let color = "var(--text-primary)";
                if (isAttended) {
                  bg = "rgba(16,185,129,0.15)";
                  color = "#10b981";
                } else if (isPastOrToday) {
                  bg = "rgba(239,68,68,0.15)";
                  color = "var(--danger)";
                }
                return <div key={day} onClick={() => setSelectedDate(dateObj)} style={{
                  background: bg,
                  color: color,
                  border: isSelected ? "2px solid var(--primary)" : "1px solid transparent"
                }} className="member-dashboard-inline-21">
                        {day}
                      </div>;
              })}
                </div>}
            </div>

            {selectedDateLogs.length > 0 && <div className="gym-card">
                <h3 className="member-dashboard-inline-22">Logs for {selectedDate.toLocaleDateString('en-GB')}</h3>
                <div className="member-dashboard-inline-23">
                  {selectedDateLogs.map((a: any, i) => <div key={i} className="member-dashboard-inline-24">
                      <div className="member-dashboard-inline-25">
                        <div className="member-dashboard-inline-26">
                          <CheckCircle2 size={16} />
                        </div>
                        <div>
                          <span className="member-dashboard-inline-27">
                            {i === 0 ? "Check In" : i === selectedDateLogs.length - 1 ? "Check Out" : "Log"}
                          </span>
                          <span className="member-dashboard-inline-28">{a.time}</span>
                        </div>
                      </div>
                      <div className="member-dashboard-inline-29">
                        <span style={{
                    color: a.status === "SUCCESS" ? "#10b981" : "var(--danger)",
                    background: a.status === "SUCCESS" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)"
                  }} className="member-dashboard-inline-30">
                          {a.status}
                        </span>
                      </div>
                    </div>)}
                </div>
              </div>}
          </div>

          {/* Weekly Stats side */}
          {weeklyStats && <div className="gym-card member-dashboard-inline-31">
              <h3 className="member-dashboard-inline-32">
                <BarChart3 size={20} color="var(--primary)" /> Weekly Overview
              </h3>

              <div className="member-dashboard-inline-33">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyStats.dailyData} margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0
              }}>
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
                    <XAxis dataKey="date" tickFormatter={val => new Date(val).toLocaleDateString(undefined, {
                  weekday: 'short'
                })} axisLine={false} tickLine={false} className="member-dashboard-inline-34" />
                    <YAxis axisLine={false} tickLine={false} className="member-dashboard-inline-35" />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                    <Tooltip contentStyle={{
                  borderRadius: 8,
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  background: "var(--bg-primary)",
                  color: "var(--text-primary)"
                }} />
                    <Area type="monotone" dataKey="gymMinutes" name="Gym Time (min)" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorGym)" />
                    <Area type="monotone" dataKey="workoutMinutes" name="Workout Time (min)" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorWorkout)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <h4 className="member-dashboard-inline-36">Muscle Group Trends (vs Last Week)</h4>
              {weeklyStats.trends.length === 0 ? <div className="member-dashboard-inline-37">No trend data available yet.</div> : <div className="member-dashboard-inline-38">
                  {weeklyStats.trends.map((t: any) => <div key={t.bodyPart} className="member-dashboard-inline-39">
                      <div className="member-dashboard-inline-40">{t.bodyPart}</div>
                      <div className="member-dashboard-inline-41">
                        <span className="member-dashboard-inline-42">{t.currentWeekMins}m</span>
                        {t.status === 'gain' ? <span className="member-dashboard-inline-43">
                            <ChevronRight size={14} className="member-dashboard-inline-44" /> +{t.currentWeekMins - t.lastWeekMins}m
                          </span> : t.status === 'loss' ? <span className="member-dashboard-inline-45">
                            <ChevronRight size={14} className="member-dashboard-inline-46" /> {t.currentWeekMins - t.lastWeekMins}m
                          </span> : <span className="member-dashboard-inline-47">No change</span>}
                      </div>
                    </div>)}
                </div>}
            </div>}
        </div>
      </div>
    </div>;
  const WorkoutsPanel = (() => {
    const baseCategories = ["Chest", "Shoulder", "Legs", "Forearm", "Back", "Core", "Cardio", "Other"];
    const categories = Array.from(new Set([...baseCategories, ...customCategories, ...workouts.map(w => w.bodyPart)])).filter(Boolean);
    return <div className="page-container">
        <header className="page-header member-dashboard-inline-48">
          <div>
            <h2 className="page-title">Your Workouts</h2>
            <p className="page-subtitle">Track your sets and reps</p>
          </div>
          <div className="member-dashboard-inline-49">
            <button className="btn-blue-outline" onClick={() => setShowAddCategory(true)}>Add Category</button>
            <button className="btn-blue-outline" onClick={() => setShowAddWorkout(true)}>Create Custom</button>
          </div>
        </header>

        {showAddCategory && <div className="gym-card member-dashboard-inline-50">
            <div className="member-dashboard-inline-51">
              <h4 className="member-dashboard-inline-52">Add New Category</h4>
              <button onClick={() => setShowAddCategory(false)} className="member-dashboard-inline-53"><X size={20} /></button>
            </div>
            <div className="member-dashboard-inline-54">
              <div className="member-dashboard-inline-55">
                <label className="form-label">Category Name</label>
                <input type="text" className="form-input" placeholder="e.g. Plyometrics" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} />
              </div>
            </div>
            <div className="member-dashboard-inline-56">
              <button className="btn-blue" onClick={() => {
            if (newCategoryName.trim()) {
              setCustomCategories([...customCategories, newCategoryName.trim()]);
              setNewCategoryName("");
              setShowAddCategory(false);
              dispatch(showSnackbar({
                message: "Category added!",
                type: "success"
              }));
            }
          }}>Save Category</button>
              <button className="btn-blue-outline" onClick={() => setShowAddCategory(false)}>Cancel</button>
            </div>
          </div>}

        {activeWorkout && <div className="gym-card member-dashboard-inline-57">
            <div className="member-dashboard-inline-58">
              <div>
                <h4 className="member-dashboard-inline-59">Active Session: {activeWorkout.name}</h4>
                <div className="member-dashboard-inline-60">
                  <Clock size={16} /> {formatTime(elapsedSeconds)}
                </div>
              </div>
              <button className="btn-blue member-dashboard-inline-61" onClick={handleStopWorkout}>
                <Square size={16} fill="currentColor" /> Stop & Log
              </button>
            </div>
          </div>}

        {showAddWorkout && <div className="gym-card member-dashboard-inline-62">
            <div className="member-dashboard-inline-63">
              <h4 className="member-dashboard-inline-64">New Custom Workout</h4>
              <button onClick={() => setShowAddWorkout(false)} className="member-dashboard-inline-65"><X size={20} /></button>
            </div>
            <div className="member-dashboard-inline-66">
              <div className="member-dashboard-inline-67">
                <label className="form-label">Workout Name</label>
                <input type="text" className="form-input" placeholder="e.g. Incline Dumbbell Press" value={newWorkout.name} onChange={e => setNewWorkout({
              ...newWorkout,
              name: e.target.value
            })} />
              </div>
              <div className="member-dashboard-inline-68">
                <label className="form-label">Category</label>
                <select className="form-input" value={newWorkout.bodyPart} onChange={e => setNewWorkout({
              ...newWorkout,
              bodyPart: e.target.value
            })}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="member-dashboard-inline-69">
              <button className="btn-blue" onClick={handleCreateWorkout}>Save Workout</button>
              <button className="btn-blue-outline" onClick={() => setShowAddWorkout(false)}>Cancel</button>
            </div>
          </div>}

        {loadingWorkouts ? <div className="member-dashboard-inline-70">
            <Loader size={32} className="member-dashboard-inline-71" />
          </div> : <div className="member-dashboard-inline-72">
            {categories.map(cat => {
          const catWorkouts = workouts.filter(w => w.bodyPart === cat);
          if (catWorkouts.length === 0) return null;
          return <div key={cat} className="gym-card member-dashboard-inline-73">
                  <div className="member-dashboard-inline-74">
                    <h4 className="member-dashboard-inline-75">{cat}</h4>
                    <span className="member-dashboard-inline-76">{catWorkouts.length}</span>
                  </div>
                  <div className="member-dashboard-inline-77">
                    {catWorkouts.map((w, idx) => <div key={w._id} style={{
                borderBottom: idx < catWorkouts.length - 1 ? "1px solid var(--border-color)" : "none"
              }} className="hover-bg-secondary member-dashboard-inline-78">
                        <span className="member-dashboard-inline-79">{w.name}</span>
                        <div className="member-dashboard-inline-80">
                          <button className="btn-blue-outline member-dashboard-inline-81" onClick={() => {
                    setWorkoutToDelete(w);
                    setShowDeleteModal(true);
                  }}>
                            <Trash2 size={16} />
                          </button>
                          <button className="btn-blue member-dashboard-inline-82" disabled={!!activeWorkout} onClick={() => handleStartWorkout(w)} style={{
                    opacity: activeWorkout ? 0.5 : 1
                  }}>
                            <Play size={16} fill="currentColor" className="member-dashboard-inline-83" />
                          </button>
                        </div>
                      </div>)}
                  </div>
                </div>;
        })}
          </div>}

        <ConfirmationModal isOpen={showDeleteModal} onClose={() => {
        setShowDeleteModal(false);
        setWorkoutToDelete(null);
      }} onConfirm={handleDeleteWorkout} title="Delete Workout" message={`Are you sure you want to delete the workout "${workoutToDelete?.name}"? This action cannot be undone.`} confirmText="Delete" isDestructive={true} />
      </div>;
  })();
  const ReportsPanel = <div className="page-container">
      <header className="page-header member-dashboard-inline-84">
        <div>
          <h2 className="page-title">Workout Reports</h2>
          <p className="page-subtitle">Analyze your training volume</p>
        </div>
        <div className="member-dashboard-inline-85">
          <select className="form-input member-dashboard-inline-86" value={reportType} onChange={e => setReportType(e.target.value as any)}>
            <option value="daily">Daily Report</option>
            <option value="monthly">Monthly Report</option>
            <option value="yearly">Yearly Report</option>
          </select>
          <input type={reportType === "yearly" ? "number" : reportType === "monthly" ? "month" : "date"} className="form-input member-dashboard-inline-87" value={reportDate} onChange={e => setReportDate(e.target.value)} />
          <button className="btn-blue-outline" onClick={downloadReportCSV}>Download CSV</button>
        </div>
      </header>

      {loadingReport ? <div className="member-dashboard-inline-88">
          <Loader size={32} className="member-dashboard-inline-89" />
        </div> : !reportData || reportData.totalDuration === 0 ? <div className="gym-card member-dashboard-inline-90">
          <BarChart3 size={48} className="member-dashboard-inline-91" />
          <h3 className="member-dashboard-inline-92">No data available</h3>
          <p className="member-dashboard-inline-93">You haven't logged any workouts for this period.</p>
        </div> : <div>
          <div className="gym-card member-dashboard-inline-94">
            <div>
              <h4 className="member-dashboard-inline-95">Total Training Time</h4>
              <div className="member-dashboard-inline-96">{reportData.totalDuration} <span className="member-dashboard-inline-97">mins</span></div>
            </div>
            <Activity size={48} className="member-dashboard-inline-98" />
          </div>

          <div className="member-dashboard-inline-99">
            {Object.entries(reportData.report || {}).map(([bodyPart, data]: [string, any]) => <div key={bodyPart} className="gym-card">
                <div className="member-dashboard-inline-100">
                  <h4 className="member-dashboard-inline-101">
                    <div className="member-dashboard-inline-102"></div>
                    {bodyPart}
                  </h4>
                  <span className="member-dashboard-inline-103">{data.totalMinutes} min</span>
                </div>
                <div className="member-dashboard-inline-104">
                  {Object.entries(data.workouts).map(([name, mins]: [string, any]) => <div key={name} className="member-dashboard-inline-105">
                      <span className="member-dashboard-inline-106">{name}</span>
                      <span className="member-dashboard-inline-107">{mins} m</span>
                    </div>)}
                </div>
              </div>)}
          </div>

          {reportType !== "daily" && reportData.logs && reportData.logs.length > 0 && <div className="member-dashboard-inline-108">
              <h3 className="member-dashboard-inline-109">Day-wise Breakdown</h3>
              <div className="member-dashboard-inline-110">
                {Object.entries(reportData.logs.reduce((acc: any, log: any) => {
            if (!acc[log.date]) acc[log.date] = [];
            acc[log.date].push(log);
            return acc;
          }, {})).sort((a: any, b: any) => b[0].localeCompare(a[0])).map(([date, logs]: [string, any]) => <div key={date} className="gym-card member-dashboard-inline-111">
                      <h4 className="member-dashboard-inline-112">
                        {new Date(date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
              })}
                      </h4>
                      <div className="member-dashboard-inline-113">
                        {logs.map((log: any, idx: number) => <div key={idx} className="member-dashboard-inline-114">
                            <span className="member-dashboard-inline-115">
                              {log.workoutName} <span className="member-dashboard-inline-116">({log.bodyPart})</span>
                            </span>
                            <span className="member-dashboard-inline-117">{log.duration} m</span>
                          </div>)}
                      </div>
                    </div>)}
              </div>
            </div>}
        </div>}
    </div>;
  const PlansPanel = <div className="page-container">
      <header className="page-header">
        <h2 className="page-title">Available Gym Plans</h2>
        <p className="page-subtitle">Discover memberships crafted for your goals.</p>
      </header>

      {loadingPlans ? <div className="member-dashboard-inline-118">
          <Loader size={32} className="member-dashboard-inline-119" />
        </div> : plans.length === 0 ? <div className="gym-card member-dashboard-inline-120">
          <CreditCard size={48} className="member-dashboard-inline-121" />
          <h3 className="member-dashboard-inline-122">No plans available</h3>
          <p className="member-dashboard-inline-123">The gym owner hasn't created any plans yet.</p>
        </div> : <div className="member-dashboard-inline-124">
          {plans.map(p => <div key={p._id} className="gym-card member-dashboard-inline-125">
              <div className="member-dashboard-inline-126">
                <h3 className="member-dashboard-inline-127">{p.name}</h3>
                <div className="member-dashboard-inline-128">
                  <span className="member-dashboard-inline-129">₹{p.basePrice}</span>
                  <span className="member-dashboard-inline-130">/ {p.durationMonths} mo</span>
                </div>
              </div>
              <div className="member-dashboard-inline-131">
                <div className="member-dashboard-inline-132">
                  <h4 className="member-dashboard-inline-133">Includes</h4>
                  <ul className="member-dashboard-inline-134">
                    {(Array.isArray(p.features) ? p.features.join(",").split(/[\n,]/) : (p.features || "").split(/[\n,]/)).filter((f: string) => f.trim() && !f.trim().toLowerCase().startsWith('features:')).map((f: string, i: number) => <li key={i} className="member-dashboard-inline-135">
                        <CheckCircle2 size={16} className="member-dashboard-inline-136" />
                        <span className="member-dashboard-inline-137">{f.trim()}</span>
                      </li>)}
                  </ul>
                </div>
                <button className="btn-blue-outline member-dashboard-inline-138" onClick={() => dispatch(showSnackbar({
            message: "Contact gym admin to enroll in this plan.",
            type: "info"
          }))}>
                  Inquire Now
                </button>
              </div>
            </div>)}
        </div>}
    </div>;
  const handleCompleteChallenge = async (challengeId: number, xp: number) => {
    try {
      const res = await completeChallengeApi({
        xp
      });
      dispatch(showSnackbar({
        message: `+${xp} XP Earned!`,
        type: "success"
      }));
      setProfile((prev: any) => ({
        ...prev,
        xp: res.data.xp,
        level: res.data.level
      }));
      setDailyChallenges(prev => prev.map(c => c.id === challengeId ? {
        ...c,
        completed: true
      } : c));
    } catch (err: any) {
      dispatch(showSnackbar({
        message: "Failed to claim XP",
        type: "error"
      }));
    }
  };
  const currentLevel = profile?.level || 1;
  const currentXp = profile?.xp || 0;
  const nextLevelXp = currentLevel * 500;
  const progressPercent = Math.min(100, currentXp / nextLevelXp * 100);
  const ChallengesPanel = <div className="page-container">
      <header className="page-header member-dashboard-inline-139">
        <div>
          <h2 className="page-title member-dashboard-inline-140">
            <ShieldCheck size={24} color="#6366f1" /> Challenges & Rewards
          </h2>
          <p className="page-subtitle">Complete tasks to earn XP and level up!</p>
        </div>
      </header>

      {/* Level Progress */}
      <div className="gym-card member-dashboard-inline-141">
        <div style={{
        right: -30,
        top: -30
      }} className="member-dashboard-inline-142">
          <ShieldCheck size={120} />
        </div>
        <div className="member-dashboard-inline-143">
          <div className="member-dashboard-inline-144">
            <div>
              <span className="member-dashboard-inline-145">Current Level</span>
              <h3 className="member-dashboard-inline-146">{currentLevel}</h3>
            </div>
            <div className="member-dashboard-inline-147">
              <span className="member-dashboard-inline-148">{currentXp}</span>
              <span className="member-dashboard-inline-149"> / {nextLevelXp} XP</span>
            </div>
          </div>
          <div className="member-dashboard-inline-150">
            <div style={{
            width: `${progressPercent}%`
          }} className="member-dashboard-inline-151" />
          </div>
          <p className="member-dashboard-inline-152">
            {nextLevelXp - currentXp} XP needed for Level {currentLevel + 1}
          </p>
        </div>
      </div>

      {streakStats && <div className="gym-card member-dashboard-inline-153">
          <div style={{
        right: -20,
        top: -20
      }} className="member-dashboard-inline-154"><Flame size={100} color="#f59e0b" /></div>
          <div className="member-dashboard-inline-155">
            <div className="member-dashboard-inline-156">
              <div className="member-dashboard-inline-157">
                <Flame size={24} />
              </div>
              <div>
                <h3 className="member-dashboard-inline-158">Daily Streak</h3>
                <p className="member-dashboard-inline-159">Keep showing up to unlock rewards!</p>
              </div>
            </div>
            <div className="member-dashboard-inline-160">
              <span className="member-dashboard-inline-161">{streakStats.currentStreak || 0}</span>
              <span className="member-dashboard-inline-162">Days</span>
            </div>
          </div>

          <div className="member-dashboard-inline-163">
            {streakStats.milestones?.map((m: any, i: number) => <div key={i} style={{
          background: m.achieved ? "var(--bg-card)" : "var(--bg-secondary)",
          border: `2px solid ${m.achieved ? "#f59e0b" : "var(--border-color)"}`,
          boxShadow: m.achieved ? "0 4px 12px rgba(245, 158, 11, 0.15)" : "none",
          opacity: m.achieved ? 1 : 0.5
        }} className="member-dashboard-inline-164">
                <div style={{
            background: m.achieved ? "linear-gradient(135deg, #fcd34d, #f59e0b)" : "var(--border-color)",
            color: m.achieved ? "white" : "var(--text-muted)"
          }} className="member-dashboard-inline-165">
                  <span className="member-dashboard-inline-166">
                    {m.name === "Bronze" ? "🥉" : m.name === "Silver" ? "🥈" : m.name === "Gold" ? "🥇" : m.name === "Platinum" ? "🏆" : m.name === "Diamond" ? "💎" : m.name === "Champion" ? "👑" : "🏅"}
                  </span>
                </div>
                <div className="member-dashboard-inline-167">
                  <div style={{
              color: m.achieved ? "var(--text-primary)" : "var(--text-muted)"
            }} className="member-dashboard-inline-168">{m.name}</div>
                  <div className="member-dashboard-inline-169">{m.target} Days</div>
                </div>
              </div>)}
          </div>
        </div>}

      {/* Daily Challenges */}
      <div className="gym-card member-dashboard-inline-170">
        <h3 className="member-dashboard-inline-171">
          <Target size={20} color="var(--primary)" /> Daily Challenges
        </h3>
        <div className="member-dashboard-inline-172">
          {dailyChallenges.map(c => {
          const isEligible = c.id === 1 ? attendance.length > 0 : c.id === 2 ? generatedDietPlanToday : c.id === 3 ? (streakStats?.currentStreak || 0) >= 30 : false;
          const btnDisabled = c.completed || !isEligible;
          return <div key={c.id} style={{
            opacity: c.completed ? 0.6 : 1
          }} className="member-dashboard-inline-173">
                <div>
                  <h4 style={{
                color: c.completed ? "var(--text-muted)" : "var(--text-primary)"
              }} className="member-dashboard-inline-174">{c.text}</h4>
                  <span className="member-dashboard-inline-175">+{c.xp} XP</span>
                  {!c.completed && !isEligible && <span className="member-dashboard-inline-176">Not completed yet</span>}
                </div>
                <button className={`${c.completed ? "btn-blue-outline" : "btn-blue"} member-dashboard-inline-177`} disabled={btnDisabled} onClick={() => handleCompleteChallenge(c.id, c.xp)} style={{
              opacity: btnDisabled ? 0.5 : 1,
              cursor: btnDisabled ? "not-allowed" : "pointer",
              border: c.completed ? "1px solid var(--border-color)" : ""
            }}>
                  {c.completed ? "Claimed" : "Claim"}
                </button>
              </div>;
        })}
        </div>
      </div>
    </div>;
  const navItems: {
    id: Tab;
    label: string;
    icon: React.FC<{
      size?: number;
    }>;
  }[] = [{
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard as any
  }, {
    id: "my_plan",
    label: "My Plan & Invoices",
    icon: CreditCard as any
  }, {
    id: "health_monitor",
    label: "Health Monitor",
    icon: ClipboardList as any
  }, {
    id: "workouts",
    label: "Workouts",
    icon: Dumbbell as any
  }, {
    id: "library",
    label: "Workout Video",
    icon: BookOpen as any
  }, {
    id: "reports",
    label: "Reports",
    icon: BarChart3 as any
  }, {
    id: "diet",
    label: "My Diet",
    icon: Activity as any
  }, {
    id: "plans",
    label: "Gym Plans",
    icon: CreditCard as any
  }, {
    id: "challenges",
    label: "Challenges",
    icon: ShieldCheck as any
  }, {
    id: "events",
    label: "Announcements",
    icon: Bell as any
  }, {
    id: "pt" as Tab,
    label: "Personal Trainer",
    icon: UserCheck as any
  }];
  const Sidebar = <>
      {/* Mobile overlay */}
      {sidebarOpen && <div className="sidebar-overlay show member-dashboard-inline-178" onClick={() => setSidebarOpen(false)} />}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="brand-icon-wrapper member-dashboard-inline-179">
            <img src="/logo.png" alt="Trainix Logo" className="member-dashboard-inline-180" />
          </div>
          <div>
            <h1 className="brand-name">TRAINIX</h1>
            <p className="brand-subtitle">Member Portal</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="member-dashboard-inline-181">
          <ul className="sidebar-menu">
            {navItems.map(({
            id,
            label,
            icon: Icon
          }) => {
            if (id === "health_monitor") {
              return <li key={id} className="member-dashboard-inline-182">
                    <a className={`sidebar-menu-item ${activeTab === id ? "active" : ""} member-dashboard-inline-183`} onClick={() => {
                  setSidebarHealthExpanded(!sidebarHealthExpanded);
                }}>
                      <div className="member-dashboard-inline-184">
                        <Icon size={20} />
                        <span>{label}</span>
                      </div>
                      {sidebarHealthExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </a>
                    {sidebarHealthExpanded && <div className="member-dashboard-inline-185">
                        {[{
                    key: "bmi",
                    label: "BMI",
                    path: "bmi"
                  }, {
                    key: "calories",
                    label: "Calories",
                    path: "calories"
                  }, {
                    key: "water",
                    label: "Water Reminder",
                    path: "water-reminder"
                  }, {
                    key: "health_kit",
                    label: "Health Kit",
                    path: "health-kit"
                  }].map(sub => <a key={sub.key} style={{
                    color: activeTab === "health_monitor" && healthMonitorSection === sub.key ? "var(--primary)" : "var(--text-secondary)",
                    background: activeTab === "health_monitor" && healthMonitorSection === sub.key ? "rgba(99, 102, 241, 0.1)" : "transparent"
                  }} onClick={() => {
                    goToPanel("health_monitor", sub.path);
                  }} onMouseOver={e => e.currentTarget.style.color = "var(--primary)"} onMouseOut={e => e.currentTarget.style.color = activeTab === "health_monitor" && healthMonitorSection === sub.key ? "var(--primary)" : "var(--text-secondary)"} className="member-dashboard-inline-186">
                            {sub.label}
                          </a>)}
                      </div>}
                  </li>;
            }
            if (id === "diet") {
              return <li key={id} className="member-dashboard-inline-187">
                    <a className={`sidebar-menu-item ${activeTab === id ? "active" : ""} member-dashboard-inline-188`} onClick={() => setSidebarDietExpanded(!sidebarDietExpanded)}>
                      <div className="member-dashboard-inline-189">
                        <Icon size={20} />
                        <span>{label}</span>
                      </div>
                      {sidebarDietExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </a>
                    {sidebarDietExpanded && <div className="member-dashboard-inline-190">
                        <a style={{
                    color: activeTab === "diet" && expandedMainSections.normalDiet ? "var(--primary)" : "var(--text-secondary)",
                    background: activeTab === "diet" && expandedMainSections.normalDiet ? "rgba(99, 102, 241, 0.1)" : "transparent"
                  }} onClick={() => {
                    goToPanel("diet", "normal");
                  }} onMouseOver={e => e.currentTarget.style.color = "var(--primary)"} onMouseOut={e => e.currentTarget.style.color = activeTab === "diet" && expandedMainSections.normalDiet ? "var(--primary)" : "var(--text-secondary)"} className="member-dashboard-inline-191">
                          Normal Diet Plan
                        </a>
                        <a style={{
                    color: activeTab === "diet" && expandedMainSections.aiDiet ? "var(--primary)" : "var(--text-secondary)",
                    background: activeTab === "diet" && expandedMainSections.aiDiet ? "rgba(99, 102, 241, 0.1)" : "transparent"
                  }} onClick={() => {
                    goToPanel("diet", "premium");
                  }} onMouseOver={e => e.currentTarget.style.color = "var(--primary)"} onMouseOut={e => e.currentTarget.style.color = activeTab === "diet" && expandedMainSections.aiDiet ? "var(--primary)" : "var(--text-secondary)"} className="member-dashboard-inline-192">
                          Premium Diet Plan
                        </a>
                      </div>}
                  </li>;
            }
            return <li key={id}>
                  <a className={`sidebar-menu-item ${activeTab === id ? "active" : ""} member-dashboard-inline-193`} onClick={() => goToPanel(id)}>
                    <Icon size={20} />
                    <span>{label}</span>
                  </a>
                </li>;
          })}
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
          <div className="profile-card member-dashboard-inline-194">
            <div onClick={() => setShowChangePassword(true)} title="Click to change password" className="member-dashboard-inline-195">
              <div className="profile-avatar">
                {userName.slice(0, 2).toUpperCase()}
              </div>
              <div className="profile-info">
                <span className="profile-name">{userName}</span>
                <span className="profile-email member-dashboard-inline-196">
                  <User size={10} /> View Profile
                </span>
              </div>
            </div>
            <button onClick={handleLogout} title="Logout" className="member-dashboard-inline-197">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>;
  const downloadDietPDF = () => {
    const element = document.getElementById('diet-plan-container');
    if (!element) return;
    const loadHtml2Pdf = () => new Promise(resolve => {
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
        image: {
          type: 'jpeg',
          quality: 0.98
        },
        html2canvas: {
          scale: 2,
          useCORS: true
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        }
      };
      html2pdf().set(opt).from(element).save();
    });
  };
  const DietPanel = <div className="page-container member-dashboard-inline-198">
      {/* Header */}
      <header className="page-header member-dashboard-inline-199">
        <div className="member-dashboard-inline-200">
          <div className="member-dashboard-inline-201">
            <Activity size={24} className="member-dashboard-inline-202" />
          </div>
          <div>
            <h2 className="page-title member-dashboard-inline-203">My Diet & Health</h2>
            <p className="page-subtitle member-dashboard-inline-204">Track your nutrition and physical progress.</p>
          </div>
        </div>
        {expandedMainSections.aiDiet && <div className="member-dashboard-inline-205">
            <div className="member-dashboard-inline-206">
              <Sparkles size={18} className="member-dashboard-inline-207" />
              <div className="member-dashboard-inline-208">
                <span className="member-dashboard-inline-209">AI Credits</span>
                <span className="member-dashboard-inline-210">{profile?.aiCredits || 0} credit{profile?.aiCredits !== 1 ? 's' : ''}</span>
              </div>
            </div>
            <button className="btn-blue member-dashboard-inline-211" onClick={() => setShowAiModal(true)}>
              <ShoppingCart size={16} /> Buy Credits
            </button>
          </div>}
      </header>

      {loadingDiet ? <div className="member-dashboard-inline-212"><Loader size={32} className="member-dashboard-inline-213" /></div> : <div className="member-dashboard-inline-214">

          {expandedMainSections.normalDiet && <div className="member-dashboard-inline-215">
              <div className="member-dashboard-inline-216">
                <div className="member-dashboard-inline-217">
                  <div className="member-dashboard-inline-218">
                    <CheckCircle size={24} />
                  </div>
                  <h3 className="member-dashboard-inline-219">Normal Diet Plan (Free)</h3>
                </div>
                <button onClick={() => {
            const element = document.getElementById('normal-diet-plan-container');
            if (!element) return;
            const loadHtml2Pdf = () => new Promise(resolve => {
              if ((window as any).html2pdf) return resolve((window as any).html2pdf);
              const script = document.createElement("script");
              script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
              script.onload = () => resolve((window as any).html2pdf);
              document.body.appendChild(script);
            });
            loadHtml2Pdf().then((html2pdf: any) => {
              html2pdf().set({
                margin: 10,
                filename: 'My_Normal_Diet_Plan.pdf',
                image: {
                  type: 'jpeg',
                  quality: 0.98
                },
                html2canvas: {
                  scale: 2,
                  useCORS: true
                },
                jsPDF: {
                  unit: 'mm',
                  format: 'a4',
                  orientation: 'portrait'
                }
              }).from(element).save();
            });
          }} onMouseOver={e => e.currentTarget.style.background = "var(--bg-hover)"} onMouseOut={e => e.currentTarget.style.background = "var(--bg-card)"} className="member-dashboard-inline-220">
                  Download PDF
                </button>
              </div>
              <div id="normal-diet-plan-container" className="member-dashboard-inline-221">
                <div className="member-dashboard-inline-222">
                  <div className="member-dashboard-inline-223">
                    {genericDietPlan.map((day: any, i: number) => {
                const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
                const label = dayLabels[i];
                const isSelected = selectedGenericDay === day.dayNumber;
                return <button key={day.dayNumber} onClick={() => setSelectedGenericDay(day.dayNumber)} style={{
                  background: isSelected ? "#2d3748" : "var(--bg-secondary)",
                  color: isSelected ? "#fff" : "var(--text-primary)",
                  boxShadow: isSelected ? "0 4px 12px rgba(0,0,0,0.1)" : "none"
                }} className="member-dashboard-inline-224">
                          {label}
                        </button>;
              })}
                  </div>

                  {genericDietPlan.filter((d: any) => d.dayNumber === selectedGenericDay).map((day: any) => <div key={day.dayNumber}>
                      {/* Macros */}
                      <div className="member-dashboard-inline-225">
                        <div className="member-dashboard-inline-226">
                          <span className="member-dashboard-inline-227">Calories</span>
                          <span className="member-dashboard-inline-228">🔥 {day.calories}</span>
                        </div>
                        <div className="member-dashboard-inline-229">
                          <span className="member-dashboard-inline-230">Protein</span>
                          <span className="member-dashboard-inline-231">🥩 {day.protein}g</span>
                        </div>
                        <div className="member-dashboard-inline-232">
                          <span className="member-dashboard-inline-233">Carbs</span>
                          <span className="member-dashboard-inline-234">🍞 {day.carbs}g</span>
                        </div>
                        <div className="member-dashboard-inline-235">
                          <span className="member-dashboard-inline-236">Fats</span>
                          <span className="member-dashboard-inline-237">🥑 {day.fats}g</span>
                        </div>
                      </div>

                      {/* Meals Accordion */}
                      <div className="member-dashboard-inline-238">
                        {[{
                  key: "morningSnack",
                  label: "9:00 AM - Morning Snack",
                  icon: "🥣"
                }, {
                  key: "breakfast",
                  label: "10:15 AM - Breakfast",
                  icon: "🥛"
                }, {
                  key: "lunch",
                  label: "2:00 PM - Lunch",
                  icon: "🍛"
                }, {
                  key: "eveningSnack",
                  label: "5:30 PM - Evening Snack",
                  icon: "🥗"
                }, {
                  key: "preWorkout",
                  label: "6:00 PM - Pre-Workout",
                  icon: "🍌"
                }, {
                  key: "postWorkout",
                  label: "8:00 PM - Post-Workout",
                  icon: "💪"
                }, {
                  key: "dinner",
                  label: "9:00 PM - Dinner",
                  icon: "🍲"
                }, {
                  key: "bedtimeSnack",
                  label: "10:30 PM - Before Bed",
                  icon: "🥙"
                }].filter(meal => day[meal.key]).map(meal => {
                  const mealKey = `${day.dayNumber}-${meal.key}`;
                  const isExpanded = expandedDietMeals[mealKey];
                  return <div key={meal.key} className="member-dashboard-inline-239">
                              <div onClick={() => toggleDietMeal(mealKey)} className="member-dashboard-inline-240">
                                <div className="member-dashboard-inline-241">
                                  <div className="member-dashboard-inline-242">
                                    <span className="member-dashboard-inline-243">{meal.icon}</span>
                                  </div>
                                  <span className="member-dashboard-inline-244">{meal.label}</span>
                                </div>
                                <div className="member-dashboard-inline-245">
                                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </div>
                              </div>
                              {isExpanded && <div className="member-dashboard-inline-246">
                                  {day[meal.key]}
                                </div>}
                            </div>;
                })}
                      </div>
                    </div>)}
                </div>
              </div>
            </div>}

          {expandedMainSections.aiDiet && <div className="member-dashboard-inline-247">
              <div className="member-dashboard-inline-248">
                <div className="member-dashboard-inline-249">
                  <div className="member-dashboard-inline-250">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="member-dashboard-inline-251">AI Based Diet Plan (Premium)</h3>
                </div>
              </div>
              <div className="member-dashboard-inline-252">

          {/* Hero Banner */}
          <div className="member-dashboard-inline-253">
            <div className="member-dashboard-inline-254" />
            <div className="member-dashboard-inline-255">✨</div>
            <div className="member-dashboard-inline-256">✨</div>
            <div className="member-dashboard-inline-257">✨</div>

            <div className="member-dashboard-inline-258">
              <div className="member-dashboard-inline-259">
                <div className="member-dashboard-inline-260">
                  <Sparkles size={20} />
                </div>
                <h3 className="member-dashboard-inline-261">Generate Your Diet Plan</h3>
              </div>
              <p className="member-dashboard-inline-262">Get a personalized 7-day diet plan tailored to your goals using your latest BMI report.</p>

              <div className="member-dashboard-inline-263">
                <div className="member-dashboard-inline-264">
                  <div className="member-dashboard-inline-265">
                    {/* Latest BMI Report Card */}
                    <div className="member-dashboard-inline-266">
                      {latestBmiPhoto ? <div className="member-dashboard-inline-267">
                          {latestBmiPhoto.reportImageUrl.toLowerCase().endsWith(".pdf") ? <FileText size={20} color="#ef4444" /> : latestBmiPhoto.reportImageUrl.toLowerCase().endsWith(".csv") || latestBmiPhoto.reportImageUrl.toLowerCase().includes(".xls") ? <FileText size={20} color="#10b981" /> : <img src={latestBmiPhoto.reportImageUrl.startsWith("http") ? latestBmiPhoto.reportImageUrl : `http://localhost:5000${latestBmiPhoto.reportImageUrl}`} alt="BMI Report" className="member-dashboard-inline-268" />}
                        </div> : <div className="member-dashboard-inline-269">
                          <FileText size={20} />
                        </div>}
                      <div className="member-dashboard-inline-270">
                        <span className="member-dashboard-inline-271">Latest BMI Report</span>
                        {latestBmiPhoto ? <span className="member-dashboard-inline-272">Uploaded on <strong className="member-dashboard-inline-273">{new Date(latestBmiPhoto.createdAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric"
                            })}</strong></span> : <span className="member-dashboard-inline-274">No report uploaded</span>}
                      </div>
                      <div className="member-dashboard-inline-275">
                        <label onMouseOver={e => e.currentTarget.style.background = "var(--border-color)"} onMouseOut={e => e.currentTarget.style.background = "var(--bg-hover)"} title="Upload Report (PDF, CSV, Excel, Image)" className="member-dashboard-inline-276">
                          {uploadingBmi ? <Loader size={16} className="member-dashboard-inline-277" /> : <Upload size={16} />}
                          <input type="file" onChange={handleUploadBmi} accept=".pdf,.csv,.xls,.xlsx,image/*" className="member-dashboard-inline-278" />
                        </label>
                        {latestBmiPhoto && <button onClick={() => {
                          const url = latestBmiPhoto.reportImageUrl.startsWith("http") ? latestBmiPhoto.reportImageUrl : `http://localhost:5000${latestBmiPhoto.reportImageUrl}`;
                          // Cloudinary free tier blocks inline PDF viewing. By changing the extension to .jpg, Cloudinary automatically renders it as an image.
                          const finalUrl = url.toLowerCase().endsWith(".pdf") && url.includes("cloudinary.com") ? url.replace(/\.pdf$/i, ".jpg") : url;
                          window.open(finalUrl, "_blank");
                        }} onMouseOver={e => e.currentTarget.style.background = "var(--border-color)"} onMouseOut={e => e.currentTarget.style.background = "var(--bg-hover)"} title="View Report" className="member-dashboard-inline-279">
                            <Eye size={16} />
                          </button>}
                        {latestBmiPhoto && <button onClick={() => handleDownloadReport(latestBmiPhoto.reportImageUrl.startsWith("http") ? latestBmiPhoto.reportImageUrl : `http://localhost:5000${latestBmiPhoto.reportImageUrl}`)} onMouseOver={e => e.currentTarget.style.background = "var(--border-color)"} onMouseOut={e => e.currentTarget.style.background = "var(--bg-hover)"} title="Download Report" className="member-dashboard-inline-280">
                            <Download size={16} />
                          </button>}
                      </div>
                    </div>

                    {/* Goal Dropdown */}
                    <div className="member-dashboard-inline-281">
                      <span className="member-dashboard-inline-282">Your Goal</span>
                      <select value={dietGoal} onChange={e => setDietGoal(e.target.value)} className="member-dashboard-inline-283">
                        <option>Weight Loss</option>
                        <option>Weight Gain</option>
                        <option>Maintain Weight</option>
                      </select>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button disabled={isGeneratingDiet || !latestBmiPhoto} onClick={() => handleGenerateDiet(latestBmiPhoto?._id)} style={{
                    cursor: isGeneratingDiet || !latestBmiPhoto ? "not-allowed" : "pointer",
                    opacity: !latestBmiPhoto ? 0.6 : 1
                  }} onMouseOver={e => {
                    if (!isGeneratingDiet && latestBmiPhoto) e.currentTarget.style.transform = "translateY(-1px)";
                  }} onMouseOut={e => {
                    if (!isGeneratingDiet && latestBmiPhoto) e.currentTarget.style.transform = "translateY(0)";
                  }} className="member-dashboard-inline-284">
                    {isGeneratingDiet ? <Loader size={14} className="member-dashboard-inline-285" /> : <><Sparkles size={14} /> Generate 7-Day Plan (1 Credit)</>}
                  </button>
                </div>
              </div>
            </div>

            <div className="member-dashboard-inline-286">
              <img src="/hero_diet_illustration.png" alt="Diet Plan Illustration" className="member-dashboard-inline-287" />
            </div>
          </div>



          {/* Hero Banner 2 (Workout Diet) */}
          <div className="member-dashboard-inline-288">
            <div className="member-dashboard-inline-289" />
            <div className="member-dashboard-inline-290">✨</div>
            <div className="member-dashboard-inline-291">✨</div>

            <div className="member-dashboard-inline-292">
              <div className="member-dashboard-inline-293">
                <div className="member-dashboard-inline-294">
                  <Dumbbell size={20} />
                </div>
                <h3 className="member-dashboard-inline-295">Post-Workout Diet Plan</h3>
              </div>
              <p className="member-dashboard-inline-296">Get a personalized 1-day diet plan tailored to today's logged workouts.</p>

              <div className="member-dashboard-inline-297">
                <div className="member-dashboard-inline-298">
                  <div className="member-dashboard-inline-299">
                    <div className="member-dashboard-inline-300">
                      <span className="member-dashboard-inline-301">Age</span>
                      <input type="number" placeholder="yrs" value={memberAge} onChange={e => setMemberAge(e.target.value ? Number(e.target.value) : "")} className="member-dashboard-inline-302" />
                    </div>
                    <div className="member-dashboard-inline-303">
                      <span className="member-dashboard-inline-304">Height</span>
                      <input type="number" placeholder="cm" value={memberHeight} onChange={e => setMemberHeight(e.target.value ? Number(e.target.value) : "")} className="member-dashboard-inline-305" />
                    </div>
                    <div className="member-dashboard-inline-306">
                      <span className="member-dashboard-inline-307">Weight</span>
                      <input type="number" placeholder="kg" value={memberWeight} onChange={e => setMemberWeight(e.target.value ? Number(e.target.value) : "")} className="member-dashboard-inline-308" />
                    </div>
                    <div className="member-dashboard-inline-309">
                      <span className="member-dashboard-inline-310">Goal</span>
                      <select value={workoutDietGoal} onChange={e => setWorkoutDietGoal(e.target.value)} className="member-dashboard-inline-311">
                        <option>Weight Loss</option>
                        <option>Weight Gain</option>
                        <option>Maintain Weight</option>
                      </select>
                    </div>
                  </div>
                  <button disabled={isGeneratingWorkoutDiet} onClick={handleGenerateWorkoutDiet} style={{
                    cursor: isGeneratingWorkoutDiet ? "not-allowed" : "pointer"
                  }} className="member-dashboard-inline-312">
                    {isGeneratingWorkoutDiet ? <Loader size={14} className="member-dashboard-inline-313" /> : <><Sparkles size={14} /> Generate 1-Day Plan (1 Credit)</>}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="member-dashboard-inline-314">
              <img src="/hero_diet_illustration.png" alt="Workout Diet Illustration" className="member-dashboard-inline-315" />
            </div>
          </div>

          {/* Current Diet Plan Card */}
          <div className="member-dashboard-inline-316">
            <div className="member-dashboard-inline-317">
              <div className="member-dashboard-inline-318">
                <div className="member-dashboard-inline-319"><PenLine size={20} /></div>
                <h3 className="member-dashboard-inline-320">Current Diet Plan</h3>
              </div>
              {dietPlans.length > 0 && dietPlans[0].days && <button onClick={downloadDietPDF} onMouseOver={e => e.currentTarget.style.background = "var(--bg-hover)"} onMouseOut={e => e.currentTarget.style.background = "var(--bg-secondary)"} className="member-dashboard-inline-321">
                  Download PDF
                </button>}
            </div>

            {dietPlans.length > 0 && dietPlans[0].days ? <div id="diet-plan-container">
                {/* General Recommendations & Foods to Avoid */}
                <div className="member-dashboard-inline-322">
                  {dietPlans[0].foodsToAvoid?.length > 0 && <div className="member-dashboard-inline-323">
                      <h4 className="member-dashboard-inline-324">🚫 Foods to Avoid</h4>
                      <ul className="member-dashboard-inline-325">
                        {dietPlans[0].foodsToAvoid.map((food: string, i: number) => <li key={i}>{food}</li>)}
                      </ul>
                    </div>}
                  {dietPlans[0].generalRecommendations?.length > 0 && <div className="member-dashboard-inline-326">
                      <h4 className="member-dashboard-inline-327">💡 General Recommendations</h4>
                      <ul className="member-dashboard-inline-328">
                        {dietPlans[0].generalRecommendations.map((rec: string, i: number) => <li key={i}>{rec}</li>)}
                      </ul>
                    </div>}
                </div>

                <div className="member-dashboard-inline-329">
                  {dietPlans[0].days.length > 1 && <div className="member-dashboard-inline-330">
                      {dietPlans[0].days.map((day: any, i: number) => {
                    const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
                    const label = dietPlans[0].days.length === 7 ? dayLabels[i] : `Day ${day.dayNumber}`;
                    const isSelected = selectedDietDay === day.dayNumber;
                    return <button key={day.dayNumber} onClick={() => setSelectedDietDay(day.dayNumber)} style={{
                      background: isSelected ? "#2d3748" : "var(--bg-secondary)",
                      color: isSelected ? "#fff" : "var(--text-primary)",
                      boxShadow: isSelected ? "0 4px 12px rgba(0,0,0,0.1)" : "none"
                    }} className="member-dashboard-inline-331">
                            {label}
                          </button>;
                  })}
                    </div>}

                  {dietPlans[0].days.filter((d: any) => d.dayNumber === selectedDietDay).map((day: any) => <div key={day.dayNumber}>
                      {/* Macros */}
                      <div className="member-dashboard-inline-332">
                        <div className="member-dashboard-inline-333">
                          <span className="member-dashboard-inline-334">Calories</span>
                          <span className="member-dashboard-inline-335">🔥 {day.calories}</span>
                        </div>
                        <div className="member-dashboard-inline-336">
                          <span className="member-dashboard-inline-337">Protein</span>
                          <span className="member-dashboard-inline-338">🥩 {day.protein}g</span>
                        </div>
                        <div className="member-dashboard-inline-339">
                          <span className="member-dashboard-inline-340">Carbs</span>
                          <span className="member-dashboard-inline-341">🍞 {day.carbs}g</span>
                        </div>
                        <div className="member-dashboard-inline-342">
                          <span className="member-dashboard-inline-343">Fats</span>
                          <span className="member-dashboard-inline-344">🥑 {day.fats}g</span>
                        </div>
                      </div>

                      {/* Meals Accordion */}
                      <div className="member-dashboard-inline-345">
                        {[{
                      key: "morningSnack",
                      label: "Morning Snacks",
                      icon: "🥣"
                    }, {
                      key: "breakfast",
                      label: "Breakfast",
                      icon: "🥛"
                    }, {
                      key: "lunch",
                      label: "Lunch",
                      icon: "🍛"
                    }, {
                      key: "eveningSnack",
                      label: "Evening Snack",
                      icon: "🥗"
                    }, {
                      key: "dinner",
                      label: "Dinner",
                      icon: "🍗"
                    }, {
                      key: "bedtimeSnack",
                      label: "Bedtime",
                      icon: "🥙"
                    }].filter(meal => day[meal.key]).map(meal => {
                      return <div key={meal.key} className="member-dashboard-inline-346">
                              <div className="member-dashboard-inline-347">
                                <div className="member-dashboard-inline-348">
                                  <span className="member-dashboard-inline-349">{meal.icon}</span>
                                </div>
                                <span className="member-dashboard-inline-350">{meal.label}</span>
                              </div>
                              <div className="member-dashboard-inline-351">
                                {day[meal.key]}
                              </div>
                            </div>;
                    })}
                      </div>
                    </div>)}
                </div>
              </div> : <div className="member-dashboard-inline-352">
                <img src="/empty_diet_plan_illustration.png" alt="No Diet Plan" className="member-dashboard-inline-353" />
                <h4 className="member-dashboard-inline-354">No Diet Plan Yet</h4>
                <p className="member-dashboard-inline-355">Generate your first AI diet plan to view it here.</p>
                <div className="member-dashboard-inline-356">
                  <button onClick={() => window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                })} onMouseOver={e => {
                  e.currentTarget.style.background = "var(--bg-hover)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }} onMouseOut={e => {
                  e.currentTarget.style.background = "var(--bg-secondary)";
                  e.currentTarget.style.transform = "translateY(0)";
                }} className="member-dashboard-inline-357">
                    Generate Your Plan
                  </button>
                </div>
              </div>}
          </div>
        </div>
      </div>}

        </div>}
    </div>;

  // ── Personal Trainer Panel (member view) ────────────────────────────────

  const PersonalTrainerPanel = <div className="page-container">
      <header className="page-header member-dashboard-inline-358">
        <div>
          <h2 className="page-title member-dashboard-inline-359">
            <UserCheck size={24} color="#6366f1" /> Personal Trainer
          </h2>
          <p className="page-subtitle">Plans and measurements created by your assigned trainer</p>
        </div>
      </header>

      {/* Conditional PT State Rendering */}
      {!ptState.memberPtInfo ? <div className="member-dashboard-inline-360">
          <UserCheck size={48} className="member-dashboard-inline-361" />
          <h3 className="member-dashboard-inline-362">No Personal Trainer Assigned</h3>
          <p className="member-dashboard-inline-363">You have not been assigned a Personal Trainer yet. Any incoming requests will appear here.</p>
        </div> : ptState.memberPtInfo.status === 'pending' ? <div className="member-dashboard-inline-364">
          <Bell size={48} className="member-dashboard-inline-365" />
          <h3 className="member-dashboard-inline-366">Pending Training Request</h3>
          <p className="member-dashboard-inline-367">
            <strong>{ptState.memberPtInfo.trainerId?.fullName || "A trainer"}</strong> has sent you a request to be your Personal Trainer. Do you want to accept this assignment?
          </p>
          <div className="member-dashboard-inline-368">
            <button onClick={() => dispatch(acceptPtAssignmentAction(ptState.memberPtInfo._id))} onMouseOver={e => {
          e.currentTarget.style.transform = "translateY(-2px)";
        }} onMouseOut={e => {
          e.currentTarget.style.transform = "translateY(0)";
        }} className="member-dashboard-inline-369">
              <CheckCircle size={18} /> Accept
            </button>
            <button onClick={() => dispatch(rejectPtAssignmentAction(ptState.memberPtInfo._id))} onMouseOver={e => {
          e.currentTarget.style.background = "rgba(239,68,68,0.1)";
        }} onMouseOut={e => {
          e.currentTarget.style.background = "transparent";
        }} className="member-dashboard-inline-370">
              <X size={18} /> Reject
            </button>
          </div>
        </div> : <>
          {/* Trainer Info Card */}
          <div className="member-dashboard-inline-371">
            <div className="member-dashboard-inline-372">
              {(ptState.memberPtInfo.trainerId?.fullName || "PT").slice(0, 2).toUpperCase()}
            </div>
            <div className="member-dashboard-inline-373">
              <p className="member-dashboard-inline-374">
                {ptState.memberPtInfo.trainerId?.fullName || "Your Trainer"}
              </p>
              <p className="member-dashboard-inline-375">
                Your Personal Trainer · Assigned by {ptState.memberPtInfo.assignedBy?.fullName || "—"}
              </p>
            </div>
            <div className="member-dashboard-inline-376">
              Active PT
            </div>
          </div>

          {/* Date Picker */}
          <div className="member-dashboard-inline-377">
            <div className="member-dashboard-inline-378">
              <Calendar size={16} color="var(--text-muted)" />
              <input type="date" value={ptDate} onChange={e => handlePtDateChange(e.target.value)} className="member-dashboard-inline-379" />
            </div>
            {ptState.loading && <Loader size={18} className="member-dashboard-inline-380" />}
          </div>

          {/* Workout Plan Card */}
          <div className="gym-card member-dashboard-inline-381">
            <h3 className="member-dashboard-inline-382">
              <Dumbbell size={18} color="#6366f1" /> Today's Workout Plan
            </h3>
            {ptState.workoutPlans.length === 0 ? <div className="member-dashboard-inline-383">
                <Dumbbell size={32} className="member-dashboard-inline-384" />
                <p className="member-dashboard-inline-385">No workout plan for {ptDate}</p>
              </div> : ptState.workoutPlans.map((plan: any) => <div key={plan._id} className="member-dashboard-inline-386">
                <table className="member-dashboard-inline-387">
                  <thead>
                    <tr className="member-dashboard-inline-388">
                      <th className="member-dashboard-inline-389">Exercise</th>
                      <th className="member-dashboard-inline-390">Sets</th>
                      <th className="member-dashboard-inline-391">Reps</th>
                      <th className="member-dashboard-inline-392">Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan.exercises?.map((ex: any, i: number) => <tr key={i} className="member-dashboard-inline-393">
                        <td className="member-dashboard-inline-394">{ex.name}</td>
                        <td className="member-dashboard-inline-395">{ex.sets}</td>
                        <td className="member-dashboard-inline-396">{ex.reps}</td>
                        <td className="member-dashboard-inline-397">{ex.weight || "—"}</td>
                      </tr>)}
                  </tbody>
                </table>
                {plan.generalNotes && <p className="member-dashboard-inline-398">Note: {plan.generalNotes}</p>}
              </div>)}
          </div>

          {/* Diet Plan Card */}
          <div className="gym-card member-dashboard-inline-399">
            <h3 className="member-dashboard-inline-400">
              <Salad size={18} color="#22c55e" /> Today's Diet Plan
            </h3>
            {ptState.dietPlans.length === 0 ? <div className="member-dashboard-inline-401">
                <Salad size={32} className="member-dashboard-inline-402" />
                <p className="member-dashboard-inline-403">No diet plan for {ptDate}</p>
              </div> : ptState.dietPlans.map((plan: any) => <div key={plan._id}>
                {plan.meals?.map((meal: any, i: number) => <div key={i} style={{
            borderTop: i === 0 ? "none" : "1px solid var(--border-color)"
          }} className="member-dashboard-inline-404">
                    <span className="member-dashboard-inline-405">{meal.mealType}</span>
                    <span className="member-dashboard-inline-406">{meal.foodItems}</span>
                    {meal.calories && <span className="member-dashboard-inline-407">{meal.calories} kcal</span>}
                  </div>)}
                {plan.waterIntake && <p className="member-dashboard-inline-408">💧 Water intake: {plan.waterIntake}L</p>}
                {plan.generalNotes && <p className="member-dashboard-inline-409">Note: {plan.generalNotes}</p>}
              </div>)}
          </div>

          {/* Measurements Card */}
          <div className="gym-card">
            <h3 className="member-dashboard-inline-410">
              <Ruler size={18} color="#f59e0b" /> Measurements — {ptDate}
            </h3>
            {ptState.measurements.length === 0 ? <div className="member-dashboard-inline-411">
                <Ruler size={32} className="member-dashboard-inline-412" />
                <p className="member-dashboard-inline-413">No measurements recorded for {ptDate}</p>
              </div> : ptState.measurements.map((m: any) => <div key={m._id}>
                <div className="member-dashboard-inline-414">
                  {[["Weight", m.weight, "kg"], ["Height", m.height, "cm"], ["Chest", m.chest, "cm"], ["Waist", m.waist, "cm"], ["Hips", m.hips, "cm"], ["Arms", m.arms, "cm"], ["Thighs", m.thighs, "cm"], ["Shoulders", m.shoulders, "cm"], ["Body Fat", m.bodyFat, "%"], ["BMI", m.bmi, ""]].filter(([, val]) => val != null).map(([label, val, unit]) => <div key={String(label)} className="member-dashboard-inline-415">
                      <p className="member-dashboard-inline-416">{label}</p>
                      <p className="member-dashboard-inline-417">
                        {val}<span className="member-dashboard-inline-418">{unit}</span>
                      </p>
                    </div>)}
                </div>
                {m.notes && <p className="member-dashboard-inline-419">Note: {m.notes}</p>}
              </div>)}
          </div>
        </>}
    </div>;
  const HealthMonitorPanel = <div className="page-container member-dashboard-inline-420">
      <header className="page-header member-dashboard-inline-421">
        <div className="member-dashboard-inline-422">
          <div className="member-dashboard-inline-423">
            <ClipboardList size={24} className="member-dashboard-inline-424" />
          </div>
          <div>
            <h2 className="page-title member-dashboard-inline-425">Health Monitor</h2>
            <p className="page-subtitle member-dashboard-inline-426">
              {healthMonitorSection === "bmi" && "Track your Body Mass Index."}
              {healthMonitorSection === "calories" && "Monitor your calorie intake and burn."}
              {healthMonitorSection === "water" && "Stay hydrated with water reminders."}
              {healthMonitorSection === "health_kit" && "Connect with your Health Kit."}
            </p>
          </div>
        </div>
      </header>

      {healthMonitorSection === "bmi" ? <BMICalculator /> : healthMonitorSection === "calories" ? <CaloriesCalculator /> : healthMonitorSection === "water" ? <WaterReminder /> : <div className="gym-card member-dashboard-inline-427">
          <div>
            <ClipboardList size={48} className="member-dashboard-inline-428" />
            <h3 className="member-dashboard-inline-429">
              {healthMonitorSection === "health_kit" && "Health Kit Integration Coming Soon"}
            </h3>
            <p className="member-dashboard-inline-430">This feature is currently under development.</p>
          </div>
        </div>}
    </div>;
  const panels: Record<string, React.ReactNode> = {
    overview: OverviewPanel,
    health_monitor: HealthMonitorPanel,
    workouts: WorkoutsPanel,
    reports: ReportsPanel,
    plans: PlansPanel,
    my_plan: <MemberPlanInvoicesPanel profile={profile} gymName={gymName} />,
    diet: DietPanel,
    library: <WorkoutLibraryPage />,
    pt: PersonalTrainerPanel,
    challenges: ChallengesPanel,
    events: <EventsViewPanel />
  };
  if (activeTab === "not_found") {
    return <Navigate to="/404" replace />;
  }
  return <div className="app-container">
      {showChangePassword && <UserProfileModal user={{
      fullName: userName,
      email: user?.email as string || profile?.email || "",
      role: "member"
    }} onClose={() => setShowChangePassword(false)} />}
      {showAiModal && <PurchaseAICreditsModal userEmail={user?.email as string || profile?.email || ""} onClose={() => setShowAiModal(false)} onSuccess={newTotalCredits => setProfile((prev: any) => ({
      ...prev,
      aiCredits: newTotalCredits
    }))} />}
      {Sidebar}

      <div className="main-content">
        {/* Mobile header */}
        <header className="mobile-header">
          <button className="menu-toggle-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu size={28} color="var(--text-primary)" />
          </button>
          <div className="member-dashboard-inline-431">
            {branding.logoUrl ? <img src={branding.logoUrl} alt={branding.gymName} className="member-dashboard-inline-432" /> : <img src="/logo.png" alt="Logo" className="member-dashboard-inline-433" />}
            <span className="brand-name member-dashboard-inline-434">{branding.gymName.toUpperCase()}</span>
          </div>
          <div className="member-dashboard-inline-435" />
        </header>

        {/* Active panel */}
        {panels[activeTab]}
      </div>
    </div>;
};
export default MemberDashboard;