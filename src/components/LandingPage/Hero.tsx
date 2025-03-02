"use client";
import React, {useState} from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
import Navbar from "../Navbar/Nav2";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FlipWords } from "@/components/ui/flip-words";
import Lottie from "lottie-react";
import ICON from "@/components/GIF/home-icon.json";
import WaitlistModal from "@/components/Waitlist/WaitlistModal";
import supabase from "@/Services/supabase";
import toast from "react-hot-toast";



function Hero() {
    const router = useRouter();
    const words_ = ["Split", "Transfer", "View"];

    const options = {
        animationData: ICON,
        loop: true,
    };

    interface WaitlistFormData {
        name: string;
        email: string;
    }
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const addToWaitlist = async (data: WaitlistFormData) => {
        try {
            setLoading(true);
            const { error } = await supabase
                .from("waitlist")
                .insert([{ name: data.name, email: data.email }])
                .select();

            if (error) {
                setLoading(false);
                toast.error("Error adding to waitlist");
                console.error("Error adding to waitlist:", error);
            } else {
                setLoading(false);
                console.log("Successfully added to waitlist:", data);
            }
        } catch (error) {
            setLoading(false);
            console.error("An unexpected error occurred:", error);
        }
    };

    //"Unleash Your Meme Power: Battle, Engage, and Win Big in the Ultimate Meme War Arena!"
    // const { View } = useLottie(options);
    return (
        <section className="">
            <BackgroundBeams />
            {showModal && (
                <WaitlistModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    addToWaitlist={addToWaitlist}
                    loading={loading}
                />
            )}
            <div className="container mx-auto">
                <Navbar />
                <div className="flex flex-col items-center justify-center  lg:flex-row mt-[30px]">
                    <div className="flex-1 z-40 mt-12">
                        {/* badge text */}

                        {/* title */}
                        <h1
                            className="text-[32px] lg:text-[42px] font-bold leading-tight mb-6"
                            data-aos="fade-down"
                            data-aos-delay="500"
                        >
                            automates payments, enabling   
                            <span className="text-electricBlue"> seamless split payments, </span>
                            smart invoicing, and effortless transactions
                            <span className="text-electricBlue"> using blockchain.</span>
                        </h1>
                        <div
                            className="max-w-[440px] text-[16px] lg:text-[18px] leading-relaxed mb-8"
                            data-aos="fade-down"
                            data-aos-delay="600"
                        >
                           With payBeam You Can :
                            <FlipWords className="text-electricBlue-dark dark:text-electricBlue-dark" words={words_} />
                           Your Bills!
                        </div>
                        <button
                            className="btn gap-x-6 pl-6 text-sm lg:h-16 my-6 lg:text-base z-50"
                            data-aos="fade-down"
                            data-aos-delay="700"
                            // onClick={() => setShowModal(true)}
                        >
                            Join Waitlist
                            <IoIosArrowDroprightCircle className="text-2xl lg:text-3xl" />
                        </button>
                    </div>
                    {/* Hero image */}
                    <div
                        className="flex-1 w-[80%]"
                        data-aos="fade-up"
                        data-aos-delay="600"
                    >
                        <Lottie animationData={ICON} loop={true} />
                    </div>
                </div>
         
            </div>
        </section>
    );
}

export default Hero;
