import DatePicker from "../../../components/DatePicker"
import useAppContext from "../../../hooks/useAppContext"
import useAuthContext from "../../../hooks/useAuthContext"
import useSessionsContext from "../../../hooks/useSessionsContext"
import type { TMovieDetails } from "../../../types/movies"
import type { TSession, TVenueSessionsResponse } from "../../../types/sessionDetail"
import DetailInfo from "./DetailInfo"


type TMovieDetailSessions = {
    movieDetails: TMovieDetails | undefined
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    movieSessions: TVenueSessionsResponse| undefined
   setClickedSession: React.Dispatch<React.SetStateAction<TSession|undefined>>
}

const MovieDetailSessions = ({  movieDetails,  setIsOpen, movieSessions, setClickedSession }: TMovieDetailSessions) => {
    const { datePeriod, setDatePeriod } = useSessionsContext()


    const { user } = useAuthContext()
    const { setIsAuthModalOpen } = useAppContext()

    function handleDateChange(date: string) {
        setDatePeriod(date, false)
    }


    const handleSessionClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,session:TSession) => {
        e.stopPropagation()
        const isAgeRestricted =
        user?.data.age !== undefined &&
        user?.data.age !== null &&
        movieDetails?.ageRating.minAge !== undefined &&
        user.data.age < movieDetails.ageRating.minAge

     if (isAgeRestricted) {
         return
    }

        setClickedSession(session)
        if (user) {
            setIsOpen(true)
        } else {
            setIsAuthModalOpen("Log In")
        }
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

                    <div
                        className="text-white pt-10">

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
                                                        className={`p-3 rounded-2xl shrink-0 w-fit ${user?.data.age !== undefined &&
                                                            user?.data.age !== null &&
                                                            movieDetails?.ageRating.minAge !== undefined &&
                                                            user.data.age < movieDetails.ageRating.minAge
                                                            ? "bg-gray-500 opacity-50 cursor-not-allowed"
                                                            : "bg-[#1E2031]"
                                                            }`}
                                                    >
                                                        <h3 className="pb-2">
                                                            Hall {hall.name}
                                                        </h3>

                                                        <div className="flex gap-4 ">

                                                            {hallSessions.map((session) => (

                                                                <div

                                                                   onClick={(e) => handleSessionClick(e,session)}
                    
                                                                    key={session.id}
                                                                    className="flex shrink-0 cursor-pointer"
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
                                                                                   ₾ {session.price}
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