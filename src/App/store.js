import {configureStore} from "@reduxjs/toolkit";
import postListReducer from "../Features/PostList/postListSlice";

const store = configureStore({
    reducer: 
    {
        postList: postListReducer
    },
});

export default store;