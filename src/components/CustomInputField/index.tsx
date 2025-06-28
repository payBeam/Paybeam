"use client";
import { useClient } from "@/Context";
import { useEffect, useState } from "react";

const ZETA_AMOUNT = 1;

const Converter = () => {
  const [zetaPrice, setZetaPrice] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [mode, setMode] = useState<"zeta" | "fiat">("fiat");
 const { setInvoiceZeta } = useClient();

  useEffect(() => {
    const fetchPrice = async () => {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=zetachain&vs_currencies=usd"
      );
      const data = await res.json();
      setZetaPrice(data.zetachain.usd);
    };
    fetchPrice();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

        if (mode === "zeta") {
          setInvoiceZeta(+e.target.value);
        } else {
          setInvoiceZeta((+e.target.value / zetaPrice) * ZETA_AMOUNT);
        }
  };

  const getConvertedValue = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || !zetaPrice) return "";



    return mode === "zeta"
      ? `$${((value * zetaPrice ) / ZETA_AMOUNT).toFixed(2)}`
      : `${((value / zetaPrice) * ZETA_AMOUNT).toFixed(0)} $ZETA`;
  };

  const toggleMode = () => {
    setInputValue(""); // clear input on toggle
    setMode((prev) => (prev === "zeta" ? "fiat" : "zeta"));
  };

  return (
    <div className="space-y-3">
      <label className="block mb-1">
        Amount ({mode === "zeta" ? "ZETA" : "USD"})
      </label>
      <div className="relative">
  <input
    type="number"
    value={inputValue}
    onChange={handleInputChange}
    placeholder={mode === "zeta" ? "Enter ZETA" : "Enter fiat"}
    className="w-full px-4 py-2 pr-20 border rounded 
               bg-white text-gray-900 
               dark:bg-gray-800 dark:text-white dark:border-gray-600
               placeholder-gray-400 dark:placeholder-gray-500"
  />
  <button
    type="button"
    onClick={toggleMode}
    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xs 
               bg-gray-200 text-gray-800 hover:bg-gray-300 
               dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 
               px-2 py-1 rounded transition"
  >
    {mode === "zeta" ? "Switch to USD" : "Switch to ZETA"}
  </button>
</div>

      {inputValue && (
        <p className="text-sm text-gray-500">≈ {getConvertedValue()}</p>
      )}

      <p className="text-sm text-gray-400">$ZETA Price: ${zetaPrice}</p>
    </div>
  );
};

export default Converter;