import { useLocation, useParams } from "react-router-dom";
import { useMovieDetails } from "../hooks/useMovieDetails";
import MovieDetailHeader from "./MovieDetailHeader";
import MovieDetailSessions from "./MovieDetailSessions";
import TicketPurchaseModal from "./TicketPurchaseModal";
import useOnClickOutside from "../hooks/useClickOutside";
import { useMovieSessions } from "../hooks/useMovieSessions";
import useSessionsContext from "../hooks/useSessionsContext";
import { useEffect, useState } from "react";
import type { TSession } from "../types/sessionDetail";
import TicketContextProvider from "../context/TicketContextProvider";
import { saveRecentlyViewedMovie } from "../functions/function";

const MovieDetailsPage = () => {
    const { name } = useParams()
    const movieDetails = useMovieDetails(name || "")

    const { isOpen, setIsOpen, ref } = useOnClickOutside()
    const { searchPar } = useSessionsContext()
    const movieSessions = useMovieSessions(name || "", searchPar)
    const location = useLocation()
    const [clickedSession, setClickedSession] = useState<TSession | undefined>(location.state?.session)

    useEffect(() => {
        if (location.state?.openModal) {
            setIsOpen(true)
        }
    }, [])

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