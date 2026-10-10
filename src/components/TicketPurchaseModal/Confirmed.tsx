import { useNavigate } from "react-router-dom"
import useTicketPurchaseContext from "../../hooks/useTicketPurchaseContext"





const Confirmed = () => {
    const {order}=useTicketPurchaseContext()
    const navigate = useNavigate()
    return (<div className="w-full h-full flex flex-col items-center gap-10">
        <div className="flex flex-col gap-2 items-center">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="56" height="56" rx="28" fill="#4ADE80" />
                <path d="M18.667 26.6663L26.667 34.6663L40.0003 21.333" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p> Booking Confirmed! </p>
            <p className="text-[12px] text-[#A9A9A9] text-center">Your tickets are ready. We've sent the confirmation to your email.</p>
            <p className="bg-[#2A2C3D] rounded-2xl p-1 px-4">ORDER {order?.reference}</p>
        </div>
        <div className="bg-[#1E2031] w-168 h-60   rounded-2xl p-5 flex justify-between gap-2 flex-col">
            <div className="flex border-b border-[#2A2C3D] gap-5 pb-2">
                <img className="h-16 rounded-2xl" src={order?.session.movie.posterUrl} />
                <div>
                    <h2>{order?.session.movie.title}</h2>
                    <p className="text-[12px] text-[#A9A9A9]"> {order?.session.venue.name} . Hall {order?.session.hall.name}  . {order?.session.time}
                    </p>

                </div>
            </div>
        
            <div className="flex justify-between">
                <span className="text-[#A9A9A9]">Seats</span>

                <div className="flex gap-2">
                    {order?.tickets.map((ticket) => (
                        <span key={ticket.id}>
                            {ticket.seatCode}
                        </span>
                    ))}
                </div>
            </div>

         
            <div className="flex justify-between">
                <span className="text-[#A9A9A9]">Tickets</span>

                <div className="flex gap-2">
                    <span>
                        {order?.tickets.length} × Adult
                    </span>
                </div>
            </div>

            <div className="flex justify-between border-t border-[#2A2C3D] pt-4">
                <span className="text-[#A9A9A9]">Total Paid</span>
                <span>₾ {order?.totalPrice} </span>
            </div>

        </div>
        <div className="flex gap-5">
            <button
                onClick={() => navigate("/profile/tickets")}
                className="rounded-3xl py-2 px-5 bg-[#EC3013] cursor-pointer">View my tickets</button>
            <button
                onClick={() => navigate("/")}
                className="rounded-3xl py-2 px-5 bg-[#2A2C3D] cursor-pointer">Back to home</button>
        </div>
    </div>)
}
export default Confirmed
