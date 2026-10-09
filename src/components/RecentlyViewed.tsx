import { useNavigate } from "react-router-dom"
import { getRecentlyViewedMovies } from "../functions/function"

const RecentlyViewed = () => {
    const RecentlyViewed = getRecentlyViewedMovies()
    const navigate = useNavigate()
    return (
        <>{RecentlyViewed.length > 0 &&
            <div className="h-80 bg-[#070C1C] p-15 text-[white] border-b border-[#1E2031]">
                <h1 className="font-extrabold mb-5">Recently viewed</h1>
                <div className="flex gap-5">
                    {RecentlyViewed.map((item) => {
                        return (<div
                            onClick={() => navigate(`/movie/${item.slug}`)}
                            className="bg-[#1E2031] rounded-2xl p-3 flex gap-5 w-100 items-center cursor-pointer">
                            <img className="h-30 rounded-2xl" src={item.posterUrl} alt={item.title} />
                            <div className="flex flex-col justify-center gap-2">
                                <h2>{item.title}</h2>
                                <div className="flex gap-2 text-[#A9A9A9]">{item.genres.map((item) => <span>{item.name}</span>)} </div>
                                <span className="text-[#A9A9A9]">{item.minutes} m</span>
                                {item.age>0&&<p className="text-[#EC3013] w-9 h-9 flex justify-center items-center  rounded-3xl bg-[#EC30131A]"> {item.age}+</p>}
                            </div>

                        </div>)
                    })}
                </div>

            </div>}</>)
}
export default RecentlyViewed