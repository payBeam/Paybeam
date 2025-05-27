import PaymentOption from "./PaymentOption";
import {useAppSelector} from '@/redux/hook';


function PayMySelfSreen() {
  const invoiceSettlement = useAppSelector((state) => state.settleInvoice);

  switch (invoiceSettlement.step) {
    case 0:
      return <PaymentOption />;
    case 1:
      return <div>screen 1</div>;
    case 2:
      return <div>screen 0</div>;
    case 4:
      return <div>screen 1</div>;
    default:
      return <PaymentOption />;
  }
}

export default PayMySelfSreen;