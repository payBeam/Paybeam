"use client";
import React, { useState } from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "@/hooks/useRouterWithProgress";
import Navbar from "../Navbar/Nav2";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FlipWords } from "@/components/ui/flip-words";
import Lottie from "lottie-react";
import ICON from "@/components/GIF/home-icon.json";
import { useClient } from "@/Context";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useCreateUser } from "@/hooks/useUser";
import { addProfile } from "@/redux/slice/ProfileSlice";
import { storeTokens } from "@/utils/auth";
import { useAppDispatch } from "@/redux/hook";
import { Spin } from "antd";

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

function Hero() {
  const router = useRouter();
  const words_ = ["Split", "Transfer"];
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const login = useGoogleLogin({
    flow: "implicit",
    onSuccess: (codeResponse) => {
      handleSuccess(codeResponse);
    },
    scope: "openid profile email",
  });

  const mutation = useCreateUser();

  const handleSuccess = async (codeResponse: any) => {
    setAuthenticating(true);

    try {
      if (!codeResponse || !codeResponse.access_token) {
        throw new Error("Invalid response from Google");
      }
      let userData;
      const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${codeResponse.access_token}` },
      });
      userData = await response.json();

      const result = await mutation.mutateAsync(userData);

      console.log(result);
      if (result) {
        storeTokens(result.data.data.accessToken);
        console.log("user token", result.data.data.accessToken);
        dispatch(addProfile(result.data.data.user));
        toast.success("Login successful!");
        router("/dashboard");
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
      setAuthenticating(false);
    }
  };

  const options = {
    animationData: ICON,
    loop: true,
  };

  const { setIsModalOpen } = useClient();

  //"Unleash Your Meme Power: Battle, Engage, and Win Big in the Ultimate Meme War Arena!"
  // const { View } = useLottie(options);
  return (
    <section className="relative">
      {authenticating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Spin size="large" tip="Loading..." />
        </div>
      )}
      <BackgroundBeams />

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
              With payBeam You Can
              <FlipWords
                className="text-electricBlue-dark dark:text-electricBlue-dark"
                words={words_}
              />
              Your Bills!
            </div>
            <div className="flex space-x-4 ">
              {/* <button
                                className="btn gap-x-6 pl-6 text-sm lg:h-16 my-6 lg:text-base z-50"
                                data-aos="fade-down"
                                data-aos-delay="700"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Join Waitlist
                                <IoIosArrowDroprightCircle className="text-2xl lg:text-3xl" />
                            </button> */}
              {loading ? (
                <Spin size="large" />
              ) : (
                <button
                  className="btn dark:bg-transparent  gap-x-2 pl-6 text-sm lg:h-16 my-6 lg:text-base z-50"
                  data-aos="fade-down"
                  data-aos-delay="700"
                  onClick={() => {
                    login();
                    setLoading(true);
                  }}
                  // onClick={() => handleSuccess({ code: "ghghghg" })}
                >
                  Continue with
                  <FcGoogle className="text-2xl lg:text-3xl bg-white rounded-full dark:bg-transparent" />
                </button>
              )}
            </div>
          </div>
          {/* Hero image */}
          <div className="flex-1 w-[80%]" data-aos="fade-up" data-aos-delay="600">
            <Lottie animationData={ICON} loop={true} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
