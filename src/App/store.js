import {configureStore} from "@reduxjs/toolkit";
import postListReducer from "../Features/PostList/postListSlice";
import searchReducer from "../Features/Searchbar/searchSlice.js";

const store = configureStore({
    reducer: 
    {
        postList: postListReducer,
        search: searchReducer
    },
});

export default store;