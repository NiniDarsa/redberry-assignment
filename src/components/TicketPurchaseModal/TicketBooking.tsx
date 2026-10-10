import { useCallback, useEffect} from "react"
import type { TSession } from "../../types/sessionDetail"
import type { THold } from "../../types/holdSeats"
import useTicketContext from "../../hooks/useTicketContext"
import { CancelHold, GetHold, GetSeatMap } from "../../functions/function"
import Timer from "./Timer"
import TicketButtonsContainer from "./TicketButtonsContainer"
import SeatsMap from "./SeatsMap"
import Checkout from "./Checkout"
import Pay from "./Pay"
import useTicketPurchaseContext from "../../hooks/useTicketPurchaseContext"


type TTicketBooking = {
    isModalOpen: boolean
    clickedSession: TSession | undefined
    name: string | undefined
    MovieAge: number | undefined
   
}

const TicketBooking = ({ clickedSession, name, MovieAge, isModalOpen,  }: TTicketBooking) => {
    const { setSelectedSeats, setExpiresAt, setHoldError, setSeatMap } = useTicketContext()
    const {setHoldSeatsData,setCurrentLocation,currentLocation,}=useTicketPurchaseContext()

    const handleHoldExpired=useCallback(()=>{
        setHoldSeatsData(undefined)
        setCurrentLocation("seats")
    },[])

    // Restore a previously created hold after reopening the modal or refreshing
    useEffect(() => {
        if (!isModalOpen || !clickedSession) return

        const restoreHold = async () => {
            const holdId = localStorage.getItem("activeHoldId")

            if (!holdId) return

            try {
                const hold: THold = await GetHold(holdId)

                // Make sure this hold belongs to the session being booked
                if (hold.sessionId !== clickedSession.id){
                    await CancelHold(holdId).catch(console.error)
                    localStorage.removeItem("acviteHoldId")
                    return
                }

                if (!hold.isLive || hold.secondsRemaining <= 0) {
                    localStorage.removeItem("activeHoldId")
                    setHoldSeatsData(undefined)
                    setSelectedSeats([])
                    setExpiresAt(null)
                    setCurrentLocation("seats")
                    setHoldError(
                        "Your hold time expired. Please re-select your seats."
                    )

                    const seatMap = await GetSeatMap(clickedSession.id)
                    setSeatMap(seatMap)
                    return
                }

                //  Restore the live hold and its original expiry
                setHoldSeatsData(hold)
                setExpiresAt(hold.expiresAt)

                //  Restore the selected seats and ticket types
                setSelectedSeats(
                    hold.seats.map((seat) => ({
                        seatId: seat.seatId,
                        ticketType: seat.ticketType.slug as "adult" | "student" | "child",
                    }))
                )

                setCurrentLocation("checkout")
            } catch (error) {
                const holdError = error as { status?: number }

                // 404 means the saved hold no longer exists
                if (holdError.status === 404) {
                    localStorage.removeItem("activeHoldId")
                    setHoldSeatsData(undefined)
                    setSelectedSeats([])
                    setExpiresAt(null)
                    setCurrentLocation("seats")
                } else {
                    console.error("Could not restore hold:", error)
                }
            }
        }

        restoreHold()
    }, [
        isModalOpen,
        clickedSession,
        setSelectedSeats,
        setExpiresAt,
        setHoldError,
        setSeatMap,
    ])


    const handleCurrentLocation = (name: "seats" | "checkout") => {
        setCurrentLocation(name)
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
            <Timer clickedSession={clickedSession} onExpired={handleHoldExpired} />

        </div>

        <div className="flex gap-2 flex-1 min-h-0 overflow-hidden" >
            <div className="flex-4 flex flex-col gap-5 min-h-0 overflow-scroll">
                <TicketButtonsContainer currentLocation={currentLocation} />

                <div className="flex flex-col gap-2">
                    {currentLocation === "seats" ?
                        <SeatsMap isModalOpen={isModalOpen} clickedSession={clickedSession} />
                        : <Checkout/>
                    }
                </div>

            </div>

            <Pay clickedSession={clickedSession} MovieAge={MovieAge} handleCurrentLocation={handleCurrentLocation} name={name}  />

        </div>

    </>)
}
export default TicketBooking