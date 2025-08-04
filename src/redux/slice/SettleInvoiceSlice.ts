"use client";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { PaymentModeType, SettleInvoiceType } from "../types";

// Define the initial state using that type
const initialState: SettleInvoiceType = {
  memo: "",
  step: 0,
  relayer: null,
  paymentMode: null,
  amount: 0,
  dollarPrice: 0,
};

export const SettleInvoiceSlice = createSlice({
  name: "settleInvoice",
  initialState,
  reducers: {
    addInvoice: (state, { payload }: PayloadAction<SettleInvoiceType>) => {
      console.log(payload);
      if (state === null) {
        return payload;
      }
      state.memo = payload.memo;
      state.amount = payload.amount;
    },
    addSettlementStep: (state, { payload }: PayloadAction<number>) => {
      if (state) {
        state.step = payload;
      }
    },
    clearSettlment: () => {
      return initialState;
    },
    changeStep: (state, { payload }: PayloadAction<number>) => {
      if (state) {
        state.step = payload;
      }
    },
    addPaymentMode: (state, { payload }: PayloadAction<PaymentModeType>) => {
      if (state) {
        state.paymentMode = payload;
      }
    },
    addDollarPrice: (state, { payload }: PayloadAction<number>) => {
      if (state) {
        state.dollarPrice = payload;
      }
    },
  },
});

export const {
  addSettlementStep,
  clearSettlment,
  addPaymentMode,
  changeStep,
  addInvoice,
  addDollarPrice,
} = SettleInvoiceSlice.actions;

export default SettleInvoiceSlice.reducer;
