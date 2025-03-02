"use client";
import React from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
// import Why from "./Why";
import Trade from "@/components/LandingPage/Trade";
import Stats from "@/components/LandingPage/Stats";
// import Hero from "./Hero";

const Hero = dynamic(() => import("./Hero"), { ssr: false });
const Why = dynamic(() => import("./Why"), { ssr: false });

function LandingPage() {
    if (typeof window === "undefined") {
        return null; // Prevent rendering on the server
    }
    return (
        <div className="bg-custom-gradient">
            <Hero />
            <Stats />
            <Why />
            <Trade />
            <Footer />
        </div>
    );
}

export default LandingPage;
