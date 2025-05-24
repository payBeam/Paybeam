import { useClient } from "@/Context/index";
import { useCreateInvoice } from "@/hooks/useInvoice";
import { useWalletKit } from "@/hooks/useStellarWaletKit";
import type { TimePickerProps } from "antd";
import { Button, Input, Modal, Result, Steps } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useState } from "react";
import toast from "react-hot-toast";

dayjs.extend(customParseFormat);

const { TextArea } = Input;

function CreateMerchant() {
  const { steps, setSteps, setOpenCreateInvoiceModal, openCreateInvoiceModal } =
    useClient();

  const onChange: TimePickerProps["onChange"] = (time, timeString) => {
    console.log(time, timeString);
  };

  const description = "steps to create an invoice";

  return (
    <Modal
      title="Create Invoice"
      // closable={{ "aria-label": "Custom Close Button" }}
      open={openCreateInvoiceModal}
      footer={null}
      onCancel={() => setOpenCreateInvoiceModal(false)}
    >
      <div className="flex flex-col justify-center items-center gap-5 my-6">
        <Steps
          current={steps}
          items={[
            {
              title: "Create Invoice",
              description,
            },
            {
              title: "Copy Invoice Link",
              description,
            },
          ]}
        />

        <Screens steps={steps} />
      </div>
    </Modal>
  );
}

export default CreateMerchant;

function Screens({ steps }: { steps: number }) {
  const [loading, setLoading] = useState(false);

  switch (steps) {
    case 0:
      return <CreateInvoice />;
    case 1:
      return <CopyLink />;
    case 2:
      return (
        <p className="flex justify-center font-bold  text-2xl ">
          coming soon ❤🏗
        </p>
      );
    default:
      return <p>Unknown status</p>;
  }
}

function CreateInvoice() {
  const { invoice, setInvoice, setOpenCreateInvoiceModal, setSteps, setMemo } =
    useClient();
  const [loading, setLoading] = useState(false);
  const { connect, publicKey, signTransaction } = useWalletKit();

  const mutation = useCreateInvoice();
  // const prepareTransaction = useCreateInvoice()

  const handleInputChange = (e: any) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (loading) return;
      setLoading(true);

      if (+invoice.amount <= 0) {
        toast.error("Please put an amount");
        return;
      }

      setLoading(true);
      console.log(invoice.amount);
      //request the public key of the merchant
      if (!publicKey) {
        await connect();
      }

      //send the public key and invoice data to the backend to prepare the transaction
      // await prepareTransaction.mutateAsync({})
      await mutation.mutateAsync(
        { ...invoice, amount: +invoice.amount, publicKey },
        {
          onSuccess: async (data) => {
            // get the xrp from the response, and sign the transaction with it
            const signedXdr = await signTransaction(data.data.data.xdr.xdr);

            console.log("signedXdr", signedXdr);
            // if successfull, now create the invoice within paybeam
            const sendtoxlm = async () => {
              const txRes = await fetch("https://soroban-testnet.stellar.org", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  jsonrpc: "2.0",
                  id: 1,
                  method: "sendTransaction",
                  params: { transaction: signedXdr.signedTxXdr },
                }),
              });

              const result = await txRes.json();
              console.log("Transaction result:", result);
            };

            await sendtoxlm();

            console.log("invoice", data.data.data.invoice.id);
            setMemo(data.data.data.invoice.id);
            setSteps(1);
            setInvoice({
              title: "",
              description: "",
              tokenType: "USDC",
              amount: 0,
            });
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[100%] md:w-[70%] mx-5">
      {" "}
      <div className="flex justify-between space-x-2 items-center w-[100%]">
        <div className="flex flex-col   space-y-3 w-full">
          <p>Description (optional)</p>
          <Input
            name="description"
            type="text"
            size="large"
            value={invoice.description}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex flex-col  space-y-3 w-[100%]">
        <p>amount</p>
        <Input
          name="amount"
          type="number"
          placeholder="amount is USDC"
          value={invoice.amount}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex justify-end space-x-3 p-6 border-t">
        <Button
          size="small"
          onClick={() => setOpenCreateInvoiceModal(false)}
          disabled={loading}
          className="hover:bg-gray-100"
        >
          Cancel
        </Button>
        <Button
          type="primary"
          size="small"
          loading={loading}
          disabled={loading}
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 py-4"
        >
          {loading ? "Creating..." : "Create Invoice"}
        </Button>
      </div>
    </div>
  );
}

function CopyLink() {
  const { setOpenCreateInvoiceModal, setSteps, memo, setMemo } = useClient();

  const handleCopy = async () => {
    try {
      const link = `${window.location.origin}/pay-invoice/${memo}`;
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy:", err);
    }
  };

  return (
    <Result
      status="success"
      title="Successfully Created Invoice"
      subTitle={`Memo : ${memo}. customer should use this memo when transferring USDC`}
      extra={[
        <Button type="primary" key="console" onClick={handleCopy}>
          share link to customer
        </Button>,
        <Button
          key="buy"
          onClick={() => {
            setOpenCreateInvoiceModal(false);
            setMemo("");
            setSteps(0);
          }}
        >
          Close
        </Button>,
      ]}
    />
  );
}
