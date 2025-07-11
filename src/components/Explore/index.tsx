"use client";
import React from "react";
// import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Input, Spin } from "antd";
// import { useQueryClient } from '@tanstack/react-query';
import Nav1 from "@/components/Navbar/Nav1";
import { useClient } from "@/Context/index";
import { useBalance } from "@/hooks/useInvoice";
import { useRouter } from "@/hooks/useRouterWithProgress";
import { useUser } from "@/hooks/useUser";
import { Alert } from 'antd';
import MerchantCreationForm from "./CreateMerchant";
import CreateInvoiceModal from "./Form";
import Table from "./Table";

const { Search } = Input;

const Explore = () => {
  React.useEffect(() => {}, []);
  const router = useRouter();

  const [isFormOpen, setIsFormOpen] = React.useState(false);

  //TODO toast error
  const { data: user, isLoading, isError, error } = useUser();
  // console.log("user", user?.data?.merchant);

  const { data: balance } = useBalance();
  // console.log("balance", balance);

  const { openCreateInvoiceModal, setOpenCreateInvoiceModal } = useClient();
  
  const handleOpenInvoiceModal = () => {
    setOpenCreateInvoiceModal((prev: boolean) => !prev);
  };

  return (
    <div className="">
      {isLoading ? (
        <div className="flex justify-center h-[100vh] items-center">
          <Spin />
        </div>
      ) : (
        <div className="">
          <Nav1 />
        <Alert
          message="payBeam is currently in development"
          description="We're actively working on integrating support for EVM tokens. Some things may break during this process — thanks for bearing with us!"
          type="info"
          showIcon
        />
          {user?.data && (
            <div className="flex justify-center items-center">
              {user?.data?.merchant?.id ? (
                <div className="flex flex-col justify-center items-center mt-4 space-y-6">
                  <h2 className="text-3xl font-bold">Dashboard</h2>
                  <h2 className="text-sm font-primary50">
                    welcome {user?.data?.merchant?.name} 💖
                  </h2>
                  <div className="flex space-x-3  items-center justify-center p-4 rounded-md ">
                    <p className="text-5xl font-bold text-green-600">
                      {balance?.data === undefined  ? "0" : balance?.data}
                    </p>
                    <p className="text-lg text-green-600">ZETA</p>
                  </div>

                  {/* action buttons */}
                  <div className="flex justify-center space-x-4 my-8">
                    <button
                      // onClick={() => router("/make-payment")}
                      className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                    >
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        Withdraw
                      </span>
                    </button>
                    <button
                      onClick={handleOpenInvoiceModal}
                      className="cursor-pointer shadow-[inset_0_0_0_2px_#616467] text-black px-6 py-3 rounded-full tracking-widest font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
                    >
                      Create Invoice
                    </button>
                  </div>

                  {/* transactions */}
                  <div className="flex flex-col justify-center items-center mt-8 space-y-3">
                    <h1 className="text-2xl font-bold">Transactions</h1>
                   
                    <Table />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-start h-[100vh] items-start ">
                    {!user?.data?.merchant && <MerchantCreationForm />}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {openCreateInvoiceModal && <CreateInvoiceModal />}
    </div>
  );
};

export default Explore;


export const projects = [
  {
    id: 1,
    title: "Kanye West - Graduation",
    description:
      "An iconic album by Kanye West, featuring hit tracks like 'Stronger' and 'Good Life.' Share ownership of tokens tied to this album and enable joint purchases.",
    link: "https://kanyewest.com",
    src: "album-1.jpg",
    progress: 20,
  },
  {
    id: 2,
    title: "Beyoncé - Lemonade",
    description:
      "A groundbreaking visual album by Beyoncé that blends music with storytelling. Own tokens tied to this masterpiece and split the cost with others.",
    link: "https://beyonce.com",
    src: "album-2.jpg",
    progress: 30,
  },
  {
    id: 3,
    title: "Drake - Scorpion",
    description:
      "Drake's fifth studio album featuring chart-topping hits like 'God's Plan.' Tokenize your ownership and collaborate on joint purchases.",
    link: "https://drake.com",
    src: "album-3.jpg",
    progress: 0,
  },
  {
    id: 4,
    title: "Taylor Swift - 1989",
    description:
      "A Grammy-winning album by Taylor Swift that marked her transition to pop. Own a share in this album's tokens and join buy opportunities.",
    link: "https://taylorswift.com",
    src: "album-4.jpg",
    progress: 78,
  },
  {
    id: 5,
    title: "Adele - 25",
    description:
      "A soulful album by Adele, featuring the worldwide hit 'Hello.' Token ownership lets you split the cost and invest in this musical gem.",
    link: "https://adele.com",
    src: "album-1.jpg",
    progress: 49,
  },
  {
    id: 6,
    title: "The Weeknd - After Hours",
    description:
      "The Weeknd's album featuring chart-toppers like 'Blinding Lights.' Share tokens in this album and enable fractional ownership.",
    link: "https://theweeknd.com",
    src: "album-2.jpg",
    progress: 90,
  },
];
