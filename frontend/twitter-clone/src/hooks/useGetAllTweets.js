import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";
import { useNavigate } from 'react-router-dom';

const useGetAllTweets = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { refresh, whoseTweet } = useSelector(state => state.tweet);
  console.log(whoseTweet)
  // Reusable function to fetch tweets
  const fetchTweets = async (url, errorMsg) => {
    try {
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const error = await res.json();
        if (error.message === "User not Authenticated") {
          navigate("/login");
        }
        throw new Error(error.message || errorMsg);
      }

      const data = await res.json();
      console.log("Fetched tweets:", data);
      
      // Only dispatch if there are new tweets or data changes
     
        dispatch(getAllTweets(data.tweets)); // Dispatch tweets to Redux store
     
 

    } catch (error) {
      toast.error("dd",error.message); // Show error toast
    }
  };

  // Fetch all tweets or following tweets based on `whoseTweet`
  useEffect(() => {
    // Debounce API call
    let timeoutId = setTimeout(() => {
      const url = whoseTweet === "allTweets"
        ? "http://localhost:4000/tweet/getAllTweets"
        : "http://localhost:4000/tweet/followingTweets";

      const errorMsg = whoseTweet === "allTweets"
        ? "Failed to fetch all tweets"
        : "Failed to fetch following tweets";

      fetchTweets(url, errorMsg);
    }, 500); // Throttle the API call (500ms delay)

    // Cleanup timeout to avoid unnecessary calls
    return () => clearTimeout(timeoutId);
  }, [dispatch, whoseTweet, refresh,navigate]); // Removed `refresh` from dependency array

};

export default useGetAllTweets;
