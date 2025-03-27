"use client";
import React from 'react'
import { Provider as ReduxProvider } from "react-redux";
import store from "@/redux/store";
import { UserContextProvider } from "@/Context"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes cache
      retry: 2, // Retry failed requests twice
    },
  },
});


function Providers({ children }) {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          {children}
        </UserContextProvider>
      </QueryClientProvider>
    </ReduxProvider>
  )
}

export default Providers