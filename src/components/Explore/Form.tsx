import React, { useState } from "react";
import { DatePicker, Input, TimePicker, Upload } from "antd";
import type { TimePickerProps } from "antd";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useClient } from "@/Context/index";
import { Button, Steps, Result } from 'antd';
import { IoCloseSharp } from "react-icons/io5";
import { useCreateInvoice } from "@/hooks/useInvoice";


dayjs.extend(customParseFormat);

const { TextArea } = Input;

function CreateMerchant() {
    const { steps, setSteps, setOpenCreateInvoiceModal } = useClient();

    const onChange: TimePickerProps["onChange"] = (time, timeString) => {
        console.log(time, timeString);
    };

    const description = "steps to create an invoice";

    return (
        <div className="fixed inset-0 bg-gray-900  p-6 bg-opacity-50 flex justify-center items-center z-50">
            <div className="flex justify-center bg-black  p-6 items-center mx-auto my-6 rounded-lg shadow-xl space-y-5 flex-col w-full">
                {" "}
                <h2 className="text-2xl font-semibold ">Create Invoice</h2>
                <div className="flex justify-between">
                    <Steps
                        // className="text-white"
                        current={steps}
                        items={
                            [
                                {
                                    title: "Create Invoice",
                                    description,
                                },
                                {
                                    title: "Copy Invoice Link",
                                    description,
                                },
                            ]

                        }
                    />
                    <div
                        className="text-2xl ml-4"
                        onClick={() => setOpenCreateInvoiceModal(false)}
                    >
                        <IoCloseSharp />
                    </div>
                </div>
                <Screens steps={steps} />

            </div>
        </div>
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
    const { invoice, setInvoice, setOpenCreateInvoiceModal, setSteps, setMemo } = useClient();
    const [loading, setLoading] = useState(false);

    const mutation = useCreateInvoice()
    const handleInputChange = (e: any) => {
        setInvoice({ ...invoice, [e.target.name]: e.target.value });
    };


    const handleSubmit =  async() => {
        try {
              if (loading) return;
                setLoading(true);

            if (+invoice.amount <= 0 || invoice.title.length < 3 || invoice.description < 2) {
                toast.error("Please filll in all feilds");
                return
            }
            
            setLoading(true)
            console.log(invoice.amount)
          await  mutation.mutateAsync({...invoice, amount: +invoice.amount}, {
            onSuccess: (data) => {
                console.log("invoice", data.data.data.id);
                setMemo(data.data.data.id);
                setSteps(1);
                setInvoice({
                    title: "",
                    description: "",
                    amount: 0
                });
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })


        }
        catch (err) {
            toast.error(err.message)

        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-[100%] md:w-[70%] mx-5"> <div className="flex justify-between space-x-2 items-center w-[100%]">
            <div className="flex flex-col   space-y-3 w-full">
                <p>Title</p>
                <Input
                    name="title"
                    type="text"
                    size="large"
                    value={invoice.title}
                    onChange={handleInputChange}
                />
            </div>


        </div>

            <div className="flex flex-col  space-y-3 w-[100%]">
                <p>Description</p>
                <TextArea
                    // ref={inputRef}
                    name="description"
                    autoSize={{ minRows: 4, maxRows: 8 }}
                    value={invoice.description}
                    onChange={handleInputChange}
                />
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
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    {loading ? 'Creating...' : 'Create Invoice'}
                </Button>
            </div></div>

    )
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

    return (<Result
        status="success"
        title="Successfully Created Invoice"
        subTitle={`Memo : ${memo}. customer should use this memo when transferring USDC`}
        extra={[
            <Button type="primary" key="console" onClick={handleCopy}>
                share link to customer
            </Button>,
            <Button key="buy" onClick={() => {
                setOpenCreateInvoiceModal(false)
                setMemo("")
                setSteps(0)
            }}>Close</Button>
        ]}
    />)
}