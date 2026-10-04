import { getDateString } from "../functions/function";
import { useMovieSessions } from "../hooks/useMovieSessions";
import useSessionsContext from "../hooks/useSessionsContext";
import type { TMovieDetails } from "../types/movies";
import DetailInfo from "./DetailInfo";

type TMovieDetailSessions={
    name:string|undefined
    movieDetails:TMovieDetails|undefined
}
const MovieDetailSessions=({name,movieDetails}:TMovieDetailSessions)=>{
    const { datePeriod, setDatePeriod } = useSessionsContext()
    const [movieSessions, setMovieSessions] = useMovieSessions(name || "", datePeriod)

    

    function handleDateChange(date: string) {
        setDatePeriod(date, false)
    }
    return(<>
    
            <div className="flex-3 text-white flex justify-around pl-10 pt-10">
                <div className="text-white w-3/4 min-w-0">
                    <>
                        <h2 className="font-extrabold">Sessions</h2>
                        <p className="text-[#A9A9A9] text-[12px] pb-2">22 sessions over the next seven days</p>
                        <div className="flex gap-2">
                            {Array.from({ length: 7 }, (_, index) => {
                                const date = new Date();
                                date.setDate(date.getDate() + index);

                                const dateValue = getDateString(date)

                                return (
                                    <label
                                        key={dateValue}
                                        className="flex-shrink-0 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name="date"
                                            className="peer hidden"
                                            checked={datePeriod === dateValue}
                                            onChange={() => handleDateChange(dateValue)}
                                        />

                                        <div className="flex flex-col items-center rounded-xl px-4 py-2 bg-[#1E2031] text-white peer-checked:bg-[#A9A9A9] peer-checked:text-black">
                                            <span>
                                                {date.toLocaleDateString("en-US", {
                                                    weekday: "short",
                                                })}
                                            </span>

                                            <span>{date.getDate()}</span>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    </>



                    <div className="text-white pt-10">
                        {movieSessions?.map((item) => {
                            return (<div key={item.venue.id}>
                                <h3 className="pb-5 pt-10">{item.venue.name}</h3>

                                <div className="relative">



                                    <div className="flex gap-4 overflow-x-auto">
                                        {item.sessions.map((item) => {
                                            return (<div key={item.id} className="bg-[#1E2031] p-3  rounded-2xl shrink-0">

                                                <h3 className="pb-2">Hall {item.hall.name}</h3>

                                                <div className="flex gap-2 justify-around items-center">
                                                    <div className="flex justify-around">
                                                        <div className="flex gap-2 ">
                                                            <div className="flex gap-5">
                                                                <div className="flex">
                                                                    {/* LEFT SIDE */}
                                                                    <div className=" relative flex flex-col items-center gap-3 p-4
                                      rounded-l-xl overflow-hidden bg-[#070c1c] after:absolute after:-right-3 after:-top-3 after:w-6
                                      after:h-6 after:rounded-full after:bg-[#1E2031] before:absolute before:-right-3
                                      before:-bottom-3 before:w-6 before:h-6 before:rounded-full before:bg-[#1E2031]">
                                                                        <p className="font-extrabold">{item.time}</p>
                                                                        <div className="flex gap-2 items-center text-[12px]">
                                                                            <p>{item.language.code}</p>
                                                                            <p className="rounded-full font-semibold px-3 py-1.5 text-[#A9A9A9] bg-[#1E2031]"> {item.format.name}</p>
                                                                        </div>
                                                                    </div>

                                                                    {/* DOTTED DIVIDER */}
                                                                    <div className="w-px h-20 self-center border-l border-dashed border-[#A9A9A9]" />

                                                                    {/* RIGHT SIDE */}
                                                                    <div className="relative flex flex-col items-center gap-5 p-4 rounded-r-xl overflow-hidden
                                              bg-[#070c1c] after:absolute  after:-left-3  after:-top-3  after:w-6
                                               after:h-6  after:rounded-full  after:bg-[#1E2031] before:absolute  before:-left-3
                                                before:-bottom-3  before:w-6 before:h-6 before:rounded-full  before:bg-[#1E2031] ">
                                                                        <p className="text-[#EC3013] font-extrabold">  {item.price}ლ  </p>
                                                                        <p className="text-[#A9A9A9] text-[12px]">  {item.seatsLeft} left</p>
                                                                    </div>
                                                                </div>


                                                            </div>



                                                        </div>



                                                    </div>



                                                    <div className="flex justify-around">
                                                        <div className="flex gap-2 ">
                                                            <div className="flex gap-5">
                                                                <div className="flex">
                                                                    {/* LEFT SIDE */}
                                                                    <div className=" relative flex flex-col items-center gap-3 p-4
                                      rounded-l-xl overflow-hidden bg-[#070c1c] after:absolute after:-right-3 after:-top-3 after:w-6
                                      after:h-6 after:rounded-full after:bg-[#1E2031] before:absolute before:-right-3
                                      before:-bottom-3 before:w-6 before:h-6 before:rounded-full before:bg-[#1E2031]">
                                                                        <p className="font-extrabold">{item.time}</p>
                                                                        <div className="flex gap-2 items-center text-[12px]">
                                                                            <p>{item.language.code}</p>
                                                                            <p className="rounded-full font-semibold px-3 py-1.5 text-[#A9A9A9] bg-[#1E2031]"> {item.format.name}</p>
                                                                        </div>
                                                                    </div>

                                                                    {/* DOTTED DIVIDER */}
                                                                    <div className="w-px h-20 self-center border-l border-dashed border-[#A9A9A9]" />

                                                                    {/* RIGHT SIDE */}
                                                                    <div className="relative flex flex-col items-center gap-5 p-4 rounded-r-xl overflow-hidden
                                              bg-[#070c1c] after:absolute  after:-left-3  after:-top-3  after:w-6
                                               after:h-6  after:rounded-full  after:bg-[#1E2031] before:absolute  before:-left-3
                                                before:-bottom-3  before:w-6 before:h-6 before:rounded-full  before:bg-[#1E2031] ">
                                                                        <p className="text-[#EC3013] font-extrabold">  {item.price}ლ  </p>
                                                                        <p className="text-[#A9A9A9] text-[12px]">  {item.seatsLeft} left</p>
                                                                    </div>
                                                                </div>


                                                            </div>



                                                        </div>



                                                    </div>
                                                </div>

                                            </div>


                                            )
                                        })}


                                    </div>
                                    <div className=" pointer-events-none absolute top-0 right-0 h-full w-[20%] bg-linear-to-r from-transparent to-[#070c1c]" />
                                </div>


                            </div>)
                        })}

                    </div>

                </div>



                {/* //details */}
               <DetailInfo movieDetails={movieDetails}/>

            </div>
    </>)
}
export default MovieDetailSessions