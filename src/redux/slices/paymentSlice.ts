import { createSlice } from "@reduxjs/toolkit";
import {
  createOrderAction,
  verifySignatureAction,
} from "../actions/paymentActions";
import { PAYMENT_TOKEN_KEY } from "../../utils/constant";

// ─────────────────────────────────────────────────────────────────────────────
// Payment Slice
// ─────────────────────────────────────────────────────────────────────────────

interface PaymentState {
  orderId: string | null;
  paymentToken: string | null;
  loading: boolean;
  error: string | null;
  orderCreated: boolean;
  signatureVerified: boolean;
}

const initialState: PaymentState = {
  orderId: null,
  paymentToken: sessionStorage.getItem(PAYMENT_TOKEN_KEY),
  loading: false,
  error: null,
  orderCreated: false,
  signatureVerified: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearPaymentState: (state) => {
      state.orderId = null;
      state.paymentToken = null;
      state.error = null;
      state.orderCreated = false;
      state.signatureVerified = false;
      sessionStorage.removeItem(PAYMENT_TOKEN_KEY);
    },
    clearPaymentError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ── Create Order ───────────────────────────────────────────────────────
    builder
      .addCase(createOrderAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderCreated = false;
      })
      .addCase(createOrderAction.fulfilled, (state, action) => {
        state.loading = false;
        state.orderId = action.payload?.order?.orderId;
        state.orderCreated = true;
      })
      .addCase(createOrderAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ── Verify Signature ───────────────────────────────────────────────────
    builder
      .addCase(verifySignatureAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.signatureVerified = false;
      })
      .addCase(verifySignatureAction.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentToken = action.payload?.paymentToken;
        state.signatureVerified = true;
        // Persist token in sessionStorage so it survives a page refresh
        // but is gone when the browser session ends
        if (action.payload?.paymentToken) {
          sessionStorage.setItem(PAYMENT_TOKEN_KEY, action.payload.paymentToken);
        }
      })
      .addCase(verifySignatureAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPaymentState, clearPaymentError } = paymentSlice.actions;
export default paymentSlice.reducer;
