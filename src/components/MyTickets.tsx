import { useEffect, useState } from "react"
import type { TOrder } from "../types/orders"
import useAppContext from "../hooks/useAppContext"
import { GetOrders, RefundOrder } from "../functions/function"
import { useLocation, useOutletContext } from "react-router-dom"


export type TProfileContext = {
    Myorders: TOrder[]
    setMyOrders: React.Dispatch<React.SetStateAction<TOrder[]>>
}

const MyTickets = () => {
    const { Myorders, setMyOrders } = useOutletContext<TProfileContext>()
    const [filter, setFilter] = useState<"upcoming" | "past">("upcoming")
    const { setIsAuthModalOpen } = useAppContext()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [refundError, setRefundError] = useState("")
    const [refundingOrderId, setRefundingOrderId] = useState<number | null>(null)

    useEffect(() => {
        const getOrders = async () => {
            try {
                setIsLoading(true)
                setError("")

                const result = await GetOrders(filter)

                if (result.status === 401) {
                    setIsAuthModalOpen("Log In")
                    return
                }

                setMyOrders(result.data)
            } catch (err) {
                console.log(err)
                setError("Something went wrong. Please try again.")
            } finally {
                setIsLoading(false)
            }
        }

        getOrders()
    }, [filter])


    const handleRefund = async (order: TOrder) => {
        if (!order.isRefundable || refundingOrderId !== null) return

        const confirmed = window.confirm(
            `Are you sure you want to refund order #${order.reference}? This cannot be undone.`
        )

        if (!confirmed) return

        try {
            setRefundError("")
            setRefundingOrderId(order.id)

            const result = await RefundOrder(order.reference)

            if (result.status === 401) {
                setIsAuthModalOpen("Log In")
                return
            }

            if (result.status === 422) {
                setRefundError(result.message || "The refund was refused.")
                return
            }

            if (result.status !== 200 || !result.data) {
                setRefundError(result.message || "Could not refund this order.")
                return
            }

            //  Update using the order returned by the API
            //When the refund succeeds, the API returns the updated order
            const updatedOrder: TOrder = result.data

            const newOrders = Myorders.map((item) => {
                if (item.id === updatedOrder.id) {
                    return updatedOrder
                } else {
                    return item
                }
            })
            setMyOrders(newOrders)


            // Refresh the current tab from the server
            // another API request to get the latest orders.
            try {
                const refreshedOrders = await GetOrders(filter)

                if (refreshedOrders.status === 200) {
                    setMyOrders(refreshedOrders.data)
                } else if (refreshedOrders.status === 401) {
                    setIsAuthModalOpen("Log In")
                }
            } catch (err) {
                // Refund succeeded; only the refresh failed
                console.error("Could not refresh tickets:", err)
            }
        } catch (err) {
            console.error(err)
            setRefundError("Something went wrong. Please try again.")
        } finally {
            setRefundingOrderId(null)
        }
    }

    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])


    return (<div className="text-white flex flex-col gap-3">
        <div className="flex gap-2 bg-[#1E2031] w-fit p-2 px-4 rounded-2xl mb-5">
            <button
                className={filter === "upcoming" ? "bg-[#505261] p-2 rounded-xl" : "p-2"}
                onClick={() => setFilter("upcoming")}>Upcomming<span className="text-[#EC3013] "> {filter === "upcoming" ? Myorders.length : ""}</span></button>
            <button
                className={filter === "past" ? "bg-[#505261] p-2 rounded-xl" : "p-2"}
                onClick={() => setFilter("past")}>Past<span className="text-[#EC3013]"> {filter === "past" ? Myorders.length : ""}</span></button>
        </div>


        {isLoading && (
            <p className="text-center text-[#A9A9A9] py-10">
                Loading tickets...
            </p>
        )}


        {error && (
            <p className="text-center text-[#A9A9A9] py-10">
                {error}
            </p>
        )}

        {refundError && (
            <p className="text-center text-[#EC3013] py-3">
                {refundError}
            </p>
        )}

        {!isLoading && !error && Myorders.length === 0 && (
            <p className="text-center text-[#A9A9A9] py-10">
                No {filter} tickets found.
            </p>
        )}

        {!isLoading && !error && Myorders.reverse().map((item) => {

            // Calculate the session start time
            const sessionStart = new Date(
                `${item.session.date}T${item.session.time}`
            )

            //  Refund deadline is 2 hours before the session
            const refundDeadline = new Date(
                sessionStart.getTime() - 2 * 60 * 60 * 1000
            )
            return (<div key={item.id}
                className="bg-[#1E2031] rounded-2xl p-2 flex items-center">
                <div className="flex gap-2 flex-3 p-3 items-center">
                    <img
                        src={item.session.movie.posterUrl}
                        alt={item.session.movie.title}
                        className="w-30  object-cover rounded-xl"
                    />
                    <div className="flex flex-col gap-5 justify-center flex-10">
                        <div className="flex gap-5 items-center">
                            <h1>{item.session.movie.title}</h1>
                            <p className="text-[#EC3013] bg-[#EC30131A] p-1 rounded-2xl px-4">{item.session.movie.ageRating.code}</p>
                            <p className="text-[#A9A9A9]">{item.session.movie.runtimeMinutes} min</p>
                        </div>
                        <div className="flex gap-7">
                            <div>
                                <h4 className="text-[12px] text-[#A9A9A9]">DATE</h4>
                                <div className="flex">
                                    <div className="flex gap-2">
                                        <span>
                                            {new Date(item.session.date).toLocaleDateString("en-GB", {
                                                weekday: "short",
                                                day: "numeric",
                                                month: "short",
                                            })}
                                        </span> .
                                        <span>{item.session.time}</span>

                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[12px] text-[#A9A9A9]">VENUE</h4>
                                <div className="flex gap-2"><span>{item.session.venue.name} .</span><span>Hall {item.session.hall.name}</span></div>
                            </div>

                            <div >
                                <h4 className="text-[12px] text-[#A9A9A9]">FORMAT</h4>
                                <div className="flex gap-2"><span>{item.session.format.name} . </span><span>{item.session.language.name}</span></div>
                            </div>

                        </div>

                        <div className="flex items-center gap-2 ">
                            <p className="text-[12px] text-[#A9A9A9]">SEATS</p>
                            {item.tickets.map((item) => {
                                return (<div key={item.id} className="p-1 px-3 rounded-2xl bg-[#2A2C3D] flex gap-2"><span>{item.seatCode}</span> . <span>{item.ticketType.name}</span> </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-2 border-l border-dotted border-[#A9A9A9] p-4">
                    <div className="flex flex-col items-start">
                        <p className="text-[#A9A9A9]">ORDER</p>
                        <p>#{item.reference}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <p className="text-[12px]">Total paid</p>
                            <p className="font-extrabold">₾ {item.totalPrice} </p>
                        </div>

                        <button
                            onClick={() => handleRefund(item)}
                            disabled={!item.isRefundable || refundingOrderId === item.id}
                            className={`p-2 rounded-2xl px-4 ${item.isRefundable && refundingOrderId !== item.id
                                ? "bg-[#2A2C3D] text-white cursor-pointer"
                                : "bg-[#2A2C3D] text-[#A9A9A9] cursor-not-allowed opacity-50"
                                }`}> {refundingOrderId === item.id ? "Refunding..." : "Refund"}</button>


                        {item.isUpcoming && !item.isRefundable && (
                            <p className="text-center text-[#A9A9A9]">
                                Refund is no longer available
                            </p>
                        )}

                        <p className="text-center text-[#A9A9A9] text-sm">
                            {item.isRefundable
                                ? "Refundable until "
                                : "Refund deadline: "}

                            {refundDeadline.toLocaleString("en-GB", {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                                hourCycle: "h23",
                            })}
                        </p>


                    </div>
                </div>
            </div>)
        })}


    </div>)
}
export default MyTickets