import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import './Application.css';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedAppId, setExpandedAppId] = useState(null);

  const userId = localStorage.getItem('candidateId');

  if (!userId) {
    console.error("User ID not found in localStorage");
    return <div>Error: User ID not found. Please login again.</div>;
  }

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/applications/${userId}`);
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setError('Error fetching applications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [userId]);

  const handleToggleDetails = (applicationId) => {
    setExpandedAppId(expandedAppId === applicationId ? null : applicationId);
  };

  const handleDelete = async (applicationId, event) => {
    event.stopPropagation(); // Prevents expanding when clicking delete

    try {
      await axios.delete(`/api/applications/${applicationId}`);
      setApplications(applications.filter(app => app._id !== applicationId));
      alert('✅ Application deleted successfully');
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('❌ Failed to delete application');
    }
  };

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Applications</h2>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div>
          {applications.map((application) => (
            <div
              key={application._id}
              className={`application-card ${expandedAppId === application._id ? 'expanded' : ''}`}
              onClick={() => handleToggleDetails(application._id)}
            >
              <div className="application-title">
                {application.jobId?.title}
                <button
                  className="delete-button"
                  onClick={(e) => handleDelete(application._id, e)}
                >
                  <FaTrash /> Delete
                </button>
              </div>

              {expandedAppId === application._id && (
                <div className="application-details">
                  <p>{application.jobId?.description}</p>
                  <p><strong>Requirements:</strong> {application.jobId?.requirements}</p>
                  <p><strong>Compensation:</strong> {application.jobId?.compensation}</p>
                  <p><strong>Timeline:</strong> {application.jobId?.timeline}</p>
                  <p><strong>Additional Info:</strong> {application.jobId?.additionalInfo}</p>
                  <p><strong>Applied on:</strong> {new Date(application.applicationDate).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
