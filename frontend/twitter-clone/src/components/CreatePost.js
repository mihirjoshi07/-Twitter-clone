import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { CiImageOn } from "react-icons/ci";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { getRefresh, getWhoseTweet } from "../redux/tweetSlice";

export default function CreatePost() {
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();
    const { whoseTweet } = useSelector(state => state.tweet);
    const { user } = useSelector((state) => state.user);
    const isProfilePic = user?.profilePic ? true : false

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDescription(""); // Clear the input after submitting
        try {
            const res = await fetch("http://localhost:4000/tweet/createTweet",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ description }),
                }
            );
            const data = await res.json();
            if (!data.success) {
                throw new Error(data.message);
            }
            dispatch(getRefresh());
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleAllTweet = () => {
        dispatch(getWhoseTweet("allTweets"));
    };

    const handleOtherTweets = () => {
        dispatch(getWhoseTweet("othersTweet"));
    };

    return (
        <div className='w-[100%]'>
            {/* Tab Section */}
            <div className='flex items-center justify-between border-b border-gray-200'>
                {/* For You Section */}
                <div
                    onClick={handleAllTweet}
                    className={`hover:cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3 
                    ${whoseTweet === "allTweets" ? "border-b-4 border-blue-500" : ""}`}
                >
                    <h1 className='font-semibold text-gray-600 text-lg'>For you</h1>
                </div>

                {/* Following Section */}
                <div
                    onClick={handleOtherTweets}
                    className={`hover:cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3 
                    ${whoseTweet === "othersTweet" ? "border-b-4 border-blue-500" : ""}`}
                >
                    <h1 className='font-semibold text-gray-600 text-lg'>Following</h1>
                </div>
            </div>


            {/* Post Form */}
            <form onSubmit={handleSubmit} className='border-b border-gray-300'>
                <div className='flex items-center m-2'>
                    <div>
                        {
                            isProfilePic ? (
                                <img
                                    src={`http://localhost:4000/uploads/${user?.profilePic}`}
                                    alt="profile"
                                    style={{
                                        width: '50px',
                                        height: '47px',
                                        borderRadius: '50%',  // To make it round
                                        border: " solid 2px violet"
                                    }}
                                />
                            ) : (
                                <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="40" round={true} />
                            )
                        }

                    </div>
                    <input
                        className='w-full outline-none border-none text-xl ml-3'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} // Update state on input change
                        type="text"
                        placeholder='What is happening?!'
                    />
                </div>

                <div className='flex items-center justify-between p-2 pb-2 pt-3'>
                    <div>
                        <CiImageOn size="24px" />
                    </div>
                    <button className='bg-[#1D9BF0] px-4 py-1 border-none rounded-full text-lg text-white'>
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
}
