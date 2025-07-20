import React, { useEffect, useState } from 'react';
import JobApplicationModal from './JobApplicationModal';
import './Jobs.css';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs'); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="job-listing-container">
      <div className="heading-search-row">
        <h2>Top job picks for you</h2>
        <div className="job-search-container">
          <i className="search-icon">&#128269;</i>
          <input
            type="text"
            className="job-search"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <p>Based on your profile, preferences, and activity like applies, searches, and saves</p>

      <div className="job-list-wrapper">
        <div className="job-sidebar">
          {filteredJobs.length === 0 ? (
            <p>No job postings found.</p>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                className={`job-list-item ${selectedJob?._id === job._id ? 'active' : ''}`}
                onClick={() => setSelectedJob(job)}
              >
                <div className="job-list-item-header">
                  <div className="company-logo-circle">
                    {job.companyLogo ? (
                      <img src={job.companyLogo} alt="Logo" />
                    ) : (
                      <span>{job.title[0]}</span>
                    )}
                  </div>
                  <div>
                    <a
                      href="#"
                      className="job-title-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      {job.title}
                    </a>
                    <p>{job.company || 'Company Name'}</p>
                    <p className="job-meta">{job.location} • {job.type}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="job-details">
          {selectedJob ? (
            <div className="job-card">
              <div className="job-card-header">
                <div className="company-logo-circle">
                  {selectedJob.companyLogo ? (
                    <img src={selectedJob.companyLogo} alt="Logo" />
                  ) : (
                    <span>{selectedJob.title[0]}</span>
                  )}
                </div>
                <div>
                  <h3>{selectedJob.title}</h3>
                  <p className="job-meta">{selectedJob.company || 'Company Name'} • {selectedJob.location}</p>
                </div>
              </div>
              <p><strong>Type:</strong> {selectedJob.type}</p>
              <p><strong>Skills:</strong> {selectedJob.skills}</p>
              <p><strong>Experience:</strong> {selectedJob.experience}</p>
              <p><strong>Salary:</strong> {selectedJob.salary}</p>
              <p><strong>Start Date:</strong>{' '}
                {selectedJob.startDate ? new Date(selectedJob.startDate).toLocaleDateString() : '—'}</p>
              <p><strong>Deadline:</strong>{' '}
                {selectedJob.deadline ? new Date(selectedJob.deadline).toLocaleDateString() : '—'}</p>
              <p>{selectedJob.description}</p>
              <button onClick={() => setShowModal(true)} className="apply-button">
                Apply
              </button>
            </div>
          ) : (
            <p className="select-job-text">Select a job to see details</p>
          )}
        </div>
      </div>

      {/* Application Modal */}
      {showModal && selectedJob && (
        <JobApplicationModal
          jobId={selectedJob._id}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default JobListing;
