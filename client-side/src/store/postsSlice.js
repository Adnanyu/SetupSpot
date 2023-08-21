import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";


export const getAllPosts = createAsyncThunk('posts/getAllPosts', async () => {
    try {
        const response = await axios.get('http://localhost:8000/posts', { withCredentials: true })
        return response.data
    } catch (error) {
        console.error('error happened', error)
    }
})

const initialState = {
    posts: []
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllPosts.fulfilled, (state, action) => {
            state.posts = action.payload
        })
    }
})

export default postsSlice.reducer