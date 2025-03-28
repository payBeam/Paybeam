"use client";
import React, { useEffect } from "react";
// import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Input, Flex, Progress, Spin } from "antd";
import { SidebarDemo } from "@/components/Sidebar";
import Statistics from "./Statistics";
import Table from "./Table";
// import { useQueryClient } from '@tanstack/react-query';
import { useUser } from "@/hooks/useUser";


const { Search } = Input;

const Explore = () => {
  React.useEffect(() => { }, []);

  //TODO toast error
  const { data: user, isLoading, isError, error } = useUser();
  console.log("user", user?.data?.merchant);
  // console.log("error", error);


  return (
    <SidebarDemo>
      {isLoading ? (<div className="flex justify-center h-[100vh] items-center"><Spin /></div>
      ) : (


        <div className="mx-auto px-8 relative">
          <div className="flex pt-3 justify-between items-center  mx-auto ">
            <h2 className="font-extrabold"> payBeam</h2>
            {/* <Input maxW={"40%"} placeholder="search" /> */}
            <Search
              placeholder="search"
              // onSearch={onSearch}
              style={{ width: "40%" }}
            />

            {/* <ConnectButton /> */}
          </div>
          {user?.data && (
            <div>
              {user?.data?.merchant?.id ? (

                <div className="mt-4 space-y-6">
                  <h2 className="text-3xl font-bold">Dashboard</h2>
                  <h2 className="text-sm font-primary50">welcome {user?.data?.merchant?.name} 💖</h2>
                  <Statistics />
                  <Flex gap="small" vertical>
                    <Progress percent={30} />
                    <Progress percent={50} status="active" />
                    <Progress percent={70} status="exception" />
                    <Progress percent={100} />
                    <Progress percent={50} showInfo={false} />
                  </Flex>

                  <Table />
                </div>
              ) : (
                <div>
                  <div className="flex justify-center h-[100vh] items-center"><Spin /></div>

                </div>
              )}
            </div>
          )}
        </div>
      )}
    </SidebarDemo>
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
