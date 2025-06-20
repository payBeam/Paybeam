"use client";
import React, { useContext, useState } from "react";


interface DrawerParam {
    title: string;
    body: string;
}

const UserContext = React.createContext<{
    isModalOpen: any;
    setIsModalOpen: any;
    merchant: any;
    setMerchant: any;
    isCreateModalOpen: any;
    setIsCreateModalOpen: any;
    openCreateInvoiceModal: any;
    setOpenCreateInvoiceModal: any;
    steps: any;
    setSteps:any;
    invoice:any;
    setInvoice:any;
    memo:any;
    setMemo:any;
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    

}>(undefined);

export const useUserContext = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [openCreateInvoiceModal, setOpenCreateInvoiceModal] = useState(false);
    const [steps, setSteps] = useState(0);
    const [memo, setMemo] = useState("")
     const [merchant, setMerchant] = useState({
        name: "",
        description: "",
        })

    const [invoice, setInvoice] = useState({
        title: "",
        description: "",
        amount:0,
        tokenType: "USDC"
    })
     const [isDarkMode, setIsDarkMode] = useState(false);


    
    
    return {
        isModalOpen,
        setIsModalOpen,
        merchant,
        setMerchant,
        isCreateModalOpen,
        setIsCreateModalOpen,
        openCreateInvoiceModal,
        setOpenCreateInvoiceModal,
        steps,
        setSteps,
        invoice,
        setInvoice,
        memo, 
        setMemo,
        isDarkMode,
        setIsDarkMode,
    };
}; 

export const UserContextProvider = ({ children }) => {
    const auth = useUserContext();
    return (
        <UserContext.Provider value={auth}>
            {children}
        </UserContext.Provider>
    );
};

export const useClient = () => useContext(UserContext);
