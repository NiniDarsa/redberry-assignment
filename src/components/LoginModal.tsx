import { useState } from "react"
import ModalHeader from "./ModalHeader"
import AuthForm from "./AuthForm"

const LoginModal = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="bg-[#070C1C] rounded-3xl w-101 h-105 p-8 text-white">
            <ModalHeader name="Log in" />



            <AuthForm email={email} setEmail={setEmail}
                password={password} setPassword={setPassword}
                name="Log In"
            />
        </div>)


}
export default LoginModal