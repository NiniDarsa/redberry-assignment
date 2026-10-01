import { useEffect, useState } from "react";

type TMovie = {
    ageRating: {
        code: string;
        minAge: number;
        description: string;
    };
    backdropUrl: string;
    formats: {
        id: number;
        slug: string;
        name: string;
        priceUplift: number;
    }[];
    fromPrice: number;
    genres: {
        id: number;
        slug: string;
        name: string;
    }[];
    id: number;
    isComingSoon: boolean;
    isFeatured: boolean;
    isNotified: boolean;
    kind: string;
    posterUrl: string;
    releaseDate: string;
    runtimeMinutes: number;
    slug: string;
    title: string;
};





const NowPlayingSection = () => {
    const [nowPlayingMovies, setNowPlayingMovies] = useState<TMovie[] | []>([])
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const SlicedMovies = nowPlayingMovies.slice(0, 6)



    useEffect(() => {
        fetch("https://api.kinoxii.redberryinternship.ge/api/movies/now-playing")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                return response.json();
            })
            .then((data) => {
                console.log(data);
                setNowPlayingMovies(data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);




    return (<section className="bg-[#070c1c] w-full text-white overflow-hidden pl-15  pt-4">
        <div className="flex justify-between items-center">
            <h2 className="font-extrabold mb-5">NOW PLAYING</h2>
            <button className="text-[#EC3013] pr-15">see all</button>
        </div>


        <div className="relative flex gap-6">

            {SlicedMovies.map((item) => {
                return (<article key={item.id} className="group shrink-0 w-65 flex flex-col bg-[#1E2031] p-3.25  rounded-xl hover:w-[447px]  transition-all duration-300" >
                    <img src={item.posterUrl} alt={item.title} className="rounded-xl mb-4 w-full h-85 group-hover:h-45 object-cover  transition-all duration-300" />
                    <div className="flex flex-col gap-2">
                        <h3 className="font-extrabold">{item.title}</h3>
                        <p className="font-[400] text-[#A9A9A9]">{item.genres[0]?.name} . {item.runtimeMinutes} min</p>
                        <p className="rounded-full px-3 py-1.5 text-[#EC3013] bg-[#EC30131A] text-[12px] w-fit ">{item.ageRating.code}</p>
                        <p className="hidden group-hover:block text-[#A9A9A9] text-sm">
                            dajhkdhkldjgfshjkl
                        </p>
                        <div className="flex items-center justify-between gap-2">
                            <p className="font-extrabold">from {item.fromPrice}ლ</p>
                            <button className="font-extrabold bg-[#EC3013] px-4 py-1.5 rounded-full cursor-pointer">buy ticket</button>
                        </div>
                    </div>
                </article>)
            })}
            <div className="pointer-events-none absolute top-0 right-0 h-full w-[20%] bg-linear-to-r from-transparent to-[#070c1c]" />


        </div>
    </section>
    )
}
export default NowPlayingSection