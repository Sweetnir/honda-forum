import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../services/supabaseClient';
import '../styles/signUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSignUp = async () => {
    try {
      const { user, session, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Signup Error:', error.message);
        return;
      }

      if (user) {
        const fileName = `profile_pictures/${user.id}/${profilePicture.name}`;
        const { data: imageUploadResponse, error: imageUploadError } =
          await supabase.storage
            .from('avatars') // Update to your storage bucket name 'avatar'
            .upload(fileName, profilePicture);

        if (imageUploadError) {
          console.error('Error uploading profile picture:', imageUploadError.message);
          return;
        }

        console.log('Profile picture uploaded successfully:', imageUploadResponse);

        // You can update user profile data here with the uploaded image URL
        // Example: await supabase.from('users').update({ profile_picture: imageUploadResponse.url }).eq('id', user.id);
      }
    } catch (error) {
      console.error('Signup Error:', error.message);
    }
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="profilePicture" className="form-label">
            Profile Picture
          </label>
          <input
            type="file"
            className="form-control"
            id="profilePicture"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSignUp}>
          Sign Up
        </button>
        <Link to="/login" className="btn btn-link">
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
}

export default SignUp;
