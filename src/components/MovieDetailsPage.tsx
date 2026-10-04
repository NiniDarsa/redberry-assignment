import { useParams } from "react-router-dom";
import { useMovieDetails } from "../hooks/useMovieDetails";
import MovieDetailHeader from "./MovieDetailHeader";
import MovieDetailSessions from "./MovieDetailSessions";

const MovieDetailsPage = () => {
    const { name } = useParams()
    const [movieDetails, setMovieDetails] = useMovieDetails(name || "")

    return (
        <div className="bg-[#070c1c] w-full flex flex-col pb-10">
           <MovieDetailHeader movieDetails={movieDetails}/>
           <MovieDetailSessions name={name} movieDetails={movieDetails} />
        </div>)
}
export default MovieDetailsPage