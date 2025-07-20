import React, { useState } from 'react';
import './Candidate.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const CandidateLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Disable button during API call

    try {
      const response = await fetch('http://localhost:5000/api/candidate/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // ✅ Store candidate ID + userId in localStorage
        localStorage.setItem('candidateId', result.candidate._id);
        localStorage.setItem('userId', result.candidate._id); // Added for job application consistency
        localStorage.setItem('candidateEmail', result.candidate.email); // Optional

        alert(result.message);
        navigate('/Candidate/CandidateFront');
      } else {
        alert(result.error || '❌ Login failed');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('❌ Network error or server is down. Please try again later.');
    } finally {
      setIsLoading(false); // Re-enable button
    }
  };

  return (
    <div className="auth-container auth">
      <h2>Candidate Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email Address</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="password-toggle-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? '🔄 Logging in...' : 'Login'}
        </button>

        <p>
          Don't have an account? <Link to="/CandidateRegister">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default CandidateLogin;
