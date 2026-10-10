import { useFetch } from "./useFetch"
import type { TMovieDetails } from "../types/movieDetails"

const API_URL = "https://api.kinoxii.redberryinternship.ge/api"

export function useMovieDetails(name: string) {
    const url = name
        ? `${API_URL}/movies/${name}`
        : null

    const { data } = useFetch<TMovieDetails>(url)

    return data?.data
}