import { useEffect, useState } from "react";
import type { MovieSessions, SessionsMeta,  } from "../types/session";



export function useSessionsInfo(url:string){
        const [sessions, setSessions] = useState<MovieSessions[]>([])
        const [meta, setMeta]=useState<SessionsMeta|null>(null)

      useEffect(() => {
            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error: ${response.status}`);
                    }
    
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setSessions(data.data);
                    setMeta(data.meta)
                })
                .catch((error) => {
                    console.log(error);
                });
        }, [url]);

        return [sessions, meta] as const
}