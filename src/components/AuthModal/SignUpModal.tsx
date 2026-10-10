import { useState } from "react"
import ModalHeader from "./ModalHeader"
import Avatar from "../Avatar"
import AuthForm from "./AuthForm"



const SignUpModal = ({ setIsModalOpen }: {
    setIsModalOpen: React.Dispatch<React.SetStateAction<"" | "Sign Up" | "Log In">>

}) => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [avatar, setAvatar] = useState<File | null>(null)
   



    return (<div className="bg-[#070C1C] rounded-3xl w-120  p-8 text-white">
        <ModalHeader name="Sign Up" setIsModalOpen={setIsModalOpen} />
        <Avatar avatar={avatar} setAvatar={setAvatar}/>
        <AuthForm userName={userName} setUserName={setUserName} email={email} setEmail={setEmail}
            password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
            name="Sign Up"
            setIsModalOpen={setIsModalOpen}
            avatar={avatar}
          
        />

    </div>)
}
export default SignUpModal