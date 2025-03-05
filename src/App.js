import React from "react";
import ShopTemplate from "./components/ShopTemplate";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "./components/SignUp/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShopTemplate />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
