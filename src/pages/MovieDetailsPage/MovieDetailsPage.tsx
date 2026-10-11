import { useLocation, useParams } from "react-router-dom";
import { useMovieDetails } from "../../hooks/useMovieDetails";
import useOnClickOutside from "../../hooks/useClickOutside";
import useSessionsContext from "../../hooks/useSessionsContext";
import { useMovieSessions } from "../../hooks/useMovieSessions";
import { useEffect, useState } from "react";
import { GetHold, saveRecentlyViewedMovie } from "../../functions/function";
import MovieDetailHeader from "./__components/MovieDetailHeader";
import MovieDetailSessions from "./__components/MovieDetailSessions";
import TicketContextProvider from "../../context/TicketContextProvider";
import type { TSession } from "../../types/sessionDetail";
import TicketPurchaseModal from "../../components/TicketPurchaseModal/TicketPurchaseModal";
import type { THold } from "../../types/holdSeats";


const MovieDetailsPage = () => {
    const { name } = useParams()
    const movieDetails = useMovieDetails(name || "")

    const { isOpen, setIsOpen, ref } = useOnClickOutside()
    const { searchPar } = useSessionsContext()
    const movieSessions = useMovieSessions(name || "", searchPar)
    const location = useLocation()


    const [clickedSession, setClickedSession] = useState<TSession | undefined>(location.state?.session)

    useEffect(() => {
        if (location.state?.session) {
            setClickedSession(location.state.session)
        }

        if (location.state?.openModal) {
            setIsOpen(true)
        }
    }, [location.state, setIsOpen])


    useEffect(() => {
        if (!movieDetails || !name) return

        saveRecentlyViewedMovie({
            slug: name,
            title: movieDetails.title,
            posterUrl: movieDetails.posterUrl,
            minutes: movieDetails.runtimeMinutes,
            age: movieDetails.ageRating.minAge,
            genres: movieDetails.genres
        })
    }, [movieDetails, name])


    useEffect(() => {
    const holdId = localStorage.getItem("activeHoldId")

    if (!holdId || !movieSessions) return

    const restoreSession = async () => {
        try {
            const hold: THold = await GetHold(holdId)

            const session = movieSessions
                .flatMap((venue) => venue.sessions)
                .find((session) => session.id === hold.sessionId)

            if (session) {
                setClickedSession(session)
                setIsOpen(true)
            }
        } catch (error) {
            console.error("Could not restore session:", error)
        }
    }

    restoreSession()
}, [movieSessions, setIsOpen])
    

    return (
        <div className="bg-[#070c1c] w-full flex flex-col pb-10">
            <MovieDetailHeader movieDetails={movieDetails} />
            <MovieDetailSessions movieDetails={movieDetails} setIsOpen={setIsOpen}
                movieSessions={movieSessions} setClickedSession={setClickedSession}
            />

            <TicketContextProvider>
                <TicketPurchaseModal
                    MovieAge={movieDetails?.ageRating.minAge}
                    name={movieDetails?.title}
                    isModalOpen={isOpen} ref={ref} clickedSession={clickedSession} />
            </TicketContextProvider>
      
        </div>)
}
export default MovieDetailsPage