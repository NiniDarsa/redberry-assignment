import Footer from "./components/Footer"
import HomePage from "./components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SessionsPage from "./components/SessionsPage";
import Navigation from "./components/Navigation";
import SessionsContextProvider from "./context/SessionsContextProvider";
import MovieDetailsPage from "./components/MovieDetailsPage";
import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import ProfileModal from "./components/ProfileModal";
import { GetUser } from "./functions/function";
import type { TUserResponse } from "./types/user";




function App() {
const [isAuthModalOpen,setIsAuthModalOpen]=useState<"Sign Up"|"Log In"|"">("")
const [isProfileModalOpen,setIsProfileModalOpen]=useState(false)
const [token, setToken]=useState(()=>localStorage.getItem("token"))
const [user,setUser]=useState<TUserResponse>()


const AuthModalOpen=(name:"Sign Up"|"Log In")=>{
  setIsAuthModalOpen(name)
}
const ProfileModalOpen=(arg:boolean)=>{
   setIsProfileModalOpen(arg)
}


useEffect(()=>{
    const getInfoAboutUser=async()=>{
        if (token) {
    try {
        const user :TUserResponse = await GetUser();

        console.error(user);
        setUser(user)
    } catch (err: any) {
        if (err.status === 401) {
            localStorage.removeItem("token");
            setToken(null)
        }
    }
}else{
  setUser(undefined)
}
    }

getInfoAboutUser()
},[token])

  return (
    <div className="relative h-full w-full">
      <BrowserRouter>
        <SessionsContextProvider>
          <Navigation 
          user={user}
          ModalOpen={AuthModalOpen} ProfileModalOpen={ProfileModalOpen} isProfileModalOpen={isProfileModalOpen}/>

          <Routes>
            <Route path="/" element={<HomePage  />} />
            <Route path="/sessions" element={<SessionsPage />} />
            <Route path="/movie/:name" element={<MovieDetailsPage />} />
          </Routes>

          {isAuthModalOpen && <Modal 
          setToken={setToken}
          setIsModalOpen={setIsAuthModalOpen} isModalOpen={isAuthModalOpen}/>}
          {isProfileModalOpen&&<ProfileModal 
          setToken={setToken}
          ProfileModalOpen={ProfileModalOpen} user={user}/>}
          <Footer />
        </SessionsContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
