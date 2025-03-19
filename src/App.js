import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "./components/Sign-up/Signup";
import Navbar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import Home from "./components/Home/Home";
import LoginForm from "./components/Login/LoginForm";
import Calendar from "./components/Home/Calendar";
import DeadlineList from "./components/Home/DeadlineList";
import RecentResume from "./components/Home/RecentResume";
import Repo from "./components/Repo/Repo";
import ResumeRepo from "./components/Repo/ResumeRepo";
import Resume from "./components/Resume/Resume";
import ResumeCom from "./components/Resume/ResumeCom";
import ResumeForm from "./components/ResumeForm/ResumeForm";
import ResumeFormCom from "./components/ResumeForm/ResumeFormCom";
import ResumeEditFormCom from "./components/ResumeEditForm/ResumeEditFormCom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 나중에 없앨 애들 */}
        <Route path="/navi" element={<Navbar />} />
        <Route path="/foot" element={<Footer />} />
        <Route path="/cal" element={<Calendar />} />
        <Route path="/dead" element={<DeadlineList />} />
        <Route path="/recent" element={<RecentResume />} />
        <Route path="/repository" element={<Repo />} />
        <Route path="/res" element={<Resume />} />
        <Route path="/resform" element={<ResumeForm />} />


        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/repo" element={<ResumeRepo />} />
        <Route path="/resume/:resumeId" element={<ResumeCom />} />
        <Route path="/resume-form" element={<ResumeFormCom />} />
        <Route path="/edit" element={<ResumeEditFormCom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
