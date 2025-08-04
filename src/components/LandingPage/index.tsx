"use client";
import React from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
// import Why from "./Why";
import Trade from "@/components/LandingPage/Trade";
import Stats from "@/components/LandingPage/Stats";
import HowItWorks from "@/components/features-section-demo-3";
// import Hero from "./Hero";
import { useClient } from "@/Context";
import WaitlistModal from "@/components/Waitlist/WaitlistModal";

const Hero = dynamic(() => import("./Hero"), { ssr: false });
const Why = dynamic(() => import("./Why"), { ssr: false });

function LandingPage() {
  const { isModalOpen } = useClient();

  if (typeof window === "undefined") {
    return null; // Prevent rendering on the server
  }
  return (
    <div className="bg-custom-gradient">
      <Hero />
      <Stats />
      <HowItWorks />
      <Why />
      {/* <Trade /> */}
      <Footer />
      {isModalOpen && <WaitlistModal showModal={isModalOpen} />}
    </div>
  );
}

export default LandingPage;
