"use client";
import Nav1 from "@/components/Navbar/Nav1";
import InvoiceDetails from "@/components/PayInvoice";
import { useInvoice } from "@/hooks/useInvoice";
import {
  usePrepApproveContract,
  usePreparePayTx,
} from "@/hooks/useStellarFunctions";
import { useWalletKit } from "@/hooks/useStellarWaletKit";
import { Button, Result, Spin, Typography } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const { Title, Text } = Typography;

function Page({ params }: { params: Promise<{ id: string }> }) {
  const [memo, setMemo] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  const { connect, publicKey, signTransaction } = useWalletKit();
  const mutation = usePreparePayTx();
  const trustline = usePrepApproveContract();

  useEffect(() => {
    params.then((resolvedParams) => {
      setMemo(resolvedParams.id);
    });
  }, [params]);

  const { data: invoice, isLoading, error } = useInvoice(memo || "");

  const openModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handlePayInvoice = async () => {
    try {
      if (invoice) {
        if (loading) return;
        setLoading(true);

        if (+amount <= 0) {
          toast.error("Please put an amount");
          return;
        }
        console.log(publicKey);

        if (!publicKey) {
          await connect();
        }

        const pay = async () => {
          await mutation.mutateAsync(
            { invoiceId: invoice?.data?.id, publicKey, amount },
            {
              onSuccess: async (data) => {
                // console.log("data", data);
                const signedXdr = await signTransaction(data.data.data.xdr);

                const sendtoxlm = async () => {
                  const txRes = await fetch(
                    "https://soroban-testnet.stellar.org",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        jsonrpc: "2.0",
                        id: 1,
                        method: "sendTransaction",
                        params: { transaction: signedXdr.signedTxXdr },
                      }),
                    }
                  );

                  const result = await txRes.json();
                  console.log("Transaction result:", result);
                  toast.success("successfully paid invoice");
                };

                await sendtoxlm();
              },
              onError: (error) => {
                console.error("Failed to pay invoice:", error);
                if (error instanceof AxiosError && error.response?.data?.data) {
                  toast.error(
                    "error occured when paying, make sure you have added USDC as a trustline to your address"
                  );
                } else {
                  toast.error("An unknown error occurred");
                }
              },
            }
          );
        };

        if (publicKey) {
          await pay();
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (!memo) {
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
    <div className="mx-w-lg md:max-w-xl  mx-auto p-4 py-8">
      <Nav1 />
      <div className="h-8" />
      <InvoiceDetails />
    </div>
  );
}

export default Page;

/* 

 <Card className="shadow-md">
        <Title level={2} className="text-center mb-6">
          Invoice Details
        </Title>

        {invoice?.data ? (
          <div className="space-y-6">
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Description">
                {invoice.data?.description || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Amount">
                {invoice.data.amount}
              </Descriptions.Item>
              <Descriptions.Item label="Token Type">
                {invoice.data.tokenType}
              </Descriptions.Item>
            </Descriptions>

            <div className="flex flex-col   space-y-3 w-full">
              <p>Amount (USDC)</p>
              <Input
                name="amount"
                type="number"
                size="large"
                placeholder="amount is USDC"
                value={amount}
                onChange={(e) => setAmount(+e.target.value)}
              />
            </div>

            <div className="flex justify-center mt-8">
              <Button
                type="primary"
                size="large"
                loading={loading}
                disabled={loading}
                onClick={handlePayInvoice}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Pay Now
              </Button>
            </div>

            <PayInvoice visible={visible} onCancel={handleCancel} />
          </div>
        ) : (
          <div className="flex justify-center">
            <Spin size="large" />
          </div>
        )}
      </Card>
*/

/* 
export async function waitForConfirmationWithProgress(
  txHash: string,
  onProgress?: (status: string, ledger?: number) => void,
  options: { timeout?: number; interval?: number } = {}
) {
  const { timeout = 60, interval = 2000 } = options;
  let lastLedger: number | undefined;

  return waitForConfirmation(txHash, {
    ...options,
    interval: async (resolve, reject, timeRemaining) => {
      try {
        const ledger = await rpcServer.getLatestLedger();
        if (ledger.sequence !== lastLedger) {
          lastLedger = ledger.sequence;
          onProgress?.(`Waiting for confirmation... (current ledger: ${ledger.sequence})`, ledger.sequence);
        }
      } catch (e) {
        // Don't fail progress updates
      }
      await new Promise(r => setTimeout(r, interval));
    }
  });
}

*/
