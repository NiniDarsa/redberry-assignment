import { useFetch } from "./useFetch"
import type { MovieSessions, SessionsMeta } from "../types/session"

export function useSessionsInfo(url: string) {
    const { data } = useFetch<MovieSessions[]>(url)

    const sessions = data?.data ?? []
    const meta = (data?.meta as SessionsMeta | undefined) ?? null

    return [sessions, meta] as const
}