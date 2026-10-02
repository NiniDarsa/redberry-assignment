import { useState } from "react";
import { useDetailedMovieInfo } from "../hooks/useDetailedMovieInfo";
import type { TMovie } from "../types/movies";
import { useNowPlayingMovieInfo } from "../hooks/useNowPlayingMovieInfo";


const NowPlayingSection = () => {
    const [nowPlayingMovies] = useNowPlayingMovieInfo()
    const [hoveredTitle, setHoveredTitle] = useState<null | string>(null)
   
    const SlicedMovies = nowPlayingMovies.slice(0, 6)

  //hover
    function MouseEnter(e: React.MouseEvent<HTMLElement>, item: TMovie) {
        setHoveredTitle(item.slug)
    }

    function MouseLeave() {
        setHoveredTitle(null)
    }

  
  //fetched Detailed information about each movie
    const [details]=useDetailedMovieInfo(hoveredTitle)



    return (<section className="bg-[#070c1c] w-full text-white overflow-hidden pl-15  pt-4">
        <div className="flex justify-between items-center mb-2">
            <h2 className="font-extrabold mb-5">NOW PLAYING</h2>
            <button className="text-[#EC3013] pr-15 cursor-pointer">see all</button>
        </div>


        <div className="relative flex gap-6">

            {SlicedMovies.map((item) => {
                return (<article
                    onMouseEnter={(e) => MouseEnter(e, item)}
                    onMouseLeave={() => MouseLeave()}
                    key={item.id} className="group shrink-0 w-65 h-[520px] flex flex-col bg-[#1E2031] p-3.25  rounded-xl hover:w-[447px]  transition-[width] duration-500 ease-in-out cursor-pointer" >
                    <img src={item.posterUrl} alt={item.title} className="rounded-xl mb-4 w-full h-85 group-hover:h-57 object-cover  transition-[height] duration-500" />
                    <div className="flex flex-col gap-2 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                        <h3 className="font-extrabold">{item.title}</h3>
                        <p className="font-[400] text-[#A9A9A9]">{item.genres[0]?.name} . {item.runtimeMinutes} min</p>
                        <p className="rounded-full px-3 py-1.5 text-[#EC3013] bg-[#EC30131A] text-[12px] w-fit ">{item.ageRating.code}</p>
                        <p className=" text-[#A9A9A9] text-sm opacity-0 max-h-0 overflow-hidden translate-y-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:max-h-20 group-hover:translate-y-0">
                            {details?.synopsis}
                        </p>
                        
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-2">
                            <p className="font-extrabold">from {item.fromPrice}ლ</p>
                            <button className="font-extrabold bg-[#EC3013] px-4 py-1.5 rounded-full cursor-pointer">buy ticket</button>
                        </div>
                </article>)
            })}
            <div className="pointer-events-none absolute top-0 right-0 h-full w-[20%] bg-linear-to-r from-transparent to-[#070c1c]" />

        </div>
    </section>
    )
}
export default NowPlayingSection