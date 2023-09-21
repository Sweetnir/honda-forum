import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import supabase from './services/supabaseClient';
import Auth from './components/Auth';
import Account from './components/Account';


// Import the new components
import Home from './components/Home';
import Posts from './components/Posts';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
// Navbar component with navigation links


function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <Router>
        {/* Include the Navbar component */}
        <Navbar />
        {/* Use Routes to define your routes */}
        <Routes>
          {/* Route for the Home component */}
          <Route path="/" element={<Home />} />
          {/* Route for the Posts component */}
          <Route path="/posts" element={<Posts />} />
          {/* Route for the Profile component */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    </div>
  );
}

export default App;
