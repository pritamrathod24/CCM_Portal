import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// import Admindash from "./Admindash.js";
import Admindash1 from "./Admindash1";
import Victimprofile from "./Victimprofile";
import VictimLogin from "./VictimLogin";
import Falsecases from "./Falsecases";
import Falsecases1 from "./Falsecases1";
import VictimDashboard from "./VictimDashboard";
import VictimSignup from "./VictimSignup";
import AdminRegistrationForm from "./AdminRegistrationForm";
import AdminLoginForm from "./AdminLoginForm";
import NewCaseForm from "./NewCaseForm";
import HomePage from "./HomePage";
import { AboutUs } from "./AboutUs";
import Navbar from "./Navbar";
import Home1 from "./Home1";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/admindash" element={<Admindash1 />} />
        <Route path="/victimprofile/:id" element={<Victimprofile />} />
        <Route path="/victimlogin" element={<VictimLogin />} />
        {/* <Route path="/falsecases" element={<Falsecases />} /> */}
        <Route path="/falsecases1" element={<Falsecases1 />} />
        <Route path="/victimdashboard" element={<VictimDashboard />} />
        <Route path="/file-new-case" element={<NewCaseForm />} />
        <Route path="/victimsignup" element={<VictimSignup />} />
        <Route path="/falsecases" element={<Falsecases1 />} />
        <Route path="/adminregistration" element={<AdminRegistrationForm />} />
        <Route path="/adminlogin" element={<AdminLoginForm />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
