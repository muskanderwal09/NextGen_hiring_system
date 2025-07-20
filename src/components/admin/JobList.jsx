import React, { useEffect, useState } from "react";
import axios from "axios";

function JobList({ adminId }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (!adminId) return;

    const fetchJobs = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/admin/${adminId}`);
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, [adminId]);

  return (
    <div>
      <h2>Jobs Created by You</h2>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>{job.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default JobList;
