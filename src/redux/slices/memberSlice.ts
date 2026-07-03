import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface MemberState {
  members: any[];
  loading: boolean;
  error: string | null;
}

const initialState: MemberState = {
  members: [],
  loading: false,
  error: null,
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    fetchMembersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMembersSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.members = action.payload;
    },
    fetchMembersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateMemberStatus: (state, action: PayloadAction<{ id: number; status: string }>) => {
      const index = state.members.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.members[index].status = action.payload.status;
      }
    },
  },
});

export const {
  fetchMembersStart,
  fetchMembersSuccess,
  fetchMembersFailure,
  updateMemberStatus,
} = memberSlice.actions;

export default memberSlice.reducer;
