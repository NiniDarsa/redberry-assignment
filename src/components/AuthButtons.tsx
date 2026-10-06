const AuthButtons=({ModalOpen}:{ModalOpen:(name:"Sign Up"|"Log In")=>void})=>{
    return( <div >
                <button 
                onClick={()=>ModalOpen("Sign Up")}
                className="font-extrabold  rounded-full bg-[#EC3013] cursor-pointer text-[12px] px-4 py-2 mr-3">Sing up</button>
                <button 
                onClick={()=>ModalOpen("Log In")}
                className="font-extrabold  rounded-full bg-white cursor-pointer text-black text-[12px] px-4 py-2">Log in </button>
            </div>)
}
export default AuthButtons