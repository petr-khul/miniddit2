import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./postListSlice";
import { searchPosts } from "../Searchbar/searchSlice";


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
  
    if (status === "loading" || searchStatus === "loading") {
        return <div>Loading...</div>;
    }
    
    if (status === "failed" || searchStatus === "failed") {
        return <div>Error: {error}</div>;
    }

    const postsToDisplay = searchResults.length > 0 ? searchResults : posts;
  
    return (
        <div>
            <h1>Reddit Posts</h1>
            <ul>
                {postsToDisplay.map((post) => (
                <li key={post.id}>
                    <a href={`https://reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
                    {post.title}
                    </a>
                </li>
                ))}
            </ul>
        </div>
  )
}

export default PostsList