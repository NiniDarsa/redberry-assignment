// import { useEffect, useState } from "react";
// import type { TMovie } from "../types/movies";

// export function useNowPlayingMovieInfo(){
//     const [nowPlayingMovies, setNowPlayingMovies] = useState<TMovie[] | []>([])
//      useEffect(() => {
//             fetch("https://api.kinoxii.redberryinternship.ge/api/movies/now-playing")
//                 .then((response) => {
//                     if (!response.ok) {
//                         throw new Error(`HTTP error: ${response.status}`);
//                     }
    
//                     return response.json();
//                 })
//                 .then((data) => {
//                     console.log(data);
//                     setNowPlayingMovies(data.data);
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//         }, []);
//         return [nowPlayingMovies]

// }

import { useFetch } from "./useFetch"
import type { TMovie } from "../types/movies"

const API_URL = "https://api.kinoxii.redberryinternship.ge/api"

export function useNowPlayingMovieInfo() {
    const { data, loading, error } = useFetch<TMovie[]>(
        `${API_URL}/movies/now-playing`
    )

    const movies = data?.data ?? []

    return [movies, loading, error] as const
}