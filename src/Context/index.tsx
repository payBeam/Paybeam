"use client";
import React, { useContext, useState } from "react";


interface DrawerParam {
    title: string;
    body: string;
}

const UserContext = React.createContext<{
    isModalOpen: any;
    setIsModalOpen: any;
}>({
    isModalOpen: undefined,
    setIsModalOpen: undefined,
});

export const useUserContext = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    return {
        isModalOpen,
        setIsModalOpen,
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
