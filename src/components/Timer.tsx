import { useEffect, useState } from "react"
import type { TSession } from "../types/sessionDetail"
import { CancelHold, GetSeatMap } from "../functions/function"
import useTicketContext from "../hooks/useTicketContext"


type TTimer = {
    clickedSession: TSession | undefined
    onExpired:()=>void
}

const Timer = ({ clickedSession,onExpired }: TTimer) => {
    const [timeLeft, setTimeLeft] = useState(0)
    const { expiresAt, setSelectedSeats, setExpiresAt, setHoldError, setSeatMap } = useTicketContext()

    //CountDown//
    useEffect(() => {
        if (!expiresAt){
            setTimeLeft(0)
            return
        }
        let hasExpired=false

        const updateTimer = () => {
            const remaining = Math.max(
                0,
                Math.ceil(
                    (new Date(expiresAt).getTime() - Date.now()) / 1000
                )
            )

            setTimeLeft(remaining)

            if (remaining === 0&&!hasExpired) {
                hasExpired=true
                const holdId=localStorage.getItem("activeHoldId")
                localStorage.removeItem("activeHoldId")
                if(holdId){
                    CancelHold(holdId).catch(console.error)
                }
                setSelectedSeats([])
                setExpiresAt(null)
                setHoldError("Your hold time expired. Please re-select your seats.")

                if (clickedSession) {
                    GetSeatMap(clickedSession.id)
                        .then(setSeatMap)
                        .catch(console.error)
                }
                onExpired()
            }
        }

        updateTimer()

        const interval = setInterval(updateTimer, 1000)

        return () => clearInterval(interval)
    }, [expiresAt, clickedSession, onExpired])

    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    return (<div className="bg-[#2A2C3D] rounded-2xl flex flex-col items-center text-[14px] p-3">
        <p className="text-[#A9A9A9]"> SEATS HELD</p>
        <p> {minutes}:{seconds.toString().padStart(2, "0")} </p>
    </div>
    )
}
export default Timer