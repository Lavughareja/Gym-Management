import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import paymentReducer from "./slices/paymentSlice";
import snackbarReducer from "./slices/snackbarSlice";
import superAdminReducer from "../SuperAdmin/redux/slices/superAdminSlice";

// ─────────────────────────────────────────────────────────────────────────────
// Redux Store
// ─────────────────────────────────────────────────────────────────────────────

export const store = configureStore({
  reducer: {
    auth:       authReducer,
    payment:    paymentReducer,
    snackbar:   snackbarReducer,
    superAdmin: superAdminReducer,
  },
});

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

