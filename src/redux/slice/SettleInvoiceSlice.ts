'use client';
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SettleInvoiceType, PaymentModeType } from "../types";

// Define the initial state using that type
const initialState: SettleInvoiceType = {
  memo: "",
  step: 0,
  token: null,
  paymentMode: null,
  }


export const SettleInvoiceSlice = createSlice({
  name: "settleInvoice",
  initialState,
  reducers: {
    // addProfile: (state, { payload }: PayloadAction<SettleInvoiceType>) => {
    //   console.log(payload);
    //   if (state === null) {
    //     return payload;
    //   }
    //   state.email = payload.;
    //   state.id = payload.id;
    //   state.password = payload.password;
    //   state.createdAt = payload.createdAt;
    //   state.updatedAt = payload.updatedAt;
    // },
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
        state.step = 1;
      }
    },
  },
});

export const { addSettlementStep, clearSettlment, addPaymentMode, changeStep } =
  SettleInvoiceSlice.actions;

export default SettleInvoiceSlice.reducer;
