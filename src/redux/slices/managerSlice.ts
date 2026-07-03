import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ManagerState {
  managers: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ManagerState = {
  managers: [],
  loading: false,
  error: null,
};

const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {
    fetchManagersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchManagersSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.managers = action.payload;
    },
    fetchManagersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateManagerStatus: (state, action: PayloadAction<{ id: string; canAddMember: boolean }>) => {
      const index = state.managers.findIndex((m) => m._id === action.payload.id);
      if (index !== -1) {
        state.managers[index].canAddMember = action.payload.canAddMember;
      }
    },
  },
});

export const {
  fetchManagersStart,
  fetchManagersSuccess,
  fetchManagersFailure,
  updateManagerStatus,
} = managerSlice.actions;

export default managerSlice.reducer;
