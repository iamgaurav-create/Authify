import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import Login from "./pages/login";
import Verify from "./pages/Verify";
import "./app.css";
import { userAuthStore } from "./store/userAuth";
import { Loader } from "lucide-react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";


export default function App() {
  const particlesInit = async (main) => {
    await loadFull(engine);
  };

  const {authUser, isSignup, isLoggingIn}= userAuthStore();

  if(isSignup || isLoggingIn)
    return(
      <div className="flex items-center justify-center h-screen">
        <Loader className="load size-[40px] "/>
     </div>
    )

  return (
    <div className="container">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "#0d47a1" },
          particles: {
            number: { value: 80 },
            size: { value: 3 },
            move: { enable: true, speed: 2 },
            links: { enable: true, distance: 150, color: "#ffffff" },
          },
        }}
      />

      <div className="login-card">
       <Routes>
  <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
  <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
  <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
<Route path="/verify" element={<Verify />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />

 <Route path="*" element={<Navigate to="/" />} />
</Routes>

         
      </div>
    </div>
  );
}
