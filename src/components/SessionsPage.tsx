import FiltersPanel from "./FiltersPanel"
import SessionsPanel from "./SessionsPanel"
import { getDateString } from "../functions/function"
import { useSearchParams } from "react-router-dom"



const SessionsPage=()=>{
  ////////////////////////
   const today = getDateString(new Date()) //2026-10-03

   //instead of keeping everything in state, I need to store those values in URL
    // const [venue, setVenue] = useState<string[]>([])
    // const [datePeriod, setDatePeriod] = useState<string>(today)
    // const [format, setFormat] = useState<string[]>([])
    // const [language, setLanguage] = useState<string[]>([])
    // const [timeOfDay, setTimeOfDay] = useState<string[]>([])
    // const [sort,setSort]=useState<string>("time_asc")
    // const [page,setPage]=useState<number>(1)

    const [searchParams, setSearchParams]=useSearchParams()
    //Now I read values from URL
    const venue=searchParams.getAll("venues[]")
    const format=searchParams.getAll("formats[]")
    const language=searchParams.getAll("languages[]")
    const timeOfDay=searchParams.getAll("bands[]") //////
    const datePeriod=searchParams.get("date")||today
    const sort=searchParams.get("sort")||"time_asc"
    const page=Number(searchParams.get("page"))||1



   // UPDATE one parameter
  const updateParams = (
    name: string,
    values: string[],
    resetPage = true
  ) => {
    const params = new URLSearchParams(searchParams)

    params.delete(name)

    values.forEach((value) => {
      params.append(name, value)
    })

    if (resetPage) {
      params.set("page", "1")
    }

    setSearchParams(params)
  }

  // DATE
  const setDatePeriod = (value: string) => {
    const params = new URLSearchParams(searchParams)

    params.set("date", value)
    params.set("page", "1")

    setSearchParams(params)
  }

  // SORT
  const setSort = (value: string) => {
    const params = new URLSearchParams(searchParams)

    params.set("sort", value)
    params.set("page", "1")

    setSearchParams(params)
  }

  // PAGE
  const setPage = (value: number ) => {
    
    const params = new URLSearchParams(searchParams)

    params.set("page", String(value))

    setSearchParams(params)
  }

 
  //Clear All
  const clearAll=()=>{
    const params = new URLSearchParams()

    params.set("date", getDateString(new Date()))
    params.set("sort", "time_asc")
    params.set("page", "1")

    setSearchParams(params)
  }

    return(<div className="w-full  bg-[#070c1c] p-20 flex gap-5">
      <FiltersPanel 
      venue={venue} 
      setVenue={(values) => updateParams("venues[]", values)}
      datePeriod={datePeriod} 
      setDatePeriod={setDatePeriod}
      format={format} 
      setFormat={(values) => updateParams("formats[]", values)}
      language={language} 
      setLanguage={(values) => updateParams("languages[]", values)}

      timeOfDay={timeOfDay} 

      setTimeOfDay={(values) => updateParams("bands[]", values)}
      sort={sort} 
      setPage={setPage}
      clearAll={clearAll}

      />
      <SessionsPanel 
      venue={venue} 
      datePeriod={datePeriod} 
      format={format} 
      language={language} 
      
      timeOfDay={timeOfDay}
      sort={sort} 
      page={page} 
      setPage={setPage}
      setSort={setSort}
      />
    </div>)
}
export default SessionsPage