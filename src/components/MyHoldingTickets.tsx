import useTicketContext from "../hooks/useTicketContext"
import type { TTicketType } from "./TicketPurchaseModal"

type TMyHoldingTickets={
    getTicketPrice: (ticketType: TTicketType) => number
}

const MyHoldingTickets = ({getTicketPrice}:TMyHoldingTickets) => {
const {selectedSeats,setSelectedSeats,seatMap}=useTicketContext()
     //change Ticket Type
       const handleTicketTypeChange = (seatId: number,ticketType: TTicketType) => {           
         const newSeats=selectedSeats.map((seat) =>{   
            if(seat.seatId===seatId){
                return {...seat,ticketType}
            }else{
                return seat
            }         
         })
            setSelectedSeats(newSeats)
        }

    return (<>
        <p className="font-extrabold">
            Your seats . Max 3
        </p>

        <p className="text-[#A9A9A9] text-[14px]">
            Pick up to 3 seats from the map. Each seat can carry its own ticket type.
        </p>


        <div className="flex flex-1 flex-col gap-3 mt-5 min-h-0 overflow-y-auto">

            {selectedSeats.map((selectedSeat) => {

                const selectedSeatInfo = seatMap?.sections
                    .flatMap((section) => section.rows)
                    .flatMap((row) =>
                        row.seats.map((seat) => ({
                            seat,
                            rowLabel: row.label,
                        }))
                    )
                    .find((item) => item.seat.id === selectedSeat.seatId)

                return (
                    <div
                        key={selectedSeat.seatId}
                        className="flex pb-3 flex-col  items-start p-5 bg-[#1E2031] rounded-2xl"
                    >
                        <div className="flex gap-30 ">
                            <p className="pb-3">
                                <span className="text-[#A9A9A9] mr-5">Seat</span>
                                {selectedSeatInfo?.rowLabel}{selectedSeatInfo?.seat.label}
                            </p>

                            <p className="text-[#A9A9A9] text-sm">
                                Price: ₾ {getTicketPrice(selectedSeat.ticketType)} 
                            </p>
                        </div>

                        <div className="flex justify-between w-full gap-2 text-[12px] pt-4 border-t border-[#2A2C3D]">
                           <button
                                type="button"
                                onClick={() => handleTicketTypeChange(selectedSeat.seatId, "child")}
                                className={`cursor-pointer px-3 py-2 rounded-3xl whitespace-nowrap ${selectedSeat.ticketType === "child"? "bg-[#EC3013]"  : "bg-[#2A2C3D]" }`}>
                                Child 60%
                            </button>

                            <button
                                type="button"
                                onClick={() =>handleTicketTypeChange(selectedSeat.seatId,"student")}
                                className={`cursor-pointer px-3 py-2 rounded-3xl whitespace-nowrap ${selectedSeat.ticketType === "student"? "bg-[#EC3013]" : "bg-[#2A2C3D]" }`}>
                                Student 75%
                            </button>

                            <button
                                type="button"
                                onClick={() =>handleTicketTypeChange(selectedSeat.seatId,"adult")}
                                className={`cursor-pointer px-3 py-2 rounded-3xl whitespace-nowrap ${selectedSeat.ticketType === "adult"? "bg-[#EC3013]" : "bg-[#2A2C3D]"}`}>
                                Adult 100%
                            </button>
                        </div>
                    </div>
                )
            })}

        </div>
    </>)
}
export default MyHoldingTickets