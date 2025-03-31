import React from "react";
import { DatePicker, Input, TimePicker, Upload } from "antd";
import type { TimePickerProps } from "antd";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useClient } from "@/Context/index";

dayjs.extend(customParseFormat);

const { TextArea } = Input;

function CreateMerchant() {
    const { merchant, setMerchant } = useClient();

    const handleInputChange = (e: any) => {
        setMerchant({ ...merchant, [e.target.name]: e.target.value });
    };

    const onChange: TimePickerProps["onChange"] = (time, timeString) => {
        console.log(time, timeString);
    };

    return (
        <div className="flex justify-center items-center mx-auto my-6 space-y-5 flex-col w-full">
            {" "}
            <h2 className="text-2xl font-semibold ">Create Merchant</h2>
            <div className="flex justify-between space-x-2 items-center w-[70%]">
                <div className="flex flex-col   space-y-3 w-full">
                    <p>Business Name</p>
                    <Input
                        // ref={inputRef}
                        name="memeName"
                        type="text"
                        size="large"
                        value={merchant.name}
                        onChange={handleInputChange}
                    />
                </div>

            
            </div>
            {/* <div className="flex justify-evenly space-x-2 items-center w-[70%]">
                <div className="flex flex-col space-y-3 ">
                    <p>Amount</p>
                    <Input
                        type="number"
                        size="large"
                        name="amount"
                        value={merchant.amount}
                        onChange={handleInputChange}
                    />
                </div>
            </div> */}
            <div className="flex flex-col  space-y-3 w-[70%]">
                <p>Description</p>
                <TextArea
                    // ref={inputRef}
                    name="milestone"
                    autoSize={{ minRows: 4, maxRows: 8 }}
                    value={merchant.description}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
}

export default CreateMerchant;
