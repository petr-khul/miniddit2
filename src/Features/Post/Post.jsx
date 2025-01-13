import React, { useState, useEffect } from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import "./Post.css";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

function Post({ post }) {
    console.log(post);

    const [iconUrl, setIconUrl] = useState(null);
    

    return (
        <div className="post">
            <div>
                <p>

                    {post.subreddit_name_prefixed} 
                    Posted by <span className="postAuthor">{post.author}</span> &nbsp; 
                    {timeAgo.format(post.created_utc * 1000)}
                </p>
                <img className="postImage" src={post.thumbnail} />
            </div>
            <a href={`https://reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
                {post.title}
            </a>
        </div>
    );
}

export default Post;
