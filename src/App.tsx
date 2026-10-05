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
import AppContextProvider from "./context/AppContextProvider";




function App() {

  const [user, setUser] = useState<TUserResponse>()

  ////////////
  useEffect(() => {
    const getInfoAboutUser = async () => {
      try {
        const user: TUserResponse = await GetUser();

        console.error(user);
        setUser(user)
      } catch (err: any) {
        if (err.status === 401) {
          localStorage.removeItem("token");
        }
      }
    }
    getInfoAboutUser()
  }, [])

  //usegetuser()

  ////////////////////



  return (
    <div className="relative h-full w-full">
      <BrowserRouter>
        <AppContextProvider>
          <SessionsContextProvider>
            <Navigation user={user} />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sessions" element={<SessionsPage />} />
              <Route path="/movie/:name" element={<MovieDetailsPage />} />
            </Routes>

            <Modal/>
          
            <ProfileModal  user={user} />
            <Footer />
          </SessionsContextProvider>
        </AppContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
