// import { useEffect, useState } from "react";
// import type { TVenueSessionsResponse } from "../types/sessionDetail";

// export function useMovieSessions(name="",searchPar:string){
//     const [MovieSessions, setMovieSessions] = useState<TVenueSessionsResponse>()
   
//     useEffect(() => {
//             fetch(`https://api.kinoxii.redberryinternship.ge/api/movies/${name}/sessions?${searchPar}`)
//                 .then((response) => {
//                     if (!response.ok) {
//                         throw new Error(`HTTP error: ${response.status}`);
//                     }
    
//                     return response.json();
//                 })
//                 .then((data) => {
//                     console.log(data);
//                     setMovieSessions(data.data);
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//         }, [name,searchPar]);
//         return [MovieSessions]

// }
import { useFetch } from "./useFetch"
import type { TVenueSessionsResponse } from "../types/sessionDetail"

const API_URL = "https://api.kinoxii.redberryinternship.ge/api"

export function useMovieSessions(
    name = "",
    searchPar: string
) {
    const url = name
        ? `${API_URL}/movies/${name}/sessions?${searchPar}`
        : null

    const { data } = useFetch<TVenueSessionsResponse>(url)

    return data?.data
}