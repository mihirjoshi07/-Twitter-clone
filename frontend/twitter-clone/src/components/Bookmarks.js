import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar';
import toast from 'react-hot-toast';

export default function Bookmarks() {
  const [tweets, setTweets] = useState(null);
  useEffect(() => {
    const getBookmarks = async () => {
      try {
        const result = await fetch("http://localhost:4000/tweet/getBookmarks", { method: "GET", credentials: "include" });
        const data = await result.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setTweets(data.fetchTweets)
      } catch (error) {
        toast.error(error.message)
      }
    }

    getBookmarks();
  }, [])
  console.log("state  : ", tweets)
  return (
    <>
      <div className='w-[100%]'>
        <div className='flex items-center justify-between border-b border-gray-200'>

          <div

            className={`hover:cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3 
                    "border-b-4 border-blue-500" : ""}`}
          >
            <h1 className='font-semibold text-gray-600 text-lg'>Bookmarks </h1>
          </div>
        </div>
        {
          tweets?.length > 0 ? (
            tweets?.map((item) => (
              <div className='border-b border-gray-200'>
                <div>
                  <div className='flex p-4 '>
                    <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="40" round={true} />
                    <div className='ml-2 w-full'>
                      <div className='flex items-center '>
                        <h1 className='font-bold'>{item.name}</h1>
                        <p className='text-gray-500 text-sm ml-2'> @{item.username} . 1m</p>
                      </div>
  
                      <div>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className='font-semibold mt-5 text-gray-600 text-lg'>You have no Bookmarks </h1>
          ) 
          
        }



      </div>
    </>
  )
}
