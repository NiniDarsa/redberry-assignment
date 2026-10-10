import type { TSessionFilters } from "../types/filters"
import { useFetch } from "./useFetch"

const API_URL = "https://api.kinoxii.redberryinternship.ge/api"

export function useFilterOptions() {
    const { data, loading, error } = useFetch<TSessionFilters>(
        `${API_URL}/filter-options`
    )

    return [data?.data, loading, error] as const
}