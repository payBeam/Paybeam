// app/api/prices/route.ts

import { NextResponse } from "next/server";
import { SUPPORTED_TOKENS } from "@/web3/supportedToken";

export async function GET() {
  try {
    const ids = SUPPORTED_TOKENS.map((t) => t.id).join(",");
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`,
    );
    const data = await res.json();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching token prices:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch prices" }, { status: 500 });
  }
}
