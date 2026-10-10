import type { THold } from "../../types/holdSeats"
import type { TSession } from "../../types/sessionDetail"


type TTicketSummary = {
    HoldSeatsdata: THold | undefined
    clickedSession: TSession | undefined
    name:string|undefined
    
}
const TicketSummary = ({ HoldSeatsdata, clickedSession,name }: TTicketSummary) => {
     
    const ticketCounts = HoldSeatsdata?.seats.reduce(
        (counts, seat) => {
            const type = seat.ticketType.name

            counts[type] = (counts[type] || 0) + 1

            return counts
        },
        {} as Record<string, number>
    )

    return (
        <div className="w-full h-full">
            <h1>Summary</h1>
            <div className="bg-[#1E2031] w-85 mt-5 rounded-2xl flex flex-col gap-4 p-4">
                <div>
                    <h2>{name}</h2>
                    <p className="border-b border-[#2A2C2D]">
                         Hall {clickedSession?.hall.name} . {clickedSession?.date} . {clickedSession?.time}                   
                    </p>
                </div>

                <div>
            <div className="flex justify-between">
                <span>seats: </span>
                <div className="flex gap-1">
                    {HoldSeatsdata?.seats.map((item) => {
                        return <span>{item.code}</span>

                    })}
                </div>
            </div>
            <div className="flex justify-between">Tickets:
                <span>
                    {Object.entries(ticketCounts || {}).map(
                        ([type, count], index, array) => (
                            <span key={type}>
                                {count}x {type}
                                {index < array.length - 1 && ", "}
                            </span>
                        )
                    )}
                </span>


            </div>
        </div>
                
            </div>
        </div>
    )
}
export default TicketSummary