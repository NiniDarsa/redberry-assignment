// import { useEffect, useState } from "react";
// import type { TMovieDetails } from "../types/movies";

// export function useMovieDetails(name:string){
//     const [MovieDetails, setMovieDetails] = useState<TMovieDetails>()
//      useEffect(() => {
//             fetch(`https://api.kinoxii.redberryinternship.ge/api/movies/${name}`)
//                 .then((response) => {
//                     if (!response.ok) {
//                         throw new Error(`HTTP error: ${response.status}`);
//                     }
    
//                     return response.json();
//                 })
//                 .then((data) => {
//                     console.log(data);
//                     setMovieDetails(data.data);
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//         }, [name]);
//         return [MovieDetails]

// }
import { useFetch } from "./useFetch"
import type { TMovieDetails } from "../types/movieDetails"

const API_URL = "https://api.kinoxii.redberryinternship.ge/api"

export function useMovieDetails(name: string) {
    const url = name
        ? `${API_URL}/movies/${name}`
        : null

    const { data } = useFetch<TMovieDetails>(url)

    return data?.data
}