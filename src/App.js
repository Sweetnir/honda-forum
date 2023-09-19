import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Posts from './components/Posts'; // Import the Posts component

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <Navbar /> 
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/posts" element={<Posts />} /> {/* Add this route */}
            {/* Add more routes for other pages as needed */}
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
