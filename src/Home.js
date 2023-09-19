import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  // Conditional rendering based on the current route
  let content = null;
  if (location.pathname === '/login') {
    content = <div>Render the login content here</div>;
  } else if (location.pathname === '/signup') {
    content = <div>Render the sign-up content here</div>;
  } else {
    // Default content when neither login nor sign-up route matches
    content = (
      <div>
        <h1>Welcome to My App</h1>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    );
  }

  return (
    <div className="home-container">
      {content}
    </div>
  );
}

export default Home;
