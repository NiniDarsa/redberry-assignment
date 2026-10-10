import { useFetch } from "./useFetch"
import type { TMovieDetails } from "../types/movieDetails"

const API_URL = "https://api.kinoxii.redberryinternship.ge/api"

export function useDetailedMovieInfo(title: string|null) {
    const url = title
        ? `${API_URL}/movies/${title}`
        : null

    const { data } = useFetch<TMovieDetails>(url)

    return data?.data ?? null
}