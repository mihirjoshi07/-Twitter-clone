import React, { useState } from 'react';
import "./editProfile.css"
import {getImage} from "../redux/userSlice"
import { useDispatch } from 'react-redux';
import {getUser} from "../redux/userSlice"
const EditProfile = ({ user, onClose }) => {
  const dispatch=useDispatch();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user.username || '',
    bio: user.bio || '',
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({ ...formData, [name]: type === 'file' ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));

    try {
      const response = await fetch('http://localhost:4000/user/upload', {
        method: 'POST',
        credentials:"include",
        body: form,
      });
     const data=await response.json();
     if(data.success)
     {
        console.log(data)
        dispatch(getUser(data.user))
        dispatch(getImage())
        alert("profile got updated");
     }
     else{
        alert("Error while uploading image...");
     }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the profile');
    }
  };

  return (
    <div className="modal">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleInputChange} 
          placeholder="Name" 
          required 
        />
        <input 
          type="text" 
          name="username" 
          value={formData.username} 
          onChange={handleInputChange} 
          placeholder="Username" 
          required 
        />
        <textarea 
          name="bio" 
          value={formData.bio} 
          onChange={handleInputChange} 
          placeholder="Bio" 
          required 
        />
        <input 
          type="file" 
          name="file" 
          onChange={handleInputChange} 
          accept="image/*" 
        />
        <button type="submit" className="rounded-full px-2 py-1 m-4 bg-blue-500 text-white font-bold">
          Update Profile
        </button>
        <button type="button" onClick={onClose} className="rounded-full px-2 py-1 m-4 bg-gray-500 text-white font-bold">
          Close
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
