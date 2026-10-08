import { useEffect, useState } from "react"
import type { TSession } from "../types/sessionDetail"
import { GetSeatMap } from "../functions/function"
import useTicketContext from "../hooks/useTicketContext"


type TTimer = {
    clickedSession: TSession | undefined
}

const Timer = ({ clickedSession }: TTimer) => {
    const [timeLeft, setTimeLeft] = useState(0)
    const { expiresAt, setSelectedSeats, setExpiresAt, setHoldError, setSeatMap } = useTicketContext()

    //CountDown//
    useEffect(() => {
        if (!expiresAt) return

        const updateTimer = () => {
            const remaining = Math.max(
                0,
                Math.ceil(
                    (new Date(expiresAt).getTime() - Date.now()) / 1000
                )
            )

            setTimeLeft(remaining)

            if (remaining === 0) {
                setSelectedSeats([])
                setExpiresAt(null)
                setHoldError("Your hold time expired. Please re-select your seats.")

                if (clickedSession) {
                    GetSeatMap(clickedSession.id)
                        .then(setSeatMap)
                        .catch(console.error)
                }
            }
        }

        updateTimer()

        const interval = setInterval(updateTimer, 1000)

        return () => clearInterval(interval)
    }, [expiresAt, clickedSession])

    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    return (<div className="bg-[#2A2C3D] rounded-2xl flex flex-col items-center text-[14px] p-3">
        <p className="text-[#A9A9A9]"> SEATS HELD</p>
        <p> {minutes}:{seconds.toString().padStart(2, "0")} </p>
    </div>
    )
}
export default Timer