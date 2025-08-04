import React, { useState } from "react";
import { Input, Button } from "antd";
import { useClient } from "@/Context/index";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import toast from "react-hot-toast";
import { useCreateMerchant } from "@/hooks/useMerchant";
import { useUser } from "@/hooks/useUser";

dayjs.extend(customParseFormat);

const { TextArea } = Input;

const MerchantCreationForm = () => {
  const { merchant, setMerchant } = useClient();
  const [loading, setLoading] = useState(false);
  const mutation = useCreateMerchant();

  const handleInputChange = (e) => {
    setMerchant({ ...merchant, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!merchant.name?.trim()) {
      toast.error("Business name is required");
      return;
    }

    if (!merchant.description?.trim()) {
      toast.error("Business description is required");
      return;
    }

    setLoading(true);
    try {
      // Add your form submission logic here
      // await createMerchant(merchant);

      mutation.mutate(merchant);
      if (mutation.isError) {
        toast.error(mutation.error.message);
        return;
      }
      if (mutation.isSuccess) {
        toast.success("Merchant created successfully");
        // onClose();
        window.location.reload();
        return;
      }
      // fetch user again
    } catch (error) {
      toast.error("Failed to create merchant");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto my-5">
      <h2 className="my-3">Create Merchant Account</h2>

      {/* Form */}
      <div className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
          <Input
            name="name"
            size="large"
            value={merchant.name}
            onChange={handleInputChange}
            placeholder="Enter business name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <TextArea
            name="description"
            value={merchant.description}
            onChange={handleInputChange}
            rows={4}
            placeholder="Enter business description"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end space-x-3 p-6 border-t">
        <Button
          size="large"
          // onClick={onClose}
          disabled={loading}
          className="hover:bg-gray-100"
        >
          Cancel
        </Button>
        <Button
          type="primary"
          size="large"
          loading={loading}
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Merchant"}
        </Button>
      </div>
    </div>
  );
};

export default MerchantCreationForm;
