// src/components/Admin/ANavbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./AdminFront.css";

const ANavbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">HIRENOVA</div>
      <ul className="nav-links">
        <li><Link to="/Admin/AdminFront">Dashboard</Link></li>
        <li><Link to="/Admin/JobCreate">Job Management</Link></li>
        <li><Link to="#">Candidate Management</Link></li>
        <li><Link to="/Admin/AdminProfile">Profile</Link></li>
        <li><Link to="#">Result & Scheme</Link></li>
      </ul>
    </nav>
  );
};

export default ANavbar;
