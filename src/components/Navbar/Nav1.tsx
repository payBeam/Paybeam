"use client";
import ThemeToggle from "@/components/ThemeToggle";
import { DownOutlined } from "@ant-design/icons";
import { Button, Divider, Dropdown, Space, theme } from "antd";
import React from "react";
import Logo from "../Logo";

const { useToken } = theme;

export default function FloatingDockDemo() {
    const { token } = useToken();
  const handleGetInfo = async (e: any) => {
    e.preventDefault();
  };
  const wallet = {
    version:43,
    node: {
      pubkey: "02c1b2f3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z",
    },
    methods: ["getInfo", "sendPayment", "createInvoice"],
    supports: ["lnurl", "onchain", "lightning"],
  }

    const dropdownItems = [
      {
        key: "version",
        label: `Version: ${wallet?.version || "N/A"}`,
      },
      {
        key: "pubkey",
        label: `Node Pubkey: ${wallet?.node?.pubkey || "N/A"}`,
      },
      {
        key: "methods",
        label: `Methods: ${wallet?.methods?.join(", ") || "N/A"}`,
      },
      {
        key: "supports",
        label: `Supports: ${wallet?.supports?.join(", ") || "N/A"}`,
      },
    ];

  return (
    <div className="flex justify-between items-center mt-5">
      <div className="text-3xl font-bold z-2 font-sans">
        <Logo />
      </div>
      <div className="flex space-x-4 justify-between">
        <ThemeToggle />
        <Dropdown
          menu={{ items: dropdownItems }}
          dropdownRender={(menu) => (
            <div
              style={{
                backgroundColor: token.colorBgElevated,
                borderRadius: token.borderRadiusLG,
                boxShadow: token.boxShadowSecondary,
              }}
            >
              {React.cloneElement(
                menu as React.ReactElement<{ style: React.CSSProperties }>,
                { style: { boxShadow: "none" } }
              )}
              <Divider style={{ margin: 0 }} />
              <Space style={{ padding: 8 }}>
                <Button
                //   loading={loading}
                //   disabled={loading}
                  //   onClick={(e) => handleGetInfo(e)}
                  type="primary"
                >
                  Refresh
                </Button>
                <Button
                // onClick={(e) => disconnect()}
                >
                  Disconnect
                </Button>
              </Space>
            </div>
          )}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Wallet Info
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
}
