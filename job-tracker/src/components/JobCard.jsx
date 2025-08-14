import React from 'react';

const JobCard = ({ job }) => (
  <div className="card shadow">
    <div className="card-body">
      <h5 className="card-title">{job.jobTitle}</h5>
      <p className="card-text">{job.companyName}</p>
      <p className="card-text">
        <small className="text-muted">{job.location}</small>
      </p>
      <p className="card-text">
        <span className="badge bg-info">{job.applicationStatus}</span>
      </p>
    </div>
  </div>
);

export default JobCard;
