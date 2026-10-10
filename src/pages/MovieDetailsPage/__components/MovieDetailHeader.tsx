import type { TMovieDetails } from "../../../types/movies"

type TDetailHeader={
    movieDetails:TMovieDetails|undefined
}
const MovieDetailHeader=({movieDetails}:TDetailHeader)=>{
  return(<>
    <div className="relative h-140 flex justify-start bg-cover bg-center pl-10 pb-10" style={{ backgroundImage: `url(${movieDetails?.posterUrl})` }}>
                  <div className="absolute inset-0 bg-black/50"></div>
                  <div className="relative flex items-end gap-4">
                      <img className="w-[280px] rounded-2xl" src={movieDetails?.posterUrl} alt={movieDetails?.title} />
                      <div className="flex flex-col items-start justify-around gap-5 w-140">
                          <p className="rounded-full font-semibold px-3 py-1.5 text-[#EC3013] bg-[#EC30131A]">NOW PLAYING</p>
                          {/* <div className="flex">
                              {movieDetails?.genres.map((item) => <p key={item.id} className="rounded-full font-semibold px-3 py-1.5 text-[#EC3013] bg-[#EC30131A]">{item.name}</p>)}
                          </div> */}
                          <h1 className="font-extrabold text-white">{movieDetails?.title}</h1>
                          <p className="text-[12px] text-white">{movieDetails?.synopsis}</p>
                          <div className="flex justify-between gap-3">
                              <p className="rounded-full font-semibold px-3 py-1.5 text-[#EC3013] bg-[#EC30131A]">{movieDetails?.ageRating.code}</p>
                              <p className="rounded-full font-semibold px-3 py-1.5 text-white bg-[#A9A9A9] flex justify-between items-center"><svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M5.3125 7.0625L7.5 4.875M4 0.5H6.625M10.125 7.0625C10.125 9.72037 7.97037 11.875 5.3125 11.875C2.65463 11.875 0.5 9.72037 0.5 7.0625C0.5 4.40463 2.65463 2.25 5.3125 2.25C7.97037 2.25 10.125 4.40463 10.125 7.0625Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                                  {movieDetails?.runtimeMinutes} min</p>
                              {movieDetails?.formats.map((item) => <p key={item.id} className="rounded-full font-semibold px-3 py-1.5 text-white bg-[#A9A9A9]">{item.slug}</p>)}
                          </div>
                      </div>
                  </div>
  
              </div>
  </>)
}
export default MovieDetailHeader