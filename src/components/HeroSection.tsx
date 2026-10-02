
import { useEffect, useState } from "react"
import Navigation from "./Navigation";
import { useDetailedMovieInfo } from "../hooks/useDetailedMovieInfo";
import { useHeroSectionMovieInfo } from "../hooks/useHeroSectionMovieInfo";



const HeroSection = () => {

    const [FeaturedMovies] = useHeroSectionMovieInfo()
    const [currentMovie, setCurrentMovie] = useState(0)

    const movie = FeaturedMovies[currentMovie]


    //fetched Detailed information about each movie

    const [details] = useDetailedMovieInfo(movie?.slug)


    //backward and forward buttons

    function buttonForward() {

        // setPreviousMovie(movie)
        let current = currentMovie + 1
        if (current > 3) {
            setCurrentMovie(0)
        } else {
            setCurrentMovie(current)
        }
    }

    function buttonBackward() {
        // setPreviousMovie(movie)
        let current = currentMovie - 1
        if (current < 0) {
            setCurrentMovie(3)
        } else {
            setCurrentMovie(current)
        }
    }

    //Automatic change
    useEffect(() => {
        const id = setInterval(() => {
            let current = currentMovie + 1
            if (current > 3) {
                setCurrentMovie(0)
            } else {
                setCurrentMovie(current)
            }

        }, 4000);

        return () => {
            clearInterval(id)
        }
    }, [currentMovie])



    if (!movie) { return null }

    return (<section className=" relative min-h-[760px] h-[80vh] flex flex-col items-start justify-around py-10 overflow-hidden">

        <Navigation />

        <div
            key={movie?.title}
            className="absolute inset-0 bg-cover bg-center fade-in"
            style={{ backgroundImage: `url(${movie.backdropUrl})` }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div key={movie.id} className=" relative pl-15 pt-30 w-2/5 flex flex-col text-white fade-in">
            <p className="bg-[rgba(236,48,19,0.1)] text-[#EC3013] font-semibold w-fit rounded-full px-2.5 py-1.5 mb-4 text-[12px] uppercase">PREMIERE . WEEK OF{" "}
                {new Date(movie.releaseDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                })}</p>
            <h1 className="font-extrabold mb-3.75 text-[40px]">{movie.title}</h1>
            <ul className="w-3/6 gap-0.5 whitespace-nowrap flex justify-between  text-[12px] mb-3.75 font-semibold ">
                <li className="rounded-full px-3 py-1.5 text-[#EC3013] bg-[#EC30131A] text-[12px]">{movie.ageRating.code}</li>
                <li className="bg-[#FFFFFF]/10 rounded-full px-3 py-1.5 text-[12px] flex items-center gap-0.5"><svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.3125 7.0625L7.5 4.875M4 0.5H6.625M10.125 7.0625C10.125 9.72037 7.97037 11.875 5.3125 11.875C2.65463 11.875 0.5 9.72037 0.5 7.0625C0.5 4.40463 2.65463 2.25 5.3125 2.25C7.97037 2.25 10.125 4.40463 10.125 7.0625Z" stroke="white" stroke-Linecap="round" stroke-linejoin="round" />
                </svg>
                    {movie.runtimeMinutes} min</li>
                <li className="bg-[#FFFFFF]/10 rounded-full px-3 py-1.5 text-[12px] ">{movie.formats?.[0]?.name}</li>
                <li className="bg-[#FFFFFF]/10 rounded-full px-3 py-1.5 text-[12px]">{movie.formats?.[1]?.name}</li>
            </ul>

            <p className=" mb-5 min-h-30 text-[14px]"> {details?.synopsis}</p>
            <div className="flex" >
                <button className="bg-[#EC3013] rounded-full px-5.5 py-3.25 font-extrabold mr-4 cursor-pointer text-[14px] flex items-center gap-0.5" ><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.93907 0.586073C8.1248 0.40027 8.34531 0.252879 8.58802 0.152318C8.83072 0.0517584 9.09086 0 9.35357 0C9.61628 0 9.87642 0.0517584 10.1191 0.152318C10.3618 0.252879 10.5823 0.40027 10.7681 0.586073L11.4981 1.31707C11.7981 1.61707 11.7661 2.06007 11.5541 2.33707C11.3374 2.62593 11.2323 2.98324 11.2578 3.34341C11.2834 3.70357 11.4381 4.04242 11.6934 4.29773C11.9487 4.55305 12.2876 4.7077 12.6477 4.7333C13.0079 4.7589 13.3652 4.65372 13.6541 4.43707L13.7661 4.36707C13.9109 4.28799 14.0774 4.25754 14.2409 4.28023C14.4043 4.30292 14.5562 4.37753 14.6741 4.49307L15.4141 5.23307C16.1941 6.01407 16.1941 7.28207 15.4141 8.06307L13.5961 9.88007L12.2371 8.52107C12.1428 8.42999 12.0165 8.3796 11.8854 8.38074C11.7543 8.38188 11.6289 8.43446 11.5362 8.52716C11.4435 8.61987 11.3909 8.74527 11.3897 8.87637C11.3886 9.00747 11.439 9.13377 11.5301 9.22807L12.8891 10.5871L8.06107 15.4151C7.87534 15.6009 7.65483 15.7483 7.41213 15.8488C7.16942 15.9494 6.90929 16.0011 6.64657 16.0011C6.38386 16.0011 6.12372 15.9494 5.88102 15.8488C5.63831 15.7483 5.4178 15.6009 5.23207 15.4151L4.49207 14.6751C4.19207 14.3751 4.22407 13.9331 4.43607 13.6551L4.50607 13.5581C4.69619 13.2614 4.7758 12.9073 4.73096 12.5578C4.68611 12.2083 4.51968 11.8858 4.26083 11.6468C4.00198 11.4077 3.66724 11.2674 3.3153 11.2505C2.96336 11.2335 2.61669 11.341 2.33607 11.5541C2.05807 11.7661 1.61507 11.7981 1.31407 11.4981L0.586073 10.7681C0.40027 10.5823 0.252879 10.3618 0.152318 10.1191C0.0517584 9.87642 0 9.61628 0 9.35357C0 9.09086 0.0517584 8.83072 0.152318 8.58802C0.252879 8.34531 0.40027 8.1248 0.586073 7.93907L5.41307 3.11107L6.76307 4.46107C6.85737 4.55215 6.98368 4.60255 7.11477 4.60141C7.24587 4.60027 7.37128 4.54769 7.46398 4.45498C7.55669 4.36228 7.60927 4.23687 7.61041 4.10577C7.61155 3.97468 7.56115 3.84837 7.47007 3.75407L6.12007 2.40407L7.93907 0.586073ZM9.23707 5.52207C9.14277 5.43099 9.01647 5.3806 8.88537 5.38174C8.75427 5.38287 8.62887 5.43546 8.53616 5.52816C8.44346 5.62087 8.39088 5.74627 8.38974 5.87737C8.3886 6.00847 8.43899 6.13477 8.53007 6.22907L9.76307 7.46207C9.85737 7.55315 9.98368 7.60355 10.1148 7.60241C10.2459 7.60127 10.3713 7.54869 10.464 7.45598C10.5567 7.36328 10.6093 7.23787 10.6104 7.10677C10.6115 6.97568 10.5612 6.84937 10.4701 6.75507L9.23707 5.52207Z" fill="white" />
                </svg>
                    Buy tickets</button>
                <button className="bg-[#FFFFFF]/10 rounded-full px-5.5 py-3.25 font-extrabold cursor-pointer text-[14px]"> All sessions</button>
            </div>


        </div>

        <div className="relative w-100vw gap-1 flex items-center ml-auto mr-auto">
            <div className={`${currentMovie === 0 ? "bg-[#EC3013]" : "bg-white"} w-[20vw] h-0.5 rounded-full`}></div>
            <div className={`${currentMovie === 1 ? "bg-[#EC3013]" : "bg-white"} w-[20vw] h-0.5 rounded-full`}></div>
            <div className={`${currentMovie === 2 ? "bg-[#EC3013]" : "bg-white"} w-[20vw] h-0.5 rounded-full`}></div>
            <div className={`${currentMovie === 3 ? "bg-[#EC3013]" : "bg-white"} w-[20vw] h-0.5 rounded-full`}></div>
            <div className="text-white flex text-[20px] gap-2 cursor-pointer ml-4">
                <button onClick={() => buttonBackward()} className="bg-[#FFFFFF]/10 w-13.5 h-13.5 rounded-full flex justify-center items-center cursor-pointer"><svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.62493 1.125C9.62493 1.125 1.12502 7.38516 1.125 9.62507C1.12498 11.865 9.625 18.125 9.625 18.125" stroke="white" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                </button>
                <button onClick={() => buttonForward()} className="bg-[#FFFFFF]/10 w-13.5 h-13.5 rounded-full flex justify-center items-center cursor-pointer"><svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.12519 1.125C1.12519 1.125 9.6251 7.38516 9.62512 9.62507C9.62514 11.865 1.12512 18.125 1.12512 18.125" stroke="white" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                </button>
            </div>
        </div>
    </section>)
}
export default HeroSection