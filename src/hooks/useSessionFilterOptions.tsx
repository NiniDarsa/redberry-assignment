import { useFilterOptions } from "./useFilterOptions"

export const useSessionFilterOptions=()=>{
            const [filterOptions] = useFilterOptions()
            return filterOptions
    
}
