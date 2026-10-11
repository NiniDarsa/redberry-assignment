import { createContext, useEffect, useState } from "react";
import { GetUser } from "../functions/function";
import type { TUserResponse } from "../types/user";

type AuthContextProviderProps = { children: React.ReactNode };

type TAuthContext = {
    user: TUserResponse | null;
    setUser: React.Dispatch<React.SetStateAction<TUserResponse | null>>;
    fetchUser: () => Promise<void>;
    isLoading: boolean;
};

export const AuthContext = createContext<TAuthContext | null>(null);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<TUserResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async () => {
        setIsLoading(true);

        try {
            const user = await GetUser();
            setUser(user);
        } catch (err: any) {
            if (err.status === 401) {
                localStorage.removeItem("token");
            }
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const getInfoAboutUser = async () => {
                try {
                    // const user: TUserResponse = await GetUser();

                    // console.error(user);
                    // setUser(user);
                    fetchUser();
                } catch (err: any) {
                    if (err.status === 401) {
                        localStorage.removeItem("token");
                    }
                }
            };

            getInfoAboutUser();
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, fetchUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
