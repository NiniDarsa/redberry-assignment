import { useState } from "react"
import FiltersPanel from "./FiltersPanel"
import SessionsPanel from "./SessionsPanel"
import { getDateString } from "../functions/function"



const SessionsPage=()=>{
  ////////////////////////
   const today = getDateString(new Date()) //2026-10-03

    const [venue, setVenue] = useState<string[]>([])
    const [datePeriod, setDatePeriod] = useState<string>(today)
    const [format, setFormat] = useState<string[]>([])
    const [language, setLanguage] = useState<string[]>([])
    const [timeOfDay, setTimeOfDay] = useState<string[]>([])


    ////
    const [sort,setSort]=useState<string>("time_asc")
    const [page,setPage]=useState<number>(1)

  ////////////////////////

    return(<div className="w-full  bg-[#070c1c] p-20 flex gap-5">
      <FiltersPanel 
      venue={venue} setVenue={setVenue} datePeriod={datePeriod} setDatePeriod={setDatePeriod}
      format={format} setFormat={setFormat} language={language} setLanguage={setLanguage} timeOfDay={timeOfDay} setTimeOfDay={setTimeOfDay}
      sort={sort} setSort={setSort} setPage={setPage}
      />
      <SessionsPanel venue={venue} datePeriod={datePeriod} format={format} language={language} timeOfDay={timeOfDay}
      sort={sort} page={page} setPage={setPage}
      />
    </div>)
}
export default SessionsPage