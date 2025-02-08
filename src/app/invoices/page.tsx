// app/invoices/page.tsx
"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Input, Button, Card, Descriptions } from "antd";

export default function Invoices() {
  const [invoiceLink, setInvoiceLink] = useState("");
  const [invoiceDetails, setInvoiceDetails] = useState(null);

  const fetchInvoiceDetails = async () => {
    // Mock API call to fetch invoice details
    setInvoiceDetails({
      id: "12345",
      amount: 300,
      dueDate: "2023-10-15",
      from: "Client C",
    });
  };

  const handlePayInvoice = () => {
    // Implement Stellar blockchain payment logic here
    alert("Payment processed on Stellar blockchain");
  };

  return (
    <DashboardLayout>
      <Card>
        <Input
          placeholder="Paste invoice link here"
          value={invoiceLink}
          onChange={(e) => setInvoiceLink(e.target.value)}
        />
        <Button onClick={fetchInvoiceDetails} style={{ marginTop: 16 }}>
          Fetch Invoice
        </Button>
      </Card>
      {invoiceDetails && (
        <Card style={{ marginTop: 16 }}>
          <Descriptions title="Invoice Details">
            <Descriptions.Item label="ID">
              {invoiceDetails.id}
            </Descriptions.Item>
            <Descriptions.Item label="Amount">
              ${invoiceDetails.amount}
            </Descriptions.Item>
            <Descriptions.Item label="Due Date">
              {invoiceDetails.dueDate}
            </Descriptions.Item>
            <Descriptions.Item label="From">
              {invoiceDetails.from}
            </Descriptions.Item>
          </Descriptions>
          <Button
            type="primary"
            onClick={handlePayInvoice}
            style={{ marginTop: 16 }}
          >
            Pay Invoice
          </Button>
        </Card>
      )}
    </DashboardLayout>
  );
}
