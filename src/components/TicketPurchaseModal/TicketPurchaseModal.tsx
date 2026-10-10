import { useEffect, useRef, useState } from "react"
import type { TSession } from "../../types/sessionDetail"
import type { TOrder } from "../../types/completeOrder"
import useTicketContext from "../../hooks/useTicketContext"
import { CancelHold, GetSeatMap } from "../../functions/function"
import TicketBooking from "./TicketBooking"
import Confirmed from "./Confirmed"


export type TTicketType = "adult" | "student" | "child"

export type TselectedSeat = {
    seatId: number
    ticketType: TTicketType
}
type TTicketPurchaseModal = {
    isModalOpen: boolean
    ref: React.RefObject<HTMLDivElement | null>
    clickedSession: TSession | undefined
    name: string | undefined
    MovieAge: number | undefined
}

const TicketPurchaseModal = ({ isModalOpen, ref: modalRef, clickedSession, name, MovieAge}: TTicketPurchaseModal) => {
    const [confirmed, setConfirmed] = useState(false) 
    const [order,setOrder]=useState<TOrder|undefined>()
    
    const wasOpen = useRef(isModalOpen)

    const {setSelectedSeats, setExpiresAt,setHoldError, setSeatMap,} = useTicketContext()
    
    useEffect(() => {
    // Only cancel when the modal changes from open to closed
    if (wasOpen.current && !isModalOpen) {
        const holdId = localStorage.getItem("activeHoldId")

        if (holdId) {
            localStorage.removeItem("activeHoldId")

            CancelHold(holdId)
                .catch((error) => {
                    console.error("Could not cancel hold:", error)
                })
                .finally(async () => {
                    if (clickedSession) {
                        try {
                            const seatMap = await GetSeatMap(clickedSession.id)
                            setSeatMap(seatMap)
                        } catch (error) {
                            console.error(error)
                        }
                    }
                })
        }

        setSelectedSeats([])
        setExpiresAt(null)
        setHoldError("")
        setConfirmed(false)
    }

    wasOpen.current = isModalOpen
}, [
    isModalOpen,
    clickedSession,
    setSelectedSeats,
    setExpiresAt,
    setHoldError,
    setSeatMap,
])
    return (
        <>
            {isModalOpen &&
                <div className="w-full h-full fixed inset-0 z-50 bg-[#1E2031]/50 flex items-center justify-center">
                    <div ref={modalRef} className="rounded-2xl w-285 h-170 text-white bg-[#070C1c] p-10 flex flex-col " >
                        {!confirmed ? <TicketBooking  clickedSession={clickedSession} name={name} MovieAge={MovieAge} isModalOpen={isModalOpen} isConfirmed={() => setConfirmed(true)} 
                          setOrder={setOrder}/>
                        : <Confirmed  order={order}/>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default TicketPurchaseModal