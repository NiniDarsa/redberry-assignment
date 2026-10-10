import { useFetch } from "./useFetch"
import type { TVenueSessionsResponse } from "../types/sessionDetail"

const API_URL = "https://api.kinoxii.redberryinternship.ge/api"

export function useMovieSessions(
    name = "",
    searchPar: string
) {
    const url = name
        ? `${API_URL}/movies/${name}/sessions?${searchPar}`
        : null

    const { data } = useFetch<TVenueSessionsResponse>(url)

    return data?.data
}