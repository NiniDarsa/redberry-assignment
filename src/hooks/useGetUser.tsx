import { useEffect, useState } from "react";
import type { TUserResponse } from "../types/user";
import { GetUser } from "../functions/function";

export const useGetUser=()=>{
    const [user,setUser]=useState<TUserResponse>()
    

   useEffect(()=>{
    const getInfoAboutUser=async()=>{
    try {
        const user :TUserResponse = await GetUser();

        console.error(user);
        setUser(user)
    } catch (err: any) {
        if (err.status === 401) {
            localStorage.removeItem("token");
        }
    }
    }
getInfoAboutUser()
},[])
return user
}


// import { useEffect, useState } from "react";
// import type { TUserResponse } from "../types/user";
// import { GetUser } from "../functions/function";

// export const useGetUser=async()=>{
//     const [user,setUser]=useState<TUserResponse>()
    
//     try {
//         const user :TUserResponse = await GetUser();
//         console.error(user);
//         setUser(user)
//     } catch (err: any) {
//         if (err.status === 401) {
//             localStorage.removeItem("token");
//         }
//     }
//     return user
// }
