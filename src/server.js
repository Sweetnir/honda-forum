import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Posts from './components/Posts'; 

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
            <Route path="/profile" element={<Profile />} />
            <Route path="/posts" element={<Posts />} /> 
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;