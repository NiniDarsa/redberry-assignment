import { useEffect, useState } from "react";
import type { MovieSessions,  } from "../types/session";

export function useSessionsInfo(){
        const [sessions, setSessions] = useState<MovieSessions[]>([])

      useEffect(() => {
            fetch("https://api.kinoxii.redberryinternship.ge/api/sessions")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error: ${response.status}`);
                    }
    
                    return response.json();
                })
                .then((data) => {
                    // console.log(data);
                    setSessions(data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, []);
        return [sessions]
}