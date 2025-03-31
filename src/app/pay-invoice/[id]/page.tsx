"use client";

import React, { useEffect, useState } from 'react';
import { useInvoice } from '@/hooks/useInvoice';
import { Spin, Result, Button, Card, Descriptions, Typography } from 'antd';
import { AxiosError } from 'axios';
import PayInvoice from "@/components/PayInvoice";

const { Title, Text } = Typography;

function Page({ params }: { params: Promise<{ id: string }> }) {
  const [memo, setMemo] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

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

  if (!memo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Result
          status="error"
          title="Invoice Error"
          subTitle={
            error instanceof AxiosError && error.response?.data?.data
              ? error.response.data.data
              : "An unknown error occurred"
          }
          extra={[
            <Button type="primary" key="retry" onClick={() => window.location.reload()}>
              Retry
            </Button>
          ]}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="shadow-md">
        <Title level={2} className="text-center mb-6">Invoice Details</Title>

        {invoice?.data ? (
          <div className="space-y-6">
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Title">
                <Text strong>{invoice.data.title}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {invoice.data.description || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Amount">
                {invoice.data.amount}
              </Descriptions.Item>
              <Descriptions.Item label="Token Type">
                {invoice.data.tokenType}
              </Descriptions.Item>
            </Descriptions>

            <div className="flex justify-center mt-8">
              <Button
                type="primary"
                size="large"
                onClick={openModal}
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
    </div>
  );
}

export default Page;