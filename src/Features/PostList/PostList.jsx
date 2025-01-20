import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./postListSlice";
import Post from "../Post/Post";
import "./PostList.css";
import FailedFetchPosts from "./FailedFetchPosts";


function PostsList() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postList.posts);
    const status = useSelector((state) => state.postList?.status);
    const error = useSelector ((state) => state.postList.error);
    const searchResults = useSelector((state) => state.search.results);
    const searchStatus = useSelector((state) => state.search.status);

    useEffect(() => {
        dispatch(fetchPosts('popular'));
    }, [dispatch]);

    const handleErrorButtonClick = () => {
        dispatch(fetchPosts('popular'));
    }
  
    if (status === "loading" || searchStatus === "loading") {
        return <div>Loading...</div>;
    }
    
    if (status === "failed" || searchStatus === "failed") {
        return (
            <FailedFetchPosts error={error}/>
        );
    }

    const postsToDisplay = searchResults.length > 0 ? searchResults : posts;
  
    return (
        <div className="postList">
            <h1>Reddit Posts</h1>
            <ul>
                {postsToDisplay.map((post) => (
                <li key={post.id}>
                    <Post post={post} />
                </li>
                ))}
            </ul>
        </div>
  )
}

export default PostsList