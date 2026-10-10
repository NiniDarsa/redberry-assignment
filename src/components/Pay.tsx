import { useLocation, useNavigate } from "react-router-dom"
import { useFilterOptions } from "../hooks/useFilterOptions"
import type { TTicketType } from "./TicketPurchaseModal"
import type { TSession } from "../types/sessionDetail"
import { useEffect, useState } from "react"
import { GetSeatMap, HoldSeats } from "../functions/function"
import useTicketContext from "../hooks/useTicketContext"
import useAppContext from "../hooks/useAppContext"
import useAuthContext from "../hooks/useAuthContext"
import MyHoldingTickets from "./MyHoldingTickets"
import TicketSummary from "./TicketSummary"
import type { THold } from "../types/holdSeats"


type TSelectedTickets = {
    clickedSession: TSession | undefined
    MovieAge: number | undefined
    currentLocation: "seats" | "checkout"
    handleCurrentLocation: (name: "seats" | "checkout") => void
    name: string | undefined
    HoldSeatsdata: THold | undefined
    setHoldSeatsData: React.Dispatch<React.SetStateAction<THold | undefined>>
    loading: boolean

}

const Pay = ({ clickedSession, MovieAge, currentLocation, handleCurrentLocation, name, HoldSeatsdata, setHoldSeatsData, loading }: TSelectedTickets) => {
    const { selectedSeats, setSelectedSeats, setHoldError, seatMap, setSeatMap, setExpiresAt } = useTicketContext()

    const [isHolding, setIsHolding] = useState(false)
    const { setIsAuthModalOpen } = useAppContext()
    const { user } = useAuthContext()

    const [filterOptins] = useFilterOptions()

    const navigate = useNavigate()

    //  HOLD SEATS
    const handleHoldSeats = async () => {
        if (!clickedSession || selectedSeats.length === 0) return

        if (user?.data.age && user.data.age < (MovieAge ?? 0)) {
            return
        }

        setIsHolding(true)
        setHoldError("")

        try {
            const result = await HoldSeats(
                clickedSession.id,
                selectedSeats
            )

            setHoldSeatsData(result.data)
            setExpiresAt(result.data.expiresAt)
            localStorage.setItem("activeHoldId", result.data.holdId)
            handleCurrentLocation("checkout")


        } catch (error: any) {

            if (error.status === 409) {
                const contested: string[] = error.contested || []

                setHoldError(
                    `These seats were just taken: ${contested.join(", ")}`
                )

                const contestedIds = seatMap?.sections
                    .flatMap((section) => section.rows)
                    .flatMap((row) => row.seats)
                    .filter((seat) => contested.includes(seat.label))
                    .map((seat) => seat.id) || []

                const remainingSeats = selectedSeats.filter(
                    (seat) => !contestedIds.includes(seat.seatId)
                )

                setSelectedSeats(remainingSeats)

                if (clickedSession) {
                    const newSeatMap = await GetSeatMap(clickedSession.id)
                    setSeatMap(newSeatMap)
                }

                return
            }


            if (error.status === 422) {
                setHoldError(error.message)

                if (error.message?.toLowerCase().includes("profile")) {
                    navigate("/profile", {
                        state: {
                            returnTo: location.pathname + location.search,
                            currentLocation: "checkout",
                            openModal: true,
                            session: clickedSession,
                        },
                    })
                }

                return
            }


            if (error.status === 401) {
                setHoldError("Please log in to continue.")
                setIsAuthModalOpen("Log In")
                return
            }

            setHoldError("Something went wrong. Please try again.")

        } finally {
            setIsHolding(false)
        }
    }

    // GET PRICE FOR ONE SEAT
    const getTicketPrice = (ticketType: TTicketType) => {
        const ticket = filterOptins?.ticketTypes.find(
            (ticket) => ticket.slug === ticketType
        )

        return (clickedSession?.price ?? 0) * (ticket?.priceRatio ?? 1)
    }

    //  CALCULATE TOTAL PRICE
    const totalPrice = selectedSeats.reduce(
        (total, selectedSeat) =>
            total + getTicketPrice(selectedSeat.ticketType),
        0
    )


    return (<div className="relative flex flex-2 flex-col  gap-2 border-l border-[#2A2C3D] p-2 min-h-0 overflow-hidden">

        <div className="flex flex-col flex-1 min-h-0">
            {currentLocation === "seats" && <MyHoldingTickets getTicketPrice={getTicketPrice} />}
            {currentLocation === "checkout" && <TicketSummary HoldSeatsdata={HoldSeatsdata} clickedSession={clickedSession} name={name} />}
        </div>

        <div className="flex flex-col gap-2">

            <div className="flex justify-between">
                <p>SUBTOTAL</p>
                <p>₾ {totalPrice} </p>
            </div>

            {currentLocation === "seats" && <button className="text-center p-3 rounded-3xl bg-[#2A2C3D] disabled:opacity-50"
                disabled={isHolding || selectedSeats.length === 0}
                onClick={handleHoldSeats}>
                {isHolding ? "Holding..." : "Next: Checkout"}</button>}

            {currentLocation === "checkout" &&
                <button
                    form="checkout-form"
                    type="submit"
                    className="text-center p-3 rounded-3xl bg-[#2A2C3D] disabled:opacity-50">
                    {loading ? "Processing payment..." : "Pay: Complete order"}
                </button>

            }
        </div>
    </div>)
}
export default Pay