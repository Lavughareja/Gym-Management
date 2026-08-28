import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { resolveWhiteLabelBySubdomain } from '../../services/apis/whiteLabelApis';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface GymBranding {
  gymId:          string | null;
  gymName:        string;
  logoUrl:        string | null;
  primaryColor:   string;
  secondaryColor: string;
  tagline:        string | null;
  gymCode:        string | null;
  subdomain:      string | null;
}

interface WhiteLabelState {
  branding: GymBranding;
  loading:  boolean;
  resolved: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Defaults — used when no subdomain or API fails
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_BRANDING: GymBranding = {
  gymId:          null,
  gymName:        'Trainix',
  logoUrl:        null,
  primaryColor:   '#2563eb',
  secondaryColor: '#1d4ed8',
  tagline:        null,
  gymCode:        null,
  subdomain:      null,
};

const initialState: WhiteLabelState = {
  branding: DEFAULT_BRANDING,
  loading:  false,
  resolved: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// Thunk — runs on app load if a subdomain is detected
// ─────────────────────────────────────────────────────────────────────────────

export const resolveWhiteLabelAction = createAsyncThunk(
  'whiteLabel/resolve',
  async (subdomain: string, { rejectWithValue }) => {
    try {
      const res = await resolveWhiteLabelBySubdomain(subdomain);
      return res.data;
    } catch {
      return rejectWithValue(null);
    }
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// Slice
// ─────────────────────────────────────────────────────────────────────────────

const whiteLabelSlice = createSlice({
  name: 'whiteLabel',
  initialState,
  reducers: {
    // Dispatch after login to refresh branding from the login response
    setGymBranding(state, action: PayloadAction<Partial<GymBranding>>) {
      state.branding = { ...DEFAULT_BRANDING, ...action.payload } as GymBranding;
      state.resolved = true;
    },
    resetBranding(state) {
      state.branding = DEFAULT_BRANDING;
      state.resolved = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resolveWhiteLabelAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(resolveWhiteLabelAction.fulfilled, (state, action) => {
        state.loading  = false;
        state.resolved = true;
        state.branding = { ...DEFAULT_BRANDING, ...action.payload };
      })
      .addCase(resolveWhiteLabelAction.rejected, (state) => {
        state.loading  = false;
        state.resolved = true;
        // Keep default Trainix branding on failure
      });
  },
});

export const { setGymBranding, resetBranding } = whiteLabelSlice.actions;
export default whiteLabelSlice.reducer;
