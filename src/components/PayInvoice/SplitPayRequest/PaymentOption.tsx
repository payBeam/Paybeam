// 1. if the option is split with friends, then the user can add amount that the friend should foot
// and then he sees the link to share to those friends, and his own share to pay
//2. if the option is pay myself, then the user sees list of supported tokens to pay with
// clcekning on toekn of choice shows qr code to scan to pay, function to call to pay, address to transfer to with memo
// then a listening ui to show when the payment is successful
//
import React from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { changeStep } from "@/redux/slice/SettleInvoiceSlice";
import { FaEthereum } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { SiBinance, SiCoinbase, SiStellar } from "react-icons/si";
import { TbCurrencySolana } from "react-icons/tb";

function PaymentOption() {
  const dispatch = useAppDispatch();
  const invoiceSettlement = useAppSelector((state) => state.settleInvoice);

  return (
    <div className="flex flex-col">
      {/* Header with back button and title */}
      <div className="flex justify-between items-center">
        <div onClick={() => dispatch(changeStep(invoiceSettlement.step - 1))} className="cursor-pointer">
          <IoIosArrowBack />
        </div>
        <h1 className="text-2xl font-bold mb-4">Pay With</h1>
        <div />
      </div>

      <div className="flex flex-col gap-4">
        <EVMPaymentButton />
        <button className="inline-flex h-12 animate-shimmer gap-2 items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 bg-[linear-gradient(110deg,#f1f5f9,45%,#e2e8f0,55%,#f1f5f9)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-700 dark:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-slate-600 dark:focus:ring-offset-slate-900">
          <span>Pay with XLM</span>
          {/* XLM */}
          <div className="w-6 h-6 rounded-full bg-slate-800 p-0.5 flex items-center justify-center  ">
            <SiStellar className="text-purple-500 dark:text-purple-400 w-4 h-4" />
          </div>
        </button>
      </div>
    </div>
  );
}

export default PaymentOption;

const EVMPaymentButton = () => {
  return (
    <button className="inline-flex h-12 animate-shimmer gap-2 items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 bg-[linear-gradient(110deg,#f1f5f9,45%,#e2e8f0,55%,#f1f5f9)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-700 dark:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-slate-600 dark:focus:ring-offset-slate-900">
      <span>Pay with EVM Tokens</span>

      <div className="flex -space-x-2">
        {/* Ethereum */}
        <div className="w-6 h-6 rounded-full bg-slate-800 p-0.5 flex items-center justify-center  ">
          <FaEthereum className="text-purple-500 dark:text-purple-400 w-4 h-4" />
        </div>

        {/* BNB */}
        <div className="w-6 h-6 rounded-full bg-slate-800 p-0.5 flex items-center justify-center ">
          <SiBinance className="text-yellow-500 dark:text-yellow-400 w-4 h-4" />
        </div>

        {/* Coinbase */}
        <div className="w-6 h-6 rounded-full bg-slate-800 p-0.5 flex items-center justify-center ">
          <SiCoinbase className="text-blue-500 dark:text-blue-400 w-4 h-4" />
        </div>

        {/* Solana */}
        <div className="w-6 h-6 rounded-fulbg-slate-800 p-0.5 flex items-center justify-center">
          <TbCurrencySolana className="text-green-500 dark:text-green-400 w-4 h-4" />
        </div>
      </div>
    </button>
  );
};

