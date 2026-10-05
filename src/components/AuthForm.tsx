import { useEffect, useMemo, useState } from "react"
import { GetUser, Login, Signup } from "../functions/function"

type TAuthForm = {
    userName?: string,
    setUserName?: (name: string) => void

    email: string,
    setEmail: (name: string) => void

    password: string,
    setPassword: (name: string) => void

    confirmPassword?: string,
    setConfirmPassword?: (name: string) => void

    name: string,

    setIsModalOpen: React.Dispatch<React.SetStateAction<"" | "Sign Up" | "Log In">>

    avatar?: File | null



}

const AuthForm = ({ userName, setUserName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, name, setIsModalOpen, avatar }: TAuthForm) => {

    const [passwordError, setPasswordError] = useState("")
    const [loginError, setLoginError] = useState("")
    const [signupError, setSignUpError] = useState<{ username?: string[], email?: string[] }>({})


    let isFormFilled = useMemo(() => {
        if (name === "Sign Up") {
            return !!userName && !!email && !!password && !!confirmPassword

        } else {
            return !!email && !!password

        }
    }, [userName, email, password, confirmPassword])



    useEffect(() => {
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match")
        } else {
            setPasswordError("")
        }
    }, [password, confirmPassword])



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
            // GetUser()
            setIsModalOpen("")
        } catch (err: any) {
            setPassword("")
            if (err.status === 401) {
                setLoginError(err.message)
            }
        }
    }


    const signupButtonClick = async () => {
        try {
            setSignUpError({})
            const data = await Signup(userName, email, password, confirmPassword, avatar)
            console.log("SIGNUP DATA", data)
            console.log("TOKEN", data.data?.token)
            localStorage.setItem("token", data.data.token)
            // GetUser()
            console.log("STORED TOKEN:", localStorage.getItem("token")) 
            setIsModalOpen("")
        } catch (err: any) {
            if (err.status === 422) {
                setSignUpError(err.errors)
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
                <input
                    className="bg-[#1E2031] p-2 pl-3 rounded-xl"
                    type="username" id="username" name="username"
                    required
                    minLength={3}
                    value={userName}
                    onChange={(e) => setUserName && setUserName(e.target.value)}
                />
                {signupError.username && <p className="text-[#EC3013]">{signupError.username}</p>}

            </div>}



            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-[14px]">Email</label>
                <input
                    className="bg-[#1E2031] p-2 pl-3 rounded-xl"
                    type="email" id="email" name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {signupError.email && <p className="text-[#EC3013]">{signupError.email}</p>}
            </div>




            <div className="flex gap-4">
                <div className={`${name === "Log In" ? "w-full" : ""} flex flex-col gap-1`}>
                    <label htmlFor="password" className="text-[14px]">password</label>
                    <input
                        className="bg-[#1E2031] p-2 pl-3 rounded-xl"
                        type="password" id="password" name="password"
                        required
                        minLength={3}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {loginError && <p className="text-[#EC3013]">{loginError}</p>}
                </div>

                {name === "Sign Up" && <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-[14px]">Confirm password</label>
                    <input
                        className={`bg-[#1E2031] p-2 pl-3 rounded-xl ${passwordError ? "border border-[#EC3013]" : ""
                            }`}
                        type="password" id="password" name="password"
                        required
                        minLength={3}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword && setConfirmPassword(e.target.value)}
                    />
                    {passwordError && <p className="text-[#EC3013]">{passwordError}</p>}
                </div>}



            </div>

            <button
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