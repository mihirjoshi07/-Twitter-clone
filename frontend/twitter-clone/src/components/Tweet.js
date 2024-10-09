import Avatar from 'react-avatar'
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import {getUser} from "../redux/userSlice"
import {getRefresh} from "../redux/tweetSlice"
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useSelector } from 'react-redux';


export default function Tweet({tweet}) {
    
    const dispatch=useDispatch()
    const {user} = useSelector((state)=>state.user)
  const handleLikeDislike=async(id)=>{
    try {
        const res=await fetch(`http://localhost:4000/tweet/likeDislike/${id}`,{
            method:"PUT",
            credentials:"include",       
        })
        const data=await res.json()
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Failed to fetch tweets");
          }
        toast.success(data.message);
        dispatch(getUser(data.user))
        dispatch(getRefresh())
     

    } catch (error) {
        toast.error(error)
    }
  }

  const handleBookmarks=async(id)=>{
    try {
        const res=await fetch(`http://localhost:4000/tweet/bookmark/${id}`,{
            method:"PUT",
            credentials:"include"
        });  
        const data=await res.json();
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Failed to fetch tweets");
          }
          toast.success(data.message);

          dispatch(getRefresh())
    } catch (error) {
          
    }
  }

  const handleDelete=async(id)=>{
    try {
        const res=await fetch(`http://localhost:4000/tweet/deleteTweet/${id}`,{
            method:"DELETE",
            credentials:"include"
        });
        const data=await res.json();
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Failed to fetch tweets");
          }
          toast.success(data.message);

          dispatch(getRefresh())
  
    } catch (error) {
        toast.error(error)
    }
  }

  return (
    <div className='border-b border-gray-200'>
        <div> 
            <div className='flex p-4 '>
                <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="40" round={true} />
                <div className='ml-2 w-full'>
                    <div className='flex items-center '>
                        <h1 className='font-bold'>{tweet.name} </h1>
                        <p className='text-gray-500 text-sm ml-2'> @{tweet?.username} . 1m</p>
                    </div>
                    
                    <div>
                       <p>{tweet.description}</p> 
                    </div>
                    
                    <div className='flex justify-between my-3'>
                        <div className='flex items-center'>
                            <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
                                <FaRegComment size="20px"/>
                            </div>
                            <p>{tweet?.comment?.length}</p>
                        </div>
                        <div className='flex items-center'>
                            <div onClick={()=>{handleLikeDislike(tweet._id); dispatch(getRefresh())}} className='p-2 hover:bg-pink-200 cursor-pointer rounded-full'>
                                <CiHeart size="24px"/>
                            </div>
                            <p>{tweet?.like?.length}</p>
                        </div>
                        <div className='flex items-center'>
                            <div onClick={()=>{handleBookmarks(tweet._id)}} className='p-2 hover:bg-yellow-200 rounded-full cursor-pointer'>
                                <CiBookmark size="24px"/>   
                            </div>
                            <p>{tweet?.bookmark?.length}</p>
                        </div>
                        {   
                            user?._id===tweet?.userId && (
                            <div  className='flex items-center'>
                                <div  onClick={()=>{handleDelete(tweet._id)}} className=' p-2 hover:bg-red-300 rounded-full cursor-pointer'>
                                    <MdOutlineDeleteOutline size="24px" />
                                </div>
                            </div>
                            )
                        }
                        
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}
