import { useRef } from "react"
import LoginModal from "./LoginModal"
import SignUpModal from "./SignUpModal"

type Tmodal={
    isModalOpen:"Log In"|"Sign Up",
    setIsModalOpen:React.Dispatch<React.SetStateAction<"" | "Sign Up" | "Log In">>
    setToken: React.Dispatch<React.SetStateAction<string | null>>

}

const Modal=({isModalOpen, setIsModalOpen,setToken}:Tmodal)=>{
    const element=useRef(null)

    const HideModal=(e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
       
        if(e.target===element.current){
         setIsModalOpen("")
        }
    }
    
    return (<div 
    ref={element}
    onClick={(e)=>HideModal(e)}
    className="fixed inset-0 z-50 bg-[#1E2031]/50 flex items-center justify-center">
        <div >
          {isModalOpen==="Log In"?
          <LoginModal setIsModalOpen={setIsModalOpen}
          setToken={setToken}/>
          :<SignUpModal setIsModalOpen={setIsModalOpen}
          setToken={setToken}
          />}
        </div>
    </div>)
}
export default Modal