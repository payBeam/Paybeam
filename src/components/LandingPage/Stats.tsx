"use client";

import React from "react";

// import icons
import { HiChartBar, HiUser, HiGlobe } from "react-icons/hi";

const Stats = () => {
    return (
        <section className="section" data-aos="fade-up" data-aos-delay="1200">
            <div className="container mx-auto">
                <div
                    className="flex flex-col gap-y-6 lg:flex-row
        lg:justify-between"
                >
                    {/* item */}
                    <div className="flex items-center gap-x-6">
                        {/* item icon */}
                        <div
                            className="bg-white/10 flex rounded-full items-center w-20 h-20 justify-center text-electricBlue
          text-2xl lg:text-4xl"
                        >
                            <HiChartBar />
                        </div>
                        {/* item text */}
                        <div>
                            <div
                                className="text-2xl font-bold lg:text-[40px]
            lg:mb-2"
                            >
                                $100
                            </div>
                            <div className="text-gray-400">Transactions Processed</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-6">
                        {/* item icon */}
                        <div
                            className="bg-white/10 flex rounded-full items-center w-20 h-20 justify-center text-electricBlue
          text-2xl lg:text-4xl"
                        >
                            <HiUser />
                        </div>
                        {/* item text */}
                        <div>
                            <div
                                className="text-2xl font-bold lg:text-[40px]
            lg:mb-2"
                            >
                                200
                            </div>
                            <div className="text-gray-400">Wallets Connected</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-6">
                        {/* item icon */}
                        <div
                            className="bg-white/10 flex rounded-full items-center w-20 h-20 justify-center text-electricBlue
          text-2xl lg:text-4xl"
                        >
                            <HiGlobe />
                        </div>
                        {/* item text */}
                        <div>
                            <div
                                className="text-2xl font-bold lg:text-[40px]
            lg:mb-2"
                            >
                                2
                            </div>
                            <div className="text-gray-400">Blockchain Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Stats;
