import React, { useEffect, useState } from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import { useSelector } from "react-redux";
import EditProfile from './EditProfile'; // Import the EditProfile component
import toast from 'react-hot-toast';

export default function Profile() {
  const { user } = useSelector((state) => state.user);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false); // State for modal
  const isProfilePic=user?.profilePic ? true : false
  const [count,setCount]=useState(0);
  useEffect(()=>{
      const totalPosts=async(id)=>{
        try {
            const res=await fetch(`http://localhost:4000/tweet/postCount/${id}`,{credentials:"include"});
            const data=await res.json();
            if(data.success)
            {
              console.log(data.count)
              setCount(data.count)
            }
        } catch (error) {
          toast.error(error.response.data.message)   
        }
      }   
      totalPosts(user?._id);           
  })
  return (
    <div className='border-l border-r border-gray-200'>
      <div className=''>
        <div className='flex items-center py-2'>
          <Link to="/" className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
            <IoMdArrowBack size="24" />
          </Link>
          <div className='ml-2'>
            <h1 className='font-bold text-lg'>{user?.name}</h1>
            <p className='text-gray-500 text-sm'>{count ? count:0} posts</p>
          </div>
        </div>
        <img className="h-55" src="https://pbs.twimg.com/profile_banners/1581707412922200067/1693248932/1080x360" alt="banner" />
        <div className='absolute  top-52 ml-2 bg-cyan-300 border-4 border-white rounded-full'>
       
       {
          isProfilePic ? (
            <img
            src={`http://localhost:4000/uploads/${user.profilePic}`}
            alt="Profile"
            style={{
                width: '120px',
                height: '120px', // Ensure the height matches
                borderRadius: '50%', // Makes the image round
                objectFit: 'cover' // Ensures the image covers the space without distortion
            }}
        />) : (
          <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="120" round={true} />
        )
          
       }
             
        </div>
        <div className='text-right'>
         
         
          <span className='rounded-full px-2 py-1 m-4 bg-black text-white font-bold'>
            Following : {user?.follwing.length}
          </span>
          <span className='rounded-full px-2 py-1 m-4 bg-black text-white font-bold'>
            followers : {user?.followers.length || 0}
          </span>

          <button 
            className='rounded-full px-2 py-1 m-4 bg-black text-white font-bold'
            onClick={() => setEditProfileOpen(true)} // Open the EditProfile modal
          >
            Edit Profile
          </button>
        </div>

        <div className='m-4'>
          <h1 className='font-bold text-xl'>{user?.name}</h1>
          <p>@{user?.username}</p>
        </div>
        <div className='m-4 text-sm'>
          <p>
            {user?.bio}
          </p>
        </div>
      </div>

      {/* Render EditProfile component as a modal */}
      {isEditProfileOpen && (
        <div className="modal-overlay">
          <EditProfile 
            user={user} 
            onClose={() => setEditProfileOpen(false)} // Close modal function
          />
        </div>
      )}
    </div>
  );
}
