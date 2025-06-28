"use client";
import React, { useContext, useState } from "react";


// TODO  show a ui that allows the merhcant to choose this, for now we will hardcode to zeta
// this to be shown on merhcant creation not per inivoice creation
// you should be able to chnaeg this in your profile or settings
// type TokenType = {
//     USDC = "USDC",
//     XRP = "XRP",    
//     USDT = "USDT",
//     // BTC = "BTC",
//     XLM = "XLM",
//     ZETA = "ZETA",
//     ETH = "ETH",
//     BASE = "BASE",
//     BNB = "BNB",
//     SOL = "SOL",
//     TON = "TON",
//     TRX = "TRX",
//   }
  

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
    txHash: string;
    setTxHash: React.Dispatch<React.SetStateAction<string>>;
    setInvoiceZeta: React.Dispatch<React.SetStateAction<number>>;
    invoiceZeta: number;
    

}>(undefined);

export const useUserContext = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [openCreateInvoiceModal, setOpenCreateInvoiceModal] = useState(false);
    const [steps, setSteps] = useState(0);
    const [memo, setMemo] = useState("")
    const [txHash, setTxHash] = useState("");
    const [invoiceZeta, setInvoiceZeta] = useState(0);
     const [merchant, setMerchant] = useState({
        name: "",
        description: "",
        })

    const [invoice, setInvoice] = useState< {
        description: string;
        amount: number
        
    }>({
        description: "",
        amount:0,
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
        txHash,
        setTxHash,
        setInvoiceZeta,
        invoiceZeta
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
