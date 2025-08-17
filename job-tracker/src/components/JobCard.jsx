import React from 'react';

const JobCard = ({ job }) => (
  <div className="card shadow">
    <div className="card-body">
      <h5 className="card-title">{job.job_title}</h5>
      <p className="card-text">{job.company_name}</p>
      <p className="card-text">
        <small className="text-muted">{job.location}</small>
      </p>
      <p className="card-text">
        <span className="badge bg-info">{job.application_status}</span>
      </p>
    </div>
  </div>
);

export default JobCard;
