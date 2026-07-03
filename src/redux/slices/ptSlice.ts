import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PtState {
  assignments: any[];       // all PT assignments (owner/manager view)
  myMembers: any[];         // trainer's assigned members (trainer view)
  memberPtInfo: any | null; // active PT info for a single member (member view)
  workoutPlans: any[];
  dietPlans: any[];
  measurements: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PtState = {
  assignments: [],
  myMembers: [],
  memberPtInfo: null,
  workoutPlans: [],
  dietPlans: [],
  measurements: [],
  loading: false,
  error: null,
};

const ptSlice = createSlice({
  name: "pt",
  initialState,
  reducers: {
    // Loading / error
    ptRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    ptRequestFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Assignments
    setAssignments: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.assignments = action.payload;
    },
    setMyMembers: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.myMembers = action.payload;
    },
    setMemberPtInfo: (state, action: PayloadAction<any | null>) => {
      state.loading = false;
      state.memberPtInfo = action.payload;
    },
    removeAssignmentById: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter((a) => a._id !== action.payload);
      state.myMembers = state.myMembers.filter((a) => a._id !== action.payload);
    },

    // Workout Plans
    setWorkoutPlans: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.workoutPlans = action.payload;
    },
    addWorkoutPlan: (state, action: PayloadAction<any>) => {
      state.workoutPlans.unshift(action.payload);
    },
    removeWorkoutPlan: (state, action: PayloadAction<string>) => {
      state.workoutPlans = state.workoutPlans.filter((p) => p._id !== action.payload);
    },

    // Diet Plans
    setDietPlans: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.dietPlans = action.payload;
    },
    addDietPlan: (state, action: PayloadAction<any>) => {
      state.dietPlans.unshift(action.payload);
    },
    removeDietPlan: (state, action: PayloadAction<string>) => {
      state.dietPlans = state.dietPlans.filter((p) => p._id !== action.payload);
    },

    // Measurements
    setMeasurements: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.measurements = action.payload;
    },
    addMeasurement: (state, action: PayloadAction<any>) => {
      state.measurements.unshift(action.payload);
    },
    removeMeasurement: (state, action: PayloadAction<string>) => {
      state.measurements = state.measurements.filter((m) => m._id !== action.payload);
    },

    // Reset member-specific data when switching members
    clearMemberPtData: (state) => {
      state.workoutPlans = [];
      state.dietPlans = [];
      state.measurements = [];
    },
  },
});

export const {
  ptRequestStart,
  ptRequestFailure,
  setAssignments,
  setMyMembers,
  setMemberPtInfo,
  removeAssignmentById,
  setWorkoutPlans,
  addWorkoutPlan,
  removeWorkoutPlan,
  setDietPlans,
  addDietPlan,
  removeDietPlan,
  setMeasurements,
  addMeasurement,
  removeMeasurement,
  clearMemberPtData,
} = ptSlice.actions;

export default ptSlice.reducer;
