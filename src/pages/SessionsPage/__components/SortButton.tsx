import { useSessionFilterOptions } from "../../../hooks/useSessionFilterOptions"


const SortButton = ({setSort}:{setSort: (value: string) => void}) => {
   const filterOptions = useSessionFilterOptions()

    
    return (<div className="flex items-center gap:2">
        <label htmlFor="sort-select" className=" text-[#A9A9A9]">Sort:</label>
        <select 
         onChange={(e)=>setSort(e.target.value)}
         name="sort" id="sort-select" className=" text-white cursor-pointer">
            {filterOptions?.sorts.map((item)=>{
                return (<option className=" text-white" value={item.id}>{item.label}</option>)
            })}
        </select>
    </div>)
}
export default SortButton