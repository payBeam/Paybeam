import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  console.log("handler hit ✅");
  const { searchParams } = new URL(request.url);
  const amount = parseFloat(searchParams.get("amount") || "0");

  try {
    console.log("Fetching Zeta price in USD for amount: in API", amount);
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=zetachain&vs_currencies=usd",
    );
    const data = await res.json();
    const zetaPrice = data?.zetachain?.usd;

    if (!zetaPrice || isNaN(amount)) {
      return NextResponse.json({ result: 0 }, { status: 400 });
    }

    const dollarValue = amount * zetaPrice;
    console.log("Zeta amount:", amount, "Zeta price:", zetaPrice, "Dollar value:", dollarValue);
    return NextResponse.json({ result: dollarValue });
  } catch (error) {
    console.error("Error fetching Zeta price:", error);
    return NextResponse.json({ result: 0 }, { status: 500 });
  }
}

//? TO USE THIS API, YOU CAN UNCOMMENT THE FOLLOWING CODE IN YOUR COMPONENT
/*  
    const res = await fetch(`/api/converter?amount=${invoice?.invoice?.amount}`);
      const { result } = await res.json();
      console.log("Zeta in USD:", result);
*/
