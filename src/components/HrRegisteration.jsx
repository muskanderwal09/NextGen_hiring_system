import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HrRegisteration() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    password: '',
    number: '',
    dob: '',
    agree: false
  });
  
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/admin-register', formData);
      
      if (response.data.message === "Admin registered successfully") {
        // Save adminId from response if available
        if (response.data.adminId) {
          localStorage.setItem("adminId", response.data.adminId);
        } else {
          console.error("adminId not found in registration response!");
        }

        // Redirect to login page after successful registration
        navigate("/Login");  // Changed to login page
      }
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      setMessage(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div style={{ textAlign: 'center', paddingLeft: '5px', marginTop: '40px' }}>
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="text" name="company" placeholder="Company Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Working Email Address" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="number" name="number" placeholder="Phone Number" onChange={handleChange} required />
        <input type="date" name="dob" onChange={handleChange} required />

        <div className="terms" style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center', marginTop: '10px' }}>
          <input type="checkbox" name="agree" onChange={handleChange} required style={{ margin: '0', width: '16px', height: '16px' }} />
          <label htmlFor="agree" style={{ fontSize: '14px' }}>I agree to the <a href="#">Terms & Conditions</a></label>
        </div>

        <br />
        <button type="submit" style={{ backgroundColor: '#007bff', padding: '15px', color: 'white' }}>
          Register
        </button>
        <p>Have an account? <a href="/Login">Login Here</a></p>
        <p>If you are a Candidate <a href="/CandidateRegister">Register Here</a></p>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default HrRegisteration;
