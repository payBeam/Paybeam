import React, { useState } from "react";
import { Modal, Button, Steps, Form, Input, Radio, Progress, message, QRCode, Space } from "antd";
import { DollarOutlined, MailOutlined, LinkOutlined, UserOutlined } from "@ant-design/icons";

const { Step } = Steps;

const PaymentModal = ({ visible, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("USDC");
  const [paymentOption, setPaymentOption] = useState("self");
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [text, setText] = React.useState("https://paybeam.vercel.app/invoices");

  const steps = [
    {
      title: "Select Payment Method",
      content: (
        <Form layout="vertical">
          <Form.Item label="Choose a stablecoin">
            <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
              <Radio value="USDC">USDC</Radio>
              <Radio value="USDT">USDT</Radio>
              <Radio value="Stellar Token">Stellar Token</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Choose Payment Option",
      content: (
        <Form layout="vertical">
          <Form.Item label="Who will pay?">
            <Radio.Group onChange={(e) => setPaymentOption(e.target.value)} value={paymentOption}>
              <Radio value="self">I will pay</Radio>
              <Radio value="email">Email to friends</Radio>
              <Radio value="split">Split the bill</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Share to Payer",
      content: (
        <Space direction="vertical" align="center">
          <QRCode value={text || "-"} />
          <Input
            placeholder="-"
            maxLength={60}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Space>
      ),
    },
    {
      title: "Verify Payment",
      content: (
        <div>
          <Progress
            percent={paymentStatus === "completed" ? 100 : 50}
            status={paymentStatus === "completed" ? "success" : "active"}
          />
          {paymentStatus === "completed" ? (
            <p>Payment completed successfully!</p>
          ) : (
            <p>Waiting for payment confirmation...</p>
          )}
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setPaymentStatus("completed");
        message.success("Payment verified!");
      }, 2000);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Modal
      title="Payment Modal"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={handlePrev} disabled={currentStep === 0}>
          Previous
        </Button>,
        <Button key="next" type="primary" onClick={handleNext}>
          {currentStep === steps.length - 1 ? "Verify Payment" : "Next"}
        </Button>,
      ]}
    >
      <Steps current={currentStep}>
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>
      <div style={{ marginTop: 24 }}>{steps[currentStep].content}</div>
    </Modal>
  );
};

export default PaymentModal;
