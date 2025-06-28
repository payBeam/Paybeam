import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base, bsc, bscTestnet, zetachainAthensTestnet } from "wagmi/chains";



export const config = getDefaultConfig({
  appName: "payBeam",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains: [
    bscTestnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [ zetachainAthensTestnet, bsc , base ]
      : []),
  ],
  ssr: true,
});


const SUPPORTED_TOKENS = [
  {
    chain: bsc,
    symbol: "BNB",
    name: "BNB Chain",
    decimals: 18,
  },
  {
    chain: base,
    symbol: "BASE",
    name: "Base",
    decimals: 18,
  },
  {
    chain: zetachainAthensTestnet, 
    symbol: "ZETA",
    name: "ZetaChain",
    decimals: 18,
  },
];
