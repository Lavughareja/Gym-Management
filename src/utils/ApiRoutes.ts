// ─────────────────────────────────────────────────────────────────────────────
// API Routes — all backend endpoint paths
// ─────────────────────────────────────────────────────────────────────────────

export const apiRoutes = {
  // ── Auth ──────────────────────────────────────────────────────────────────
  login: "/auth/login",
  logout: "/auth/logout",
  registerOwner: "/auth/register-owner",
  managerSetup: "/auth/manager-setup",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  changePassword: "/auth/change-password",

  // ── Payment ───────────────────────────────────────────────────────────────
  createOrder: "/payment/create-order",
  verifySignature: "/payment/verify-signature",

  // ── Managers ──────────────────────────────────────────────────────────────
  managers: "/managers",
  inviteManager: "/managers/invite",
  resendInvitation: "/managers/resend-invitation",

  // ── Biometric Devices ─────────────────────────────────────────────────────
  devices: "/manager/devices",

  // ── Attendance ────────────────────────────────────────────────────────────
  attendanceToday: "/attendance/today",

  // ── Members ───────────────────────────────────────────────────────────────
  bulkImportMembers: "/manager/members/bulk-import",
  addMember: "/members",
  getMembers: "/members",
  memberSetup: "/members/setup",

  // ── Workouts ──────────────────────────────────────────────────────────────
  workouts: "/workouts",
  logWorkout: "/workouts/log",
  workoutReport: "/workouts/report",

  // ── Plans ─────────────────────────────────────────────────────────────────
  createPlan: "/plans",
  getPlans: "/plans",
  deletePlan: "/plans/:planId",

  // ── BMI & Diet ────────────────────────────────────────────────────────────
  bmi: "/bmi",
  bmiMember: "/bmi/member",
  bmiLatest: "/bmi/latest",
  dietGenerate: "/diet/generate",
  dietMember: "/diet/member",
} as const;
