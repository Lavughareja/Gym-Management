import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
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

const getInitialBranding = (): GymBranding => {
  const saved = localStorage.getItem("gymBranding");
  if (saved) {
    try {
      return { ...DEFAULT_BRANDING, ...JSON.parse(saved) };
    } catch {
      return DEFAULT_BRANDING;
    }
  }
  return DEFAULT_BRANDING;
};

const initialState: WhiteLabelState = {
  branding: getInitialBranding(),
  loading:  false,
  resolved: !!localStorage.getItem("gymBranding"),
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
      const merged = { ...DEFAULT_BRANDING, ...action.payload } as GymBranding;
      state.branding = merged;
      state.resolved = true;
      localStorage.setItem("gymBranding", JSON.stringify(merged));
    },
    resetBranding(state) {
      state.branding = DEFAULT_BRANDING;
      state.resolved = false;
      localStorage.removeItem("gymBranding");
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
        const merged = { ...DEFAULT_BRANDING, ...action.payload };
        state.branding = merged;
        localStorage.setItem("gymBranding", JSON.stringify(merged));
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
