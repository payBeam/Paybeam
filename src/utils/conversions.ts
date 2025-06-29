

export async function getDollarPrice(amountInZeta: number) {
    try {
        const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=zetachain&vs_currencies=usd`
        );
        const data = await response.json();
        const zetaPrice = data.zetachain.usd;
        return amountInZeta * zetaPrice;
    } catch (error) {
        console.error("Error fetching Zeta price:", error);
        return 0;
    }

}