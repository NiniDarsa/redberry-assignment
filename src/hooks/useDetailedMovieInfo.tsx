// import { useEffect, useState } from "react";
// import type { TMovieDetails } from "../types/movies";



// export function useDetailedMovieInfo(title:string|null|undefined) {
//     const [details, setDetails] = useState<TMovieDetails | null>(null)

    
//     useEffect(() => {
//         if (!title) return

//         fetch(`https://api.kinoxii.redberryinternship.ge/api/movies/${title}`)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error(`HTTP error: ${response.status}`);
//                 }

//                 return response.json();
//             })
//             .then((data) => {
//                 // console.log(data);
//                 setDetails(data.data);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     }, [title]);
  

//     return [details]
// }

import { useFetch } from "./useFetch"
import type { TMovieDetails } from "../types/movieDetails"

const API_URL = "https://api.kinoxii.redberryinternship.ge/api"

export function useDetailedMovieInfo(title: string|null) {
    const url = title
        ? `${API_URL}/movies/${title}`
        : null

    const { data } = useFetch<TMovieDetails>(url)

    return data?.data ?? null
}