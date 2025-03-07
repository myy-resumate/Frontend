import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "./components/Sign-up/Signup";
import Navbar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import Home from "./components/Home/Home";
import LoginForm from "./components/Login/LoginForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/navi" element={<Navbar />} />
        <Route path="/foot" element={<Footer />} />

        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
