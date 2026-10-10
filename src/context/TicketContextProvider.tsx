import { createContext,  useState } from "react"
import type { TSeatMap, } from "../types/seatMap"


type TicketContextProviderProps = {
    children: React.ReactNode
}

type TTicketType = "adult" | "student" | "child"

type TselectedSeat = {
    seatId: number
    ticketType: TTicketType
}

type TTicketContext = {

    seatMap: TSeatMap | null
    setSeatMap: React.Dispatch<React.SetStateAction<TSeatMap | null>>

    selectedSeats: TselectedSeat[]
    setSelectedSeats: React.Dispatch<React.SetStateAction<TselectedSeat[]>>

    seatLimitMessage: string
    setSeatLimitMessage: React.Dispatch<React.SetStateAction<string>>

    holdError: string
    setHoldError: React.Dispatch<React.SetStateAction<string>>

    expiresAt: string | null
    setExpiresAt: React.Dispatch<React.SetStateAction<string | null>>

}

export const TicketContext = createContext<TTicketContext | null>(null)



const TicketContextProvider = ({
    children
}: TicketContextProviderProps) => {

    const [seatMap, setSeatMap] = useState<TSeatMap | null>(null)
    const [selectedSeats, setSelectedSeats] = useState<TselectedSeat[]>([])
    const [seatLimitMessage, setSeatLimitMessage] = useState("")
    const [holdError, setHoldError] = useState("")
    const [expiresAt, setExpiresAt] = useState<string | null>(null)


    

    return (
       
        <TicketContext.Provider
            value={{
                seatMap,
                setSeatMap,

                selectedSeats,
                setSelectedSeats,

                seatLimitMessage,
                setSeatLimitMessage,

                holdError,
                setHoldError,

                expiresAt,
                setExpiresAt,
            }}
        >
            {children}
        </TicketContext.Provider>
    )
}


export default TicketContextProvider