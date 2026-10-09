// import { useEffect, useState } from "react";
// import type { TMovie } from "../types/movies";

// export function useComingSoonMoviesInfo(){
//         const [comingSoonMovies, setComingSoonMovies] = useState<TMovie[]>([])
//       useEffect(() => {
//             fetch("https://api.kinoxii.redberryinternship.ge/api/movies/coming-soon")
//                 .then((response) => {
//                     if (!response.ok) {
//                         throw new Error(`HTTP error: ${response.status}`);
//                     }
    
//                     return response.json();
//                 })
//                 .then((data) => {
//                     // console.log(data);
//                     setComingSoonMovies(data.data);
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//         }, []);
//         return [comingSoonMovies]
// }
import { useFetch } from "./useFetch"
import type { TMovie } from "../types/movies"

const API_URL = "https://api.kinoxii.redberryinternship.ge/api"

export function useComingSoonMoviesInfo() {
    const { data, loading, error } = useFetch<TMovie[]>(
        `${API_URL}/movies/coming-soon`
    )

    const movies = data?.data ?? []

    return [movies, loading, error] as const
}