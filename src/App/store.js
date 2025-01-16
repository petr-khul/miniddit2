import {configureStore} from "@reduxjs/toolkit";
import postListReducer from "../Features/PostList/postListSlice";
import searchReducer from "../Features/Searchbar/searchSlice.js";
import commentsReducer from "../Features/Comments/commentsSlice.js";

const store = configureStore({
    reducer: 
    {
        postList: postListReducer,
        search: searchReducer,
        comments: commentsReducer
    },
});

export default store;