import { useParams } from "react-router-dom";
import { useMovieDetails } from "../hooks/useMovieDetails";
import MovieDetailHeader from "./MovieDetailHeader";
import MovieDetailSessions from "./MovieDetailSessions";
import TicketPurchaseModal from "./TicketPurchaseModal";
import useOnClickOutside from "../hooks/useClickOutside";
import { useMovieSessions } from "../hooks/useMovieSessions";
import useSessionsContext from "../hooks/useSessionsContext";
import { useState } from "react";
import type { TSession } from "../types/sessionDetail";
import TicketContextProvider from "../context/TicketContextProvider";

const MovieDetailsPage = () => {
    const { name } = useParams()
    const [movieDetails, setMovieDetails] = useMovieDetails(name || "")
    const [clickedSession,setClickedSession]=useState<TSession>()
    const { isOpen, setIsOpen, ref } = useOnClickOutside()
    const {searchPar}=useSessionsContext()
    const [movieSessions, setMovieSessions] = useMovieSessions(name || "", searchPar)
   

    return (
        <div className="bg-[#070c1c] w-full flex flex-col pb-10">
           <MovieDetailHeader movieDetails={movieDetails}/>
           <MovieDetailSessions movieDetails={movieDetails}  setIsOpen={setIsOpen} 
           movieSessions={movieSessions} setClickedSession={setClickedSession}
           />

       <TicketContextProvider>
           <TicketPurchaseModal 
           movieDetails={movieDetails}
           MovieAge={movieDetails?.ageRating.minAge}
           name={movieDetails?.title}
           isModalOpen={isOpen} ref={ref} clickedSession={clickedSession}/>
        </TicketContextProvider>
        </div>)
}
export default MovieDetailsPage