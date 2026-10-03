import { createParams } from "../functions/function"
import { useSessionsInfo } from "../hooks/useSessionsInfo"

type SessionsPanelProps = {
    venue: string[]
    datePeriod: string
    format: string[]
    language: string[]
    timeOfDay: string[]

    sort: string
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
}

const SessionsPanel = ({ venue, datePeriod, format, language, timeOfDay, sort, page, setPage }: SessionsPanelProps) => {

    const params=createParams(venue,datePeriod,format,language,timeOfDay,sort,page)

    const url = `https://api.kinoxii.redberryinternship.ge/api/sessions?${params.toString()}`



    const [sessions] = useSessionsInfo(url)
    console.error(sessions)




    return (<section className="text-white pt-15 w-full min-w-0">
        <header className="flex justify-between">
            <p>showing <span>12</span> sessions</p>
            <button>sort</button>
        </header>


        {sessions.map((item) => {
            return (<article key={item.movie.id} className="border-b border-[#2A2C3D] pb-7">
                <div className="flex pt-4 pb-4 gap-4 items-center ">
                    <img src={item.movie.posterUrl} alt={item.movie.slug} className="w-[60px] object-cover rounded-sm" />
                    <div className="flex flex-col gap-2">
                        <h3 className="font-extrabold">{item.movie.title} <span className="rounded-full font-semibold px-3 py-1.5 text-[#EC3013] bg-[#EC30131A] text-[12px]">{item.movie.ageRating.code}</span></h3>
                        <p className="text-[#A9A9A9]">{item.movie.runtimeMinutes} min</p>
                    </div>
                </div>

                <div className="flex gap-4 overflow-x-auto min-w-0">
                    {item.sessions.map((item) => {
                        return (<div className={`cursor-pointer shrink-0 ${item.isSoldOut
                            ? "cursor-default"
                            : "cursor-pointer"
                            }`}>
                            <div className={`flex gap-4 w-[252px]  items-center justify-around px-1 py-4 rounded-xl ${item.isSoldOut
                                ? "bg-[#151722]"
                                : "bg-[#1E2031]"}`}>
                                <div className="flex flex-col gap-1">
                                    <p className="font-extrabold mb-2">{item.time}</p>
                                    <p className="text-[#A9A9A9]">{item.language.name}</p>
                                    <p>{item.venue.name}</p>
                                </div>

                                <div className="flex flex-col items-end gap-1">
                                    <span className="bg-[#2A2C3D] rounded-xl px-2 font-semibold text-[12px] mb-2">{item.format.slug}</span>
                                    <p className={` flex  items-center gap-2 ${item.seatsLeft < 10
                                        ? "text-[#EC3013]"
                                        : "text-[#4ADE80]"}`}><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.95465 0.439523C6.09395 0.300181 6.25935 0.189645 6.44139 0.114231C6.62343 0.038816 6.81854 0 7.01559 0C7.21263 0 7.40775 0.038816 7.58979 0.114231C7.77182 0.189645 7.93722 0.300181 8.07652 0.439523L8.62405 0.987734C8.84907 1.21272 8.82507 1.54494 8.66606 1.75268C8.50356 1.96931 8.42468 2.23727 8.44388 2.50738C8.46307 2.77748 8.57907 3.0316 8.77057 3.22307C8.96207 3.41454 9.21622 3.53052 9.48635 3.54972C9.75649 3.56892 10.0245 3.49004 10.2411 3.32757L10.3252 3.27507C10.4338 3.21576 10.5587 3.19293 10.6813 3.20994C10.8039 3.22696 10.9178 3.28291 11.0062 3.36956L11.5612 3.92452C12.1463 4.51023 12.1463 5.46116 11.5612 6.04687L10.1976 7.40952L9.17834 6.39035C9.10761 6.32204 9.01288 6.28425 8.91455 6.2851C8.81622 6.28596 8.72216 6.32539 8.65262 6.39491C8.58309 6.46444 8.54365 6.55849 8.5428 6.6568C8.54194 6.75512 8.57974 6.84984 8.64806 6.92056L9.66737 7.93974L6.04615 11.5605C5.90685 11.6998 5.74146 11.8104 5.55942 11.8858C5.37738 11.9612 5.18226 12 4.98522 12C4.78817 12 4.59306 11.9612 4.41102 11.8858C4.22898 11.8104 4.06359 11.6998 3.92428 11.5605L3.36925 11.0055C3.14424 10.7805 3.16824 10.4491 3.32725 10.2406L3.37975 10.1678C3.52234 9.94535 3.58206 9.67979 3.54842 9.41769C3.51479 9.1556 3.38995 8.91372 3.19581 8.73444C3.00166 8.55517 2.75059 8.44995 2.48662 8.43724C2.22265 8.42453 1.96263 8.50514 1.75216 8.66493C1.54364 8.82392 1.21138 8.84792 0.985612 8.62294L0.43958 8.07548C0.30022 7.93619 0.18967 7.77082 0.114245 7.5888C0.038821 7.40679 0 7.2117 0 7.01468C0 6.81766 0.038821 6.62257 0.114245 6.44055C0.18967 6.25854 0.30022 6.09316 0.43958 5.95388L4.06004 2.33314L5.0726 3.34557C5.14333 3.41387 5.23806 3.45166 5.33639 3.45081C5.43472 3.44996 5.52878 3.41052 5.59831 3.341C5.66784 3.27147 5.70728 3.17743 5.70814 3.07911C5.70899 2.98079 5.67119 2.88607 5.60288 2.81535L4.59032 1.80293L5.95465 0.439523ZM6.92821 4.14126C6.85748 4.07295 6.76275 4.03516 6.66442 4.03601C6.56609 4.03687 6.47203 4.0763 6.40249 4.14583C6.33296 4.21535 6.29352 4.3094 6.29267 4.40771C6.29181 4.50603 6.32961 4.60075 6.39793 4.67147L7.32273 5.59615C7.39346 5.66446 7.48819 5.70225 7.58652 5.7014C7.68485 5.70054 7.77891 5.66111 7.84844 5.59159C7.91797 5.52206 7.95741 5.42802 7.95827 5.3297C7.95912 5.23138 7.92132 5.13666 7.85301 5.06594L6.92821 4.14126Z" fill="#4ADE80" />
                                        </svg>
                                        {item.seatsLeft} left
                                    </p>
                                    <p className="font-extrabold">{item.price} ლ</p>
                                </div>
                            </div>


                        </div>)
                    })}
                </div>


            </article>)
        })}



    </section>)
}
export default SessionsPanel