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
import ComingSoon from "./components/ComingSoon/ComingSoon";
import ScrollToTop from "./common/ScrollToTop";
import ProtectedRoute from "./common/ProtectedRoute";
import AiTool from "./components/AiTool/AiTool";
import AiToolCom from "./components/AiTool/AiToolCom";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
        <Route path="/aiTool" element={<AiTool />} />

        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/repo" element={<ProtectedRoute><ResumeRepo /></ProtectedRoute>} />
        <Route path="/resume/:resumeId" element={<ProtectedRoute><ResumeCom /></ProtectedRoute>} />
        <Route path="/resume-form" element={<ProtectedRoute><ResumeFormCom /></ProtectedRoute>} />
        <Route path="/edit/:resumeId" element={<ProtectedRoute><ResumeEditFormCom /></ProtectedRoute>} />
        <Route path="/ai" element={<ProtectedRoute><AiToolCom /></ProtectedRoute>} />
        <Route path="/qna" element={<ProtectedRoute><ComingSoon serviceName={'Q&A'} /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
