import configureStore from "@reduxjs/toolkit";
import postListReducer from "../Features/postsList/postsListSlice";

const store = configureStore({
    reducer: 
    {
        postList: postListReducer, 
    },
});

export default store;