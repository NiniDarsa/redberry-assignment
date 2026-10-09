// import { useEffect, useState } from "react";
// import type { TMovie } from "../types/movies";

// export function useHeroSectionMovieInfo(){
//         const [FeaturedMovies, setFeaturedMovies] = useState<TMovie[]>([])
//       useEffect(() => {
//             fetch("https://api.kinoxii.redberryinternship.ge/api/movies/featured")
//                 .then((response) => {
//                     if (!response.ok) {
//                         throw new Error(`HTTP error: ${response.status}`);
//                     }
    
//                     return response.json();
//                 })
//                 .then((data) => {
//                     // console.log(data);
//                     setFeaturedMovies(data.data);
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//         }, []);
//         return [FeaturedMovies]
// }
import { useFetch } from "./useFetch"
import type { TMovie } from "../types/movies"

const API_URL = "https://api.kinoxii.redberryinternship.ge/api"

export function useHeroSectionMovieInfo() {
    const { data, loading, error } = useFetch<TMovie[]>(
        `${API_URL}/movies/featured`
    )

    return [data?.data ?? [], loading, error] as const
}