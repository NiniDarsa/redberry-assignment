import { useMemo, useState } from "react"
import { FieldCheck, Login, Signup } from "../functions/function"
import useAuthContext from "../hooks/useAuthContext"

type TAuthForm = {
    userName?: string,
    setUserName?: (name: string) => void

    email: string,
    setEmail: (name: string) => void

    password: string,
    setPassword: (name: string) => void

    confirmPassword?: string,
    setConfirmPassword?: (name: string) => void

    name: "Sign Up" | "Log In",

    setIsModalOpen: React.Dispatch<React.SetStateAction<"" | "Sign Up" | "Log In">>

    avatar?: File | null



}

const AuthForm = ({ userName, setUserName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, name, setIsModalOpen, avatar }: TAuthForm) => {

    const [loginError, setLoginError] = useState("")
    console.log(loginError)
    const [signupError, setSignUpError] = useState<{
        username?: string[]
        email?: string[]
        password?: string[]
        password_confirmation?: string[]
        avatar?: string[]
    }>({})

    const { fetchUser } = useAuthContext()


    let isFormFilled = useMemo(() => {
        if (name === "Sign Up") {
            return !!userName && !!email && !!password && !!confirmPassword

        } else {
            return !!email && !!password

        }
    }, [userName, email, password, confirmPassword])



    //Login and signup button clicks
    const loginButtonClick = async () => {
        try {
            setLoginError("")
            const data = await Login({ email, password })
            console.log("LOGIN DATA", data)
            console.log("TOKEN", data.data?.token)
            //Store the token and send it as Authorization: Bearer <token> on every protected request
            //so after succesfull login I have:
            localStorage.setItem("token", data.data.token)
            await fetchUser()
            setIsModalOpen("")
        } catch (err: any) {
            setPassword("")
            setLoginError(err.message)

        }
    }


    const signupButtonClick = async () => {
        try {
            setSignUpError({})
            const data = await Signup(userName, email, password, confirmPassword, avatar)
            console.log("SIGNUP DATA", data)
            console.log("TOKEN", data.data?.token)
            localStorage.setItem("token", data.data.token)
            await fetchUser()
            console.log("STORED TOKEN:", localStorage.getItem("token"))
            setIsModalOpen("")
        } catch (err: any) {
            if (err.status === 422) {
                setSignUpError(err.errors ?? {})
            }
        }
    }



    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            if (name === "Log In") {
                loginButtonClick()
            } else {
                signupButtonClick()
            }
        }}
            className="flex flex-col gap-5">
            {name === "Sign Up" && <div className="flex flex-col gap-1">
                <label htmlFor="username" className="text-[14px]">username</label>
                <div className="relative">
                    <input
                        className={`bg-[#1E2031] p-2 pl-3 rounded-xl border ${signupError.username ? "border-[#EC3013]" : "border-transparent"
                            } w-full`}
                        type="text" id="username" name="username"

                        value={userName ?? ""}
                        onChange={(e) => setUserName && setUserName(e.target.value)}
                    />
                    <FieldCheck valid={!!userName?.trim() && !signupError.username} />
                </div>
                {signupError.username && <p className="text-[#EC3013]">{signupError.username[0]}</p>}

            </div>}



            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-[14px]">Email</label>
                <div className="relative">
                    <input
                        className={`bg-[#1E2031] p-2 pl-3 rounded-xl border ${signupError.email || loginError
                            ? "border-[#EC3013]"
                            : "border-transparent"
                            } w-full`}
                        type="email" id="email" name="email"

                        value={email}
                        onChange={(e) => { setEmail(e.target.value), setLoginError("") }}
                    />
                    <FieldCheck
                        valid={
                            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
                            !signupError.email
                        } />
                </div>
                {signupError.email && <p className="text-[#EC3013]">{signupError.email[0]}</p>}
            </div>




            <div className="flex gap-4">
                <div className={`${name === "Log In" ? "w-full" : ""} flex flex-col gap-1`}>
                    <label htmlFor="password" className="text-[14px]">password</label>
                    <div className="relative">
                        <input
                            className={`bg-[#1E2031] p-2 pl-3 rounded-xl border ${loginError || signupError.password
                                ? "border-[#EC3013]"
                                : "border-transparent"
                                } w-full`}
                            type="password" id="password" name="password"

                            value={password}
                            onChange={(e) => { setPassword(e.target.value), setLoginError("") }}
                        />
                        <FieldCheck
                            valid={
                                password.length >= 8 &&
                                !(name === "Sign Up" && signupError.password)
                            }
                        />
                    </div>
                    {loginError && <p className="text-[#EC3013]">{loginError}</p>}
                    {name === "Sign Up" && signupError.password && (<p className="text-[#EC3013]">{signupError.password[0]}</p>)}
                </div>



                {name === "Sign Up" && <div className="flex flex-col gap-1">
                    <label htmlFor="password_confirmation" className="text-[14px]">Confirm password</label>
                    <div className="relative">
                        <input
                            className={`bg-[#1E2031] p-2 pl-3 rounded-xl border ${signupError.password_confirmation
                                ? "border-[#EC3013] w-full"
                                : "border-transparent"
                                }`}
                            type="password" id="password_confirmation" name="password_confirmation"

                            value={confirmPassword ?? ""}
                            onChange={(e) => setConfirmPassword && setConfirmPassword(e.target.value)}
                        />
                        <FieldCheck
                            valid={
                                !!password &&
                                password === confirmPassword &&
                                !signupError.password_confirmation
                            }
                        />
                    </div>
                    {signupError.password_confirmation && <p className="text-[#EC3013]">{signupError.password_confirmation[0]}</p>}
                </div>}



            </div>

            <button
                type="submit"
                disabled={!isFormFilled}
                className={`text-[#A9A9A9] rounded-2xl p-2 mt-5 cursor-pointer ${isFormFilled
                    ? "bg-[#EC3013] text-white"
                    : "bg-[#505261] text-[#A9A9A9]"
                    }`}
            >
                {name}
            </button>
            <div className="text-[#A9A9A9] text-center flex justify-center gap-2">
                <span>
                    {name === "Log In" ? "Don't have an account?" : "Already have an account?"}
                </span>
                <span
                    onClick={name === "Log In" ? () => setIsModalOpen("Sign Up") : () => setIsModalOpen("Log In")}
                    className="text-[#EC3013] cursor-pointer">{name === "Log In" ? "Sign Up" : "Log In"}
                </span>
            </div>


        </form>)
}
export default AuthForm