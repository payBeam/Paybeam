import { SiBinance, SiCoinbase } from "react-icons/si";
import  { base, bsc, zetachainAthensTestnet } from "wagmi/chains";
import type { ReactNode } from "react";
import type { Chain } from "wagmi/chains";

export type TokenInfo  = {
  id: string;
  chain: Chain; // or a more specific type if you have a Chain enum/type
  symbol: string;
  name: string;
  decimals: number;
  color: string;
  icon?: ReactNode;
};

export const SUPPORTED_TOKENS: TokenInfo[]  = [
  {
    id:"binancecoin",
    chain: bsc,
    symbol: "BNB",
    name: "BNB Chain",
    decimals: 18,
    color:"#f3ba2f",
    icon: <SiBinance />
  },
  {
    id:"base",
    chain: base,
    symbol: "BASE",
    name: "Base",
    decimals: 18,
    color:"#1652f0",
    icon: <SiCoinbase />
  },
  {
    id:"zetachain",
    chain: zetachainAthensTestnet, 
    symbol: "ZETA",
    name: "ZetaChain",
    decimals: 18,
    color:"green"
  },
];

// const supportedTokens = [
//   { id: "ethereum", label: "Ethereum", icon: <FaEthereum />, color: "#627eea" },
//   { id: "binancecoin", label: "BNB", icon: <SiBinance />, color: "#f3ba2f" },
//   {
//     id: "coinbase-wrapped-bitcoin",
//     label: "Coinbase",
//     icon: <SiCoinbase />,
//     color: "#1652f0"
//   },
//   // {
//   //   id: "solana",
//   //   label: "Solana",
//   //   icon: <TbCurrencySolana />,
//   //   color: "#9945FF",
//   // },
//   // { id: "bitcoin", label: "Bitcoin", icon: <FaBitcoin />, color: "#f7931a" },
//   // { id: "polygon", label: "Polygon", icon: <SiPolygon />, color: "#a100ff" },
//   // { id: "fantom", label: "Fantom", icon: <SiFantom />, color: "#13B5EC" },
//   // { id: "avalanche-2", label: "Avalanche", color: "#e84142" },
//   { id: "zetachain", label: "ZetaChain", color: "green" },
// ];