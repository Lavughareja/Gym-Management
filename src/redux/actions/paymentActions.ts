import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createOrderApi,
  verifySignatureApi,
} from "../../services/apis/paymentApis";
import type {
  CreateOrderPayload,
  VerifySignaturePayload,
} from "../../services/apis/paymentApis";
import { showSnackbar } from "../slices/snackbarSlice";

// ─────────────────────────────────────────────────────────────────────────────
// Payment Actions (Async Thunks)
// ─────────────────────────────────────────────────────────────────────────────

export const createOrderAction = createAsyncThunk(
  "payment/createOrder",
  async (payload: CreateOrderPayload, { rejectWithValue, dispatch }) => {
    try {
      const response = await createOrderApi(payload);
      dispatch(showSnackbar({ message: response?.data?.message || "Payment order created!", type: "info" }));
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || "Failed to create payment order. Please try again.";
      dispatch(showSnackbar({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const verifySignatureAction = createAsyncThunk(
  "payment/verifySignature",
  async (payload: VerifySignaturePayload, { rejectWithValue, dispatch }) => {
    try {
      const response = await verifySignatureApi(payload);
      dispatch(showSnackbar({ message: response?.data?.message || "Payment verified successfully!", type: "success" }));
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || "Payment verification failed. Please contact support.";
      dispatch(showSnackbar({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);
