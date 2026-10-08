import { useNavigate } from "react-router-dom"
import { useFilterOptions } from "../hooks/useFilterOptions"
import type { TTicketType } from "./TicketPurchaseModal"
import type { TSession } from "../types/sessionDetail"
import { useState } from "react"
import { GetSeatMap, HoldSeats } from "../functions/function"
import useTicketContext from "../hooks/useTicketContext"


type TSelectedTickets={
    clickedSession: TSession | undefined

}

const SelectedTickets=({clickedSession}:TSelectedTickets)=>{
    const {selectedSeats, setSelectedSeats, setHoldError, seatMap, setSeatMap, setExpiresAt}=useTicketContext()
   
    const [isHolding, setIsHolding] = useState(false)


    const [filterOptins] = useFilterOptions()

    const navigate = useNavigate()

    //  HOLD SEATS
    const handleHoldSeats = async () => {
        if (!clickedSession || selectedSeats.length === 0) return

        console.warn(clickedSession.id)
        setIsHolding(true)
        setHoldError("")

        try {
            const result = await HoldSeats(
                clickedSession.id,
                selectedSeats
            )

            setExpiresAt(result.data.expiresAt)

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

                if (
                    error.message?.toLowerCase().includes("profile")
                ) {
                    navigate("/profile")
                }

                return
            }


            if (error.status === 401) {
                setHoldError("Please log in to continue.")

                return
            }

            setHoldError("Something went wrong. Please try again.")

        } finally {
            setIsHolding(false)
        }
    }

    //change Ticket Type
    const handleTicketTypeChange = (
        seatId: number,
        ticketType: TTicketType
    ) => {
        const newSeats = selectedSeats.map((seat) =>
            seat.seatId === seatId
                ? { ...seat, ticketType }
                : seat
        )

        setSelectedSeats(newSeats)
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

    return(<><div className="flex flex-col flex-1 min-h-0">
                                    <p className="font-extrabold">
                                        Your seats . Max 3
                                    </p>

                                    <p className="text-[#A9A9A9] text-[14px]">
                                        Pick up to 3 seats from the map. Each seat can carry its own ticket type.
                                    </p>


                                    <div className="flex flex-1 flex-col gap-3 mt-5 min-h-0 overflow-y-auto">

                                        {selectedSeats.map((selectedSeat) => {

                                            const selectedSeatInfo = seatMap?.sections
                                                .flatMap((section) => section.rows)
                                                .flatMap((row) =>
                                                    row.seats.map((seat) => ({
                                                        seat,
                                                        rowLabel: row.label,
                                                    }))
                                                )
                                                .find((item) => item.seat.id === selectedSeat.seatId)

                                            return (
                                                <div
                                                    key={selectedSeat.seatId}
                                                    className="flex pb-3 flex-col  items-start p-5 bg-[#1E2031] rounded-2xl"
                                                >
                                                    <div className="flex gap-30 ">
                                                        <p className="pb-3">
                                                            <span className="text-[#A9A9A9] mr-5">Seat</span>
                                                            {selectedSeatInfo?.rowLabel}{selectedSeatInfo?.seat.label}
                                                        </p>

                                                        <p className="text-[#A9A9A9] text-sm">
                                                            Price: {getTicketPrice(selectedSeat.ticketType)} ლ
                                                        </p>
                                                    </div>

                                                    {/* buttons */}
                                                    <div className="flex justify-between w-full gap-2 text-[12px] pt-4 border-t border-[#2A2C3D]">

                                                        {/* {age && age < 16 && ( */}
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleTicketTypeChange(
                                                                    selectedSeat.seatId,
                                                                    "child"
                                                                )
                                                            }
                                                            className={`cursor-pointer px-3 py-2 rounded-3xl whitespace-nowrap ${selectedSeat.ticketType === "child"
                                                                ? "bg-[#EC3013]"
                                                                : "bg-[#2A2C3D]"
                                                                }`}
                                                        >
                                                            Child 60%
                                                        </button>
                                                        {/* )} */}

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleTicketTypeChange(
                                                                    selectedSeat.seatId,
                                                                    "student"
                                                                )
                                                            }
                                                            className={`cursor-pointer px-3 py-2 rounded-3xl whitespace-nowrap ${selectedSeat.ticketType === "student"
                                                                ? "bg-[#EC3013]"
                                                                : "bg-[#2A2C3D]"
                                                                }`}
                                                        >
                                                            Student 75%
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleTicketTypeChange(
                                                                    selectedSeat.seatId,
                                                                    "adult"
                                                                )
                                                            }
                                                            className={`cursor-pointer px-3 py-2 rounded-3xl whitespace-nowrap ${selectedSeat.ticketType === "adult"
                                                                ? "bg-[#EC3013]"
                                                                : "bg-[#2A2C3D]"
                                                                }`}
                                                        >
                                                            Adult 100%
                                                        </button>

                                                    </div>

                                                </div>
                                            )
                                        })}

                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">

                                    <div className="flex justify-between">
                                        <p>SUBTOTAL</p>
                                        <p>{totalPrice} ლ</p>
                                    </div>

                                    <button
                                        disabled={
                                            isHolding || selectedSeats.length === 0
                                        }
                                        onClick={handleHoldSeats}
                                        className="text-center p-3 rounded-3xl bg-[#2A2C3D] disabled:opacity-50"
                                    >
                                        {isHolding
                                            ? "Holding..."
                                            : "Next: Checkout"}
                                    </button>

                                </div>
</>)
}
export default SelectedTickets