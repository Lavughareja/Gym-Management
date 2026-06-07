import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// ─────────────────────────────────────────────────────────────────────────────
// Global Snackbar Slice
// Usage: dispatch(showSnackbar({ message: "Done!", type: "success" }))
// ─────────────────────────────────────────────────────────────────────────────

type SnackbarSeverity = "success" | "error" | "warning" | "info";

interface SnackbarState {
  open: boolean;
  message: string;
  type: SnackbarSeverity;
}

const initialState: SnackbarState = {
  open: false,
  message: "",
  type: "info",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{ message: string; type: SnackbarSeverity }>
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
