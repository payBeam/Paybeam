import { SUPPORTED_TOKENS } from "@/web3/supportedToken";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { bscTestnet } from "wagmi/chains";

// //
export const config = getDefaultConfig({
  appName: "payBeam",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains: [
    bscTestnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? SUPPORTED_TOKENS.map(token => token.chain)
      : []),
  ],
  ssr: true,
});


