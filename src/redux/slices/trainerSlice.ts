import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TrainerState {
  trainers: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TrainerState = {
  trainers: [],
  loading: false,
  error: null,
};

const trainerSlice = createSlice({
  name: "trainer",
  initialState,
  reducers: {
    fetchTrainersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTrainersSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.trainers = action.payload;
    },
    fetchTrainersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTrainerStatus: (state, action: PayloadAction<{ id: string; canAddMember: boolean }>) => {
      const index = state.trainers.findIndex((t) => t._id === action.payload.id);
      if (index !== -1) {
        state.trainers[index].canAddMember = action.payload.canAddMember;
      }
    },
  },
});

export const {
  fetchTrainersStart,
  fetchTrainersSuccess,
  fetchTrainersFailure,
  updateTrainerStatus,
} = trainerSlice.actions;

export default trainerSlice.reducer;
