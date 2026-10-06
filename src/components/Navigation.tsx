import useSessionsContext from "../hooks/useSessionsContext"
import AuthButtons from "./AuthButtons"
import Person from "./Person"
import useAppContext from "../hooks/useAppContext"
import useAuthContext from "../hooks/useAuthContext"




const Navigation = () => {
    const { search, setSearch } = useSessionsContext()
    const {user}=useAuthContext()
    const{AuthModalOpen:ModalOpen, ProfileModalOpen,isProfileModalOpen  }=useAppContext()
   


    return (<div className="absolute z-10 w-[100vw] flex justify-between items-center pl-15 pr-15 pt-5  text-white">
        <div className="flex flex-3 items-baseline gap-4">
            <h1 className="font-extrabold">KINO <span className="text-[#EC3013]">XII</span></h1>
            <p className="font-semibold text-[20px]">sessions</p>
        </div>

        <div className="flex flex-2 justify-between items-baseline gap-3">
            <div className="relative w-[24vw] flex-3  h-full ">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="search films and live events" className="bg-[#FFFFFF]/10 rounded-full w-full px-10 py-2   "></input>
                <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 "
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9.21867 9.21867L12.25 12.25M10.5 6.125C10.5 8.54125 8.54125 10.5 6.125 10.5C3.70875 10.5 1.75 8.54125 1.75 6.125C1.75 3.70875 3.70875 1.75 6.125 1.75C8.54125 1.75 10.5 3.70875 10.5 6.125Z"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

           {user?
           <div className="flex flex-1 gap-2 justify-between items-center">
                <Person />

                <p className="text-[14px]">{user.data.username}</p>
                <button
                    className="cursor-pointer"
                    onClick={() => ProfileModalOpen(true)}
                >
                    {!isProfileModalOpen ?
                        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.8014 0.137169L5.803 5.00904L0.804564 0.137169C0.715288 0.0502196 0.595591 0.0015626 0.47097 0.0015626C0.346349 0.0015626 0.226652 0.0502196 0.137376 0.137169C0.0939067 0.179401 0.0593513 0.229924 0.0357547 0.285748C0.0121581 0.341573 0 0.401563 0 0.46217C0 0.522776 0.0121581 0.582766 0.0357547 0.63859C0.0593513 0.694414 0.0939067 0.744937 0.137376 0.787169L5.45456 5.96998C5.54789 6.06066 5.67288 6.11139 5.803 6.11139C5.93312 6.11139 6.05812 6.06066 6.15144 5.96998L11.4686 0.787169C11.5123 0.744914 11.5471 0.694294 11.5708 0.638326C11.5946 0.582357 11.6068 0.522183 11.6068 0.461388C11.6068 0.400593 11.5946 0.340419 11.5708 0.284451C11.5471 0.228482 11.5123 0.177862 11.4686 0.135607C11.3793 0.048657 11.2597 0 11.135 0C11.0104 0 10.8907 0.048657 10.8014 0.135607V0.137169Z" fill="white" />
                        </svg> :
                        <svg
                            className="rotate-180"
                            width="12"
                            height="7"
                            viewBox="0 0 12 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8014 0.137169L5.803 5.00904L0.804564 0.137169C0.715288 0.0502196 0.595591 0.0015626 0.47097 0.0015626C0.346349 0.0015626 0.226652 0.0502196 0.137376 0.137169C0.0939067 0.179401 0.0593513 0.229924 0.0357547 0.285748C0.0121581 0.341573 0 0.401563 0 0.46217C0 0.522776 0.0121581 0.582766 0.0357547 0.63859C0.0593513 0.694414 0.0939067 0.744937 0.137376 0.787169L5.45456 5.96998C5.54789 6.06066 5.67288 6.11139 5.803 6.11139C5.93312 6.11139 6.05812 6.06066 6.15144 5.96998L11.4686 0.787169C11.5123 0.744914 11.5471 0.694294 11.5708 0.638326C11.5946 0.582357 11.6068 0.522183 11.6068 0.461388C11.6068 0.400593 11.5946 0.340419 11.5708 0.284451C11.5471 0.228482 11.5123 0.177862 11.4686 0.135607C11.3793 0.048657 11.2597 0 11.135 0C11.0104 0 10.8907 0.048657 10.8014 0.135607V0.137169Z"
                                fill="white"
                            />
                        </svg>
                    }
                </button>
            </div>:<AuthButtons ModalOpen={ModalOpen} /> 
            
        }

            


        </div>

    </div>)
}
export default Navigation