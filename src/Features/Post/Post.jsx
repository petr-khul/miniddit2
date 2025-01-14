import React, { useState, useEffect } from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import "./Post.css";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

function Post({ post }) {
    //console.log(post);

    const [iconUrl, setIconUrl] = useState(null); 

    useEffect(() => {
        const fetchSubredditIcon = async () => {
            const cachedIcon = localStorage.getItem(`subreddit-icon-${post.subreddit}`);
            if (cachedIcon) {
                setIconUrl(cachedIcon);
                return;
            }
    
            try {
                const response = await fetch(`https://www.reddit.com/r/${post.subreddit}/about.json`);
                const data = await response.json();
                const icon = data.data.icon_img || data.data.community_icon;
                const iconUrl = icon && icon.trim() ? icon : "./src/Features/Post/reddit.png"; // Fallback icon
                setIconUrl(iconUrl);
                localStorage.setItem(`subreddit-icon-${post.subreddit}`, iconUrl); // Cache the icon
            } catch (error) {
                console.error("Failed to fetch subreddit icon:", error);
                setIconUrl("./src/Features/Post/reddit.png");  // Use fallback on error
            }
        };
    
        fetchSubredditIcon();
    }, [post.subreddit]);
    

    return (
        <div className="post">
            <div>
                <p className="postHeader">
                    <span className="subreddit_icon_text">
                        {iconUrl && <img className="subredditIcon" src={iconUrl} alt="Subreddit icon" />}  {/*subreddit icon*/}
                        &nbsp;{post.subreddit_name_prefixed} {/* subreddit name */}
                    </span>
                    <span>Posted by <span className="postAuthor">{post.author}</span></span>{/* Author name */}
                    {timeAgo.format(post.created_utc * 1000)} {/* post time ago*/}
                </p>
                <div className="postBody">
                    {post.preview && post.preview.images.length > 0 ? (
                    <img className="postImage" src={post.preview.images[0].source.url.replace(/&amp;/g, '&')} alt="Post content" />
                ) : (
                    post.url && post.url.match(/\.(jpeg|jpg|gif|png)$/) ? (
                        <img className="postImage" src={post.url} alt="Post content" />
                    ) : null
                )}
            </div>
            <a href={`https://reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
                {post.title}
            </a>
            </div>
        </div>
    );
}

export default Post;
