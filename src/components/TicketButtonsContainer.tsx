type TTicketButtonsContainer={
    clickedButton:"seats"|"checkout"
    hanndleButtonClick: (name: "seats" | "checkout") => void
}

const TicketButtonsContainer=({clickedButton,hanndleButtonClick}:TTicketButtonsContainer)=>{
    return(<div className="flex bg-[#2A2C3D] rounded-2xl justify-around ">
                                    <button className={`cursor-pointer flex-1  overflow-hidden rounded-2xl py-1 ${clickedButton === "seats" ? "bg-[#EC3013]" : ""}`} onClick={() => hanndleButtonClick("seats")}> SEATS </button>
                                    <button className={`cursor-pointer flex-1 overflow-hidden rounded-2xl py-1 ${clickedButton === "checkout" ? "bg-[#EC3013]" : ""}`} onClick={() => hanndleButtonClick("checkout")}> CHECKOUT </button>
                                </div>)
}
export default TicketButtonsContainer
