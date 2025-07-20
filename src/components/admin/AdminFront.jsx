import React, { useState, useEffect } from 'react';
import './AdminFront.css';
import { Link } from "react-router-dom";

const AdminFront = () => {
  const fullText = "Welcome Admin !!";
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typingSpeed = 150; 
    const resetDelay = 3000; 

    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        setIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      const reset = setTimeout(() => {
        setDisplayedText('');
        setIndex(0);
      }, resetDelay);
      return () => clearTimeout(reset);
    }
  }, [index, fullText]);

  return (
    <div className="admin-front-container">
      <div className="left-section">
        <div className="logo">
          <span className="logo-icon">🌐</span>
          <h1 className='typewriter'>{displayedText}<span className="cursor">|</span></h1>
        </div>

        <h4><b>Ready to Upgrade Your Recruitment Process? </b></h4> 
        <p>"Get started today with a free demo and see how HIRENOVA can streamline your hiring workflow."</p> 

        
        <h2>Job Management</h2>
        <p>In the <b>Job Creation</b> module, administrators can create new job postings by entering essential details like job title, description, requirements, compensation, and deadlines. These job posts are then made available to candidates through the connected portal. A simple and responsive dashboard layout ensures that even non-technical HR staff can create or update job listings without any confusion or complexity.</p>
        
        <button className='Butt'>
          <Link to="/Admin/JobCreate" className='Butt'>Job Management</Link>
        </button>

        <ul className="features">
          <li>➔ Hiring process faster</li>
          <li>➔ 400+ Companies</li>
          <li>➔ Job Management</li>
          <li>➔ Interview Scheduling</li>
          <li>➔ Assessment Management</li>
          <li>➔ 100% Placement</li>
        </ul>

        <div className="buttons">
        <button className='Butt'>
          <Link to="/Admin/AdminFront" className='Butt'>Dashboard</Link>
        </button>
        </div>
      </div>

      <div className="right-section">
        <img
          src="/images/front1.jpeg"
          alt="Admin Preview"
          className="preview-image"
        />
      </div>
    </div>
  );
};

export default AdminFront;
