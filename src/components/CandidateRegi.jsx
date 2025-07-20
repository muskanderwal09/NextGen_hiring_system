import React, { useState } from 'react';
import './Candidate.css';
import { useNavigate } from 'react-router-dom';


const CandidateRegister = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    resume: null,
    linkedIn: '',
    dob: '',
    gender: '',
    location: '',
    qualification: '',
    experience: '',
    preferredRole: '',
    skills: ''
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    const formPayload = new FormData();
  
    for (let key in formData) {
      formPayload.append(key, formData[key]);
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/candidate/register', {
        method: 'POST',
        body: formPayload
      });
    
      const result = await response.json();
    
      if (response.ok) {
        alert("🎉 Welcome aboard! Registration successful.");
        navigate('/CandidateLogin'); 
      } else {
        alert(result.error || 'Registration failed.');
      }
    } catch (error) {
      console.error('❌ Error:', error);
      alert('Something went wrong.');
    }
    
  };
  

  return (
    <div className="auth-container" style={{ textAlign: 'center', padding: '20px', marginTop: '40px' }}>
      <h2>Candidate Registration</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Full Name</label>
        <input type="text" name="fullName" required onChange={handleChange} />

        <label>Email Address</label>
        <input type="email" name="email" required onChange={handleChange} />

        <label>Mobile Number</label>
        <input type="tel" name="mobile" required onChange={handleChange} />

        <label>Password</label>
        <input type="password" name="password" required onChange={handleChange} />

        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" required onChange={handleChange} />

        <label>Upload Resume (PDF/DOC)</label>
        <input type="file" name="resume" accept=".pdf,.doc,.docx" required onChange={handleChange} />

        <label>LinkedIn Profile (Optional)</label>
        <input type="url" name="linkedIn" onChange={handleChange} />

        <label>Date of Birth (Optional)</label>
        <input type="date" name="dob" onChange={handleChange} />

        <label>Gender (Optional)</label>
        <select name="gender" onChange={handleChange}>
          <option value="">Select</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Other">Other</option>
        </select>

        <label>Location/City</label>
        <input type="text" name="location" required onChange={handleChange} />

        <label>Qualification / Education</label>
        <input type="text" name="qualification" required onChange={handleChange} />

        <label>Experience (years/months)</label>
        <input type="text" name="experience" required onChange={handleChange} />

        <label>Preferred Job Role/Category</label>
        <input type="text" name="preferredRole" required onChange={handleChange} />

        <label>Skills (comma separated)</label>
        <input type="text" name="skills" required onChange={handleChange} />

        <button type="submit" style={{ backgroundColor: '#007bff', padding: '15px', color: 'white' }}>
          Register
        </button>

        <p>Have an account? <a href="/CandidateLogin">Login Here</a></p>
        
        <p>If you are a Admin <a href="/HrRegisteration">Register Here</a></p>

      </form>
    </div>
  );
};

export default CandidateRegister;
