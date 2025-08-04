"use client";

import React from "react";
import { Button, Typography, Space } from "antd";
import { useWalletKit } from "@/hooks/useStellarWaletKit";

const { Text } = Typography;

const ConnectButton: React.FC = () => {
  const { publicKey, connect, disconnect } = useWalletKit();

  const isConnected = !!publicKey;

  return (
    <Space
      direction="vertical"
      align="center"
      style={{ width: "100%", textAlign: "center", marginTop: 24 }}
    >
      <Text ellipsis={{ tooltip: publicKey ?? "" }} style={{ maxWidth: "18em", display: "block" }}>
        {isConnected ? `${publicKey.slice(0, 10)}...` : ""}
      </Text>

      <Space>
        {!isConnected && (
          <Button type="primary" onClick={connect}>
            Connect Wallet
          </Button>
        )}
        {isConnected && (
          <Button danger onClick={disconnect}>
            Disconnect
          </Button>
        )}
      </Space>
    </Space>
  );
};

export default ConnectButton;
