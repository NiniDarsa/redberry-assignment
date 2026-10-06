import { useMemo, useState } from "react"
import useAuthContext from "../hooks/useAuthContext"
import { useFilterOptions } from "../hooks/useFilterOptions"
import type { TVenue } from "../types/filters"

const ProfilePage = () => {
 
    const [selectVenue, setSelectVenue] = useState("")
    const{name,setName,mobile,setMobile,dateOfBirth,setDateOfBirth,isProfileComplete}=useAuthContext()

    const [errors, setErrors] = useState({
        name: "",
        mobile: "",
        dateOfBirth: "",
    })

    const [isLoading, setIsLoading] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)

    console.log(errors)

    const { user } = useAuthContext()
    const [filterOptions] = useFilterOptions()

    const validateForm = () => {
        const newErrors = {
            name: "",
            mobile: "",
            dateOfBirth: "",
        }

        if (!name.trim()) {
            newErrors.name = "Name is required"
        } else if (name.trim().length < 3) {
            newErrors.name = "Name must be at least 3 characters"
        } else if (name.trim().length > 50) {
            newErrors.name = "Name must not exceed 50 characters"
        }


        if (!mobile) {
            newErrors.mobile = "Mobile number is required"
        } else if (!mobile.startsWith("5")) {
            newErrors.mobile =
                "Georgian mobile numbers must start with 5"
        } else if (mobile.length !== 9) {
            newErrors.mobile =
                "Mobile number must be exactly 9 digits"
        } else if (!/^\d+$/.test(mobile)) {
            newErrors.mobile =
                "Please enter a valid Georgian mobile number (9 digits starting with 5)"
        }



        if (!dateOfBirth) {
            newErrors.dateOfBirth = "Date of birth is required"
        } else {
            const birthDate = new Date(dateOfBirth)
            const today = new Date()

            const minimumBirthDate = new Date(
                today.getFullYear() - 12,
                today.getMonth(),
                today.getDate()
            )

            if (birthDate > today) {
                newErrors.dateOfBirth = "Please enter a valid date of birth"
            } else if (birthDate > minimumBirthDate) {
                newErrors.dateOfBirth =
                    "You must be at least 12 years old"
            }
        }

        setErrors(newErrors)

        return !Object.values(newErrors).some(
            (error) => error !== ""
        )
    }




    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const isValid = validateForm()

        if (!isValid) {
            return
        }

        console.log("Form is valid")

        setIsLoading(true)

        try {
            // your API request will go here

            console.log("Profile saved")

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


            {isProfileComplete ? (
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

                    {errors.name && (
                        <p className="text-red-500 text-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#EC3013] rounded-full" />
                            {errors.name}
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
                    {errors.mobile && (
                        <p className="text-red-500 text-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#EC3013] rounded-full" />
                            {errors.mobile}
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
                            value={selectVenue}
                            onChange={(e) => { setSelectVenue(e.target.value), setHasChanges(true) }}
                            name="preferedVenue"
                            id="preferredVenue"
                            className="bg-[#1E2031] rounded-md px-3 py-2 pr-10 appearance-none w-full"
                        >
                            {/* <option value="" hidden>
                                Select a venue
                            </option> */}

                            {filterOptions?.venues.map((item: TVenue) => {
                                return <option value={item.name}>{item.name}</option>

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
                    disabled={!hasChanges || !isProfileComplete || isLoading}
                    className={`text-white mt-4 p-2 px-10 rounded-3xl text-center w-fit ${!hasChanges || !isProfileComplete || isLoading
                        ? "bg-[#505261] cursor-not-allowed"
                        : "bg-[#EC3013] cursor-pointer"
                        }`}>  {isLoading ? "Saving..." : "Save changes"}</button>
            </form>



        </div>)
}
export default ProfilePage