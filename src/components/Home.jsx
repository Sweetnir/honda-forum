import React from "react";
import "../styles/home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <div className="home-banner">
        <h1>Welcome to the Honda Hub</h1>
        <p>Share, Explore, and Connect with Honda Lovers</p>
      </div>
      <div className="home-content">
        <div className="home-section">
          <Link className="link" to="/login">
            <h2>Latest Honda Posts</h2>
          </Link>
        </div>

        <div className="home-section">
          <h2>Featured Honda Builds</h2>
        </div>

        <div className="home-section">
            <Link className="link" to="/posts">
          <h2>Join the Discussion</h2>
          </Link>
        </div>

        <div className="home-section">
          <h2>Connect with Honda Enthusiasts</h2>
        </div>
      </div>
    </div>
  );
}
