import React from "react"
import { useAppSelector } from "@/redux/hook";
import Pay from "./Pay";
import PaymentOption from "./PaymentOption";

function PayMySelfSreen() {
  const invoiceSettlement = useAppSelector((state) => state.settleInvoice);

  switch (invoiceSettlement.step) {
    case 0:
      return <PaymentOption />;
    case 1:
      return <Pay />;
    case 2:
      return <div>screen 0</div>;
    case 4:
      return <div>screen 1</div>;
    default:
      return <PaymentOption />;
  }
}

export default PayMySelfSreen;
