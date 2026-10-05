import { useState } from "react"
import ModalHeader from "./ModalHeader"
import AuthForm from "./AuthForm"
import Avatar from "./Avatar"

const SignUpModal = ({ setIsModalOpen, setToken }: {
    setIsModalOpen: React.Dispatch<React.SetStateAction<"" | "Sign Up" | "Log In">>
    setToken: React.Dispatch<React.SetStateAction<string | null>>

}) => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [avatar, setAvatar] = useState<File | null>(null)
   



    return (<div className="bg-[#070C1C] rounded-3xl w-120 h-140 p-8 text-white">
        <ModalHeader name="Sign Up" setIsModalOpen={setIsModalOpen} />
        <Avatar avatar={avatar} setAvatar={setAvatar}/>
        <AuthForm userName={userName} setUserName={setUserName} email={email} setEmail={setEmail}
            password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
            name="Sign Up"
            setIsModalOpen={setIsModalOpen}
            avatar={avatar}
            setToken={setToken}
        />

    </div>)
}
export default SignUpModal