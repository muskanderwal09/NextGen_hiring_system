import React, { useState, useEffect } from 'react';
import './Jobs.css';
import ANavbar from "./ANavbar";
import { useNavigate } from 'react-router-dom';

const JobsCreate = () => {
  const navigate = useNavigate();

  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    location: '',
    type: '',
    qualifications: '',
    experience: '',
    skills: '',
    salary: '',
    perks: '',
    startDate: '',
    deadline: '',
    notes: '',
    company: '',
    postedBy: localStorage.getItem("adminId") || ""
  });

  const [companyLogoFile, setCompanyLogoFile] = useState(null);

  useEffect(() => {
    const companyName = localStorage.getItem('companyName');
    setJobData(prev => ({
      ...prev,
      company: companyName || ''
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setCompanyLogoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['title', 'description', 'location', 'type', 'company', 'postedBy'];
    for (let field of requiredFields) {
      if (!jobData[field]) {
        alert(`Please fill in the required field: ${field}`);
        return;
      }
    }

    try {
      const formData = new FormData();
      for (let key in jobData) {
        formData.append(key, jobData[key]);
      }

      if (companyLogoFile) {
        formData.append('companyLogo', companyLogoFile);
      }

      const response = await fetch('http://localhost:5000/api/jobs/create', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (response.ok) {
        alert('✅ Job posted successfully!');
        setJobData({
          title: '',
          description: '',
          location: '',
          type: '',
          qualifications: '',
          experience: '',
          skills: '',
          salary: '',
          perks: '',
          startDate: '',
          deadline: '',
          notes: '',
          company: jobData.company,
          postedBy: jobData.postedBy
        });
        setCompanyLogoFile(null);
      } else {
        alert(result.error || '❌ Job creation failed.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Server error. Please try again.');
    }
  };

  return (
    <div className="job-create-container">
      <ANavbar />
      <h2>Create Job</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Job Title*</label>
        <input type="text" name="title" value={jobData.title} required onChange={handleChange} />

        <label>Description*</label>
        <textarea name="description" value={jobData.description} required onChange={handleChange} />

        <label>Location*</label>
        <input type="text" name="location" value={jobData.location} required onChange={handleChange} />

        <label>Job Type*</label>
        <select name="type" value={jobData.type} required onChange={handleChange}>
          <option value="">Select</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Qualifications</label>
        <input type="text" name="qualifications" value={jobData.qualifications} onChange={handleChange} />

        <label>Experience</label>
        <input type="text" name="experience" value={jobData.experience} onChange={handleChange} />

        <label>Skills</label>
        <input type="text" name="skills" value={jobData.skills} onChange={handleChange} />

        <label>Salary</label>
        <input type="text" name="salary" value={jobData.salary} onChange={handleChange} />

        <label>Perks / Benefits</label>
        <input type="text" name="perks" value={jobData.perks} onChange={handleChange} />

        <label>Start Date</label>
        <input type="date" name="startDate" value={jobData.startDate} onChange={handleChange} />

        <label>Application Deadline</label>
        <input type="date" name="deadline" value={jobData.deadline} onChange={handleChange} />

        <label>Additional Notes</label>
        <textarea name="notes" value={jobData.notes} onChange={handleChange} />

        <label>Company Name*</label>
        <input type="text" name="company" value={jobData.company} required onChange={handleChange} />

        <label>Upload Company Logo</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button type="submit">Create Job</button>
        <button
          type="button"
          className="view-jobs-button"
          onClick={() => navigate('/Admin/JobList')}
        >
          📄 View Job List
        </button>
      </form>
    </div>
  );
};

export default JobsCreate;
