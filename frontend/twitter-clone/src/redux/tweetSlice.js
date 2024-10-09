import { createSlice } from "@reduxjs/toolkit";

const tweetSlice=createSlice({
    name:"Tweet",
    initialState:{
        tweets:[],
        refresh:false,
        whoseTweet:"allTweets"////"allTweets"  or  "otherTweets"
    },
    reducers:{
        //multiple actions
        getAllTweets:(state,action)=>{
            state.tweets=action.payload
        },
        getRefresh:(state)=>{
            state.refresh=!state.refresh;
        },
        getWhoseTweet:(state,action)=>{
            state.whoseTweet=action.payload
        }
    }
})

export const {getAllTweets,getRefresh,getWhoseTweet}=tweetSlice.actions;
export default tweetSlice.reducer