import React, { useState, useEffect } from 'react';
import supabase from '../services/supabaseClient';
import ProfileUpdateForm from './ProfileUpdateForm'; // Import the ProfileUpdateForm component

function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      let { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user.id)
        .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }

      setLoading(false);
    }

    getProfile();
  }, [session]);

  // Update the UI with new username and avatar
  const handleProfileUpdate = (newUsername, newAvatarUrl) => {
    setUsername(newUsername);
    setAvatarUrl(newAvatarUrl);
  };

  return (
    <div>
      <h1>Your Account</h1>
      <p>Email: {session.user.email}</p>
      <p>Username: {username}</p>
      <img src={avatarUrl} alt="Avatar" width="100" />

      <ProfileUpdateForm
        session={session}
        currentUsername={username}
        currentAvatarUrl={avatarUrl}
        onUpdate={handleProfileUpdate}
      />
    </div>
  );
}

export default Account;
