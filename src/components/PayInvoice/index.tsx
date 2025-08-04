import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addPaymentMode } from "@/redux/slice/SettleInvoiceSlice";
import { getDollarPrice } from "@/utils/conversions";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PayMySelfSreen from "./PayYourself";
import SplitWithFriendsScreen from "./SplitPayment";
import { addDollarPrice } from "@/redux/slice/SettleInvoiceSlice";

function PayInvoice(invoice: any) {
  const dispatch = useAppDispatch();
  const invoiceSettlement = useAppSelector((state) => state.settleInvoice);
  const dollarPrice = useAppSelector((state) => state.settleInvoice.dollarPrice);

  useEffect(() => {
    const getPrice = async () => {
      const res = await fetch(`/api/converter?amount=${invoice?.invoice?.amount}`);
      const { result } = await res.json();
      console.log("Zeta in USD:", result);

      // const price = await getDollarPrice(invoice?.invoice?.amount)
      dispatch(addDollarPrice(result));
    };
    getPrice();
  }, []);

  return (
    <div className="flex flex-col border rounded-lg  p-5 gap-5">
      {/* invoice details */}
      {/* memo */}
      <div className="flex justify-between rounded-sm p-2 bg-gray-100 dark:bg-gray-800">
        <p>memo</p>
        <p className="font-extralight">{invoice?.invoice.id}</p>
      </div>

      {/* Price */}
      <div className="flex justify-between rounded-sm p-2 bg-gray-100 dark:bg-gray-800">
        <p>amount</p>
        <p>${dollarPrice.toLocaleString()}</p>
      </div>

      {/* Description */}
      <div className="flex justify-between rounded-sm p-2 bg-gray-100 dark:bg-gray-800">
        <p>note</p>
        <p className="font-extralight">{invoice?.invoice.description}</p>
      </div>

      {/* Progress Bar */}
      <div></div>

      {/* HOW DO YOU WANT TO PAY */}
      {invoiceSettlement.paymentMode === null ? (
        <div className="flex justify-center items-center flex-col gap-6">
          <h1>How do you want to foot the bill?</h1>
          <div className="flex gap-2">
            <button
              // onClick={() => dispatch(addPaymentMode("split"))}
              onClick={() => toast.error("This feature is not available yet.")}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Split with Friends
            </button>
            <button
              onClick={() => dispatch(addPaymentMode("payMyself"))}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              I'd Pay
            </button>
          </div>
        </div>
      ) : (
        <Screens />
        // <PaymentOption />
      )}
    </div>
  );
}

export default PayInvoice;

function Screens() {
  const invoiceSettlement = useAppSelector((state) => state.settleInvoice);

  switch (invoiceSettlement.paymentMode) {
    case "payMyself":
      return <PayMySelfSreen />;
    case "split":
      return <SplitWithFriendsScreen />;
    default:
      return <PayMySelfSreen />;
  }
}
