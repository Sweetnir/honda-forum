import React, { useState, useEffect } from 'react';
import supabase from './supabase';
import { v4 as uuidv4 } from 'uuid';

function PostPictures({ user }) {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  // Function to fetch and update the list of images
  const getImages = async () => {
    if (user) {
      const { data, error } = await supabase.storage.from('images').list(`${user.id}/`);

      if (data) {
        setImages(data);
      } else {
        console.error('Error fetching images:', error);
      }
    }
  };

  // Fetch images when the component mounts or when the user changes
  useEffect(() => {
    getImages();
  }, [user]);

  const uploadImage = async () => {
    if (!user) {
      alert('Please log in to upload images.');
      return;
    }

    if (!file) {
      alert('Please select an image to upload.');
      return;
    }

    try {
      const { data, error } = await supabase.storage.from('images').upload(`${user.id}/${uuidv4()}`, file, {
        cacheControl: '3600',
        upsert: false,
      });

      if (data) {
        alert('Image uploaded successfully.');
        setFile(null); // Clear the selected file
        getImages(); // Refresh the list of images
      } else {
        console.error('Error uploading image:', error);
        alert('Error uploading image. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Function to delete an image by name
  const deleteImage = async (imageName) => {
    if (!user) {
      alert('Please log in to delete images.');
      return;
    }

    try {
      const { error } = await supabase.storage.from('images').remove([`${user.id}/${imageName}`]);

      if (error) {
        console.error('Error deleting image:', error);
        alert('Error deleting image. Please try again.');
      } else {
        alert('Image deleted successfully.');
        getImages(); // Refresh the list of images after deletion
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image. Please try again.');
    }
  };

  return (
    <div>
      <h2>Post a Picture</h2>
      {user && (
        <>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button onClick={uploadImage}>Upload</button>
          <p>Click on an image below to delete it.</p>
        </>
      )}

      {/* Display uploaded images */}
      <div className="image-list">
        {images.map((image) => (
          <div key={image.id} className="image-item">
            <img src={image.url} alt={image.name} />
            <button onClick={() => deleteImage(image.name)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostPictures;
