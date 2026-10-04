import { createContext } from "react";
import { useSearchParams } from "react-router-dom";
import { getDateString } from "../functions/function";


type SessionsContextProviderProp = {
    children: React.ReactNode;
};

type TSessionsContext = {
  venue: string[]
  setVenue: (values: string[]) => void

  datePeriod: string
  setDatePeriod: (value: string,change:boolean) => void

  format: string[]
  setFormat: (values: string[]) => void

  language: string[]
  setLanguage: (values: string[]) => void

  timeOfDay: string[]
  setTimeOfDay: (values: string[]) => void

  sort: string
  clearAll:()=>void

  setPage: (value: number) => void
  setSort: (value: string) => void
  page:number
  searchPar:string

  search:string
  setSearch: (value: string) => void

};

export const SessionsContext = createContext<TSessionsContext | null>(null);

const SessionsContextProvider = ({ children }: SessionsContextProviderProp) => {


    const today = getDateString(new Date()) //2026-10-03

    const [searchParams, setSearchParams] = useSearchParams()

    //Now I read values from URL (instead of using states)
    const venue = searchParams.getAll("venues[]")
    const format = searchParams.getAll("formats[]")
    const language = searchParams.getAll("languages[]")
    const timeOfDay = searchParams.getAll("bands[]") //////
    const datePeriod = searchParams.get("date") || today
    const sort = searchParams.get("sort") || "time_asc"
    const page = Number(searchParams.get("page")) || 1
    const search=searchParams.get("search")||""



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
    const setDatePeriod = (value: string,change:boolean) => {
        const params = new URLSearchParams(searchParams)

        params.set("date", value)
        if(change){
        params.set("page", "1")
        }
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
    const setPage = (value: number) => {

        const params = new URLSearchParams(searchParams)

        params.set("page", String(value))

        setSearchParams(params)
    }

    // SEARCH
    const setSearch = (value: string) => {

        const params = new URLSearchParams(searchParams)

        params.set("search", value)

        setSearchParams(params)
    }
   

    //Clear All
    const clearAll = () => {
        const params = new URLSearchParams()

        params.set("date", getDateString(new Date()))
        params.set("sort", "time_asc")
        params.set("page", "1")

        setSearchParams(params)
    }

    const  setVenue=(values:string[]) => {
        updateParams("venues[]", values)
    }
      
     const setFormat=(values:string[]) => {
        updateParams("formats[]", values)
    }
     
    const setLanguage=(values:string[]) => {
        updateParams("languages[]", values)
    }
      
    const  setTimeOfDay=(values:string[]) =>{
         updateParams("bands[]", values)
        }
     
    const searchPar= searchParams.toString()
     
    return (
        <SessionsContext.Provider
            value={{
                venue,
                setVenue,
                datePeriod,
                setDatePeriod,
                format,
                setFormat,
                language,
                setLanguage,
                timeOfDay,
                setTimeOfDay,
                sort,
                clearAll,
                searchPar,
                setPage,
                setSort,
                page,
                search,
                setSearch
            }}
        >
            {children}
        </SessionsContext.Provider>
    );
};
export default SessionsContextProvider;