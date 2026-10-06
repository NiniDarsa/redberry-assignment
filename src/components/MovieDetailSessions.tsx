import { useMovieSessions } from "../hooks/useMovieSessions";
import useSessionsContext from "../hooks/useSessionsContext";
import type { TMovieDetails } from "../types/movies";
import DatePicker from "./DatePicker";
import DetailInfo from "./DetailInfo";

type TMovieDetailSessions = {
    name: string | undefined
    movieDetails: TMovieDetails | undefined
}

const MovieDetailSessions = ({ name, movieDetails }: TMovieDetailSessions) => {
    const { datePeriod, setDatePeriod, searchPar } = useSessionsContext()

    const [movieSessions, setMovieSessions] = useMovieSessions(name || "", searchPar)

    console.warn("ESA", movieSessions)

    function handleDateChange(date: string) {
        setDatePeriod(date, false)
    }

    return (
        <>
            <div className="flex-3 text-white flex justify-around pl-10 pt-10">

                <div className="text-white w-3/4 min-w-0">

                    <>
                        <h2 className="font-extrabold pb-2">
                            Sessions
                        </h2>

                        <div className="flex gap-2">
                            <DatePicker
                                datePeriod={datePeriod}
                                handleDateChange={handleDateChange}
                            />
                        </div>
                    </>

                    <div className="text-white pt-10">

                        {movieSessions?.map((item) => {

                            // Group sessions by hall
                            const halls = item.sessions.reduce((acc, session) => {

                                const hallId = session.hall.id

                                if (!acc[hallId]) {
                                    acc[hallId] = []
                                }

                                acc[hallId].push(session)

                                return acc

                            }, {} as Record<number, typeof item.sessions>)

                            return (
                                <div key={item.venue.id}>

                                    <h3 className="pb-5 pt-10">
                                        {item.venue.name}
                                    </h3>

                                    <div className="relative">

                                        <div className="flex gap-4 overflow-x-auto">

                                            {Object.values(halls).map((hallSessions) => {

                                                const hall = hallSessions[0].hall

                                                return (
                                                    <div
                                                        key={hall.id}
                                                        className="bg-[#1E2031] p-3 rounded-2xl shrink-0 w-fit"
                                                    >
                                                        <h3 className="pb-2">
                                                            Hall {hall.name}
                                                        </h3>
                                                        
                                                        <div className="flex gap-4 ">

                                                            {hallSessions.map((session) => (

                                                                <div
                                                                    key={session.id}
                                                                    className="flex shrink-0"
                                                                >

                                                                    <div className="flex gap-5">

                                                                        <div className="flex ">
                                                                            <div
                                                                                className="relative flex flex-col items-center gap-3 p-4
                                                                                rounded-l-xl overflow-hidden bg-[#070c1c]
                                                                                after:absolute after:-right-3 after:-top-3
                                                                                after:w-6 after:h-6 after:rounded-full
                                                                                after:bg-[#1E2031]
                                                                                before:absolute before:-right-3
                                                                                before:-bottom-3 before:w-6 before:h-6
                                                                                before:rounded-full before:bg-[#1E2031]
                                                                                w-40 "
                                                                                
                                                                            >
                                                                                <p className="font-extrabold">
                                                                                    {session.time}
                                                                                </p>

                                                                                <div className="flex gap-2 items-center text-[12px]">

                                                                                    <p>
                                                                                        {session.language.code}
                                                                                    </p>

                                                                                    <p className="rounded-full font-semibold px-3 py-1.5 text-[#A9A9A9] bg-[#1E2031]">
                                                                                        {session.format.name}
                                                                                    </p>

                                                                                </div>

                                                                            </div>

                                                                    
                                                                            <div className="w-px h-17 self-center border-l border-dashed border-[#A9A9A9]" />

                                                                            <div
                                                                                className="relative flex flex-col items-center gap-5 p-4
                                                                                rounded-r-xl overflow-hidden bg-[#070c1c]
                                                                                after:absolute after:-left-3 after:-top-3
                                                                                after:w-6 after:h-6 after:rounded-full
                                                                                after:bg-[#1E2031]
                                                                                before:absolute before:-left-3
                                                                                before:-bottom-3 before:w-6 before:h-6
                                                                                before:rounded-full before:bg-[#1E2031]
                                                                                w-25"
                                                                            >

                                                                                <p className="text-[#EC3013] font-extrabold">
                                                                                    {session.price}ლ
                                                                                </p>

                                                                                <p className="text-[#A9A9A9] text-[12px]">
                                                                                    {session.seatsLeft} left
                                                                                </p>

                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                </div>

                                                            ))}

                                                        </div>

                                                    </div>
                                                )
                                            })}

                                        </div>

                                        <div className="pointer-events-none absolute top-0 right-0 h-full w-[20%] bg-linear-to-r from-transparent to-[#070c1c]" />

                                    </div>

                                </div>
                            )
                        })}

                    </div>

                </div>

                <DetailInfo movieDetails={movieDetails} />

            </div>
        </>
    )
}

export default MovieDetailSessions