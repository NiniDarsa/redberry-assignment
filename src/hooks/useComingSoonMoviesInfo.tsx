import { useEffect, useState } from "react";
import type { TMovie } from "../types/movies";

export function useComingSoonMoviesInfo(){
        const [comingSoonMovies, setComingSoonMovies] = useState<TMovie[]>([])
      useEffect(() => {
            fetch("https://api.kinoxii.redberryinternship.ge/api/movies/coming-soon")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error: ${response.status}`);
                    }
    
                    return response.json();
                })
                .then((data) => {
                    // console.log(data);
                    setComingSoonMovies(data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, []);
        return [comingSoonMovies]
}