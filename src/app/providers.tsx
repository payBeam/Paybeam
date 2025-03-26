"use client";
import React from 'react'
import { Provider as ReduxProvider } from "react-redux";
import store from "@/redux/store";
import { UserContextProvider } from "@/Context"



function Providers({ children }) {
    return (
        <ReduxProvider store={store}>
              <UserContextProvider>

            {children}
              </UserContextProvider>
            </ReduxProvider>
    )
}

export default Providers