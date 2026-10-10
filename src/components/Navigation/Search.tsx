import { useLocation, useNavigate } from "react-router-dom"
import useSessionsContext from "../../hooks/useSessionsContext"
import { useEffect, useState } from "react"
import { SearchMovies } from "../../functions/function"
import type { TSearchMovie } from "../../types/searchMovies"
import useOnClickOutside from "../../hooks/useClickOutside"

const Search = () => {
    const { search, setSearch } = useSessionsContext()
    const location = useLocation()

    const [movieSearch, setMovieSearch] = useState("")
    const isSessionsPage = location.pathname === "/sessions"
    const [searchResult, setSearchResult] = useState<TSearchMovie[]>()

    const {isOpen:isSearchOpen,setIsOpen:setIsSearchOpen,ref:searchRef}=useOnClickOutside()

    const navigate = useNavigate()

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
        <div  ref={searchRef} className="relative">
            <div className="relative w-[24vw] flex-3 h-full">

                {movieSearch !== "" ? (
                    <svg
                        onClick={() => setMovieSearch("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"

                        width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="12" fill="white" fill-opacity="0.1" />
                        <rect x="7.93408" y="15.0054" width="10" height="1.5" transform="rotate(-45 7.93408 15.0054)" fill="white" />
                        <rect x="8.99463" y="7.93408" width="10" height="1.5" transform="rotate(45 8.99463 7.93408)" fill="white" />
                    </svg>


                ) : (
                    <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2"

                        width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.21867 9.21867L12.25 12.25M10.5 6.125C10.5 8.54125 8.54125 10.5 6.125 10.5C3.70875 10.5 1.75 8.54125 1.75 6.125C1.75 3.70875 3.70875 1.75 6.125 1.75C8.54125 1.75 10.5 3.70875 10.5 6.125Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>


                )}

                <input
                    
                    value={isSessionsPage ? search : movieSearch}
                    onFocus={()=>setIsSearchOpen(true)}
                    onChange={
                        isSessionsPage
                            ? (e) => setSearch(e.target.value)
                            : (e) => setMovieSearch(e.target.value)
                    }
                    type="text"
                    placeholder="search films and live events"
                    className="bg-[#FFFFFF]/10 rounded-full w-full px-10 py-2"
                />

            </div>
         
         {isSearchOpen&&!isSessionsPage&&(
           <div  className="absolute top-full left-0 mt-2 w-117 h-58 p-4 overflow-auto text-white rounded-2xl bg-[#070C1C] border border-[#2A2C3D] ">

               {!movieSearch?(
                <div className="flex flex-col gap-4 items-center justify-center">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="48" height="48" rx="24" fill="white" fill-opacity="0.1" />
                            <path d="M30.7599 17.2398C30.5058 16.5812 30.0584 16.0149 29.4767 15.6151C28.8949 15.2153 28.2058 15.0008 27.4999 14.9998C27.1899 14.9998 26.8699 15.0398 26.5699 15.1298C26.2432 14.7735 25.8461 14.4891 25.4037 14.2946C24.9612 14.1 24.4832 13.9995 23.9999 13.9995C23.5166 13.9995 23.0385 14.1 22.5961 14.2946C22.1537 14.4891 21.7565 14.7735 21.4299 15.1298C21.1199 15.0398 20.8099 14.9998 20.4999 14.9998C19.0299 14.9998 17.7499 15.9098 17.2399 17.2398C16.6973 17.4493 16.2155 17.7908 15.8382 18.2333C15.4608 18.6759 15.1998 19.2056 15.0786 19.7745C14.9575 20.3433 14.9802 20.9334 15.1445 21.4914C15.3089 22.0493 15.6097 22.5574 16.0199 22.9698C16.0199 23.0498 15.9999 23.1198 16.0199 23.1898L18.0199 33.1898C18.1099 33.6598 18.5199 33.9898 18.9999 33.9898H28.9999C29.4799 33.9898 29.8899 33.6498 29.9799 33.1898L31.9799 23.1898C31.9999 23.1098 31.9799 23.0398 31.9799 22.9698C32.6099 22.3398 32.9999 21.4598 32.9999 20.4998C32.9999 19.0298 32.0899 17.7498 30.7599 17.2398ZM18.2299 19.0298C18.429 18.9941 18.6124 18.8983 18.7554 18.7553C18.8985 18.6123 18.9942 18.4289 19.0299 18.2298C19.2099 17.2598 20.3599 16.6798 21.2699 17.2298C21.5099 17.3698 21.7899 17.4098 22.0599 17.3398C22.3299 17.2598 22.5499 17.0798 22.6799 16.8398C22.8031 16.5925 22.9929 16.3844 23.2278 16.239C23.4628 16.0936 23.7336 16.0166 24.0099 16.0166C24.2862 16.0166 24.557 16.0936 24.792 16.239C25.0269 16.3844 25.2167 16.5925 25.3399 16.8398C25.4699 17.0898 25.6899 17.2698 25.9599 17.3398C26.2299 17.4198 26.5099 17.3798 26.7499 17.2298C27.6599 16.6898 28.8099 17.2598 28.9899 18.2298C29.0599 18.6398 29.3799 18.9598 29.7899 19.0298C30.1559 19.0988 30.4831 19.3018 30.7075 19.599C30.932 19.8963 31.0377 20.2665 31.004 20.6374C30.9702 21.0083 30.7995 21.3534 30.5251 21.6053C30.2507 21.8572 29.8924 21.9978 29.5199 21.9998H18.4999C18.1274 21.9978 17.769 21.8572 17.4946 21.6053C17.2202 21.3534 17.0495 21.0083 17.0158 20.6374C16.9821 20.2665 17.0878 19.8963 17.3122 19.599C17.5367 19.3018 17.8639 19.0988 18.2299 19.0298ZM25.3999 23.9998L24.5999 31.9998H23.4099L22.6099 23.9998H25.3999ZM18.2199 23.9998H20.5999L21.3999 31.9998H19.8199L18.2199 23.9998ZM28.1799 31.9998H26.5999L27.3999 23.9998H29.7799L28.1799 31.9998Z" fill="white" />
                        </svg>

                        <p>What do you wanna watch?</p>
                        <p className="text-[#A9A9A9] text-center">Search by director, title or cast.</p>
                        <button
                            onClick={() => navigate("/sessions")}
                            className="bg-[#2A2C3D] rounded-3xl p-2 px-6 cursor-pointer">Browse all sessions</button>
                    </div>

               ):!!searchResult?.length?(
                <>
                        <div className="flex mb-3 justify-between">
                            <span className="text-[#A9A9A9]">Films and Events</span>
                            <span>{searchResult.length} results</span>
                        </div>
                        <div className="flex flex-col gap-4 justify-center">
                            {searchResult.map((item) => {
                                return (<div
                                   key={item.id}
                                    onClick={() => { navigate(`/movie/${item.slug}`), setMovieSearch("") }}
                                    className="flex justify-between items-center gap-4 p-2 cursor-pointer hover:bg-[#2A2C3D]" >
                                    <div className="flex gap-2 items-center ">
                                        <img className="w-10 rounded-md" src={item.posterUrl} alt={item.title} />
                                        <div>
                                            <h2>{item.title}</h2>
                                            <p className="text-[12px] text-[#A9A9A9]">{item.kind} . {item.ageRating.code} . {item.runtimeMinutes} m</p>
                                        </div>
                                    </div>

                                    <div className="shrink-0 whitespace-nowrap">
                                        from ₾ {item.fromPrice}
                                    </div>
                                </div>)
                            })}
                        </div>
                    </>
               ):<>
               <div className="flex flex-col gap-4 items-center">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="48" height="48" rx="24" fill="white" fill-opacity="0.1" />
                            <path d="M27.1695 27.1695L31.5 31.5M29 22.75C29 26.2018 26.2018 29 22.75 29C19.2982 29 16.5 26.2018 16.5 22.75C16.5 19.2982 19.2982 16.5 22.75 16.5C26.2018 16.5 29 19.2982 29 22.75Z" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        <p>No results for "{movieSearch}"</p>
                        <p className="text-[#A9A9A9] text-center">Check the spelling or try another film or live event.</p>
                        <button
                            onClick={() => navigate("/sessions")}
                            className="bg-[#2A2C3D] rounded-3xl p-2 px-6 cursor-pointer">Browse all sessions</button>
                    </div>
               </>

               }


            </div>

         )}
           
        </div>
    )

}

export default Search