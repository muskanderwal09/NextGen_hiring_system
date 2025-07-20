import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Optional styling

const Profile = () => {
  const [candidate, setCandidate] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId'); // Assume you stored userId on login

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await fetch(`/api/candidates/${userId}`);
        const data = await response.json();
        setCandidate(data);
      } catch (error) {
        console.error('Error fetching candidate profile:', error);
      }
    };

    if (userId) {
      fetchCandidate();
    } else {
      navigate('/login'); // if not logged in
    }
  }, [userId, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/front'); // redirect to Front.jsx route
  };

  if (!candidate) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <h2>Candidate Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {candidate.fullName}</p>
        <p><strong>Email:</strong> {candidate.email}</p>
        <p><strong>Mobile:</strong> {candidate.mobile}</p>
        <p><strong>Gender:</strong> {candidate.gender}</p>
        <p><strong>Date of Birth:</strong> {candidate.dob}</p>
        <p><strong>Location:</strong> {candidate.location}</p>
        <p><strong>Qualification:</strong> {candidate.qualification}</p>
        <p><strong>Experience:</strong> {candidate.experience}</p>
        <p><strong>Preferred Role:</strong> {candidate.preferredRole}</p>
        <p><strong>Skills:</strong> {candidate.skills}</p>
        <p><strong>LinkedIn:</strong> {candidate.linkedIn}</p>
      </div>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default Profile;
