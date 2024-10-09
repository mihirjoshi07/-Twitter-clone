const express=require("express");
const auth=require("../config/auth")
const {createTweet,getAllTweets,deleteTweet,likeDislike,followingTweets, totalTweets}=require("../controllers/tweetController");
const { bookMark,getBookmarks } = require("../controllers/tweetController");
const router=express.Router();

router.post("/createTweet",auth,createTweet);
router.get("/getAllTweets",auth,getAllTweets);
router.get("/followingTweets",auth,followingTweets);
router.get("/getBookmarks",auth,getBookmarks);
router.get("/postCount/:id",auth,totalTweets);
router.delete("/deleteTweet/:id",auth,deleteTweet);
router.put("/likeDislike/:tweetId",auth,likeDislike);
router.put("/bookmark/:tweetId",auth,bookMark);
module.exports=router; 