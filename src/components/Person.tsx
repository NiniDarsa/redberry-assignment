import type { TUserResponse } from "../types/user"

const Person=({user}:{user:TUserResponse | undefined})=>{
    return(<div className="relative bg-[#1E2031] w-10 h-10 rounded-xl flex justify-center items-center">
                    <h3>  {user?.data.fullName?.split(" ").map((name) => name.charAt(0).toUpperCase()) .join("")}</h3>
                    <svg className="absolute -bottom-0.5 right-0" 
                    width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="5" cy="5" r="4.5" fill="#E27E04" stroke="#070C1C" />
                    </svg>

                </div>)
}
export default Person