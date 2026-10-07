import { useNavigate } from "react-router-dom"

const ProfilePageHeader=()=>{
     const navigate = useNavigate()
    return(
      <div className="flex flex-col items-start gap-5 pb-6 border-b border-[#1E2031]">
                <h2 className="font-extrabold">My Profile</h2>
                <div className="flex items-center gap-5">
                    <button 
                    className="cursor-pointer"
                    onClick={() => navigate("/profile/personalinfo")}>Personal Information</button>
                    <div className="flex justify-between items-center gap-2">
                        <button 
                        className="cursor-pointer"
                        onClick={() => navigate("/profile/tickets")}>My Tickets</button>
                        <p className="bg-[#EC3013] rounded-2xl w-4.5 h-4.5 flex justify-center items-center text-[12px]">2</p>
                    </div>
                </div>
            </div>
    )
}
export default ProfilePageHeader