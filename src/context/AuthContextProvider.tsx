import { createContext, useEffect, useState } from "react";
import { GetUser } from "../functions/function";
import type { TUserResponse } from "../types/user";

type AuthContextProviderProps = {
    children: React.ReactNode;
};

type TAuthContext = {
    user: TUserResponse | null;
    setUser: React.Dispatch<React.SetStateAction<TUserResponse | null>>;
    fetchUser: () => Promise<void>;
   
};

export const AuthContext = createContext<TAuthContext | null>(null);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {

    const [user, setUser] = useState<TUserResponse|null>(null);



    const fetchUser=async()=>{
       const user= await GetUser()
       setUser(user)
    }

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {

            const getInfoAboutUser = async () => {
                try {
                    // const user: TUserResponse = await GetUser();

                    // console.error(user);
                    // setUser(user);
                    fetchUser()

                } catch (err: any) {
                    if (err.status === 401) {
                        localStorage.removeItem("token");
                    }
                }
            };

            getInfoAboutUser();
        }

    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                fetchUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;