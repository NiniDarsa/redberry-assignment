import { useState } from "react"
import Timer from "./Timer"
import TicketButtonsContainer from "./TicketButtonsContainer"
import SeatsMap from "./SeatsMap"
import Checkout from "./Checkout"
import Pay from "./Pay"
import type { TSession } from "../types/sessionDetail"
import type { THold } from "../types/holdSeats"
import type { TOrder } from "../types/completeOrder"

type TTicketBooking = {
    isModalOpen: boolean
    clickedSession: TSession | undefined
    name: string | undefined
    MovieAge: number | undefined
    isConfirmed: () => void
    setOrder: React.Dispatch<React.SetStateAction<TOrder | undefined>>
}

const TicketBooking = ({ clickedSession, name, MovieAge, isModalOpen, isConfirmed, setOrder }: TTicketBooking) => {
    const [clickedButton, setClickedButton] = useState<"seats" | "checkout">("seats")
    const [HoldSeatsdata, setHoldSeatsData] = useState<THold>()

    const hanndleButtonClick = (name: "seats" | "checkout") => {
        setClickedButton(name)
    }


    return (<>
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
                <TicketButtonsContainer clickedButton={clickedButton} hanndleButtonClick={hanndleButtonClick} />

                <div className="flex flex-col gap-2">
                    {clickedButton === "seats" ?
                        <SeatsMap isModalOpen={isModalOpen} clickedSession={clickedSession} />
                        : <Checkout HoldSeatsData={HoldSeatsdata} isConfirmed={isConfirmed}  setOrder={setOrder} />
                    }
                </div>

            </div>

            <Pay clickedSession={clickedSession} MovieAge={MovieAge} clickedButton={clickedButton}
                hanndleButtonClick={hanndleButtonClick} name={name} HoldSeatsdata={HoldSeatsdata} setHoldSeatsData={setHoldSeatsData}
            />

        </div>

    </>)
}
export default TicketBooking