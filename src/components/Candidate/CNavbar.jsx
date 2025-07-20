import React from 'react';
import { Link } from 'react-router-dom';
import './CNavbar.css'; 

const CNavbar = () => {
  return (
    <nav className="cnavbar">
      <div className="logo">HIRENOVA</div>
      <ul>
        <li><Link to="/Candidate/CandidateFront">Dashboard</Link></li>
        <li><Link to="/Candidate/JobListing">Job Listing</Link></li>
        <li><Link to="/Candidate/MyApplications">My Applications</Link></li>
        <li><Link to="/Candidate/Profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default CNavbar;
