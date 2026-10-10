import Footer from "./components/Footer"
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SessionsContextProvider from "./context/SessionsContextProvider";
import Modal from "./components/AuthModal/Modal";
import ProfileModal from "./components/ProfileModal/ProfileModal";
import AppContextProvider from "./context/AppContextProvider";
import AuthContextProvider from "./context/AuthContextProvider";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PersonalInformation from "./pages/ProfilePage/__components/PersonalInformation";
import MyTickets from "./pages/ProfilePage/__components/MyTickets";
import Navigation from "./components/Navigation/Navigation";




function App() {

  return (
    <div className="relative h-full w-full">

      
      <BrowserRouter>
        <AppContextProvider>
          <AuthContextProvider>
            <SessionsContextProvider>
              <Navigation />

              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sessions" element={<SessionsPage />} />
                <Route path="/movie/:name" element={<MovieDetailsPage />} />
                <Route path="/profile" element={<ProfilePage />}>
                  <Route index element={<PersonalInformation />} />
                  <Route path="personalinfo" element={<PersonalInformation />} />
                  <Route path="tickets" element={<MyTickets />} />
                </Route>
              </Routes>

              <Modal />
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
