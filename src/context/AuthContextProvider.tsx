import { createContext, useEffect, useMemo, useState } from "react";
import { GetUser } from "../functions/function";
import type { TUserResponse } from "../types/user";

type AuthContextProviderProps = {
    children: React.ReactNode;
};

type TAuthContext = {
    user: TUserResponse | null;
    setUser: React.Dispatch<React.SetStateAction<TUserResponse | null>>;
    fetchUser: () => Promise<void>;
    name:string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    mobile:string;
    setMobile: React.Dispatch<React.SetStateAction<string>>
    dateOfBirth:string;
    setDateOfBirth: React.Dispatch<React.SetStateAction<string>>;
    isProfileComplete:boolean
};

export const AuthContext = createContext<TAuthContext | null>(null);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {

    const [user, setUser] = useState<TUserResponse|null>(null);

    ////
    const [name, setName] = useState("")
    const [mobile, setMobile] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")

    const isProfileComplete = useMemo(() => {
        return (
            name.trim() !== "" &&
            /^5\d{8}$/.test(mobile) &&
            dateOfBirth !== ""
        )
    }, [name, mobile, dateOfBirth])



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
                  name,
        setName,
        mobile,
        setMobile,
        dateOfBirth,
        setDateOfBirth,
        isProfileComplete
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;