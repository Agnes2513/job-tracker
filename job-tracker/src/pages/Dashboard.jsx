import React, { useContext } from 'react';
import { JobContext } from '../context/JobContext';
import JobCard from '../components/JobCard';

import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Profile from '../pages/Profile'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { jobs } = useContext(JobContext);
  const navigate=useNavigate();
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Job Dashboard</h2>

        <FaUserCircle
        size={35}
        style={{cursor:"pointer"}}
        onClick={()=>navigate("/profile")}
        />



        <Link to="/add-job" className="btn btn-primary">Add Job</Link>
      </div>

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
