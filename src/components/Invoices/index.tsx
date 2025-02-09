import React, { useState } from 'react';
import { Table, Modal, Button, Descriptions, message } from 'antd';
// import { DollarOutlined } from '@ant-design/icons';
import { SidebarDemo } from "@/components/Sidebar";
import ConnectWallet from "@/components/ConnectComponent"


const InvoicePage = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(true);

  // Sample invoice data
const invoices = [
  {
    key: "1",
    invoiceId: "INV-001",
    amount: 100,
    dueDate: "2023-10-15",
    status: "Pending",
  },
  {
    key: "2",
    invoiceId: "INV-002",
    amount: 200,
    dueDate: "2023-10-20",
    status: "Pending",
  },
  {
    key: "3",
    invoiceId: "INV-003",
    amount: 150,
    dueDate: "2023-10-25",
    status: "Paid",
  },
  {
    key: "4",
    invoiceId: "INV-004",
    amount: 300,
    dueDate: "2023-10-30",
    status: "Pending",
  },
  {
    key: "5",
    invoiceId: "INV-005",
    amount: 250,
    dueDate: "2023-11-05",
    status: "Pending",
  },
  {
    key: "6",
    invoiceId: "INV-006",
    amount: 400,
    dueDate: "2023-11-10",
    status: "Paid",
  },
  {
    key: "7",
    invoiceId: "INV-007",
    amount: 500,
    dueDate: "2023-11-15",
    status: "Pending",
  },
  {
    key: "8",
    invoiceId: "INV-008",
    amount: 350,
    dueDate: "2023-11-20",
    status: "Pending",
  },
  {
    key: "9",
    invoiceId: "INV-009",
    amount: 450,
    dueDate: "2023-11-25",
    status: "Paid",
  },
  {
    key: "10",
    invoiceId: "INV-010",
    amount: 600,
    dueDate: "2023-11-30",
    status: "Pending",
  },
  {
    key: "11",
    invoiceId: "INV-011",
    amount: 700,
    dueDate: "2023-12-05",
    status: "Pending",
  },
];

  // Columns for the invoice table
  const columns = [
    {
      title: "Invoice ID",
      dataIndex: "invoiceId",
      key: "invoiceId",
    },
    {
      title: "Amount ($)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => handleViewInvoice(record)}
          disabled={record.status === "Paid"}
        >
          View Details
        </Button>
      ),
    },
  ];

  // Handle viewing invoice details
  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalVisible(true);
  };

  // Handle signing and paying the invoice
  const handleSignAndPay = () => {
    message.loading('Processing payment...', 2.5).then(() => {
      message.success('Payment successful!');
      setIsModalVisible(false);
    });
  };

  return (
    <SidebarDemo>
      <div style={{ padding: 24 }}>
        <h1 className="my-4">Invoices</h1>
        <Table
          className="bg-transparent"
          dataSource={invoices}
          columns={columns}
          pagination={false}
          rowKey="key"
        />

        {/* Invoice Details Modal */}
        <Modal
          title="Invoice Details"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            // <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            //   Close
            // </Button>,
            // <Button
            //   key="pay"
            //   type="primary"
            //   icon={<DollarOutlined />}
            //   onClick={handleSignAndPay}
            //   disabled={selectedInvoice?.status === "Paid"}
            // >
            //   Sign and Pay
            // </Button>
            <ConnectWallet/>
          ]}
        >
          {selectedInvoice && (
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Invoice ID">
                {selectedInvoice.invoiceId}
              </Descriptions.Item>
              <Descriptions.Item label="Amount">
                ${selectedInvoice.amount}
              </Descriptions.Item>
              <Descriptions.Item label="Due Date">
                {selectedInvoice.dueDate}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {selectedInvoice.status}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Modal>
      </div>
    </SidebarDemo>
  );
};

export default InvoicePage;