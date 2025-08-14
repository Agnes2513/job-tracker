import React from "react";

const Profile = () => {
  // Later, you can replace this static data with Firebase user info
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Software Engineer",
    location: "New York, USA",
    memberSince: "Jan 2024",
    avatar: "https://placekitten.com/120/120"  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={user.avatar}
          alt="Profile"
          className="profile-avatar"
        />
        <h2>{user.name}</h2>
        <p className="profile-email">{user.email}</p>

        <div className="profile-info">
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Location:</strong> {user.location}</p>
          <p><strong>Member Since:</strong> {user.memberSince}</p>
        </div>

        <button className="edit-btn">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
