import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNowPlayingMovieInfo } from "../../../hooks/useNowPlayingMovieInfo";
import type { TMovie } from "../../../types/movies";
import { useDetailedMovieInfo } from "../../../hooks/useDetailedMovieInfo";
import Heading from "./Heading";


const NowPlayingSection = () => {
    const [nowPlayingMovies] = useNowPlayingMovieInfo()
    const [hoveredTitle, setHoveredTitle] = useState<null | string>(null)

    // const SlicedMovies = nowPlayingMovies.slice(0, 6)

    //hover
    function MouseEnter(_: React.MouseEvent<HTMLElement>, item: TMovie) {
        setHoveredTitle(item.slug)
    }

    function MouseLeave() {
        setHoveredTitle(null)
    }


    //fetched Detailed information about each movie
    const details = useDetailedMovieInfo(hoveredTitle)

    const navigate = useNavigate()

    return (<section className="bg-[#070c1c] w-full text-white  pl-15  pt-7 pb-10">
        <Heading title={"NOW PLAYING"} />

        <div className="relative">
            <div className="flex gap-6 overflow-x-auto">

                {nowPlayingMovies.map((item) => {
                    return (<article
                        onMouseEnter={(e) => MouseEnter(e, item)}
                        onMouseLeave={() => MouseLeave()}
                        key={item.id} className="group shrink-0 w-65 h-120 flex flex-col bg-[#1E2031] p-3.25   rounded-xl hover:w-[447px]  transition-[width] duration-500 ease-in-out cursor-pointer overflow-hidden" >
                        <img src={item.posterUrl} alt={item.title} className="rounded-xl mb-4 w-full h-75 group-hover:h-57 object-cover  transition-[height] duration-500" />
                        <div className="flex flex-col gap-1 min-h-[85px] transition-transform duration-500 ease-out group-hover:-translate-y-1 ">
                            <h3 className="font-extrabold">{item.title}</h3>
                            <p className="font-[400] text-[#A9A9A9]">{item.genres[0]?.name} . {item.runtimeMinutes} min</p>
                            <p className="rounded-full px-3 py-1.5 text-[#EC3013] bg-[#EC30131A] text-[12px] w-fit">{item.ageRating.code}</p>
                            <p className=" text-[#A9A9A9] text-sm opacity-0 max-h-0 overflow-hidden translate-y-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:max-h-20 group-hover:translate-y-0">
                                {details?.synopsis}
                            </p>

                        </div>
                        <div className="mt-auto flex items-center justify-between gap-2  ">
                            <p className="font-extrabold">from ₾ {item.fromPrice}</p>
                            <button
                            onClick={() => {navigate(`/movie/${item.slug}`)}}
                           className="font-extrabold bg-[#EC3013] px-4 py-1.5 rounded-full cursor-pointer">buy ticket</button>
                        </div>
                    </article>)
                })}
            </div>


            <div className="pointer-events-none absolute top-0 right-0 h-full w-[20%] bg-linear-to-r from-transparent to-[#070c1c]" />

        </div>
    </section>
    )
}
export default NowPlayingSection