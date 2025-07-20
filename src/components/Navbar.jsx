import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar" style={{width :'100%' , height:'50px'}}>
      <div className="logo">HIRENOVA</div>
        <ul className="nav-links" style={{width :'1300px' , height:'600px', alignItems:'center'}}>
            <li><Link to="/">Home</Link></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Product</a></li>
            <li><a href="#">Resources</a></li>
            <li><Link to="/HrRegisteration">Registration</Link></li>
        </ul>
    </nav>
  );
};


export default Navbar;
