import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { changeStep } from "@/redux/slice/SettleInvoiceSlice";
import { Button, Flex, QRCode, Statistic, Tag } from "antd";
import React, { useEffect } from "react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { SiBinance, SiCoinbase, SiFantom, SiPolygon } from "react-icons/si";
import { TbCurrencySolana } from "react-icons/tb";

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
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

function Pay() {
  const [tokenPrices, setTokenPrices] = React.useState<{
    [key: string]: number;
  }>({});
  const invoiceAmount = 5; // $5

  useEffect(() => {
    const fetchPrices = async () => {
      const ids = supportedTokens.map((t) => t.id).join(",");
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
      );
      const data = await res.json();
      console.log("Fetched token prices:", data);
      setTokenPrices(data);
    };

    fetchPrices();
  }, []);

  const dispatch = useAppDispatch();
  const invoiceSettlement = useAppSelector((state) => state.settleInvoice);

  return (
    <div className="flex flex-col gap-6 p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div
          onClick={() => dispatch(changeStep(invoiceSettlement.step - 1))}
          className="cursor-pointer"
        >
          <IoIosArrowBack />
        </div>
        <h1 className="text-xl font-bold mb-4">Pay Now</h1>
        <div style={{ width: 24 }} /> {/* Spacer */}
      </div>

      {/* Instructions */}
      <p className="text-gray-600 text-sm leading-relaxed">
        Choose any supported token and transfer the required amount to the
        address below. Be sure to include the memo provided.
      </p>

      {/* Supported Tokens */}
      <Flex wrap="wrap" justify="center" align="center" gap="8px 12px">
        {supportedTokens.map((token: any) => {
            console.log(tokenPrices[token.id])
            const tokenData = tokenPrices[token.id] as any;
          const price = tokenData?.usd ?? 0;
          const amount =
            price > 0 ? (invoiceAmount / price).toFixed(6) : "Loading...";
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

      {/* QR Code & Address */}
      <div className="flex flex-col items-center gap-4">
        <QRCode value="232323" color="green" />
        <div className="text-center">
          <p className="text-sm text-gray-500">Send to address:</p>
          <code className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            0xdcdsuyd878suddf87d9
          </code>
        </div>
        <Statistic title="Time Left to Pay" value={deadline} />
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 mt-4">
        <Button type="primary" block>
          I have Paid
        </Button>
        <Button block>Pay from Wallet</Button>
      </div>
    </div>
  );
}

export default Pay;

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
}) => (
  <Tag color={color} style={{ padding: "4px 10px" }}>
    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
      {icon}
      <span>{label}</span>
      <span>({amount})</span>
    </span>
  </Tag>
);
