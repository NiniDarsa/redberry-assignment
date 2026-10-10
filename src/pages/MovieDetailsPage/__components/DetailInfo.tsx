import type { TMovieDetails } from "../../../types/movies"


type TDetailInfo={
    movieDetails:TMovieDetails|undefined
}
const DetailInfo=({movieDetails}:TDetailInfo)=>{
    // const {user}=useAuthContext()
    return(<>
       <div className="flex-1 flex flex-col gap-4 pt-10">
                    <h2 className="font-extrabold">Details</h2>

                    <div>
                        <h3 className="text-[#A9A9A9]">DIRECTOR</h3>
                        <p>{movieDetails?.director}</p>
                    </div>

                    <div>
                        <h3 className="text-[#A9A9A9]">MAIN CAST</h3>
                        <p> {movieDetails?.cast}</p>
                    </div>

                    <div>
                        <h3 className="text-[#A9A9A9]">DURATION</h3>
                        <p>{movieDetails?.runtimeMinutes} minutes</p>
                    </div>

                    <div>
                        <h3 className="text-[#A9A9A9]">RELEASE DATE</h3>
                        <p>{movieDetails?.releaseDate}</p>
                    </div>

                    <div>
                        <h3 className="text-[#A9A9A9]">FORMATS</h3>
                        {movieDetails?.formats.map((item) =>
                            <span key={item.id}>item.name</span>)}
                    </div>

                    <div>
                        <h3 className="text-[#A9A9A9]">FROM</h3>
                        <p> ₾ {movieDetails?.fromPrice} </p>
                    </div>
                    <div className="bg-[#E27E041A] p-4 rounded-2xl w-[90%]">
                        <h3 className="text-[#E27E04]">RATING NOTE</h3>
                        <p className="text-[#E27E04]">{movieDetails?.ageRating.description}</p>


                    </div>


                </div>
    </>)
}
export default DetailInfo