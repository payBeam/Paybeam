import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { changeStep } from "@/redux/slice/SettleInvoiceSlice";
import { Button, Flex, QRCode, Statistic, Tag } from "antd";
import React from "react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { SiBinance, SiCoinbase, SiFantom, SiPolygon } from "react-icons/si";
import { TbCurrencySolana } from "react-icons/tb";

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

function Pay() {
  const dispatch = useAppDispatch();
  const invoiceSettlement = useAppSelector((state) => state.settleInvoice);

  return (
    <div className="flex flex-col gap-6 p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div
          onClick={() => dispatch(changeStep(invoiceSettlement.step - 1))}
          className="cursor-pointer text-xl"
        >
          <IoIosArrowBack />
        </div>
        <h1 className="text-xl font-bold text-center flex-1 ml-[-24px]">
          Pay Now
        </h1>
        <div style={{ width: 24 }} /> {/* Spacer */}
      </div>

      {/* Instructions */}
      <p className="text-gray-600 text-sm leading-relaxed">
        Choose any supported token and transfer the required amount to the
        address below. Be sure to include the memo provided.
      </p>

      {/* Supported Tokens */}
      <Flex wrap="wrap" justify="center" align="center" gap="8px 12px">
        <TokenTag
          amount={0.6}
          color="#627eea"
          icon={<FaEthereum />}
          label="Ethereum"
        />
        <TokenTag
          amount={0.6}
          color="#f3ba2f"
          icon={<SiBinance />}
          label="BNB"
        />
        <TokenTag
          amount={0.6}
          color="#1652f0"
          icon={<SiCoinbase />}
          label="Coinbase"
        />
        <TokenTag
          amount={0.6}
          color="#9945FF"
          icon={<TbCurrencySolana />}
          label="Solana"
        />
        <TokenTag
          amount={0.6}
          color="#f7931a"
          icon={<FaBitcoin />}
          label="Bitcoin"
        />
        <TokenTag
          amount={0.6}
          color="#a100ff"
          icon={<SiPolygon />}
          label="Polygon"
        />
        <TokenTag
          amount={0.6}
          color="#13B5EC"
          icon={<SiFantom />}
          label="Fantom"
        />
        <TokenTag amount={0.6} color="#e84142" label="Avalanche" />
        <TokenTag amount={0.6} color="green" label="ZetaChain" />
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
  amount: number;
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
