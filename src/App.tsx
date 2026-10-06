import Footer from "./components/Footer"
import HomePage from "./components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SessionsPage from "./components/SessionsPage";
import Navigation from "./components/Navigation";
import SessionsContextProvider from "./context/SessionsContextProvider";
import MovieDetailsPage from "./components/MovieDetailsPage";
import Modal from "./components/Modal";
import ProfileModal from "./components/ProfileModal";
import AppContextProvider from "./context/AppContextProvider";
import AuthContextProvider from "./context/AuthContextProvider";
import ProfilePage from "./components/ProfilePage";




function App() {


  return (
    <div className="relative h-full w-full">
      <BrowserRouter>
        <AppContextProvider>
          <AuthContextProvider>
          <SessionsContextProvider>
        
            <Navigation  />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sessions" element={<SessionsPage />} />
              <Route path="/movie/:name" element={<MovieDetailsPage />} />
              <Route path="/profile" element={<ProfilePage/>}/>
            </Routes>

            <Modal/>
            <ProfileModal />

            <Footer />
            
          </SessionsContextProvider>
          </AuthContextProvider>
        </AppContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
