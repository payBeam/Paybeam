"use client";
import React from "react";
import Logo from "../Logo";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle"

function Nav2() {
    const router = useRouter();

    return (
        <div className="flex justify-between pt-6">
            <div className="flex">
                <p className="text-2xl  font-extrabold">
                    <Logo />
                </p>
            </div>
            <div className="z-[20] block md:hidden">
                <ThemeToggle />

            </div>

            <div className="hidden md:flex gap-12 items-center justify-center z-[20]">
                <button
                    // onClick={() => {
                    //     router.push("/connect-wallet");
                    // }}
                    className="btn"
                >
                    Home
                </button>
                <a href="#" target="_blank" rel="payBeam">
                    <p className="cursor-pointer">Developer</p>
                </a>
                <a href="https://discord.gg/zrKr7EVZwS" target="_blank" rel="payBeam Discord">
                    <p className="cursor-pointer">Community</p>
                </a>
                <a href="https://x.com/paybeam_hq?s=21" target="_blank" rel="payBeam Twitter">
                    <p className="cursor-pointer">Support</p>
                </a>
                <ThemeToggle />
            </div>
        </div>
    );
}

export default Nav2;
