import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'; // Replace 'Home' with your actual root component
import SignUp from './SignUp'
import Login from './Login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Define your root route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
