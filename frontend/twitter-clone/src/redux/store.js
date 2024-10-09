import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import tweetSlice from "./tweetSlice";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist"
import {combineReducers} from "@reduxjs/toolkit"


const persistConfig={
    key:"root",
    version:1,
    storage
};
const reducer=combineReducers({
    user:userSlice,
    tweet:tweetSlice
});

const persistedReducer=persistReducer(persistConfig,reducer)

export const store=configureStore({
    reducer:persistedReducer
})

