import { useClient } from "@/Context/index";
import { useCreateInvoice } from "@/hooks/useInvoice";
import { useWalletKit } from "@/hooks/useStellarWaletKit";
import {CheckCircleOutlined } from '@ant-design/icons';
import type { TimePickerProps } from "antd";
import { Button, Input, Modal, Result, Steps, Typography } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useState } from "react";
import toast from "react-hot-toast";
import Converter from  "@/components/CustomInputField/index";

dayjs.extend(customParseFormat);

const { Paragraph, Text } = Typography;
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
  const { invoice, invoiceZeta, setInvoice, setOpenCreateInvoiceModal, setSteps, setMemo, setTxHash } =
    useClient();
  const [loading, setLoading] = useState(false);

  const mutation = useCreateInvoice();
  // const prepareTransaction = useCreateInvoice()

  const handleInputChange = (e: any) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (loading) return;
      setLoading(true);

      if (+invoiceZeta <= 0) {
        toast.error("Please put an amount");
        return;
      }

      setLoading(true);
      console.log(invoice.amount);
      //request the public key of the merchant

      //send the public key and invoice data to the backend to prepare the transaction
      // await prepareTransaction.mutateAsync({})
      await mutation.mutateAsync(
        { ...invoice, amount: +invoiceZeta },
        {
          onSuccess: async (data: any) => {
            // console.log("data", data.data);
            setTxHash( data.data.data.txHash)
            setMemo(data.data.data.invoice.id);
            setSteps(1);
            setInvoice({
              description: "",
              amount: 0
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
            className="!bg-white !text-gray-900 !border-gray-300 
             dark:!bg-gray-800 dark:!text-white dark:!border-gray-600 
             placeholder-gray-400 dark:placeholder-gray-500 
             focus:!border-blue-500 focus:!shadow-none"
          />
        </div>
      </div>
      <div className="flex flex-col mt-4 space-y-3 w-[100%]">
        <Converter />
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
  const { setOpenCreateInvoiceModal, setSteps, memo, setMemo, txHash, setTxHash } = useClient();

  const viewOnExplorer = `https://zetachain-testnet.blockscout.com/tx/${txHash}`;

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
            setTxHash("");
            setSteps(0);
          }}
        >
          Close
        </Button>
      ]}
      >
      <div className="desc">
      <Paragraph>
        <CheckCircleOutlined className="site-result-demo-error-icon" /> view on the blockchain <a href={viewOnExplorer} target="_blank" rel="noopener noreferrer">here&gt;</a>
      </Paragraph>

    </div>
    </Result>
  );
}
