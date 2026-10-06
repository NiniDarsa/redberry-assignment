
import { createContext, useState } from "react";

type AppContextProviderProps = {
    children: React.ReactNode;
};

type TAppContext = {
    isAuthModalOpen: "Sign Up" | "Log In" | "";
    AuthModalOpen: (name: "Sign Up" | "Log In") => void;

    isProfileModalOpen: boolean;
    ProfileModalOpen: (arg: boolean) => void;
    setIsAuthModalOpen: React.Dispatch<React.SetStateAction<"" | "Sign Up" | "Log In">>;
    setIsProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>
};

export const AppContext = createContext<TAppContext | null>(null);

const AppContextProvider = ({ children }: AppContextProviderProps) => {

    const [isAuthModalOpen, setIsAuthModalOpen] =
        useState<"Sign Up" | "Log In" | "">("");

    const [isProfileModalOpen, setIsProfileModalOpen] =
        useState(false);

    const AuthModalOpen = (name: "Sign Up" | "Log In") => {
        setIsAuthModalOpen(name);
    };

    const ProfileModalOpen = (arg: boolean) => {
        setIsProfileModalOpen(arg);
    };

    return (
        <AppContext.Provider
            value={{
                isAuthModalOpen,
                AuthModalOpen,
                isProfileModalOpen,
                ProfileModalOpen,
                setIsAuthModalOpen,
                setIsProfileModalOpen
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;