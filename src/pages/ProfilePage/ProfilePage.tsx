import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import ProfilePageHeader from "./__components/ProfilePageHeader"
import type { TOrder } from "../../types/completeOrder"
import useAuthContext from "../../hooks/useAuthContext"
import useAppContext from "../../hooks/useAppContext"

const ProfilePage = () => {
     const [Myorders, setMyOrders] = useState<TOrder[]>([])

     const {user}=useAuthContext()
     const {setIsAuthModalOpen,isAuthModalOpen}=useAppContext()
     
     useEffect(() => {
        if (!user&&!isAuthModalOpen) {
            setIsAuthModalOpen("Log In")
        }
    }, [user, isAuthModalOpen, setIsAuthModalOpen])

    return (
        <div className="bg-[#070c1c] flex flex-col gap-7 w-full min-h-screen text-white pt-30 pl-10 pr-10 pb-15">
            {user&&!isAuthModalOpen&&<>
            <ProfilePageHeader MyOrders={Myorders} />

            <Outlet context={{ Myorders, setMyOrders }}/></>
            }
        </div>)
}
export default ProfilePage