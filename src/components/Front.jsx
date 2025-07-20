import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
export default function HeroSection() {
  const text = "What is HIRENOVA?";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let typingInterval;
    
    if (index < text.length) {
      typingInterval = setInterval(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, 200); // typing speed per letter
    } else {
      // After full text, wait 2 seconds, then reset
      typingInterval = setTimeout(() => {
        setDisplayedText("");
        setIndex(0);
      }, 2000); // wait 2 seconds before restarting
    }

    return () => clearInterval(typingInterval);
  }, [index, text]);
  return (
    <div className="front">
      <section className="hero">
        <div className="hero-text">
          <h1>
            Enhancing the <span>Recruitment Experience</span> with <span>Artificial Intelligence</span>
          </h1>
          <p>Experience the power of AI in Recruitment software with HIRENOVA: Generative AI-powered Robotic Recruiter</p>
          <button className="free-demo">
            <Link to="/HrRegisteration" style={{ color: "white" }}>Free Demo</Link>
          </button>
        </div>

        <div className="hero-image">
          <img src="images/job.jpeg" alt="Recruiter" className="image" />
          <div className="floating-message card">
            Hi, James<br />
            I'm HIRENOVA, and I have a new job opportunity for you!
          </div>
          <div className="engagement card">
            HIRENOVA ENGAGEMENT<br />
            30 Sourced | 14 Engaged
          </div>
          <div className="candidates card">
            55 candidates connected for the job
          </div>
        </div>
      </section>

       {/* Info Section */}
       <div className="info">
        <h1 className="que">{displayedText}</h1>
        <p className="ans">
          <b>Hirenova</b> is an end-to-end recruitment management system featuring dual modules — a <b>Candidate Portal</b> and an <b>HR Dashboard</b>. The platform enables seamless interaction between job seekers and recruiters, offering advanced features for application tracking, profile management, and real-time hiring workflows — all within a unified ecosystem.
        </p>
      </div>


    </div>
  );
}
