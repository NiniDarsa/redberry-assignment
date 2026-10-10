import { useFetch } from "./useFetch"
import type { TMovie } from "../types/movies"

const API_URL = "https://api.kinoxii.redberryinternship.ge/api"

export function useComingSoonMoviesInfo() {
    const { data, loading, error } = useFetch<TMovie[]>(
        `${API_URL}/movies/coming-soon`
    )

    const movies = data?.data ?? []

    return [movies, loading, error] as const
}