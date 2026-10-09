import { Outlet } from "react-router-dom"
import ProfilePageHeader from "./ProfilePageHeader"
import { useState } from "react"
import type { TOrder } from "../types/completeOrder"

const ProfilePage = () => {
     const [Myorders, setMyOrders] = useState<TOrder[]>([])


    return (
        <div className="bg-[#070c1c] flex flex-col gap-7 w-full min-h-screen text-white pt-30 pl-10 pr-10 pb-15">
            <ProfilePageHeader MyOrders={Myorders} />

            <Outlet context={{ Myorders, setMyOrders }}/>

        </div>)
}
export default ProfilePage