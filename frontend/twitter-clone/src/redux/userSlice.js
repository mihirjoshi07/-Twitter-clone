import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"User",
    initialState:{
        user:null,
        otherUsers:null,
        profile:null,
        userProfile:null,
        imageUser:null,
        refreshToggle:false,

    },
    reducers:{
        //multiple actions
        getUser:(state,action)=>{
            state.user=action.payload;
        },
        getOtherUsers:(state,action)=>{
            state.otherUsers=action.payload
        },
        getMyProfile:(state,action)=>{
            state.profile=action.payload;
        },
        getUserProfile:(state,action)=>{
            state.userProfile=action.payload
        },followingUpdate:(state,action)=>{
            // unfollow
            if(state.user.follwing.includes(action.payload)){
                state.user.follwing = state.user.follwing.filter((itemId)=>{
                    return itemId !== action.payload;
                })
            }else{
                // follow
                state.user.follwing.push(action.payload);
            }
        },
        getImage:(state)=>{
            state.imageUser=!state.imageUser;
        },
        setToggle:(state)=>{
            state.refreshToggle=!state.refreshToggle;
        }
    }
})

export const {getUser,getOtherUsers,getMyProfile,getUserProfile,followingUpdate,getImage,setToggle}=userSlice.actions;
export default userSlice.reducer