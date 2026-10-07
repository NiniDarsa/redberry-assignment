import { useEffect, useState } from "react"
import type { TSession } from "../types/sessionDetail"
import { GetSeatMap } from "../functions/function"
import type { TSeat, TSeatMap, TSeatRow } from "../types/seatMap"

type TTicketPurchaseModal = {
    isModalOpen: boolean
    ref: React.RefObject<HTMLDivElement | null>
    clickedSession: TSession | undefined
    name: string | undefined
}

const TicketPurchaseModal = ({ isModalOpen, ref: modalRef, clickedSession, name }: TTicketPurchaseModal) => {

    const [seatMap, setSeatMap] = useState<TSeatMap | null>(null)
    const [selectedSeats, setSelectedSeats] = useState<number[]>([])
    const [seatLimitMessage, setSeatLimitMessage] = useState("")

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
                    .map((seat: TSeat) => seat.id)

                setSelectedSeats(mine)
            } catch (error) {
                console.error(error)
            }
        }

        fetchSeatMap()
    }, [isModalOpen, clickedSession])


console.error(seatMap)

    const handleSeatClick = (seatId: number) => {
    setSeatLimitMessage("")

    if (selectedSeats.includes(seatId)) {
        const newSeats = [...selectedSeats].filter((item) => item !== seatId)

        setSelectedSeats(newSeats)
        return
    }

    if (selectedSeats.length === 3) {
        setSeatLimitMessage("You can select a maximum of 3 seats.")
        return
    }

    const newSeats = [...selectedSeats, seatId]

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

    return (
        <>
            {isModalOpen &&
                <div className="w-full h-full fixed inset-0 z-50 bg-[#1E2031]/50 flex items-center justify-center">
                    <div ref={modalRef} className="rounded-2xl w-285 text-white bg-[#070C1c] p-10 flex flex-col justify-between" >
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
                                <p> 7:48 </p>
                            </div>

                        </div>

                        <div className="flex gap-2">

                            <div className="flex-4 flex flex-col gap-5">
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

                                                                    const isSelected =
                                                                        selectedSeats.includes(seat.id)

                                                                    const isUnavailable =
                                                                        seat.state === "unavailable"

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

                            <div className="flex flex-2 flex-col justify-between gap-2 border-l border-[#2A2C3D] p-2">

                                <div>
                                    <p className="font-extrabold">
                                        Your seats . Max 3
                                    </p>

                                    <p className="text-[#A9A9A9] text-[14px]">
                                        Pick up to 3 seats from the map. Each seat can carry its own ticket type.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2">

                                    <div className="flex justify-between">
                                        <p>SUBTOTAL</p>
                                        <p>0 ლ</p>
                                    </div>

                                    <button className="text-center p-3 rounded-3xl bg-[#2A2C3D]">
                                        Next: Checkout
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