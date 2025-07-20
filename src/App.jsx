import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// General Components
import Navbar from "./components/Navbar.jsx";
import HrRegisteration from "./components/HrRegisteration.jsx";
import Front from "./components/Front.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./components/Login.jsx";
import CandidateLogin from "./components/CandidateLogin.jsx";
import CandidateRegi from "./components/CandidateRegi.jsx";

// Admin Components
import AdminFront from "./components/Admin/AdminFront.jsx";
import JobsCreate from "./components/Admin/JobsCreate.jsx";
import ANavbar from "./components/Admin/ANavbar.jsx";
import AdminProfile from "./components/Admin/AdminProfile.jsx";
import JobList from "./components/Admin/JobList.jsx";          // ✅ ADD this for job listing
import JobEdit from "./components/Admin/JobEdit.jsx";          // ✅ ADD this for editing jobs

// Candidate Components
import CandidateFront from "./components/Candidate/CandidateFront.jsx";
import JobListing from "./components/Candidate/JobListing.jsx";
import CNavbar from "./components/Candidate/CNavbar.jsx";
import MyApplications from "./components/Candidate/MyApplications.jsx";
import JobApplicationModal from "./components/Candidate/JobApplicationModal.jsx";
import Profile from "./components/Candidate/Profile.jsx";

function MainContent() {
  const location = useLocation();

  // Pages where NO navbar is shown
  const noNavbarPaths = [
    "/Login",
    "/HrRegisteration",
    "/CandidateLogin",
    "/CandidateRegister"
  ];

  const isAdminPath = location.pathname.startsWith("/Admin");
  const isCandidatePath = location.pathname.startsWith("/Candidate");

  const hideNavbar = noNavbarPaths.includes(location.pathname);

  return (
    <>
      {/* Conditional Navbars */}
      {!hideNavbar && isAdminPath && <ANavbar />}
      {!hideNavbar && isCandidatePath && <CNavbar />}
      {!hideNavbar && !isAdminPath && !isCandidatePath && <Navbar />}

      {/* App Routes */}
      <Routes>

        {/* General Pages */}
        <Route path="/" element={<Front />} />
        <Route path="/HrRegisteration" element={<HrRegisteration />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CandidateLogin" element={<CandidateLogin />} />
        <Route path="/CandidateRegister" element={<CandidateRegi />} />

        {/* Admin Pages */}
        <Route path="/Admin/AdminFront" element={<AdminFront />} />
        <Route path="/Admin/JobCreate" element={<JobsCreate />} />
        <Route path="/Admin/AdminProfile" element={<AdminProfile />} />
        <Route path="/Admin/JobList" element={<JobList />} /> {/* ✅ show jobs */}
        <Route path="/Admin/edit/:id" element={<JobEdit />} /> {/* ✅ edit job */}

        {/* Candidate Pages */}
        <Route path="/Candidate/CandidateFront" element={<CandidateFront />} />
        <Route path="/Candidate/JobListing" element={<JobListing />} />
        <Route path="/Candidate/MyApplications" element={<MyApplications />} />
        <Route path="/apply/:jobId" element={<JobApplicationModal />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>

      {/* Show Footer only on homepage */}
      {location.pathname === "/" && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;
