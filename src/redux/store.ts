import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import paymentReducer from "./slices/paymentSlice";
import snackbarReducer from "./slices/snackbarSlice";
import superAdminReducer from "../SuperAdmin/redux/slices/superAdminSlice";
import memberReducer from "./slices/memberSlice";
import trainerReducer from "./slices/trainerSlice";
import managerReducer from "./slices/managerSlice";
import planReducer from "./slices/planSlice";
import healthReducer from "./slices/healthSlice";
import attendanceReducer from "./slices/attendanceSlice";
import deviceReducer from "./slices/deviceSlice";
import ptReducer from "./slices/ptSlice";
import crmReducer from "./slices/crmSlice";

// ─────────────────────────────────────────────────────────────────────────────
// Redux Store
// ─────────────────────────────────────────────────────────────────────────────

export const store = configureStore({
  reducer: {
    auth:       authReducer,
    payment:    paymentReducer,
    snackbar:   snackbarReducer,
    superAdmin: superAdminReducer,
    member:     memberReducer,
    trainer:    trainerReducer,
    manager:    managerReducer,
    plan:       planReducer,
    health:     healthReducer,
    attendance: attendanceReducer,
    device:     deviceReducer,
    pt:         ptReducer,
    crm:        crmReducer,
  },
});

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

