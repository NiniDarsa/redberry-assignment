import useAuthContext from "../../hooks/useAuthContext"

const Person = () => {
    const { user } = useAuthContext()

    return (
        <div className="relative w-10 h-10">
            {user?.data.avatar ? (
                <img
                    className="w-full h-full rounded-2xl object-cover"
                    src={user.data.avatar}
                    alt={user.data.username}
                />
            ) : (
                <div className="bg-[#1E2031] text-white w-full h-full rounded-xl flex justify-center items-center">
                    <h3>
                        {user?.data.username
                            ?.split(" ")
                            .map((name) => name.charAt(0).toUpperCase())
                            .join("")}
                    </h3>
                </div>
            )}

            {!user?.data.profileComplete ? (
                <svg
                    className="absolute -bottom-0.5 -right-0.5"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="5"
                        cy="5"
                        r="4.5"
                        fill="#E27E04"
                        stroke="#070C1C"
                    />
                </svg>
            ) : (
                <svg
                    className="absolute -bottom-0.5 -right-0.5"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clipPath="url(#clip0_1973_3616)">
                        <circle cx="5" cy="5" r="4" fill="#4ADE80" />
                    </g>
                    <rect
                        x="0.5"
                        y="0.5"
                        width="9"
                        height="9"
                        rx="4.5"
                        stroke="#070C1C"
                    />
                    <defs>
                        <clipPath id="clip0_1973_3616">
                            <rect
                                x="1"
                                y="1"
                                width="8"
                                height="8"
                                rx="4"
                                fill="white"
                            />
                        </clipPath>
                    </defs>
                </svg>
            )}
        </div>
    )
}

export default Person