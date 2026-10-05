import { useEffect, useState } from "react";
import type { TUserResponse } from "../types/user";
import { GetUser } from "../functions/function";

export const useGetUser=()=>{
    const [user,setUser]=useState<TUserResponse>()
    

    const token=localStorage.getItem("token")

   useEffect(()=>{
    const getInfoAboutUser=async()=>{
        if (token) {
    try {
        const user :TUserResponse = await GetUser();

        console.error(user);
        setUser(user)
    } catch (err: any) {
        if (err.status === 401) {
            localStorage.removeItem("token");
        }
    }
}else{
  setUser(undefined)
}
    }
getInfoAboutUser()
},[])
return user
}