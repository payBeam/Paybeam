"use client";
import ThemeToggle from "@/components/ThemeToggle";
import { theme } from "antd";
import Logo from "../Logo";

const { useToken } = theme;

export default function FloatingDockDemo() {
  const { token } = useToken();
  const handleGetInfo = async (e: any) => {
    e.preventDefault();
  };
  const wallet = {
    version: 43,
    node: {
      pubkey: "o1p2q3r4s5t6u7v8w9x0y1z",
    },
    methods: ["getInfo", "sendPayment", "createInvoice"],
    supports: ["lnurl", "onchain", "lightning"],
  };

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
      </div>
    </div>
  );
}
