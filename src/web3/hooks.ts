//! deprecate this to favour ZETA_CA
export const CA = "0xa2B39823120Ea8e7a1f2E3E6864596644eE96689";
export const BASE_CA = "0xfc527B71eBD1854a32967F44D314FAf99b2aC333";
export const ZETA_CA = "0xa2B39823120Ea8e7a1f2E3E6864596644eE96689";

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
