import { useEffect, useState } from "react";
import type { TVenueSessionsResponse } from "../types/sessionDetail";

export function useMovieSessions(name="",date:string){
    const [MovieSessions, setMovieSessions] = useState<TVenueSessionsResponse>()
     useEffect(() => {
            fetch(`https://api.kinoxii.redberryinternship.ge/api/movies/${name}/sessions?date=${date}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error: ${response.status}`);
                    }
    
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setMovieSessions(data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, [name,date]);
        return [MovieSessions]

}