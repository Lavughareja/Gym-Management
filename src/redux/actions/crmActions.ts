import { createAsyncThunk } from "@reduxjs/toolkit";
import * as crmApi from "../../services/apis/crmApis";
import { showSnackbar } from "../slices/snackbarSlice";

// Dashboard
export const fetchCrmDashboardAction = createAsyncThunk(
  "crm/fetchDashboard",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await crmApi.getCrmDashboardApi();
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to fetch CRM dashboard";
      dispatch(showSnackbar({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

// Leads
export const fetchLeadsAction = createAsyncThunk(
  "crm/fetchLeads",
  async (params: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await crmApi.getLeadsApi(params);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to fetch leads";
      dispatch(showSnackbar({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const fetchLeadByIdAction = createAsyncThunk(
  "crm/fetchLeadById",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await crmApi.getLeadByIdApi(id);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to fetch lead details";
      dispatch(showSnackbar({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const createLeadAction = createAsyncThunk(
  "crm/createLead",
  async (data: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await crmApi.createLeadApi(data);
      dispatch(showSnackbar({ message: "Lead created successfully", type: "success" }));
      return response.data.lead;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to create lead";
      dispatch(showSnackbar({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const updateLeadAction = createAsyncThunk(
  "crm/updateLead",
  async ({ id, data }: { id: string; data: any }, { dispatch, rejectWithValue }) => {
    try {
      const response = await crmApi.updateLeadApi(id, data);
      dispatch(showSnackbar({ message: "Lead updated successfully", type: "success" }));
      return response.data.lead;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to update lead";
      dispatch(showSnackbar({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const deleteLeadAction = createAsyncThunk(
  "crm/deleteLead",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      await crmApi.deleteLeadApi(id);
      dispatch(showSnackbar({ message: "Lead deleted successfully", type: "success" }));
      return id;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to delete lead";
      dispatch(showSnackbar({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const convertLeadAction = createAsyncThunk(
  "crm/convertLead",
  async ({ id, data }: { id: string; data: any }, { dispatch, rejectWithValue }) => {
    try {
      const response = await crmApi.convertLeadApi(id, data);
      dispatch(showSnackbar({ message: "Lead converted successfully", type: "success" }));
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to convert lead";
      dispatch(showSnackbar({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

// Follow Ups
export const fetchFollowUpsAction = createAsyncThunk(
  "crm/fetchFollowUps",
  async (params: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await crmApi.getFollowUpsApi(params);
      return response.data.followUps;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to fetch follow ups";
      dispatch(showSnackbar({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const createFollowUpAction = createAsyncThunk(
  "crm/createFollowUp",
  async (data: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await crmApi.createFollowUpApi(data);
      dispatch(showSnackbar({ message: "Follow-up created successfully", type: "success" }));
      return response.data.followUp;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to create follow up";
      dispatch(showSnackbar({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const updateFollowUpAction = createAsyncThunk(
  "crm/updateFollowUp",
  async ({ id, data }: { id: string; data: any }, { dispatch, rejectWithValue }) => {
    try {
      const response = await crmApi.updateFollowUpApi(id, data);
      dispatch(showSnackbar({ message: "Follow-up updated successfully", type: "success" }));
      return response.data.followUp;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to update follow up";
      dispatch(showSnackbar({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);
