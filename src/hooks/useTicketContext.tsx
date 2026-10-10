import { useContext } from "react"
import { TicketContext } from "../context/TicketContextProvider"

const useTicketContext = () => {
    const context = useContext(TicketContext)

    if (!context) {
        throw new Error(
            "useTicketContext must be used within a TicketContextProvider"
        )
    }

    return context
}

export default useTicketContext