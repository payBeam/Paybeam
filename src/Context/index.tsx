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
}>({
    isModalOpen: undefined,
    setIsModalOpen: undefined,
    merchant: undefined,
    setMerchant: undefined,
    isCreateModalOpen: undefined,
    setIsCreateModalOpen: undefined,

});

export const useUserContext = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const [merchant, setMerchant] = useState({
        name: "",
        description: "",
        })

    return {
        isModalOpen,
        setIsModalOpen,
        merchant,
        setMerchant,
        isCreateModalOpen,
        setIsCreateModalOpen
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
