import React from 'react'
import { IoIosSearch } from "react-icons/io";
import Avatar from "react-avatar"
import useGetAllUsers from '../hooks/useGetAllUsers';
import {useDispatch} from "react-redux"
import {getUserProfile} from "../redux/userSlice"
import { Link } from 'react-router-dom';

export default function RightSideBar() {
  const allUsers=useGetAllUsers();
  const dispatch=useDispatch();
  return (  
    <div className="w-[22%] ml-20 ">  
      <div className='flex items-center p-2 bg-gray-100 rounded-full  '>
        <IoIosSearch size="24" />
        <input type="text" placeholder='Search' className='outline-none bg-transparent ml-1'></input>
      </div>


      <div className='p-4 bg-gray-100 my-4 rounded-2xl'>{/*profile container*/}
        <h1 className='font-bold text-lg my-3'>Who to follow</h1>

        
    {
  Array.isArray(allUsers.allUsers) && allUsers.allUsers.length > 0 ? (
    allUsers.allUsers.map((user) => (
      <div className='flex justify-between mb-5' key={user._id}>
        <div className='flex items-center'>
          <div>
            <Avatar src={`http://localhost:4000/uploads/${user.profilePic}` || 'default-avatar-url.jpg'} size="40" round={true} />
          </div>
          <div className='ml-2'>
            <h1 className='font-bold'>{user.name}</h1>
            <p className='text-sm'>@{user.username}</p>
          </div>
        </div>
        <div>
      <Link to={"/userProfile"}>
          <button className='text-white px-4 py-1 bg-black rounded-full' onClick={()=>{dispatch(getUserProfile(user._id))}}>Profile</button>
      </Link> 
        </div>
      </div>
    ))
  ) : (
    <p>No users found.</p>
  )
}



        
      </div>{/*profile container*/}

    </div>
  )
}
