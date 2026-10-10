import { useContext } from "react"
import TicketPurchaseContext from "../context/TicketPurchaseContextProvider"

const useTicketPurchaseContext = () => {
    const context = useContext(TicketPurchaseContext)

    if (!context) {
        throw new Error(
            "useTicketPurchaseContext must be used within TicketPurchaseContextProvider"
        )
    }

    return context
}

export default useTicketPurchaseContext