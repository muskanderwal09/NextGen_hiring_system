import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const JobEdit = ({ adminId }) => {
  const { id } = useParams();
  const [job, setJob] = useState({ title: '', description: '', location: '', type: '' });

  useEffect(() => {
    fetch(`http://localhost:5000/api/jobs/admin/${adminId}`)
      .then(res => res.json())
      .then(data => {
        const jobToEdit = data.find(j => j._id === id);
        if (jobToEdit) setJob(jobToEdit);
      });
  }, [adminId, id]);

  const handleChange = e => setJob({ ...job, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...job, adminId }),
    });
    const result = await res.json();
    if (res.ok) {
      alert('Updated successfully');
    } else {
      alert(result.error || 'Update failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Job</h2>
      <input name="title" value={job.title} onChange={handleChange} required />
      <textarea name="description" value={job.description} onChange={handleChange} />
      <input name="location" value={job.location} onChange={handleChange} />
      <input name="type" value={job.type} onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
};

export default JobEdit;
