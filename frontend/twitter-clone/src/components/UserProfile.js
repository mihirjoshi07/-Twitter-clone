import { IoMdArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import useGetUser from '../hooks/useGetUser';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { followingUpdate,setToggle } from "../redux/userSlice"
import { getRefresh } from '../redux/tweetSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect, useState } from "react";


export default function UserProfile() {
    const { imageUser } = useSelector((state) => state.user)
    const { userp } = useGetUser();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user)
    const [count,setCount]=useState(0);
    useEffect(() => {
        const countPosts=async(id)=>{
            try {
                const res=await fetch(`http://localhost:4000/tweet/postCount/${id}`,{credentials:"include"});
                const data=await res.json();
                if(data.success)
                {
                  setCount(data.count)
                }
            } catch (error) {
              toast.error(error.response.data.message)   
            }
        }
        countPosts(userp?.user._id)
    }, [user, imageUser,count,userp])
    // If user or user data is not available, show a loading state or a fallback UI
    if (!userp || !userp.user) {
        return <div>Loading...</div>;
    }

    const isProfilePic = userp?.user.profilePic ? true : false

    const followAndUnfollowHandler = async () => {
        try {
            axios.defaults.withCredentials = true;
            let res;
            if (user?.follwing.includes(userp?.user._id)) {
                // Unfollow request
                res = await axios.put(`http://localhost:4000/user/unfollow/${userp?.user._id}`);
            } else {
                // Follow request
                res = await axios.put(`http://localhost:4000/user/follow/${userp?.user._id}`);
            }

            if (res?.data) {
                dispatch(followingUpdate(userp?.user._id));
                dispatch(getRefresh());
                dispatch(setToggle());
                toast.success(res.data.message);
            } else {
                toast.error("Unexpected response from the server");
            }
        } catch (error) {
            if (error.response) {
                // Error response from the server (4xx, 5xx status codes)
                toast.error(error.response.data.message || "Server Error");
            } else if (error.request) {
                // No response from the server
                toast.error("No response from server");
            } else {
                // Other unknown errors
                toast.error("Error occurred");
            }
        }
    };


    return (
        <div className='border-l border-r border-gray-200'>
            <div className=''>
                <div className='flex items-center py-2'>
                    <Link to="/" className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                        <IoMdArrowBack size="24" />
                    </Link>
                    <div className='ml-2'>
                        <h1 className='font-bold text-lg'>{userp.user.name}</h1>
                        <p className='text-gray-500 text-sm'>{count} Posts</p>
                    </div>
                </div>
                <img className="h-55" src="https://pbs.twimg.com/profile_banners/1581707412922200067/1693248932/1080x360" alt="banner"></img>
                <div className='absolute  top-52 ml-2 bg-cyan-300 border-4 border-white rounded-full'>
                    {
                        isProfilePic ? (
                            <img
                                src={`http://localhost:4000/uploads/${userp.user.profilePic}`}
                                alt="Profile"
                                style={{
                                    width: '120px',
                                    height: '120px', // Ensure the height matches
                                    borderRadius: '50%', // Makes the image round
                                    objectFit: 'cover' // Ensures the image covers the space without distortion
                                }}
                            />
                        ) : (
                            <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="120" round={true} />

                        )
                    }


                </div>

                <div className='text-right m-4'>
                    <span className='rounded-full px-2 py-1 m-4 bg-black text-white font-bold'>
                        Following : {userp?.user.follwing?.length || 0}
                    </span>
                    <span className='rounded-full px-2 py-1 m-4 bg-black text-white font-bold'>
                        followers : {userp?.user.followers?.length || 0}
                    </span>

                    <button onClick={() => { followAndUnfollowHandler(); }} className='px-4 py-1 bg-black text-white rounded-full'> {user?.follwing.includes(userp.user._id) ? "Following" : "Follow"}  </button>
                </div>

                <div className='m-4 mt-7'>
                    <h1 className='font-bold text-xl'>{userp.user.name}</h1>
                    <p>@{userp.user.username}</p>
                </div>
                <div className='m-4 text-sm'>
                    <p>
                        {userp.user.bio}
                    </p>
                </div>
            </div>
        </div>
    );
}
