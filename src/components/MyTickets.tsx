import { useEffect, useState } from "react"
import type { TOrder } from "../types/orders"
import { GetOrders } from "../functions/function"
import useAppContext from "../hooks/useAppContext"

const MyTickets = () => {
    const [filter, setFilter] = useState<"upcoming" | "past">("upcoming")
    const [orders, setOrders] = useState<TOrder[]>([])
    const{setIsAuthModalOpen}=useAppContext()
    // const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getOrders = async () => {
            try {
                // setIsLoading(true)

                const result = await GetOrders(filter)

                setOrders(result.data)
            } catch (err: any) {
                console.log(err)
                if(err.status===401){
                    setIsAuthModalOpen("Log In")
                }
            } finally {
                // setIsLoading(false)
            }
        }

        getOrders()
    }, [filter])

    return (<div className="text-white">
        <div className="flex gap-2 bg-[#1E2031] w-fit p-2 px-4 rounded-2xl mb-5">
            <button
                className={filter === "upcoming" ? "bg-[#505261] p-2 rounded-xl" : "p-2"}
                onClick={() => setFilter("upcoming")}>Upcomming<span>{filter === "upcoming" ? orders.length : ""}</span></button>
            <button
                className={filter === "past" ? "bg-[#505261] p-2 rounded-xl" : "p-2"}
                onClick={() => setFilter("past")}>Past<span>{filter === "past" ? orders.length : ""}</span></button>
        </div>


        {orders.map((item) => {
            return (<div className="bg-[#1E2031] rounded-2xl p-2 flex items-center">
                <div className="flex gap-2 flex-3 p-3 items-center">
                    <img
                        src={item.session.movie.posterUrl}
                        alt={item.session.movie.title}
                        className="w-20 h-40 object-cover rounded-xl"
                    />
                    <div className="flex flex-col gap-5 justify-center flex-1">
                        <div className="flex gap-5 items-center">
                            <h1>{item.session.movie.title}</h1>
                            <p className="text-[#EC3013] bg-[#EC30131A] p-1 rounded-2xl">{item.session.movie.ageRating.code}</p>
                            <p className="text-[#A9A9A9]">{item.session.movie.runtimeMinutes} min</p>
                        </div>
                        <div className="flex gap-7">
                            <div>
                                <h4>DATE</h4>
                                <div className="flex"><span>{item.session.date}.</span><span>{item.session.time}</span></div>
                            </div>

                            <div>
                                <h4>VENUE</h4>
                                <div className="flex"><span>{item.session.venue.name}.</span><span>Hall {item.session.hall.name}</span></div>
                            </div>

                            <div>
                                <h4>FORMAT</h4>
                                <div className="flex"><span>{item.session.format.name}.</span><span>{item.session.language.name}</span></div>
                            </div>

                        </div>

                        <div className="flex items-center gap-2 ">
                            <p>SEATS</p>
                            {item.tickets.map((item) => {
                                return (<div key={item.id} className="p-2 rounded-2xl bg-[#2A2C3D]">{item.seatCode}.{item.ticketType.name}</div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 border-l border-dotted border-[#A9A9A9] p-4">
                    <div className="flex flex-col items-start">
                        <p className="text-[#A9A9A9]">ORDER</p>
                        <p>#{item.reference}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <p className="text-[12px]">Total paid</p>
                            <p className="font-extrabold">{item.totalPrice} l</p>
                        </div>

                        <button
                            disabled={!item.isRefundable}
                            className={`p-2 rounded-2xl ${item.isRefundable
                                ? "bg-[#EC3013] cursor-pointer"
                                : "bg-[#505261] cursor-not-allowed opacity-50"
                                }`}>Refund</button>
                        {item.isUpcoming && !item.isRefundable && (
                            <p className="text-center text-[#A9A9A9]">
                                Refund is no longer available
                            </p>
                        )}

                        <p className="text-center">{item.refundedAt}</p>
                    </div>
                </div>
            </div>)
        })}

    </div>)
}
export default MyTickets