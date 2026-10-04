import FiltersPanel from "./FiltersPanel"
import SessionsPanel from "./SessionsPanel"



const SessionsPage=()=>{
    return(<div className="w-full  bg-[#070c1c] p-20 flex gap-5">
      <FiltersPanel/>
      <SessionsPanel/>
    </div>)
}
export default SessionsPage