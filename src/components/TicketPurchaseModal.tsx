import { useState } from "react"
import type { TSession } from "../types/sessionDetail"
import SeatsMap from "./SeatsMap"
import Timer from "./Timer"
import Checkout from "./Checkout"
import TicketButtonsContainer from "./TicketButtonsContainer"
import Pay from "./Pay"
import type { THold } from "../types/holdSeats"

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

const TicketPurchaseModal = ({ isModalOpen, ref: modalRef, clickedSession, name, MovieAge }: TTicketPurchaseModal) => {

    const [clickedButton, setClickedButton] = useState<"seats"|"checkout">("seats")
    const hanndleButtonClick = (name: "seats" | "checkout") => {
        setClickedButton(name)
    }
    
    const [HoldSeatsdata,setHoldSeatsData]=useState<THold>()


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
                            <Timer clickedSession={clickedSession} />

                        </div>

                        <div className="flex gap-2 flex-1 min-h-0 overflow-hidden" >

                            <div className="flex-4 flex flex-col gap-5 min-h-0 overflow-scroll">
                                <TicketButtonsContainer clickedButton={clickedButton} hanndleButtonClick={hanndleButtonClick}/>

                                <div className="flex flex-col gap-2">
                                    {clickedButton === "seats" ? 
                                    <SeatsMap isModalOpen={isModalOpen} clickedSession={clickedSession}/>
                                     : <Checkout HoldSeatsData={HoldSeatsdata}/>
                                    }
                                </div>

                            </div>
               
                              <Pay clickedSession={clickedSession} MovieAge={MovieAge} clickedButton={clickedButton}
                              hanndleButtonClick={hanndleButtonClick} name={name} HoldSeatsdata={HoldSeatsdata} setHoldSeatsData={setHoldSeatsData}
                              />

                        </div>

                    </div>

                </div>
            }
        </>
    )
}

export default TicketPurchaseModal