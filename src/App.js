import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "./components/Sign-up/Signup";
import Navbar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import Home from "./components/Home/Home";
import LoginForm from "./components/Login/LoginForm";
import Calendar from "./components/Home/Calendar";
import RecentResume from "./components/Home/RecentResume";
import Repo from "./components/Repo/Repo";
import ResumeRepo from "./components/Repo/ResumeRepo";
import Resume from "./components/Resume/Resume";
import ResumeCom from "./components/Resume/ResumeCom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 나중에 없앨 애들 */}
        <Route path="/navi" element={<Navbar />} />
        <Route path="/foot" element={<Footer />} />
        <Route path="/cal" element={<Calendar />} />
        <Route path="/recent" element={<RecentResume />} />
        <Route path="/repo" element={<Repo />} />
        <Route path="/res" element={<Resume />} />

        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/repository" element={<ResumeRepo />} />
        <Route path="/resume" element={<ResumeCom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
