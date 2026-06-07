// ─────────────────────────────────────────────────────────────────────────────
// API Routes — all backend endpoint paths
// ─────────────────────────────────────────────────────────────────────────────

export const apiRoutes = {
  // ── Auth ──────────────────────────────────────────────────────────────────
  login:          "/auth/login",
  logout:         "/auth/logout",
  registerOwner:  "/auth/register-owner",

  // ── Payment ───────────────────────────────────────────────────────────────
  createOrder:       "/payment/create-order",
  verifySignature:   "/payment/verify-signature",
} as const;
