import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AttendanceState {
  events: any[];
  loading: boolean;
  error: string | null;
}

const initialState: AttendanceState = {
  events: [],
  loading: false,
  error: null,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    fetchAttendanceStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAttendanceSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.events = action.payload;
    },
    fetchAttendanceFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAttendanceStart,
  fetchAttendanceSuccess,
  fetchAttendanceFailure,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
