// 1. if the option is split with friends, then the user can add amount that the friend should foot
// and then he sees the link to share to those friends, and his own share to pay
//2. if the option is pay myself, then the user sees list of supported tokens to pay with
// clcekning on toekn of choice shows qr code to scan to pay, function to call to pay, address to transfer to with memo
// then a listening ui to show when the payment is successful
//
import { useAppDispatch } from "@/redux/hook";
import { changeStep } from "@/redux/slice/SettleInvoiceSlice";
import { FaEthereum } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { SiBinance, SiCoinbase, SiStellar } from "react-icons/si";
import { TbCurrencySolana } from "react-icons/tb";

function PaymentOption() {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col">
      {/* Header with back button and title */}
      <div className="flex justify-between items-center">
        <div onClick={() => dispatch(changeStep(0))}>
          <IoIosArrowBack />
        </div>
        <h1 className="text-2xl font-bold mb-4">Pay With</h1>
        <div />
      </div>

      <div className=" flex flex-col gap-4">
        <EVMPaymentButton />
        <button className="inline-flex h-12 animate-shimmer gap-2 items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 bg-[linear-gradient(110deg,#f1f5f9,45%,#e2e8f0,55%,#f1f5f9)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-700 dark:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-slate-600 dark:focus:ring-offset-slate-900">
          <span>Pay with XLM</span>

          {/* XLM */}
          <div className="w-6 h-6 rounded-full bg-slate-800 p-0.5 flex items-center justify-center  ">
            <SiStellar className="text-purple-500 dark:text-purple-400 w-4 h-4" />
          </div>
        </button>
      </div>

      {/* <div className="grid grid-cols-3  gap-4">
        {buttons.map((button, idx) => (
          <div key={idx}>{button.component}</div>
        ))}
      </div> */}
    </div>
  );
}

export default PaymentOption;

const EVMPaymentButton = () => {
  return (
    <button className="inline-flex h-12 animate-shimmer gap-2 items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 bg-[linear-gradient(110deg,#f1f5f9,45%,#e2e8f0,55%,#f1f5f9)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-700 dark:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-slate-600 dark:focus:ring-offset-slate-900">
      <span>Pay with EVM Tokens</span>

      <div className="flex -space-x-2">
        {/* Ethereum */}
        <div className="w-6 h-6 rounded-full bg-slate-800 p-0.5 flex items-center justify-center  ">
          <FaEthereum className="text-purple-500 dark:text-purple-400 w-4 h-4" />
        </div>

        {/* BNB */}
        <div className="w-6 h-6 rounded-full bg-slate-800 p-0.5 flex items-center justify-center ">
          <SiBinance className="text-yellow-500 dark:text-yellow-400 w-4 h-4" />
        </div>

        {/* Coinbase */}
        <div className="w-6 h-6 rounded-full bg-slate-800 p-0.5 flex items-center justify-center ">
          <SiCoinbase className="text-blue-500 dark:text-blue-400 w-4 h-4" />
        </div>

        {/* Solana */}
        <div className="w-6 h-6 rounded-fulbg-slate-800 p-0.5 flex items-center justify-center">
          <TbCurrencySolana className="text-green-500 dark:text-green-400 w-4 h-4" />
        </div>
      </div>
    </button>
  );
};

export const buttons = [
  {
    name: "Sketch",
    description: "Sketch button for your website",

    component: (
      <button className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
        Sketch
        <a
          href="https://www.flaticon.com/free-icons/bitcoin"
          title="bitcoin icons"
        ></a>
      </button>
    ),
  },
  {
    name: "Simple",
    description: "Elegant button for your website",
    component: (
      <button className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
        Simple
      </button>
    ),
  },
  {
    name: "Invert",
    description: "Simple button that inverts on hover",
    component: (
      <button className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
        Invert it
      </button>
    ),
  },
  {
    name: "Tailwindcss Connect",
    description: "Button featured on Tailwindcss Connect website",
    showDot: false,
    component: (
      <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
          <span>{`Tailwind Connect`}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M10.75 8.75L14.25 12L10.75 15.25"
            ></path>
          </svg>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
      </button>
    ),
  },
  {
    name: "Gradient",
    description: "Simple Gradient button with rounded corners",
    component: (
      <button className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
        Gradient
      </button>
    ),
  },

  {
    name: "Border Magic",
    description: "Border Magic button for your website",
    showDot: false,
    component: (
      <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          Border Magic
        </span>
      </button>
    ),
  },

  {
    name: "Brutal",
    description: "Brutal button for your website",
    component: (
      <button className="px-8 py-0.5  border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
        Brutal
      </button>
    ),
  },
  {
    name: "Favourite",
    description: "Favourite button for your website",
    component: (
      <button className="px-8 py-2  bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg">
        Favourite
      </button>
    ),
  },
  {
    name: "Outline",
    description: "Outline button for your website",
    component: (
      <button className="px-4 py-2 rounded-xl border border-neutral-600 text-black bg-white hover:bg-gray-100 transition duration-200">
        Outline
      </button>
    ),
  },
  {
    name: "Shimmer",
    description: "Shimmer button for your website",
    showDot: false,
    component: (
      <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        Shimmer
      </button>
    ),
    code: `
          // Button code
          <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            Shimmer
          </button>
    
          // tailwind.config.js code
          {
            "animation": {
              shimmer: "shimmer 2s linear infinite"
            },
            "keyframes": {
              shimmer: {
                from: {
                  "backgroundPosition": "0 0"
                },
                to: {
                  "backgroundPosition": "-200% 0"
                }
              }
            }
          }
        `,
  },
  {
    name: "Next.js Blue",
    description: "Next.js Blue button for your website",
    component: (
      <button className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear">
        Next.js Blue
      </button>
    ),
  },
  {
    name: "Next.js White",
    description: "Next.js White button for your website",
    component: (
      <button className="shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-8 py-2 bg-[#fff] text-[#696969] rounded-md font-light transition duration-200 ease-linear">
        Next White
      </button>
    ),
  },

  {
    name: "Backdrop Blur",
    description: "Outline button for your website",
    showDot: false,
    component: (
      <button className="px-4 py-2 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200">
        Backdrop blur
      </button>
    ),
  },
  {
    name: "Figma",
    description: "Figma button for your website",
    component: (
      <button className="px-6 py-2 bg-black text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
        Figma
      </button>
    ),
  },
  {
    name: "Figma Outline",
    description: "Figma Outline button for your website",
    component: (
      <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
        Figma Outline
      </button>
    ),
  },
  {
    name: "Top Gradient",
    description: "Top Gradient button for your website",
    showDot: false,
    component: (
      <button className="px-8 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
        <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
        <span className="relative z-20">Top gradient</span>
      </button>
    ),
  },
];
