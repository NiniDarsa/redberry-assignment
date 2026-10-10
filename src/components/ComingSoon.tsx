import Heading from "./Heading"
import { useComingSoonMoviesInfo } from "../hooks/useComingSoonMoviesInfo"
import { useEffect, useState } from "react"
import { NotifyMovie } from "../functions/function"
import useAuthContext from "../hooks/useAuthContext"

const ComingSoon = () => {
    const [comingSoonMovies] = useComingSoonMoviesInfo()

    console.warn(comingSoonMovies)

    const { user } = useAuthContext()

    const [error, setError] = useState("")
    const [notifiedMovies, setNotifiedMovies] = useState<string[]>([])
    const [success, setSuccess] = useState("")

    useEffect(() => {
        if (!error) return

        const timer = setTimeout(() => {
            setError("")
        }, 3000)

        return () => clearTimeout(timer)
    }, [error])

    const handleNotify = async (movieId: string) => {
        setError("")

        if (!user) {
            setError("Please sign in to receive movie notifications.")
            return
        }

        try {
            await NotifyMovie(movieId)

            setSuccess("You'll be notified when this movie is available!")

            setNotifiedMovies((prev) =>
                prev.includes(movieId) ? prev : [...prev, movieId]
            )
        } catch {
            setError("Could not subscribe. Please try again.")
        }
    }



    return (<section className="bg-[#070c1c] w-full text-white pl-15  pt-10 pb-10 border-t border-[#1E2031]">
        <Heading title={"COMING SOON..."} />

        <div className="relative">
            <div className="flex gap-4 overflow-x-auto">
                {
                    comingSoonMovies.map((item) => {
                        return (<article
                            key={item.id}
                            className="w-118 h-40 bg-[#1E2031] rounded-xl p-2.5 flex gap-2 shrink-0">
                            <img src={item.posterUrl} alt={item.title} className="w-[136px] h-[135px] object-cover rounded-xl" />
                            <div className="text-[12px] flex flex-col justify-between items-start">
                                <p className="text-[#EC3013] font-semibold">IN CINEMAS {item.releaseDate}</p>
                                <h3 className=" font-extrabold">{item.title}</h3>
                                <p className=" text-[#A9A9A9]"> {item.genres[0]?.name}. {item.runtimeMinutes} min</p>
                                <p className="text-[#EC3013]  bg-[#EC30131A] rounded-full px-3 py-1.5 w-fit"> {item.ageRating.code}</p>
                                <button
                                    onClick={() => handleNotify(item.slug)}
                                    className={`cursor-pointer font-semibold rounded-2xl border px-3 py-1 flex gap-1 items-center transition-colors duration-200 ${notifiedMovies.includes(item.slug)
                                            ? "border-green-500 bg-green-500/15 text-green-400"
                                            : "border-[#A9A9A9] text-white hover:bg-white/10"
                                        }`}
                                >
                                    {notifiedMovies.includes(item.slug) ? (
                                        <>
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="m5 12 4 4L19 6" />
                                            </svg>
                                            Notified
                                        </>
                                    ) : (
                                        <>
                                            {/* Keep your existing bell SVG here */}
                                            Notify Me
                                        </>
                                    )}
                                </button>
                            </div>
                        </article>)
                    })
                }

            </div>

            <div className="pointer-events-none absolute top-0 right-0 h-full w-[20%] bg-linear-to-r from-transparent to-[#070c1c]" />
        </div>
        {error && (
            <div
                role="alert"
                className="fixed top-6 right-6 z-50 flex items-start gap-3 w-[350px] rounded-xl border border-[#454052] bg-[#1E2031] p-4 shadow-2xl"
            >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EC3013]/10">
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#EC3013"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                </div>

                <div className="flex-1">
                    <p className="text-sm font-semibold text-white">
                        Something went wrong
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#A9A9A9]">
                        {error}
                    </p>
                </div>

                <button
                    onClick={() => setError("")}
                    aria-label="Dismiss notification"
                    className="text-[#A9A9A9] hover:text-white cursor-pointer"
                >
                    ✕
                </button>
            </div>
        )}
    </section>)
}
export default ComingSoon