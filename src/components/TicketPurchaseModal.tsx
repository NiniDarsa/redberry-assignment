import { useState } from "react"
import type { TSession } from "../types/sessionDetail"
import SeatsMap from "./SeatsMap"
import SelectedTickets from "./SelectedTickets"
import Timer from "./Timer"

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
    age: number | undefined
}

const TicketPurchaseModal = ({ isModalOpen, ref: modalRef, clickedSession, name, age }: TTicketPurchaseModal) => {

    const [clickedButton, setClickedButton] = useState("seats")
    const hanndleButtonClick = (name: "seats" | "checkout") => {
        setClickedButton(name)
    }

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
                            <Timer clickedSession={clickedSession} />

                        </div>

                        <div className="flex gap-2 flex-1 min-h-0 overflow-hidden" >

                            <div className="flex-4 flex flex-col gap-5 min-h-0 overflow-scroll">
                                <div className="flex bg-[#2A2C3D] rounded-2xl justify-around ">
                                    <button className={`cursor-pointer flex-1  overflow-hidden rounded-2xl py-1 ${clickedButton === "seats" ? "bg-[#EC3013]" : ""}`} onClick={() => hanndleButtonClick("seats")}> SEATS </button>
                                    <button className={`cursor-pointer flex-1 overflow-hidden rounded-2xl py-1 ${clickedButton === "checkout" ? "bg-[#EC3013]" : ""}`} onClick={() => hanndleButtonClick("checkout")}> CHECKOUT </button>
                                </div>

                                <div className="flex flex-col gap-2">
                                    {clickedButton === "seats" ? <SeatsMap isModalOpen={isModalOpen} clickedSession={clickedSession}
                                    /> : <>LaLa</>
                                    }

                                </div>

                            </div>

                            <div className="flex flex-2 flex-col  gap-2 border-l border-[#2A2C3D] p-2 min-h-0 overflow-hidden">
                                {clickedButton === "seats" ? <SelectedTickets clickedSession={clickedSession}



                                /> : <></>}

                            </div>

                        </div>

                    </div>

                </div>
            }
        </>
    )
}

export default TicketPurchaseModal