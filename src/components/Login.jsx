import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post(
        "http://localhost:5000/admin-login",
        { email, password },
        { withCredentials: true }
      );

      alert(res.data.message);

      // Save adminId safely
      if (res.data.adminId) {
        localStorage.setItem("adminId", res.data.adminId);
      } else {
        console.error("adminId not found in response!");
      }

      navigate("/Admin/AdminFront");
    } catch (error) {
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          style={{ backgroundColor: "#007bff", color: "white", padding: "10px 20px" }}
        >
          Login
        </button>
        <br />
        <p>
          Don't have an account? <Link to="/HrRegisteration">Sign up </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
