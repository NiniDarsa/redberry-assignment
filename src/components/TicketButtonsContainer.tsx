type TTicketButtonsContainer={
    currentLocation:"seats"|"checkout"
}

const TicketButtonsContainer=({currentLocation}:TTicketButtonsContainer)=>{
    return(<div className="flex bg-[#2A2C3D] rounded-2xl justify-around ">
                                    <button className={`cursor-pointer flex-1  overflow-hidden rounded-2xl py-1 ${currentLocation === "seats" ? "bg-[#EC3013]" : ""}`} > SEATS </button>
                                    <button className={`cursor-pointer flex-1 overflow-hidden rounded-2xl py-1 ${currentLocation === "checkout" ? "bg-[#EC3013]" : ""}`}> CHECKOUT </button>
                                </div>)
}
export default TicketButtonsContainer
