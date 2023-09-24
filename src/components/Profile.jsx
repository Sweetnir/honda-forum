import React from 'react';
import "../styles/profile.css";

function Profile() {
  
  function editProfileBtn() {
    
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="user-details">
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
      </div>
      <div className="profile-actions">
        <button onClick={""}>Edit Profile</button>
        <button>Change Password</button>
      </div>
    </div>
  );
}

export default Profile;
