import { createAsyncThunk } from "@reduxjs/toolkit";
import {createSlice, createAsyncThunc} from "react-redux";
import axios from 'axios';

export const fetchPosts = createAsyncThunk(
    'postList/fetchPosts',
    async (subreddit = 'javascript', thunkAPI) => {
      try {
        const response = await axios.get(`https://www.reddit.com/r/${subreddit}.json`);
        // Extract necessary data from the response
        return response.data.data.children.map((child) => child.data);
      } catch (error) {
        return thunkAPI.rejectWithValue('Failed to fetch posts');
      }
    }
  );

const postListSlice = createSlice({
    name: "postList", 
    initialState: {
        posts: [], 
        status: "idle", 
        error: null
    }, 
    reducers: {

    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchPosts.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.posts = action.payload;
          })
          .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          });
      },
});

export default postListSlice.reducer;