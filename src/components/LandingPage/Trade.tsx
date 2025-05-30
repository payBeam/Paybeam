"use client";
import React from "react";
import { currency } from "./data";
// import { IoIosArrowForward } from "react-icons/io";
// import { useRouter } from "next/router";

const Trade = () => {
    // const router = useRouter();
    return (
        <section className="section bg-gradient-to-b from-[#f8f9fb] to-[#fafbff] text-customPurple">
            <div className="container mx-auto">
                <h2 className="section-title text-center mb-16">
                    Unlock the future of digital battles with Meme War—create or compete
                    using memes, tokens, or NFTs in a secure, community-driven arena for
                    ultimate supremacy!
                </h2>
                {/* items */}
                <div className="flex flex-col gap-[45px] lg:flex-row">
                    {currency.map((item, index) => {
                        {
                            /* destructuring item */
                        }
                        const { image, name, abbr, description } = item;
                        return (
                            <div
                                className="w-full rounded-2xl py-12 px-6 shadow-primary cursor-pointer transition duration-300 hover:bg-customPurple hover:text-white"
                                key={index}
                            >
                                <div className="flex flex-col justify-center items-center">
                                    {/* item image */}
                                    <img className="mb-12" src={image} alt="" />
                                    {/* item name */}
                                    <div className="mb-4 flex items-center gap-x-2">
                                        <div className="text-[32px] font-bold">{name}</div>
                                        <div className="text-lg text-gray-400 font-medium">
                                            {abbr}
                                        </div>
                                    </div>
                                    {/* item description */}
                                    <p className="mb-6 text-center">{description}</p>
                                    {/* btn */}
                                    {/* <button className="btn text-white" onClick={() => router.push("/explore")}>Start</button> */}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Trade;
