import { useEffect, useState } from "react";
import type { TMovieDetails } from "../types/movies";



export function useDetailedMovieInfo(title:string|null|undefined) {
    const [details, setDetails] = useState<TMovieDetails | null>(null)

    
    useEffect(() => {
        if (!title) return

        fetch(`https://api.kinoxii.redberryinternship.ge/api/movies/${title}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                return response.json();
            })
            .then((data) => {
                // console.log(data);
                setDetails(data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [title]);
  

    return [details]
}