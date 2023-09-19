import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../services/supabaseClient";
import "../styles/login.css";

function Login() {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

 const navigate = useNavigate();

 const handleLogin = async () => {
  let { data, error } = await supabase.auth.signInWithPassword({
   email,
   password,
  });
  if (error) {
   console.log("Login Error:", error);
  } else {
   console.log("Login Success:", data);
   navigate("/");
  }
 };

 return (
  <div className="login-container">
   <h1>Login</h1>
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
    <button type="button" className="btn btn-primary" onClick={handleLogin}>
     Login
    </button>
    <Link to="/signup" className="btn btn-link">
     Don't have an account? Sign Up
    </Link>
   </form>
  </div>
 );
}

export default Login;