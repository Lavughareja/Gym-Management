// ─────────────────────────────────────────────────────────────────────────────
// Environment Configuration
// ─────────────────────────────────────────────────────────────────────────────
// Set IS_LIVE = true  → uses LIVE/production base URL
// Set IS_LIVE = false → uses STAGING base URL
// Set IS_LOCAL = true → uses LOCAL base URL (overrides IS_LIVE)
// ─────────────────────────────────────────────────────────────────────────────

export const IS_LOCAL = true;    // ← true  = localhost dev
export const IS_LIVE  = false;   // ← true  = production / false = staging

const BASE_URLS = {
  local:   "http://localhost:5000/api",
  staging: "https://staging-api.gymmanagement.com/api",
  live:    "https://api.gymmanagement.com/api",
};

export const getBaseUrl = (): string => {
  if (IS_LOCAL) return BASE_URLS.local;
  if (IS_LIVE)  return BASE_URLS.live;
  return BASE_URLS.staging;
};

export const BASE_URL = getBaseUrl();

// Token key used in localStorage
export const AUTH_TOKEN_KEY  = "gym_auth_token";
export const PAYMENT_TOKEN_KEY = "gym_payment_token";

// Plan identifiers
export const PLANS = {
  WITHOUT_BIOMATRIX: "without_biomatrix",
  WITH_BIOMATRIX:    "with_biomatrix",
  ADDITIONAL_PLAN:   "additional_plan",
} as const;

export type PlanType = (typeof PLANS)[keyof typeof PLANS];
