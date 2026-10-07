import { useEffect, useState } from "react"
import type { TSession } from "../types/sessionDetail"
import { GetSeatMap, HoldSeats } from "../functions/function"
import type { TSeat, TSeatMap, TSeatRow } from "../types/seatMap"
import { useNavigate } from "react-router-dom"
import { useFilterOptions } from "../hooks/useFilterOptions"

type TTicketType = "adult" | "student" | "child"

type TselectedSeat = {
    seatId: number
    ticketType: TTicketType
}
type TTicketPurchaseModal = {
    isModalOpen: boolean
    ref: React.RefObject<HTMLDivElement | null>
    clickedSession: TSession | undefined
    name: string | undefined
    age: number | undefined
}

const TicketPurchaseModal = ({ isModalOpen, ref: modalRef, clickedSession, name, age }: TTicketPurchaseModal) => {

    const [seatMap, setSeatMap] = useState<TSeatMap | null>(null)

    const [selectedSeats, setSelectedSeats] = useState<TselectedSeat[]>([])
    const [seatLimitMessage, setSeatLimitMessage] = useState("")
    const [holdError, setHoldError] = useState("")
    const [expiresAt, setExpiresAt] = useState<string | null>(null)
    const [timeLeft, setTimeLeft] = useState(0)
    const [isHolding, setIsHolding] = useState(false)


    const [filterOptins] = useFilterOptions()
    console.warn( clickedSession?.price)

    const navigate = useNavigate()

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


    //CountDown///////////////
    useEffect(() => {
        if (!expiresAt) return

        const updateTimer = () => {
            const remaining = Math.max(
                0,
                Math.ceil(
                    (new Date(expiresAt).getTime() - Date.now()) / 1000
                )
            )

            setTimeLeft(remaining)

            if (remaining === 0) {
                setSelectedSeats([])
                setExpiresAt(null)
                setHoldError("Your hold time expired. Please re-select your seats.")

                if (clickedSession) {
                    GetSeatMap(clickedSession.id)
                        .then(setSeatMap)
                        .catch(console.error)
                }
            }
        }

        updateTimer()

        const interval = setInterval(updateTimer, 1000)

        return () => clearInterval(interval)
    }, [expiresAt, clickedSession])



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
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    return (
        <>
            {isModalOpen &&
                <div className="w-full h-full fixed inset-0 z-50 bg-[#1E2031]/50 flex items-center justify-center">
                    <div ref={modalRef} className="rounded-2xl w-285 h-[680px] text-white bg-[#070C1c] p-10 flex flex-col " >
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h2 className="font-extrabold"> {name}</h2>
                                <p className="text-[#A9A9A9] text-[12px]">
                                    {clickedSession?.venue.name} . Hall {clickedSession?.hall.name} . {clickedSession?.date} . {clickedSession?.time}
                                    . {clickedSession?.format.name} . {clickedSession?.language.name}
                                </p>
                            </div>

                            {/*TIMER */}
                            <div className="bg-[#2A2C3D] rounded-2xl flex flex-col items-center text-[14px] p-3">
                                <p className="text-[#A9A9A9]"> SEATS HELD</p>
                                <p> {minutes}:{seconds.toString().padStart(2, "0")} </p>
                            </div>

                        </div>

                        <div className="flex gap-2 flex-1 min-h-0 overflow-hidden" >

                            <div className="flex-4 flex flex-col gap-5 min-h-0 overflow-scroll">
                                <div className="flex bg-[#2A2C3D] rounded-2xl justify-around py-1">
                                    <button> SEATS </button>
                                    <button> CHECKOUT </button>
                                </div>

                                <div className="flex flex-col gap-2">

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


                                </div>

                            </div>

                            <div className="flex flex-2 flex-col  gap-2 border-l border-[#2A2C3D] p-2 min-h-0 overflow-hidden">

                                <div className="flex flex-col flex-1 min-h-0">
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

                                                        {age && age < 16 && (
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
                                                        )}

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

                            </div>

                        </div>

                    </div>

                </div>
            }
        </>
    )
}

export default TicketPurchaseModal