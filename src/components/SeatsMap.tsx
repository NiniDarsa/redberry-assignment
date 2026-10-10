import { useEffect } from "react"
import type { TSeat, TSeatMap, TSeatRow } from "../types/seatMap"
import type { TSession } from "../types/sessionDetail"
import { GetSeatMap } from "../functions/function"
import useTicketContext from "../hooks/useTicketContext"

type TTicketType = "adult" | "student" | "child"

type TSeatsMap = {
    isModalOpen: boolean
    clickedSession: TSession | undefined
}

const SeatsMap = ({ isModalOpen, clickedSession}: TSeatsMap) => {
    const {setSelectedSeats, selectedSeats, seatMap, setSeatMap, seatLimitMessage, holdError, setHoldError, setSeatLimitMessage }=useTicketContext()

    useEffect(() => {
        if (!isModalOpen || !clickedSession) return

        const fetchSeatMap = async () => {
            try {
                const data = await GetSeatMap(clickedSession.id)
                setSeatMap(data)

                const mine = data.sections
                    .flatMap((section: TSeatMap["sections"][number]) => section.rows)
                    .flatMap((row: TSeatRow) => row.seats)
                    .filter((seat: TSeat) => seat.isMine)
                    .map((seat: TSeat) => ({
                        seatId: seat.id,
                        ticketType: "adult" as TTicketType
                    }))

                setSelectedSeats(mine)
            } catch (error) {
                console.error(error)
            }
        }

        fetchSeatMap()
    }, [isModalOpen, clickedSession])

    const handleSeatClick = (seatId: number) => {
        setSeatLimitMessage("")
        setHoldError("")

        const selectedSeat = selectedSeats.find(
            (seat) => seat.seatId === seatId
        )

        if (selectedSeat) {
            const newSeats = selectedSeats.filter(
                (seat) => seat.seatId !== seatId
            )

            setSelectedSeats(newSeats)
            return
        }

        if (selectedSeats.length === 3) {
            setSeatLimitMessage("You can select a maximum of 3 seats.")
            return
        }

        const newSeats = [
            ...selectedSeats,
            {
                seatId,
                ticketType: "adult" as TTicketType
            }
        ]

        setSelectedSeats(newSeats)
    }

    const getSeatClassName = (
        state: "available" | "sold" | "held" | "unavailable",
        isMine: boolean,
        isSelected: boolean
    ) => {
        if (state === "unavailable") {
            return "invisible"
        }

        if (isMine || isSelected) {
            return "bg-[#EC3013] rounded-md"
        }

        if (state === "sold") {
            return "bg-[#2A2C3D] rounded-md"
        }

        if (state === "held") {
            return "bg-gradient-to-br from-[#1E2031] to-[white]"
        }

        return "bg-[#2A2C3D] border border-[#A9A9A9] rounded-md"
    }


    return (<>
        <div className="bg-[#2A2C3D] text-center p-1 rounded-bl-2xl rounded-br-2xl">SCREEN</div>

        <div className="flex flex-col gap-8 items-center">

            {seatMap?.sections.map((section) => (

                <div key={section.name} className="flex flex-col gap-3 items-center" >

                    <p className="text-[12px] text-[#A9A9A9] uppercase"> {section.name}</p>

                    <div className="flex flex-col gap-2">

                        {section.rows.map((row: TSeatRow) => (
                            <div key={row.label} className="flex gap-5 items-center">
                                <p className="w-5 text-center">{row.label} </p>
                                <div className="flex gap-2 items-center">
                                    {row.seats.map((seat: TSeat) => {

                                        const isSelected = selectedSeats.some((selectedSeat) => selectedSeat.seatId === seat.id)


                                        const isUnavailable = seat.state === "unavailable"


                                        return (
                                            <div key={seat.id} className="flex items-center">
                                                {isUnavailable ? (
                                                    <div className="w-10 h-10" />
                                                ) : (

                                                    <button
                                                        type="button"
                                                        disabled={
                                                            seat.state !== "available" &&
                                                            !seat.isMine
                                                        }
                                                        onClick={() => handleSeatClick(seat.id)}
                                                        className={`
                                                                                        w-10 h-10
                                                                                        flex
                                                                                        justify-center
                                                                                        items-center
                                                                                        rounded-md
                                                                                        ${getSeatClassName(
                                                            seat.state,
                                                            seat.isMine,
                                                            isSelected
                                                        )}
                                                                                    `}>
                                                        {seat.label}
                                                    </button>

                                                )}
                                                {seat.aisleAfter && (
                                                    <span className="w-5" />
                                                )}

                                            </div>
                                        )
                                    })}

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            ))}

        </div>


        <div className="flex flex-col items-center">
            {seatLimitMessage && (
                <p className="text-[#EC3013] text-center text-sm mt-3">
                    {seatLimitMessage}
                </p>
            )}

            {holdError && (
                <p className="text-[#EC3013] text-center text-sm mt-3">
                    {holdError}
                </p>
            )}

            <div className="flex items-center justify-between mt-5 gap-8">

                <div className="flex gap-2 items-center">
                    <div className="w-4 h-4  bg-[#2A2C3D] border border-[#A9A9A9] rounded-md" />
                    Available
                </div>

                <div className="flex gap-2 items-center">
                    <div className="w-4 h-4 bg-[#EC3013] rounded-md" />
                    Selected
                </div>

                <div className="flex gap-2 items-center">
                    <div className="w-4 h-4 bg-[#2A2C3D] rounded-md" />
                    Sold
                </div>

                <div className="flex gap-2 rounded-md items-center">
                    <div className="w-4 h-4 bg-gradient-to-br from-[#1E2031] to-[white]" />
                    Held by another user
                </div>

            </div>
        </div>
    </>)
}
export default SeatsMap