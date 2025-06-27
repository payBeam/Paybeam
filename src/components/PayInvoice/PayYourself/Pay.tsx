import { useClient } from "@/Context/index";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { changeStep } from "@/redux/slice/SettleInvoiceSlice";
import { Button, Flex, QRCode, Statistic, Tag, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import {
  FaBitcoin,
  FaCheckCircle,
  FaEthereum,
  FaRegCopy,
} from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { SiBinance, SiCoinbase, SiFantom, SiPolygon } from "react-icons/si";
import { TbCurrencySolana } from "react-icons/tb";

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

const Copyable = ({ label, value }: { label: string; value: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("0x8e827a12C78dED9459268eb05cce2C5d709FE6AF");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md text-sm w-full">
      <div className="truncate text-sm">{value}</div>
      <Tooltip title={copied ? "Copied!" : `Copy ${label}`}>
        <button onClick={handleCopy} className="ml-2">
          {copied ? (
            <FaCheckCircle className="text-green-500 animate-ping-once" />
          ) : (
            <FaRegCopy className="text-gray-500 hover:text-gray-700 dark:text-gray-400" />
          )}
        </button>
      </Tooltip>
    </div>
  );
};

const TokenTag = ({
  color,
  amount,
  icon,
  label,
}: {
  amount: string;
  color: string;
  icon?: React.ReactNode;
  label: string;
}) => {
  const { isDarkMode } = useClient();
  return (
    <Tag
      color={color}
      style={{
        borderRadius: "999px",
        backgroundColor: isDarkMode ? "#1e1e1e" : "#f5f5f5",
        border: `1px solid ${isDarkMode ? "#333" : "#e0e0e0"}`,
        color: isDarkMode ? "#eee" : "#333",
        padding: "4px 12px",
        fontSize: "13px",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {icon}
      <span style={{ fontWeight: 500 }}>{label}</span>
      <span style={{ color: "#888" }}>({amount})</span>
    </Tag>
  );
};

function Pay() {
  const dispatch = useAppDispatch();
  const invoiceSettlement = useAppSelector((state) => state.settleInvoice);
  const [tokenPrices, setTokenPrices] = useState<{ [key: string]: number }>({});


  const address = "0x8e8XXXXXXXX";

  useEffect(() => {
    const fetchPrices = async () => {
      const ids = supportedTokens.map((t) => t.id).join(",");
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
      );
      const data = await res.json();
      setTokenPrices(data);
    };
    fetchPrices();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6 max-w-md mx-auto dark:bg-gray-900 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div
          onClick={() => dispatch(changeStep(invoiceSettlement.step - 1))}
          className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          aria-label="Go back"
        >
          <IoIosArrowBack size={24} />
        </div>
        <h1 className="text-2xl font-extrabold text-center flex-1 text-gray-900 dark:text-white">
          Pay Now
        </h1>
        <div style={{ width: 24 }} />
      </div>

      {/* Supported Tokens Explanation */}
      <section className="text-center text-sm text-gray-600 dark:text-gray-400 mb-2 px-2">
        These tokens are supported for payment. You can pay the invoice with any
        one of these tokens by sending the equivalent amount.
      </section>

      {/* Supported Tokens */}
      <div className="flex flex-col gap-2 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Supported Tokens
        </h3>
        <Flex wrap="wrap" justify="center" align="center" gap="8px 12px">
          {supportedTokens.map((token) => {
            const tokenData = tokenPrices[token.id] as any;
            const price = tokenData?.usd ?? 0;
            const amount =
              price > 0 ? (invoiceSettlement.amount / price).toFixed(6) : "Loading...";
            return (
              <TokenTag
                key={token.id}
                amount={amount}
                color={token.color}
                icon={token.icon}
                label={token.label}
              />
            );
          })}
        </Flex>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 dark:border-gray-700" />

      {/* 1. Pay from Wallet (Primary) */}
      <section className="flex flex-col gap-2 my-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
          1. Pay Directly from Wallet
        </h3>
        <Button type="primary" block size="large" style={{ fontWeight: "600" }}>
          Pay with Wallet
        </Button>
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
          Use supported wallets for quick and secure payment.
        </p>
      </section>

      <hr className="border-gray-300 dark:border-gray-700" />

      {/* 2. Manual Payment */}
      <section className="flex flex-col gap-4 my-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
          2. Pay Manually by Transfer   <Tag color="red">coming soon</Tag>
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Transfer the exact amount from your own wallet. Copy the address and
          memo below.
        </p>
        <Copyable label="Address" value={address} />
        {/* <Copyable label="Memo" value={invoiceSettlement.memo} /> */}
      </section>

      <hr className="border-gray-300 dark:border-gray-700" />

      {/* 3. Scan QR Code */}
      <section className="flex flex-col items-center gap-3 my-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
          3. Scan QR Code <Tag color="red">coming soon</Tag>
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Open your Paybeam Wallet app and scan this QR code to pay instantly.
        </p>
        <QRCode
          value={`paybeam://pay?to=${address}&memo=${invoiceSettlement.memo}`}
          size={160}
          color="green"
        />
      </section>

      {/* Countdown */}
      <div className="mt-8">
        <Statistic title="Time Left to Pay" value={deadline}  />
      </div>
    </div>
  );
}

export default Pay;

const supportedTokens = [
  { id: "ethereum", label: "Ethereum", icon: <FaEthereum />, color: "#627eea" },
  { id: "binancecoin", label: "BNB", icon: <SiBinance />, color: "#f3ba2f" },
  {
    id: "coinbase-wrapped-bitcoin",
    label: "Coinbase",
    icon: <SiCoinbase />,
    color: "#1652f0",
  },
  {
    id: "solana",
    label: "Solana",
    icon: <TbCurrencySolana />,
    color: "#9945FF",
  },
  { id: "bitcoin", label: "Bitcoin", icon: <FaBitcoin />, color: "#f7931a" },
  { id: "polygon", label: "Polygon", icon: <SiPolygon />, color: "#a100ff" },
  { id: "fantom", label: "Fantom", icon: <SiFantom />, color: "#13B5EC" },
  { id: "avalanche-2", label: "Avalanche", color: "#e84142" },
  { id: "zetachain", label: "ZetaChain", color: "green" },
];
