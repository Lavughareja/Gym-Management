import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface HealthState {
  bmiPhotos: any[];
  dietPlans: any[];
  loading: boolean;
  error: string | null;
}

const initialState: HealthState = {
  bmiPhotos: [],
  dietPlans: [],
  loading: false,
  error: null,
};

const healthSlice = createSlice({
  name: "health",
  initialState,
  reducers: {
    fetchHealthDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchHealthDataSuccess: (state, action: PayloadAction<{ bmiPhotos: any[], dietPlans: any[] }>) => {
      state.loading = false;
      state.bmiPhotos = action.payload.bmiPhotos;
      state.dietPlans = action.payload.dietPlans;
    },
    fetchHealthDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchHealthDataStart,
  fetchHealthDataSuccess,
  fetchHealthDataFailure,
} = healthSlice.actions;

export default healthSlice.reducer;
