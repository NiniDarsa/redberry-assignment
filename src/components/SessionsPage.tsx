import { useState } from "react"
import FiltersPanel from "./FiltersPanel"
import SessionsPanel from "./SessionsPanel"

const SessionsPage=()=>{
  ////////////////////////
   const today = new Date().getDate()
   const [venue, setVenue] = useState<string[]>([])
    const [datePeriod, setDatePeriod] = useState<number>(today)
    const [format, setFormat] = useState<string[]>([])
    const [language, setLanguage] = useState<string[]>([])
    const [timeOfDay, setTimeOfDay] = useState<string[]>([])

  ////////////////////////

    return(<div className="w-full  bg-[#070c1c] p-20 flex gap-5">
      <FiltersPanel 
      venue={venue} setVenue={setVenue} datePeriod={datePeriod} setDatePeriod={setDatePeriod}
      format={format} setFormat={setFormat} language={language} setLanguage={setLanguage} timeOfDay={timeOfDay} setTimeOfDay={setTimeOfDay}
      />
      <SessionsPanel venue={venue} datePeriod={datePeriod} format={format} language={language} timeOfDay={timeOfDay}/>
    </div>)
}
export default SessionsPage