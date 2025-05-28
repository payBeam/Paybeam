import React from "react"
import { useAppSelector } from "@/redux/hook";
import PaymentOption from "./PaymentOption";

function SplitWithFriendsScreen() {
  const invoiceSettlement = useAppSelector((state) => state.settleInvoice);

  switch (invoiceSettlement.step) {
    case 5:
      return <PaymentOption />;
    case 6:
      return <div>screen 6</div>;
    case 7:
      return <div>screen 7</div>;
    case 8:
      return <div>screen 8</div>;
    default:
      return <PaymentOption />;
  }
}
export default SplitWithFriendsScreen;
