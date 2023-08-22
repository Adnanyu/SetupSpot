import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPost = createAsyncThunk('post/getPost', async (id) => {
    const backEndLink = import.meta.env.BACKEND_URL || 'http://localhost:8000'
    try {
        const response = await axios.get(`${backEndLink}/posts/${id}`, { withCredentials: true })
        return response.data
    } catch (error) {
        console.error('error', error)
    }
})
export const likePost = createAsyncThunk('post/likePost', async (id) => {
    const backEndLink = import.meta.env.BACKEND_URL || 'http://localhost:8000'
    try{
        const response = await axios.post(`${backEndLink}/posts/${id}/like`, null, { withCredentials: true })
        console.log(response.data)
        return response.data
    }catch(error){
        console.error('error:', error)
    }
})

const initialState = {
    post: {},
    isLoading: true,
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.post = action.payload
                state.isLoading = false
            })
            .addCase(getPost.rejected, (state, action) => {
                console.log(action)
                state.isLoading = false
            }),
            builder.addCase(likePost.fulfilled, (state, action) => {
                state.post = action.payload.post
            })            
    }
})

export default postSlice.reducer