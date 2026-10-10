// import { useEffect, useState } from "react";
// import type { TSessionFilters } from "../types/filters";

// export function useFilterOptions(){
//         const [filterOptions, setFilterOptions] = useState<TSessionFilters>()
        
//       useEffect(() => {
//             fetch("https://api.kinoxii.redberryinternship.ge/api/filter-options")
//                 .then((response) => {
//                     if (!response.ok) {
//                         throw new Error(`HTTP error: ${response.status}`);
//                     }
    
//                     return response.json();
//                 })
//                 .then((data) => {
//                     // console.log(data);
//                     setFilterOptions(data.data);
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//         }, []);
//         return [filterOptions]
// }
import type { TSessionFilters } from "../types/filters"
import { useFetch } from "./useFetch"

const API_URL = "https://api.kinoxii.redberryinternship.ge/api"

export function useFilterOptions() {
    const { data, loading, error } = useFetch<TSessionFilters>(
        `${API_URL}/filter-options`
    )

    return [data?.data, loading, error] as const
}