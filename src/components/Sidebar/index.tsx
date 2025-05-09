import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconLogout
} from "@tabler/icons-react";
// import { Link, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Logo from "../Logo";
import Link from "next/link";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import ThemeToggle from "@/components/ThemeToggle"
import { logout } from "@/utils/auth";



export function SidebarDemo({ children }) {
  const links = [
    {
      label: "Explore",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-200 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Invoices",
      href: "/invoices",
      icon: (
        <IconUserBolt className="text-neutral-200 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-neutral-800 w-full flex-1 mx-auto border border-customPurple overflow-y-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8  flex flex-col gap-4">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>

          <ThemeToggle />

          <div className="cursor-pointer" onClick={() => logout()}><IconLogout /></div>

          <div>{/* <ConnectButton /> */}</div>
        </SidebarBody>
      </Sidebar>
      <div className="overflow-y-scroll w-full h-screen  bg-background ">
        {children}
      </div>
      {/* <Dashboard /> */}
    </div>
  );
}

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-neutral-200 py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-primary100 dark:bg-primary100 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
