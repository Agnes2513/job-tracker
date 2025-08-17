import React, { useContext } from 'react';
import { JobContext } from '../context/JobContext';
import JobCard from '../components/JobCard';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { jobs } = useContext(JobContext);
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate('/profile');
  };

  return (
    <div className="container mt-4">
      {/* Top Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Job Dashboard</h2>
        <div>
          <Link to="/add-job" className="btn btn-primary me-2">
            Add Job
          </Link>
          <button className="btn btn-secondary" onClick={handleDashboard}>
            Go to Profile
          </button>
        </div>
      </div>

      {/* Job Cards */}
      <div className="row">
        {jobs.map((job, index) => (
          <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={index}>
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
