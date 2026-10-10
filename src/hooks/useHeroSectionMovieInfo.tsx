import { useFetch } from "./useFetch"
import type { TMovie } from "../types/movies"

const API_URL = "https://api.kinoxii.redberryinternship.ge/api"

export function useHeroSectionMovieInfo() {
    const { data, loading, error } = useFetch<TMovie[]>(
        `${API_URL}/movies/featured`
    )

    return [data?.data ?? [], loading, error] as const
}