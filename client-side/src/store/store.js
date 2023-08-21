import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import postsSlice from "./postsSlice";
import postSlice from "./postSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        posts: postsSlice,
        post: postSlice
    }
})

