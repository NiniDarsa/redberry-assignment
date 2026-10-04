type TAuthForm={
    userName?:string,
    setUserName?:(name:string)=>void

    email:string,
    setEmail:(name:string)=>void

    password:string,
    setPassword:(name:string)=>void
  
    confirmPassword?:string,
    setConfirmPassword?:(name:string)=>void

    name:string

}

const AuthForm = ({ userName, setUserName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, name }:TAuthForm) => {

    return (<form className="flex flex-col gap-5">
        {name === "Sign Up" && <div className="flex flex-col gap-1">
            <label htmlFor="username">username</label>
            <input
                className="bg-[#1E2031] p-2 pl-3 rounded-xl"
                type="username" id="username" name="username"
                value={userName}
                onChange={(e) =>setUserName&&setUserName(e.target.value)}
            />

        </div>}



        <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
                className="bg-[#1E2031] p-2 pl-3 rounded-xl"
                type="email" id="email" name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

        </div>
        <div className="flex gap-4">
            <div className={`${name === "Log In" ? "w-full" : ""} flex flex-col gap-1`}>
                <label htmlFor="password">password</label>
                <input
                    className="bg-[#1E2031] p-2 pl-3 rounded-xl"
                    type="password" id="password" name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {name === "Sign Up" && <div className="flex flex-col gap-1">
                <label htmlFor="password">password</label>
                <input
                    className="bg-[#1E2031] p-2 pl-3 rounded-xl"
                    type="password" id="password" name="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword&&setConfirmPassword(e.target.value)}
                />
            </div>}



        </div>

        <button
            className={`text-[#A9A9A9] rounded-2xl p-2 mt-5 cursor-pointer ${name === "Sign Up" ? "bg-[#505261]" : "bg-[#EC3013]"
                }`}
        >
            {name}
        </button>
        <div className="text-[#A9A9A9] text-center">Don't have an account? <span className="text-[#EC3013] cursor-pointer">{name === "Log In" ? "Sign Up" : "Log In"}</span></div>


    </form>)
}
export default AuthForm