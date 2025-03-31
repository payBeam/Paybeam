import React from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Button } from 'antd';
import ConnectWallet from "@/components/ConnectComponent"
import { useClient } from "@/Context/index";

const App: React.FC = () => {
  const {
    setOpenCreateInvoiceModal } = useClient();


  const handleOpenInvoiceModal = () => {
    setOpenCreateInvoiceModal((prev: boolean) => !prev);
  };


  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card bordered={false}>
          <Statistic
            title="Today"
            value={1.28}
            precision={2}
            valueStyle={{ color: "#3f8600" }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card bordered={false}>
          <Statistic
            title="Yesterday"
            value={9.3}
            precision={2}
            valueStyle={{ color: "#cf1322" }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={12}>
        <Statistic title="Account Balance (USDC)" value={200000} precision={2} />
        <ConnectWallet title={"Connect Wallet"} />
      </Col>
      <Col span={12} >
        <Statistic title="Active Users" value={112893} loading />
        <Button
          style={{ marginTop: 24 }}
          size="large" onClick={handleOpenInvoiceModal}> Create Invoice </Button>
      </Col>
    </Row>
  )

};
export default App;