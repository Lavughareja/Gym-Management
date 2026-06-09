// ─────────────────────────────────────────────────────────────────────────────
// API Routes — all backend endpoint paths
// ─────────────────────────────────────────────────────────────────────────────

export const apiRoutes = {
  // ── Auth ──────────────────────────────────────────────────────────────────
  login: "/auth/login",
  logout: "/auth/logout",
  registerOwner: "/auth/register-owner",
  managerSetup: "/auth/manager-setup",

  // ── Payment ───────────────────────────────────────────────────────────────
  createOrder: "/payment/create-order",
  verifySignature: "/payment/verify-signature",

  // ── Managers ──────────────────────────────────────────────────────────────
  managers: "/managers",
  inviteManager: "/managers/invite",
  resendInvitation: "/managers/resend-invitation",
} as const;
