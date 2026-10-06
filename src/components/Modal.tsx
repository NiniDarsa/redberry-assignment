import { useRef } from "react"
import LoginModal from "./LoginModal"
import SignUpModal from "./SignUpModal"
import useAppContext from "../hooks/useAppContext"


const Modal=()=>{
    const {isAuthModalOpen:isModalOpen, setIsAuthModalOpen:setIsModalOpen}=useAppContext()
    const element=useRef<HTMLDivElement>(null)


    const HideModal=(e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
       
        if(e.target===element.current){
         setIsModalOpen("")
        }
    }
    
    return (<>
    {isModalOpen&&<div 
    ref={element}
    onClick={(e)=>HideModal(e)}
    className="fixed inset-0 z-50 bg-[#1E2031]/50 flex items-center justify-center">
        <div >
          {isModalOpen==="Log In"?
          <LoginModal setIsModalOpen={setIsModalOpen}
          />
          :<SignUpModal setIsModalOpen={setIsModalOpen}
        
          />}
        </div>
    </div>}</>
)
}
export default Modal