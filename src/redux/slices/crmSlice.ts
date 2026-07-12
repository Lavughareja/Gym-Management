import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCrmDashboardAction,
  fetchLeadsAction,
  fetchLeadByIdAction,
  createLeadAction,
  updateLeadAction,
  deleteLeadAction,
  convertLeadAction,
  fetchFollowUpsAction,
  createFollowUpAction,
  updateFollowUpAction
} from "../actions/crmActions";

interface CrmState {
  dashboard: any;
  leads: any[];
  totalLeads: number;
  currentLead: any;
  leadActivities: any[];
  leadFollowUps: any[];
  followUps: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CrmState = {
  dashboard: null,
  leads: [],
  totalLeads: 0,
  currentLead: null,
  leadActivities: [],
  leadFollowUps: [],
  followUps: [],
  loading: false,
  error: null,
};

const crmSlice = createSlice({
  name: "crm",
  initialState,
  reducers: {
    clearCurrentLead: (state) => {
      state.currentLead = null;
      state.leadActivities = [];
      state.leadFollowUps = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Dashboard
      .addCase(fetchCrmDashboardAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCrmDashboardAction.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchCrmDashboardAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Leads
      .addCase(fetchLeadsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload.leads;
        state.totalLeads = action.payload.total;
      })
      .addCase(fetchLeadsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Lead By Id
      .addCase(fetchLeadByIdAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadByIdAction.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLead = action.payload.lead;
        state.leadActivities = action.payload.activities;
        state.leadFollowUps = action.payload.followUps;
      })
      .addCase(fetchLeadByIdAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Lead
      .addCase(createLeadAction.fulfilled, (state, action) => {
        state.leads.unshift(action.payload);
        state.totalLeads += 1;
      })
      // Update Lead
      .addCase(updateLeadAction.fulfilled, (state, action) => {
        const index = state.leads.findIndex((l) => l._id === action.payload._id);
        if (index !== -1) {
          state.leads[index] = action.payload;
        }
        if (state.currentLead && state.currentLead._id === action.payload._id) {
          state.currentLead = { ...state.currentLead, ...action.payload };
        }
      })
      // Delete Lead
      .addCase(deleteLeadAction.fulfilled, (state, action) => {
        state.leads = state.leads.filter((l) => l._id !== action.payload);
        state.totalLeads -= 1;
      })
      // Follow Ups
      .addCase(fetchFollowUpsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowUpsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.followUps = action.payload;
      })
      .addCase(fetchFollowUpsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create FollowUp
      .addCase(createFollowUpAction.fulfilled, (state, action) => {
        state.followUps.push(action.payload);
        if (state.currentLead && state.currentLead._id === action.payload.leadId) {
            state.leadFollowUps.push(action.payload);
        }
      })
      // Update FollowUp
      .addCase(updateFollowUpAction.fulfilled, (state, action) => {
        const index = state.followUps.findIndex((f) => f._id === action.payload._id);
        if (index !== -1) {
          state.followUps[index] = action.payload;
        }
        const leadIndex = state.leadFollowUps.findIndex((f) => f._id === action.payload._id);
        if (leadIndex !== -1) {
           state.leadFollowUps[leadIndex] = action.payload;
        }
      });
  },
});

export const { clearCurrentLead } = crmSlice.actions;
export default crmSlice.reducer;
