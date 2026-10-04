import Footer from "./components/Footer"
import HomePage from "./components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SessionsPage from "./components/SessionsPage";
import Navigation from "./components/Navigation";
import SessionsContextProvider from "./context/SessionsContextProvider";

function App() {


  return (
    <div className="relative h-full w-full">
      <BrowserRouter>
        <SessionsContextProvider>

          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sessions" element={<SessionsPage />} />

          </Routes>
          <Footer />
        </SessionsContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
