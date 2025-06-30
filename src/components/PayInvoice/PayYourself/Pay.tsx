"use client";
import { useClient } from "@/Context/index";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { changeStep } from "@/redux/slice/SettleInvoiceSlice";
import zetaAbi from "@/web3/abi/zeta-abi.json";
import type { TokenInfo } from "@/web3/supportedToken";
import { SUPPORTED_TOKENS } from "@/web3/supportedToken";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Flex, QRCode, Statistic, Tag, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaCheckCircle,
  FaRegCopy
} from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import {
  useAccount,
  useConnect,
  useWriteContract,
} from "wagmi";
// import erc20Abi from "@/web3/abi/erc-20.json";
import { CA } from "@/web3/hooks";
import { config } from "@/web3/wagmi";
import { getChainId, switchChain } from '@wagmi/core';
import { parseEther } from "viem";
import { injected } from "wagmi/connectors";



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
      <div className="truncate text-sm">{value.slice(0, 10)}...</div>
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
  onClick,
  selected
}: {
  amount: string;
  color: string;
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  selected: string
}) => {
  const { isDarkMode } = useClient();

  return (
    <Tag
      onClick={onClick}
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
        cursor: "pointer",
        userSelect: "none",
        transition: "all 0.2s ease-in-out",
      }}
    >
      {icon}
      <span style={{ fontWeight: 500 }}>{label}</span>
      <span style={{ color: "#888" }}>({amount})</span>
      {selected === label && <CheckOutlined style={{ marginLeft: 6 }} />}
    </Tag>
  );
};



 function Pay() {
  const dispatch = useAppDispatch();
  const invoiceSettlement = useAppSelector((state) => state.settleInvoice);
  const [tokenPrices, setTokenPrices] = useState<{ [key: string]: number }>({});
  const [tokenToPayWith, setTokenToPayWith] = useState<TokenInfo | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>("")
  const [amountToPay, setAmountToPay] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { address, chainId } = useAccount();


  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch("/api/prices");
        const { data } = await res.json();
        console.log("Fetched token prices:", data);
        setTokenPrices(data);
      } catch (err) {
        console.error("Error fetching prices from API route:", err);
      }
    };

    fetchPrices();
  }, []);

   // -----------------------------------
   //? PAYING INVOICE TOKENS
   // -----------------------------------

   const { connectAsync } = useConnect();
   const { writeContractAsync } = useWriteContract({
    config,
  });

  //NO need to approve the contract to spend native tokens
  const payWithNativeTokens = async() => {
    try {
      const data = await writeContractAsync({
        chainId: tokenToPayWith.chain.id,
        address: CA,
        functionName: "payInvoice",
        abi: zetaAbi,
        args: [invoiceSettlement.memo],
        chain:tokenToPayWith.chain,
        account: address,
        value: parseEther((amountToPay).toString()),
      });

      toast.success(`Payment of ${amountToPay} ${tokenToPayWith.symbol} successful!`);
      //TODO - reload thr invoice or just automatically show a ui syaing it has been paid
      console.log(" data from payWithNativeTokens",data)
    } catch(error) {
      console.error("Error paying with native tokens:", error);
    }
  }

  // need to call approve() on the token contract before paying with ZRC-20 tokens
  const payWithZRC20 = async() => {}

  const handlePayInvoice = async () => {
    if (!tokenToPayWith) {
      console.error("No token selected for payment");
      return;
    }
    try {
      setLoading(true);
      if (!address) {
        await connectAsync({
          connector: injected(),
        });
      }
      // ?  Ensure we're on the correct chain
      const currentChainId = await getChainId(config);
      const expectedChainId = tokenToPayWith.chain.id;
      
      if (currentChainId !== expectedChainId) {
        await switchChain(config,{ chainId: expectedChainId });
      }

          // ✅ At this point, you're on the right chain and connected
    console.log(`Ready to pay ${tokenToPayWith.symbol} on chain ${expectedChainId}`);

      // console.log(`Paying ${amountToPay} with ${tokenToPayWith.name}`);
      // ? NATIVE TOKENS
      if (tokenToPayWith.isNative) {
      await payWithNativeTokens();
      return;
      // ? Same-chain ZRC-20 deposit 
      } else {
      await   payWithZRC20();
      return;

        
      }
    } catch (error) {
      toast.error("Failed to pay invoice. Please try again.");
      console.error("Error paying invoice:", error);
    }
    finally {
      setLoading(false);
    }
  
  }

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
          {SUPPORTED_TOKENS.map( (token) => {
            // the price from the zata base is alwys in zeta, 
            // so let's convery to usd first
            const usdPrice = invoiceSettlement.dollarPrice;
            const tokenData = tokenPrices[token.id] as any;
            const price = tokenData?.usd ?? 0;
            const amount = 
              price > 0 ? (usdPrice / price).toFixed(6) : "Loading...";
            return (
              <TokenTag
                key={token.id}
                amount={amount}
                color={token.color}
                icon={token.icon}
                label={token.name}
                selected={selectedTag}
                onClick={() => {
                  setTokenToPayWith(token)
                  setSelectedTag(token.name)
                  setAmountToPay(amount);
              
                }}
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
        <Button onClick={handlePayInvoice} loading={loading} type="primary" disabled={!tokenToPayWith || loading} block size="large" style={{ fontWeight: "600" }}>
          {tokenToPayWith ? `Pay ${amountToPay} with ${tokenToPayWith.name}` : "Pay with Wallet"}
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
        <Copyable label="Address" value={CA} />
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

