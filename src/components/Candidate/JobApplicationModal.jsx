import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './JobApplicationModal.css';

const JobApplicationModal = ({ jobId, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
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

  const [loading, setLoading] = useState(true);
  const storedEmail = localStorage.getItem('candidateEmail');

  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/candidate/getInfo?email=${storedEmail}`);
        if (res.ok) {
          const candidate = await res.json();
          if (candidate) {
            setFormData((prev) => ({
              ...prev,
              fullName: candidate.fullName || '',
              email: candidate.email || '',
              mobile: candidate.mobile || '',
              resume: candidate.resume || null,
              linkedIn: candidate.linkedIn || '',
              dob: candidate.dob || '',
              gender: candidate.gender || '',
              location: candidate.location || '',
              qualification: candidate.qualification || '',
              experience: candidate.experience || '',
              preferredRole: candidate.preferredRole || '',
              skills: candidate.skills || ''
            }));
          }
        } else {
          Swal.fire('Error', '❌ Failed to fetch candidate data.', 'error');
        }
      } catch (error) {
        console.error('Error fetching candidate data:', error);
        Swal.fire('Error', '❌ Error fetching candidate data.', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (storedEmail) {
      fetchCandidateData();
    } else {
      setLoading(false);
    }
  }, [storedEmail]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      if (key !== 'resume') {
        data.append(key, formData[key]);
      }
    }

    if (formData.resume && formData.resume instanceof File) {
      data.append('resume', formData.resume);
    }

    data.append('jobId', jobId);

    const userId = localStorage.getItem('userId');
    if (userId) {
      data.append('userId', userId);
    } else {
      Swal.fire('Not Logged In', '❌ User not logged in!', 'error');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        body: data,
      });

      const responseData = await res.json();

      if (res.ok) {
        Swal.fire('Success', responseData.message || '✅ Application submitted!', 'success');
        onClose();
      } else {
        Swal.fire('Notice', responseData.message || '❌ Failed to submit application.', 'warning');
      }
    } catch (err) {
      console.error('Error during submission:', err);
      Swal.fire('Error', '❌ Something went wrong!', 'error');
    }
  };

  return (
    <div className="JAM-modal-overlay">
      <div className="JAM-modal-container">
        <button className="JAM-close-button" onClick={onClose}>&times;</button>
        <h2 className="JAM-modal-heading">Apply for Job</h2>

        {loading ? (
          <p className="loader">🔄 Loading candidate data...</p>
        ) : (
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label>Full Name</label>
            <input name="fullName" value={formData.fullName} onChange={handleChange} required />

            <label>Email</label>
            <input name="email" value={formData.email} onChange={handleChange} required />

            <label>Mobile</label>
            <input name="mobile" value={formData.mobile} onChange={handleChange} required />

            <label>DOB</label>
            <input name="dob" type="date" value={formData.dob} onChange={handleChange} required />

            <label>Gender</label>
            <input name="gender" value={formData.gender} onChange={handleChange} required />

            <label>Location</label>
            <input name="location" value={formData.location} onChange={handleChange} required />

            <label>Qualification</label>
            <input name="qualification" value={formData.qualification} onChange={handleChange} required />

            <label>Experience</label>
            <input name="experience" value={formData.experience} onChange={handleChange} required />

            <label>Preferred Role</label>
            <input name="preferredRole" value={formData.preferredRole} onChange={handleChange} required />

            <label>Skills</label>
            <input name="skills" value={formData.skills} onChange={handleChange} required />

            <label>LinkedIn</label>
            <input name="linkedIn" value={formData.linkedIn} onChange={handleChange} />

            <label>Resume</label>
            <input
              type="file"
              name="resume"
              onChange={handleChange}
              accept=".pdf,.doc,.docx"
              required={!formData.resume}
            />
            {formData.resume && typeof formData.resume === 'string' && (
              <p>
                Existing Resume:{' '}
                <a
                  href={`http://localhost:5000/${formData.resume}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {formData.resume.split('/').pop()}
                </a>
              </p>
            )}

            <div className="JAM-modal-buttons">
              <button type="submit">Apply</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default JobApplicationModal;
