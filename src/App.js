import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ShopTemplate from "./components/ShopTemplate";
import Signup from "./components/Sign-up/Signup";
import LoginForm from "./components/Login/LoginForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShopTemplate />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
