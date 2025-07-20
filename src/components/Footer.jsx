import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">HIRENOVA</div>
        <ul className="footer-links">
          <li><Link to="#">Features</Link></li>
          <li><Link to="#">Product</Link></li>
          <li><Link to="#">Resources</Link></li>
          <li><Link to="/HrRegisteration">Registration</Link></li>
        </ul>
        <div className="social-icons">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaLinkedin /></a>
        </div>
        <p className="copyright">© 2025 HIRENOVA. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
