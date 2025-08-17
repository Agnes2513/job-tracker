import React, { useContext } from 'react';
import { JobContext } from '../context/JobContext';
import JobCard from '../components/JobCard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { jobs,loading } = useContext(JobContext);
  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <h4>Loading your jobs...</h4>
      </div>
    );
  }


  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Job Dashboard</h2>
        <Link to="/add-job" className="btn btn-primary">Add Job</Link>
      </div>
      <div className="row">
        {jobs.length === 0 ? (
          <div className="col-12">
            <p className="text-center">No jobs found. Please add a job.</p>
          </div>
        ) : (
          jobs.map((job, index) => (
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={index}>
              <JobCard job={job} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
