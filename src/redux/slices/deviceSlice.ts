import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DeviceState {
  devices: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DeviceState = {
  devices: [],
  loading: false,
  error: null,
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    fetchDevicesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDevicesSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.devices = action.payload;
    },
    fetchDevicesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDevicesStart,
  fetchDevicesSuccess,
  fetchDevicesFailure,
} = deviceSlice.actions;

export default deviceSlice.reducer;
