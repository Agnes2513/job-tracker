import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import supabase from '../helper/supabaseClient';
import { JobContext } from '../context/JobContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function JobForm() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    applicationStatus: "",
    companyName: "",
    jobPlatform: "",
    jobType: "",
    resumeSent: false,
    location: "",
    coverLetterSent: false,
    dateApplied: "",
    notes: "",
    followUpDate: "",
    interviewDate: ""
  });

  const { addJob } = useContext(JobContext);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ Get the logged-in user
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error fetching user:", userError);
    alert("Could not fetch user. Please log in again.");
    return;
  }

  if (!user) {
    alert("You must be logged in to add a job.");
    return;
  }

  // ✅ Map formData (camelCase) → Supabase (snake_case)
  const jobData = {
    job_title: formData.jobTitle,
    company_name: formData.companyName,
    job_type: formData.jobType,
    location: formData.location,
    date_applied: formData.dateApplied,
    follow_up_date: formData.followUpDate||null,
    application_status: formData.applicationStatus,
    job_platform: formData.jobPlatform,
    resume_sent: formData.resumeSent,
    cover_letter_sent: formData.coverLetterSent,
    notes: formData.notes,
    interview_date: formData.interviewDate||null,
    user_id: user.id,   // ✅ user.id comes from Supabase auth
  };
  
  // ✅ Insert into Supabase
  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.error("Error adding job:", error);
    alert("Failed to add job. Please try again.");
    return;
  }

  console.log("Job added successfully:", data);
  addJob(data[0]);
  navigate("/dashboard");
};


  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Add Job</h2>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Job Title</label>
            <input type="text" className="form-control" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Company Name</label>
            <input type="text" className="form-control" name="companyName" value={formData.companyName} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Job Type</label>
            <input type="text" className="form-control" name="jobType" value={formData.jobType} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Date Applied</label>
            <input type="date" className="form-control" name="dateApplied" value={formData.dateApplied} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Follow-up Date</label>
            <input type="date" className="form-control" name="followUpDate" value={formData.followUpDate} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Application Status</label>
            <select className="form-select" name="applicationStatus" value={formData.applicationStatus} onChange={handleChange}>
              <option value="">--Select--</option>
              <option value="applied">Applied</option>
              <option value="interview_scheduled">Interview Scheduled</option>
              <option value="offer_received">Offer Received</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Job Platform</label>
            <input type="text" className="form-control" name="jobPlatform" value={formData.jobPlatform} onChange={handleChange} />
          </div>

          <div className="form-check mb-2">
            <input className="form-check-input" type="checkbox" name="resumeSent" checked={formData.resumeSent} onChange={handleChange} />
            <label className="form-check-label">Resume Sent</label>
          </div>

          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" name="coverLetterSent" checked={formData.coverLetterSent} onChange={handleChange} />
            <label className="form-check-label">Cover Letter Sent</label>
          </div>

          <div className="mb-3">
            <label className="form-label">Notes/Comments</label>
            <textarea className="form-control" rows="3" name="notes" value={formData.notes} onChange={handleChange}></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Interview Date</label>
            <input type="date" className="form-control" name="interviewDate" value={formData.interviewDate} onChange={handleChange} />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success px-4">Add Job</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
