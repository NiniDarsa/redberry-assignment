import { useState } from "react"
import type { TSession } from "../types/sessionDetail"

import TicketBooking from "./TicketBooking"
import Confirmed from "./Confirmed"
import type { TMovieDetails } from "../types/movies"
import type { TOrder } from "../types/completeOrder"

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
    movieDetails: TMovieDetails | undefined
}

const TicketPurchaseModal = ({ isModalOpen, ref: modalRef, clickedSession, name, MovieAge, movieDetails }: TTicketPurchaseModal) => {
    const [confirmed, setConfirmed] = useState(false) 
    const [order,setOrder]=useState<TOrder|undefined>()


    return (
        <>
            {isModalOpen &&
                <div className="w-full h-full fixed inset-0 z-50 bg-[#1E2031]/50 flex items-center justify-center">
                    <div ref={modalRef} className="rounded-2xl w-285 h-[680px] text-white bg-[#070C1c] p-10 flex flex-col " >
                        {!confirmed ? <TicketBooking clickedSession={clickedSession} name={name} MovieAge={MovieAge} isModalOpen={isModalOpen} isConfirmed={() => setConfirmed(true)} 
                          setOrder={setOrder}
                            />
                            : <Confirmed  order={order}/>

                        }
                    </div>
                </div>
            }
        </>
    )
}

export default TicketPurchaseModal