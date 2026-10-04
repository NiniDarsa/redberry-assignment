import { useEffect } from "react"
import { useSessionFilterOptions } from "../hooks/useSessionFilterOptions"
import useSessionsContext from "../hooks/useSessionsContext"
import DatePicker from "./DatePicker"



const FiltersPanel = () => {
    const {  venue,setVenue, datePeriod, setDatePeriod,format, setFormat, language, setLanguage, timeOfDay, setTimeOfDay,  clearAll}=useSessionsContext()

   const filterOptions = useSessionFilterOptions()
   console.log(filterOptions)


    function getAvailableFormats() {
        const arr = filterOptions?.venues.map((item) => (
            {
                [item.slug]: item.formats.map((item) => item.slug)
            }
        ))

        const availableFormats: string[] = [];

        if (venue.length === 0) {
            availableFormats.push(
                ...(filterOptions?.formats.map((item) => item.slug) ?? [])
            );
        } else {
            arr?.forEach((item) => {
                const venueSlug = Object.keys(item)[0];

                if (venue.includes(venueSlug)) {
                    const formats = Object.values(item)[0];

                    formats.forEach((format) => {
                        if (!availableFormats.includes(format)) {
                            availableFormats.push(format);
                        }
                    });
                }
            });
        }
        return availableFormats
    }

    //we dont't want format (which is used for checkbutton) to contain things which is not available 
    //the useEffect keeps format valid when availableFormats changes.
    //so with that I remove format which is no longer available
    useEffect(()=>{
       const availableFormats=getAvailableFormats()
       const newFormat=[...format].filter((item)=>availableFormats.includes(item))

        if (
          newFormat.length !== format.length ||
          newFormat.some((item, index) => item !== format[index])
        ) {
           setFormat(newFormat)
        }
    },[venue.join(","),filterOptions])



    //use it for JSX
    const availableFormats=getAvailableFormats()
   

    function filterCounter() {
        const array = [venue.length > 0, format.length > 0, language.length > 0, timeOfDay.length > 0, !!datePeriod]
        const filteredArray = array.filter((item) => item !== false)
        return filteredArray.length

    }

    //functions for filters
    function handlevVenueChange(name: string) {
        if (venue.includes(name)) {
            const newVenue = [...venue].filter((item) => item !== name)
            return setVenue(newVenue)

        } else {
            return setVenue([...venue, name])
        }
    }

    function handleDateChange(date: string) {
        setDatePeriod(date,true)
    }

    function handleFormatChange(name: string) {
        if (format.includes(name)) {
            const newFormat = [...format].filter((item) => item !== name)
            return setFormat(newFormat)

        } else {
            return setFormat([...format, name])
        }
    }

    function handleLanguageChange(name: string) {
        if (language.includes(name)) {
            const newLanguage = [...language].filter((item) => item !== name)
            return setLanguage(newLanguage)

        } else {
            return setLanguage([...language, name])
        }
      
    }

    function handleTimeOfDayChange(name: string) {
        if (timeOfDay.includes(name)) {
            const newTimeOfDay = [...timeOfDay].filter((item) => item !== name)
            return setTimeOfDay(newTimeOfDay)

        } else {
            return setTimeOfDay([...timeOfDay, name])
        }
       
    }

    function handleClick() {
       clearAll()
    }


    return (<div className="flex flex-col text-white gap-4" >
        <div className="mb-2">
            <h2 className="font-extrabold">Sessions</h2>
            <p className="font-normal text-[#A9A9A9] text-[12px]">Browse showtimes across all venues</p>
        </div>

        <div className="font-semibold text-[15px] w-[320px]  bg-[#1E2031] rounded-2xl p-6 ">
            <div className="flex flex-col gap-6 justify-between ">
                <h3>Filters</h3>

                <div className="border-b border-[#2A2D3C] pb-5">
                    <h4 className="text-[#A9A9A9] pb-2">VENUE</h4>
                    <>

                        {filterOptions?.venues.map((item) => {
                            return (<label key={item.id} className="flex gap-3">

                                <input
                                    type="checkbox"
                                    className="appearance-none w-5 h-5 border border-[#A9A9A9] rounded-sm bg-transparent checked:bg-[#A9A9A9]"

                                    checked={venue.includes(item?.slug)}
                                    onChange={() => handlevVenueChange(item.slug)}
                                />
                                <div>
                                    <span>{item.name} .</span> <span className="text-[#A9A9A9] font-normal text-[12px]">{item.city}</span>
                                </div>
                            </label>)
                        })}
                    </>
                </div>


                <div className="border-b border-[#2A2D3C] pb-5">
                    <h4 className="text-white pb-2">DATE</h4>

                    <div className="flex overflow-auto gap-1">
                       <DatePicker datePeriod={datePeriod} handleDateChange={handleDateChange}/>
                    </div>
                </div>


                <div className="border-b border-[#2A2D3C] pb-5">
                    <h4 className="text-[#A9A9A9] pb-2">FORMAT</h4>
                    <>
                        {filterOptions?.formats
                            .filter((item) => availableFormats.includes(item.slug))
                            .map((item) => (
                                <label key={item.id} className="flex gap-3">
                                    <input
                                        type="checkbox"
                                        className="appearance-none w-5 h-5 border border-[#A9A9A9] rounded-sm bg-transparent checked:bg-[#A9A9A9]"
                                        checked={format.includes(item.slug)}
                                        onChange={() => handleFormatChange(item.slug)}
                                    />

                                    <div>{item.name}</div>
                                </label>
                            ))}
                    </>
                </div>


                <div className="border-b border-[#2A2D3C] pb-5">
                    <h4 className="text-[#A9A9A9] pb-2">LANGUAGE</h4>
                    <>

                        {filterOptions?.languages.map((item) => {
                            return (<label key={item.id} className="flex gap-3">
                                <input
                                    type="checkbox"
                                    className="appearance-none w-5 h-5 border border-[#A9A9A9] rounded-sm bg-transparent checked:bg-[#A9A9A9]"

                                    checked={language.includes(item.slug)}
                                    onChange={() => handleLanguageChange(item.slug)}
                                />
                                <div> {item.name}</div>
                            </label>)
                        })}
                    </>
                </div>



                <div className="border-b border-[#2A2D3C] pb-5">
                    <h4 className="text-[#A9A9A9] pb-2">TIME OF DAY</h4>
                    <>

                        {filterOptions?.timeBands.map((item) => {
                            return (<label key={item.id} className="flex gap-3">
                                <input
                                    type="checkbox"
                                    className="appearance-none w-5 h-5 border border-[#A9A9A9] rounded-sm bg-transparent checked:bg-[#A9A9A9]"
                                    checked={timeOfDay.includes(item.id)}
                                    onChange={() => handleTimeOfDayChange(item.id)}
                                />
                                <div>{item.id} . <span className="text-[#A9A9A9] font-normal text-[12px]">{item.label}</span></div>
                            </label>)
                        })}
                    </>
                </div>


            </div>

            <div className="flex flex-col justify-between items-center gap-2">
                <div className="text-[#A9A9A9] text-center pt-10 font-normal ">
                    <span>
                        {filterCounter()}
                    </span> filters active
                </div>
                <button
                    onClick={() => handleClick()}
                    className="bg-[#2A2D3C] p-2 rounded-sm font-semibold cursor-pointer ">Clear all</button>
            </div>
        </div>

    </div>)
}
export default FiltersPanel