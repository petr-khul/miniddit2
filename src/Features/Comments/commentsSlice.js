import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch comments for a specific post
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId, { rejectWithValue }) => {
    const getProfileImage = async (author) => {
      try {
        const response = await axios.get(`https://www.reddit.com/user/${author}/about.json`);
        return response.data.data.icon_img || 'https://via.placeholder.com/40';  // Default placeholder image
      } catch {
        return 'https://via.placeholder.com/40';  // Fallback in case of error
      }
    };

    try {
      const response = await axios.get(`https://www.reddit.com/comments/${postId}.json`);
      const comments = await Promise.all(
        response.data[1].data.children.map(async (child) => ({
          id: child.data.id,
          body: child.data.body,
          author: child.data.author,
          createdUtc: child.data.created_utc,
          profileImage: await getProfileImage(child.data.author),
        }))
      );
      return { postId, comments };
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Network error');
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    commentsByPostId: {},
    loadingByPostId: {},
    visibleByPostId: {},
    errorByPostId: {},
  },
  reducers: {
    toggleCommentsVisibility: (state, action) => {
      const postId = action.payload;
      state.visibleByPostId[postId] = !state.visibleByPostId[postId];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.loadingByPostId[action.meta.arg] = true;
        state.errorByPostId[action.meta.arg] = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state.commentsByPostId[postId] = comments;
        state.loadingByPostId[postId] = false;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loadingByPostId[action.meta.arg] = false;
        state.errorByPostId[action.meta.arg] = action.payload || 'Error loading comments';
      });
  },
});

export const { toggleCommentsVisibility } = commentsSlice.actions;
export default commentsSlice.reducer;
