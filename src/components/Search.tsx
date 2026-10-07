import { useLocation, useNavigate } from "react-router-dom"
import useSessionsContext from "../hooks/useSessionsContext"
import { useEffect, useState } from "react"
import { SearchMovies } from "../functions/function"
import type { TSearchMovie } from "../types/searchMovies"

const Search = () => {
    const { search, setSearch } = useSessionsContext()
    const location = useLocation()

    const [movieSearch, setMovieSearch] = useState("")
    const isSessionsPage = location.pathname === "/sessions"
    const [searchResult, setSearchResult] = useState<TSearchMovie[]>()

    const navigate=useNavigate()

    useEffect(() => {
        if (isSessionsPage) return

        const id = setTimeout(async () => {
            const results = await SearchMovies(movieSearch)
            setSearchResult(results)
        }, 300)

        return () => clearTimeout(id)
    }, [movieSearch, isSessionsPage])

    console.log(searchResult)


    return (
        <div className="relative">
        <div className="relative w-[24vw] flex-3 h-full">

            <input
                value={isSessionsPage ? search : movieSearch}
                onChange={
                    isSessionsPage
                        ? (e) => setSearch(e.target.value)
                        : (e) => setMovieSearch(e.target.value)
                }
                type="text"
                placeholder="search films and live events"
                className="bg-[#FFFFFF]/10 rounded-full w-full px-10 py-2"
            />

            <svg
                className="absolute left-4 top-1/2 -translate-y-1/2"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M9.21867 9.21867L12.25 12.25M10.5 6.125C10.5 8.54125 8.54125 10.5 6.125 10.5C3.70875 10.5 1.75 8.54125 1.75 6.125C1.75 3.70875 3.70875 1.75 6.125 1.75C6.125 1.75 10.5 8.54125 10.5 6.125Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

        </div>

        {!!searchResult?.length&&<div className="absolute top-full left-0 mt-2 w-85 h-60 p-3 overflow-auto text-white rounded-2xl bg-[#070C1C]  ">
             <div className="flex mb-3 justify-between">
                <span className="text-[#A9A9A9]">Films and Events</span>
                <span>{searchResult.length} results</span>
             </div>
             <div className="flex flex-col gap-4 justify-center">
                {searchResult.map((item)=>{
                    return(<div 
                    onClick={()=>{navigate(`/movie/${item.slug}`), setMovieSearch("")}}
                    className="flex justify-between items-center gap-4 cursor-pointer hover:bg-[#2A2C3D]" >
                       <div className="flex gap-2 items-center ">
                          <img className="w-10 rounded-2xl" src={item.posterUrl} alt={item.title}/>
                          <div>
                             <h2>{item.title}</h2>
                             <p className="text-[12px] text-[#A9A9A9]">{item.kind} . {item.ageRating.code} . {item.runtimeMinutes} m</p>
                          </div>
                       </div>

                       <div className="shrink-0 whitespace-nowrap">
                        from {item.fromPrice}ლ
                       </div>
                    </div>)
                })}
             </div>
            </div>}
        </div>
    )

}

export default Search