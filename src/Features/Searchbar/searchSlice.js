import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to search Reddit for posts based on a search term
export const searchPosts = createAsyncThunk(
    'search/searchPosts',
    async (searchTerm, thunkAPI) => {
      try {
        const response = await axios.get(
          `https://www.reddit.com/search.json?q=${searchTerm}&limit=10`
        );
        return response.data.data.children.map((child) => child.data);
      } catch (error) {
        return thunkAPI.rejectWithValue('Failed to fetch search results');
      }
    }
  );

const searchSlice = createSlice({
    name: "search", 
    initialState: {
        searchTerm: "", 
        results: [], 
        status: "idle", 
        error: null
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchPosts.pending, (state) => {
                 state.status = 'loading';
            })
            .addCase(searchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.results = action.payload;
            })
            .addCase(searchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;