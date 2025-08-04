import { SiBinance, SiCoinbase } from "react-icons/si";
import { base, bsc, zetachainAthensTestnet } from "wagmi/chains";
import type { ReactNode } from "react";
import type { Chain } from "wagmi/chains";

export type TokenInfo = {
  id: string;
  chain: Chain;
  symbol: string;
  name: string;
  decimals: number;
  color: string;
  icon?: ReactNode;
  isNative: boolean;
};

export const SUPPORTED_TOKENS: TokenInfo[] = [
  // {
  //   id:"binancecoin",
  //   chain: bsc,
  //   symbol: "BNB",
  //   name: "BNB Chain",
  //   decimals: 18,
  //   color:"#f3ba2f",
  //   icon: <SiBinance />,
  //   isNative: true
  // },
  {
    id: "base",
    chain: base,
    symbol: "BASE",
    name: "Base",
    decimals: 18,
    color: "#1652f0",
    icon: <SiCoinbase />,
    isNative: true,
  },
  {
    id: "zetachain",
    chain: zetachainAthensTestnet,
    symbol: "ZETA",
    name: "ZetaChain",
    decimals: 18,
    color: "green",
    isNative: true,
  },
];
