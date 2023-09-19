import React from 'react';
import "../styles/profile.css";

function Profile() {
  // You can fetch user data and display it here

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="user-details">
        {/* Display user information here */}
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
        {/* Add more user details as needed */}
      </div>
      <div className="profile-actions">
        {/* Add buttons or links for profile actions */}
        <button>Edit Profile</button>
        <button>Change Password</button>
        {/* You can add more profile actions here */}
      </div>
    </div>
  );
}

export default Profile;
