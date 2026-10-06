import { Outlet } from "react-router-dom"
import ProfilePageHeader from "./ProfilePageHeader"

const ProfilePage = () => {


    return (
        <div className="bg-[#070c1c] flex flex-col gap-7 w-full min-h-screen text-white pt-30 pl-10 pr-10 pb-15">
            <ProfilePageHeader />

            <Outlet/>

        </div>)
}
export default ProfilePage