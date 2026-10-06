import { useEffect, useState } from "react"
import useAuthContext from "../hooks/useAuthContext"
import { useFilterOptions } from "../hooks/useFilterOptions"
import type { TVenue } from "../types/filters"

const ProfilePage = () => {

    const { user,fetchUser } = useAuthContext()

    const [name, setName] = useState("")
    const [mobile, setMobile] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [selectVenue, setSelectVenue] = useState<string|null>(null)
    const [errors, setErrors] = useState({
        fullName: "",
        mobileNumber: "",
        dateOfBirth: "",
    })


    const [isLoading, setIsLoading] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)

    console.log(errors)

    const [filterOptions] = useFilterOptions()

    useEffect(() => {
        if (user?.data) {
            setName(user.data.fullName ?? "")
            setMobile(user.data.mobileNumber ?? "")
            setDateOfBirth(user.data.dateOfBirth ?? "")
            setSelectVenue(user.data.preferredVenue?.id)
        }
    }, [user])


  

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setErrors({
        fullName: "",
        mobileNumber: "",
        dateOfBirth: "",
    })

    const formData = new FormData()

    formData.append("fullName", name)
    formData.append("mobileNumber", mobile.replace(/\s/g, ""))
    formData.append("dateOfBirth", dateOfBirth)

    if (selectVenue) {
        formData.append("preferredVenueId", selectVenue)
    }

    setIsLoading(true)

    try {
        const response = await fetch(
            "https://api.kinoxii.redberryinternship.ge/api/profile",
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    Accept: "*/*",
                },
                body: formData,
            }
        )

        const result = await response.json()

        if (!response.ok) {
            if (response.status === 422) {
                setErrors({
                    fullName: result.errors?.fullName?.[0] ?? "",
                    mobileNumber: result.errors?.mobileNumber?.[0] ?? "",
                    dateOfBirth: result.errors?.dateOfBirth?.[0] ?? "",
                })
            }

            return
        }

        console.log("Profile saved", result)
        await fetchUser()
        setHasChanges(false)

    } finally {
        setIsLoading(false)
       
    }
}



    return (
        <div className="bg-[#070c1c] flex flex-col gap-7 w-full min-h-screen text-white pt-30 pl-10 pr-10">
            <div className="flex flex-col items-start gap-5 pb-6 border-b border-[#1E2031]">
                <h2 className="font-extrabold">My Profile</h2>
                <div className="flex items-center gap-5">
                    <button>Personal Information</button>
                    <div className="flex justify-between items-center gap-2">
                        <button>My Tickets</button>
                        <p className="bg-[#EC3013] rounded-2xl w-4.5 h-4.5 flex justify-center items-center text-[12px]">2</p>
                    </div>
                </div>
            </div>


            {user?.data.profileComplete ? (
                <p className="text-green-500">
                    Profile Complete ✓
                </p>
            ) : (
                <div>
                    <p>Incomplete</p>
                    <p className="text-[#A9A9A9]">
                        Please complete your profile to enable booking.
                    </p>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="w-[50%] flex flex-col gap-4  ">
                <>
                    <label htmlFor="fullname">Full name</label>
                    <input type="text" id="fullname" name="fullname" className="bg-[#1E2031] rounded-md p-1"
                        value={name}
                        onChange={(e) => { setName(e.target.value), setHasChanges(true) }}
                    />

                    {errors.fullName && (
                        <p className="text-red-500 text-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#EC3013] rounded-full" />
                            {errors.fullName}
                        </p>
                    )}
                </>

                <>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" className="bg-[#1E2031] rounded-md p-1"
                        value={user?.data.email}
                        readOnly
                    />
                </>

                <>
                    <label htmlFor="mobilenumber">Mobile number</label>
                    <input type="text" id="mobilenumber" name="mobilenumber" className="bg-[#1E2031] rounded-md p-1"
                        value={mobile}
                        onChange={(e) => { setMobile(e.target.value), setHasChanges(true) }}
                    />
                    {errors.mobileNumber && (
                        <p className="text-red-500 text-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#EC3013] rounded-full" />
                            {errors.mobileNumber}
                        </p>
                    )}
                </>

                <>
                    <label htmlFor="dateOfBirth">Date of birth</label>
                    <input type="date" id="dateOfBirth" name="dateOfBirth" className="bg-[#1E2031] rounded-md px-3 py-2  [&::-webkit-calendar-picker-indicator]:invert
                    [&::-webkit-calendar-picker-indicator]:opacity-70"
                        value={dateOfBirth}
                        onChange={(e) => { setDateOfBirth(e.target.value), setHasChanges(true) }}
                    />

                    {errors.dateOfBirth && (
                        <p className="text-red-500 text-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#EC3013] rounded-full" />
                            {errors.dateOfBirth}
                        </p>
                    )}
                </>

                <>
                    <label htmlFor="preferredVenue">Preferred venue (optional)</label>
                    <div className="relative">
                        <select
                            value={selectVenue||""}
                            onChange={(e) => { setSelectVenue(e.target.value), setHasChanges(true) }}
                            name="preferedVenue"
                            id="preferredVenue"
                            className="bg-[#1E2031] rounded-md px-3 py-2 pr-10 appearance-none w-full"
                        >

                            {filterOptions?.venues.map((item: TVenue) => {
                                return <option value={item.id}>{item.name}</option>

                            })}

                        </select>

                        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.8014 0.137169L5.803 5.00904L0.804564 0.137169C0.715288 0.0502196 0.595591 0.0015626 0.47097 0.0015626C0.346349 0.0015626 0.226652 0.0502196 0.137376 0.137169C0.0939067 0.179401 0.0593513 0.229924 0.0357547 0.285748C0.0121581 0.341573 0 0.401563 0 0.46217C0 0.522776 0.0121581 0.582766 0.0357547 0.63859C0.0593513 0.694414 0.0939067 0.744937 0.137376 0.787169L5.45456 5.96998C5.54789 6.06066 5.67288 6.11139 5.803 6.11139C5.93312 6.11139 6.05812 6.06066 6.15144 5.96998L11.4686 0.787169C11.5123 0.744914 11.5471 0.694294 11.5708 0.638326C11.5946 0.582357 11.6068 0.522183 11.6068 0.461388C11.6068 0.400593 11.5946 0.340419 11.5708 0.284451C11.5471 0.228482 11.5123 0.177862 11.4686 0.135607C11.3793 0.048657 11.2597 0 11.135 0C11.0104 0 10.8907 0.048657 10.8014 0.135607V0.137169Z" fill="white" />
                            </svg>

                        </span>
                    </div>
                </>

                <button
                    type="submit"
                    disabled={!hasChanges || isLoading}
                    className={`text-white mt-4 p-2 px-10 rounded-3xl text-center w-fit ${!hasChanges || isLoading
                        ? "bg-[#505261] cursor-not-allowed"
                        : "bg-[#EC3013] cursor-pointer"
                        }`}>  {isLoading ? "Saving..." : "Save changes"}</button>
            </form>



        </div>)
}
export default ProfilePage