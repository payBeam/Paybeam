"use client"
import React, { useState, useEffect } from "react";
import { Button, Typography, Space } from "antd";
import { getPublicKey, connect, disconnect } from "../stellar-wallets-kit";

const { Text } = Typography;

const ConnectComponent: React.FC = () => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Check if the user is already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      const key = await getPublicKey();
      if (key) {
        setPublicKey(key);
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    };

    checkConnection();
  }, []);

  // Handle connect button click
  const handleConnect = async () => {
    await connect(async () => {
      const key = await getPublicKey();
      if (key) {
        setPublicKey(key);
        setIsConnected(true);
      }
    });
  };

  // Handle disconnect button click
  const handleDisconnect = async () => {
    await disconnect(async () => {
      setPublicKey(null);
      setIsConnected(false);
    });
  };

  return (
    <Space
      direction="vertical"
      align="center"
      style={{ width: "100%", textAlign: "center", marginTop: 24 }}
    >
      <Text
        ellipsis={{ tooltip: publicKey ?? "" }}
        style={{ maxWidth: "18em", display: "block" }}
      >
        {isConnected ? `Signed in as ${publicKey}` : ""}
      </Text>
      <Space>
        <Button
          type="primary"
          onClick={handleConnect}
          style={{ display: isConnected ? "none" : "inline-block" }}
        >
          Sign and Pay
        </Button>
        <Button
          danger
          onClick={handleDisconnect}
          style={{ display: isConnected ? "inline-block" : "none" }}
        >
          Disconnect
        </Button>
      </Space>
    </Space>
  );
};

export default ConnectComponent;
