import useAuthContext from "../hooks/useAuthContext"

const Person=()=>{
    const {user}=useAuthContext()
    console.warn("This", user)

    
    return(
    <>{
        user?.data.avatar?<img 
        className="w-10 h-10 rounded-2xl"
        src={user.data.avatar} alt={user.data.avatar}/>:
        <div className="relative bg-[#1E2031] text-white w-10 h-10 rounded-xl flex justify-center items-center">
                    <h3>{user?.data.username?.split(" ").map((name) => name.charAt(0).toUpperCase()) .join("")}</h3>
                    {!user?.data.profileComplete&&
                    <svg className="absolute -bottom-0.5 right-0" 
                    width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="5" cy="5" r="4.5" fill="#E27E04" stroke="#070C1C" />
                    </svg>}

                </div>
    }</>
    
    )
}
export default Person