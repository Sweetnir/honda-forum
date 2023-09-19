import React from 'react';
import '../styles/home.css';


export default function Home() {
    return (
        <div className="home">
            <div className="home-banner">
                <h1>Welcome to Honda Enthusiasts</h1>
                <p>Share, Explore, and Connect with Honda Lovers</p>
            </div>
            <div className="home-content">
                <div className="home-section">
                    <h2>Latest Honda Posts</h2>
                    {/* Add a component or section to display the latest Honda-related posts */}
                </div>
                <div className="home-section">
                    <h2>Featured Honda Models</h2>
                    {/* Add a component or section to showcase featured Honda car models */}
                </div>
                <div className="home-section">
                    <h2>Join the Discussion</h2>
                    {/* Add a component or section to display discussions and comments */}
                </div>
                <div className="home-section">
                    <h2>Connect with Honda Enthusiasts</h2>
                    {/* Add a component or section to display user profiles and connections */}
                </div>
            </div>
        </div>
    );
}
