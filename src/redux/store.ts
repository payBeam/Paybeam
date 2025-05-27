"use client";
import { configureStore } from "@reduxjs/toolkit";
import profile from "./slice/ProfileSlice";
import SettleInvoiceSlice from "./slice/SettleInvoiceSlice";
import token from "./slice/TokenSlice";

export const store = configureStore({
  reducer: {
    profile,
    token,
    settleInvoice: SettleInvoiceSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
