import React, { useEffect, useState } from "react";
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import zetaAbi from "./abi/zeta-abi.json";
import erc20Abi from "./abi/erc-20.json";
import type { Address } from "viem";
import { config } from "@/web3/wagmi";
import { formatEther } from "viem";
import { useAppDispatch } from "@/redux/hook";
import { addToken1, addToken2 } from "@/redux/slice/TokenSlice";

export const CA = "0x05eEEfC9f4cf7A092052e37F96E1c853c3558D65";

// type ReturnType = {
//   isLoading: boolean;
//   data: any;
//   error: any;
//   refetch?: any;
// };

// export const useGetTokenBalance = (tokenAddress: `0x${string}`) => {
//   const { data, error } = useReadContract({
//     abi: erc20Abi,
//     address: tokenAddress,
//     functionName: "balanceOf",
//     args: [tokenAddress],
//   });

//   return {
//     isLoading: !data && !error,
//     data: data as any,
//     error,
//   };
// };
// export const useCalculatePrice = (tokenAddress: `0x${string}`) => {
//   const { data, error } = useReadContract({
//     abi: bep20Abi.abi,
//     address: tokenAddress,
//     functionName: "calculatePrice",
//     args: [],
//   });

//   return {
//     isLoading: !data && !error,
//     data: data as any,
//     error,
//   };
// };

// export const useGetTokenDetails = (
//   tokenIndex: number,
//   tokenAddress: `0x${string}`
// ) => {
//   const dispatch = useAppDispatch();

//   const { data: name } = useReadContract({
//     address: tokenAddress,
//     abi: bep20Abi.abi,
//     functionName: "name",
//   });

//   const { data: symbol } = useReadContract({
//     address: tokenAddress,
//     abi: bep20Abi.abi,
//     functionName: "symbol",
//   });

//   const { data: decimals } = useReadContract({
//     address: tokenAddress,
//     abi: bep20Abi.abi,
//     functionName: "decimals",
//   });

//   const { data: price } = useReadContract({
//     abi: bep20Abi.abi,
//     address: tokenAddress,
//     functionName: "calculatePrice",
//     args: [],
//   });

//   // UseEffect to dispatch only when the data changes
//   useEffect(() => {
//     if (
//       typeof name === "string" &&
//       typeof symbol === "string" &&
//       typeof price === "bigint"
//     ) {
//       console.log("PRICEEEE", Number(price) / 10 ** 18);
//       const param = {
//         address: tokenAddress,
//         name,
//         symbol,
//         price: formatEther(price),
//       };

//       if (tokenIndex === 1) {
//         dispatch(addToken1(param));
//       } else if (tokenIndex === 2) {
//         dispatch(addToken2(param));
//       }
//     }
//   }, [name, symbol, tokenIndex, tokenAddress, dispatch]);

//   console.log(`Name: ${name}, Symbol: ${symbol}, Decimals: ${decimals}`);

//   return {
//     name,
//     symbol,
//     decimals,
//   };
// };

// export const useGetMemeWars = () => {
//   // Fetch data for each item
//   const { data, error } = useReadContract({
//     abi: contractAbi,
//     address: CA,
//     functionName: "getAllMemeWars",
//   });

//   return {
//     isLoading: !data && !error,
//     data: data as any,
//     error,
//   };
// };

// // getUserJoinedWars
// export const useGetJoinedWars = () => {
//   const { address } = useAccount();
//   // Fetch data for each item
//   const { data, error } = useReadContract({
//     abi: contractAbi,
//     address: CA,
//     functionName: "getUserJoinedWars",
//     args: [address],
//   });

//   return {
//     isLoading: !data && !error,
//     data: data as any,
//     error,
//   };
// };

// export const useGetMemeTokenWars = () => {
//   // Fetch data for each item
//   const { data, error } = useReadContract({
//     abi: contractAbi,
//     address: CA,
//     functionName: "getAllMemeTOkenWars",
//   });

//   return {
//     isLoading: !data && !error,
//     data: data as any,
//     error,
//   };
// };

// export const useGetContentCount = () => {
//   const { data, error } = useReadContract({
//     abi: contractAbi,
//     address: CA,
//     functionName: "contentCounter",
//     args: [],
//     // query: { enabled }, // Prevent fetching if id is invalid
//   });

//   return {
//     isLoading: !data && !error,
//     data,
//     error,
//   };
// };

// export const useGetAMemeDetail = (id: any) => {
//   const shouldFetch = React.useMemo(() => !!id, [id]); // Only allow fetching if id exists

//   const { data, error } = useReadContract({
//     abi: contractAbi,
//     address: CA,
//     functionName: "memeWars",
//     args: [id],
//     query: { enabled: shouldFetch }, // Prevent fetching if id is invalid
//   });

//   return {
//     isLoading: !data && !error,
//     data,
//     error,
//   };
// };

// export const useGetAllCampaigns = (): ReturnType => {
//   const { data, error, refetch } = useReadContract({
//     abi: contractAbi,
//     address: CA,
//     functionName: "getAllCampaigns",
//   });

//   return {
//     isLoading: !data && !error,
//     data,
//     error,
//     refetch,
//   };
// };

// export const useGetUserProfile = (address: Address | undefined): ReturnType => {
//   const { error, data } = useReadContract({
//     abi: contractAbi,
//     address: CA,
//     functionName: "getUserProfile",
//     args: [address],
//   });

//   return {
//     isLoading: !data && !error,
//     data,
//     error,
//   };
// };

// export const useGetAllUsers = (): ReturnType => {
//   const { data, error } = useReadContract({
//     abi: contractAbi,
//     address: CA,
//     functionName: "getAllUsers",
//   });

//   return {
//     isLoading: !data && !error,
//     data,
//     error,
//   };
// };