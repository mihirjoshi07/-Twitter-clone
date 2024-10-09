// import React from 'react'
// import CreatePost from './CreatePost'
// import Tweet from './Tweet'
// export default function Feed() {
//   return (
//     <div className=" border border-gray-200">
//       <div>
//         <CreatePost />
//         <Tweet/>
//         <Tweet/>
//         <Tweet/>  
//       </div>
//     </div>
//   )
// }

import useGetAllTweets from "../hooks/useGetAllTweets";
import {useSelector} from "react-redux";
import CreatePost from "../components/CreatePost";
import Tweet from "../components/Tweet";

export default function Feed() {
  // Custom hook that performs the API call and dispatches data to Redux
  useGetAllTweets();
  
  const tweets = useSelector((state) => state.tweet.tweets); // Accessing Redux state for tweets

  return (
    <div className="border border-gray-200">
      <div>
        <CreatePost />
        {tweets && tweets.length > 0 ? (
          tweets.map((tweet) => (
            <Tweet key={tweet._id} tweet={tweet} /> // Rendering each tweet
          ))
        ) : (
          <p>No tweets available</p> // Fallback message if no tweets
        )}
      </div>
    </div>
  );
}
