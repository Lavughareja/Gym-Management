import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PlanState {
  plans: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PlanState = {
  plans: [],
  loading: false,
  error: null,
};

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    fetchPlansStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPlansSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.plans = action.payload;
    },
    fetchPlansFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPlansStart,
  fetchPlansSuccess,
  fetchPlansFailure,
} = planSlice.actions;

export default planSlice.reducer;
