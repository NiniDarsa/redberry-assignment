import {
    createContext,
    useState,
} from "react"
import type { ReactNode } from "react"
import type { TOrder } from "../types/completeOrder"
import type { THold } from "../types/holdSeats"

type TBookingLocation = "seats" | "checkout"

type TTicketPurchaseContext = {
    confirmed: boolean
    setConfirmed: React.Dispatch<React.SetStateAction<boolean>>
    isConfirmed: () => void
    order: TOrder | undefined
    setOrder: React.Dispatch<React.SetStateAction<TOrder | undefined>>
    holdSeatsData: THold | undefined
    setHoldSeatsData: React.Dispatch<React.SetStateAction<THold | undefined>>
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    currentLocation: TBookingLocation
    setCurrentLocation: React.Dispatch<React.SetStateAction<TBookingLocation>>
}

const TicketPurchaseContext = createContext<TTicketPurchaseContext | null>(null)

export const TicketPurchaseContextProvider = ({
    children,
}: {
    children: ReactNode
}) => {
    const [confirmed, setConfirmed] = useState(false)
    const [order, setOrder] = useState<TOrder | undefined>()
    const [holdSeatsData, setHoldSeatsData] = useState<THold | undefined>()
    const [loading, setLoading] = useState(false)
    const [currentLocation, setCurrentLocation] = useState<TBookingLocation>("seats")

    const isConfirmed = () => {
        setConfirmed(true)
    }

    return (
        <TicketPurchaseContext.Provider
            value={{
                confirmed,
                setConfirmed,
                isConfirmed, 
                order,
                setOrder,
                holdSeatsData,
                setHoldSeatsData,
                loading,
                setLoading,
                currentLocation,
                setCurrentLocation,
            }}
        >
            {children}
        </TicketPurchaseContext.Provider>
    )
}

export default TicketPurchaseContext