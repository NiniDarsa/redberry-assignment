
import { useEffect, useState } from "react"
import useAuthContext from "../../../hooks/useAuthContext"
import { useComingSoonMoviesInfo } from "../../../hooks/useComingSoonMoviesInfo"
import { NotifyMovie } from "../../../functions/function"
import Heading from "./Heading"

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
                                <p className="text-[#EC3013] font-semibold">
                                    IN CINEMAS{" "}
                                    {new Date(item.releaseDate).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "long",
                                    })}
                                </p>                                <h3 className=" font-extrabold">{item.title}</h3>
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
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.99954 12.2505C5.99954 12.7809 6.21025 13.2896 6.58533 13.6647C6.9604 14.0398 7.46911 14.2505 7.99954 14.2505C8.52997 14.2505 9.03868 14.0398 9.41375 13.6647C9.78883 13.2896 9.99954 12.7809 9.99954 12.2505M11.4995 1.75049C12.4651 2.36656 13.2482 3.22974 13.7677 4.25049M2.23141 4.25049C2.7509 3.22974 3.53401 2.36656 4.49954 1.75049M3.49954 7.25049C3.49954 6.05701 3.97365 4.91242 4.81756 4.06851C5.66147 3.22459 6.80607 2.75049 7.99954 2.75049C9.19301 2.75049 10.3376 3.22459 11.1815 4.06851C12.0254 4.91242 12.4995 6.05701 12.4995 7.25049C12.4995 9.48924 13.0183 10.788 13.4308 11.5005C13.4746 11.5764 13.4977 11.6624 13.4978 11.75C13.4979 11.8377 13.4749 11.9238 13.4312 11.9997C13.3876 12.0757 13.3247 12.1388 13.2489 12.1828C13.1732 12.2269 13.0872 12.2502 12.9995 12.2505H2.99954C2.91203 12.25 2.82619 12.2265 2.75059 12.1824C2.675 12.1383 2.61231 12.0751 2.56878 11.9992C2.52525 11.9233 2.50242 11.8373 2.50255 11.7497C2.50268 11.6622 2.52578 11.5763 2.56954 11.5005C2.98141 10.788 3.49954 9.48861 3.49954 7.25049Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>

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
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EC3013]/10 ">
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