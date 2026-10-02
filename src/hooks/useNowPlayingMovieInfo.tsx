import { useEffect, useState } from "react";
import type { TMovie } from "../types/movies";

export function useNowPlayingMovieInfo(){
    const [nowPlayingMovies, setNowPlayingMovies] = useState<TMovie[] | []>([])
     useEffect(() => {
            fetch("https://api.kinoxii.redberryinternship.ge/api/movies/now-playing")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error: ${response.status}`);
                    }
    
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setNowPlayingMovies(data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, []);
        return [nowPlayingMovies]

}