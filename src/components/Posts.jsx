"use client"; // Assuming you have the Supabase client configured elsewhere in your application

import React, { useState } from "react";
import "../styles/posts.css";
import supabase from "../supabase"; // Make sure you have the Supabase client imported

function UserPost() {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Insert data into the Supabase table
    try {
      setIsSubmitting(true);
      const { data, error } = await supabase
        .from('posts')
        .insert([{ username, comment }]);

      if (error) {
        console.error('Error inserting data:', error.message);
      } else {
        console.log('Data inserted successfully:', data);
        // Optionally, you can perform any UI updates here to indicate success

        // Clear the form after successful submission
        setUsername("");
        setComment("");
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1>Create a Post!</h1>
      <div className="post-container">
        <section className="user-textbox">
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Comment"
              type="text"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Post"}
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default UserPost;
