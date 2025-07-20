import React from 'react';
import './CandidateFront.css';
import { Link } from "react-router-dom";


const CandidateFront = () => {
  return (
    <div className="candidate-front">
      <section className="hero1">
        <div className="hero-content">
          <h1>Welcome to Your Career Portal</h1>
          <p>Explore job opportunities, update your profile, and apply for your dream job.</p>
          <button className='Butt'>
          <Link to="/Candidate/JobListing" className='Butt'>Get Start</Link>
        </button>
        </div>
      </section>

      <section id="about" className="about">
        <div className="about-content">
          <h2>Why Choose Us?</h2>
          <div className="feature">
          <img
          src="/images/FindJob.jpeg"
          alt="Admin Preview"
          className="preview-image"
        />            <p>Find the best jobs that match your skills and experience.</p>
          </div>
          <div className="feature">
          <img
          src="/images/Resume.png"
          alt="Admin Preview"
          className="preview-image"
        />            <p>Create and optimize your resume with our powerful tools.</p>
          </div>
          <div className="feature">
          <img
          src="/images/Interview.jpeg"
          alt="Admin Preview"
          className="preview-image"
        />            <p>Get tips and advice on how to excel in interviews.</p>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2025 CareerPortal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CandidateFront;
