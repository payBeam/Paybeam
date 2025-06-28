"use client";
import Nav1 from "@/components/Navbar/Nav1";
import InvoiceDetails from "@/components/PayInvoice";
import { useInvoice } from "@/hooks/useInvoice";
import {
  usePrepApproveContract,
  usePreparePayTx,
} from "@/hooks/useStellarFunctions";
import { useAppDispatch } from "@/redux/hook";
import { addInvoice } from "@/redux/slice/SettleInvoiceSlice";
import { Alert, Button, Result, Spin, Typography } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Web3Providers from "@/providers/web3Provider";
import '@rainbow-me/rainbowkit/styles.css';

const { Title, Text } = Typography;

function Page({ params }: { params: Promise<{ id: string }> }) {
  const [memo, setMemo] = useState<string | null>(null);
  const mutation = usePreparePayTx();
  const trustline = usePrepApproveContract();

  useEffect(() => {
    params.then((resolvedParams) => {
      setMemo(resolvedParams.id);
    });
  }, [params]);

  const { data: invoice, isLoading, error } = useInvoice(memo || "");
  console.log(invoice);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (invoice?.data) {
      const payload = {
        memo: invoice.data.id,
        amount: invoice.data.amount,
        step: 0,
        token: null,
        paymentMode: null
      };
      dispatch(addInvoice(payload));
    }
  }, [invoice, dispatch]);

  if (!memo || !invoice) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Result
          status="error"
          title="Invoice Error"
          subTitle={
            error instanceof AxiosError && error.response?.data?.data
              ? error.response.data.data
              : "An unknown error occurred"
          }
          extra={[
            <Button
              type="primary"
              key="retry"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>,
          ]}
        />
      </div>
    );
  }

  return (
    
    <Web3Providers>
    <div className="mx-w-lg md:max-w-xl  mx-auto p-4 py-8">
      <Nav1 />
          <Alert
        message="payBeam is currently in development"
        description="We're actively working on integrating support for EVM tokens. Some things may break during this process — thanks for bearing with us!"
        type="info"
        showIcon
      />
      <div className="h-8" />
      <InvoiceDetails invoice={invoice?.data && invoice?.data} />
    </div>
    </Web3Providers>
  );
}

export default Page;
