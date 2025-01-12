import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./postListSlice";


function PostsList() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postList.posts);
    const status = useSelector((state) => state.postList?.status);
    const error = useSelector ((state) => state.postList.error);

    useEffect(() => {
        dispatch(fetchPosts('popular'));
    }, [dispatch]);
  
    if (status === 'loading') {
        return <div>Loading...</div>;
      }
    
      if (status === 'failed') {
        return <div>Error: {error}</div>;
      }
  
  
  
  
    return (
        <div>
            <h1>Reddit Posts</h1>
            <ul>
                {posts.map((post) => (
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