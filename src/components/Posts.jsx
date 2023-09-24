import React, { useState } from "react";
import "../styles/posts.css";
import supabase from "../supabase";

function UserPost() {
  return (
    <>
      <form className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input type="text" id="item" />
        </div>
        <button className="btn" type="submit">
          Post
        </button>
      </form>
      <h1>Creating Posts Test</h1>
      <ul>
        <li>
          <label>
            <input type="checkbox" />
            Item 1
          </label>
          <button className="btn btn-danger">Delete</button>
        </li>
      </ul>
    </>
  );
}

export default UserPost;
