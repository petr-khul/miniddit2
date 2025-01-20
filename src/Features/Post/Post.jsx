import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import "./Post.css";
import Comments from '../Comments/Comments';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

function Post({ post }) {
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

                // Handle forbidden response (403)
                if (response.status === 403) {
                    console.warn(`Access forbidden to subreddit: ${post.subreddit}`);
                    setIconUrl("/reddit.png");  // Set fallback icon immediately
                    return;
                }

                const data = await response.json();
                let icon = data.data.icon_img;

                // Check if icon_img is available and valid
                if (!icon || icon.trim().length <= 0) {
                    icon = "/reddit.png";  // Set fallback icon
                }

                setIconUrl(icon);  // Set the icon URL
                localStorage.setItem(`subreddit-icon-${post.subreddit}`, icon);  // Cache the icon
            } catch (error) {
                console.error("Failed to fetch subreddit icon:", error);
                setIconUrl("/reddit.png");  // Fallback to default icon on error
            }
        };

        fetchSubredditIcon();
    }, [post.subreddit]);

    // Log the iconUrl when it changes for debugging
    /*
    useEffect(() => {
        console.log("Icon URL set to:", iconUrl);
    }, [iconUrl]);
    */

    console.log(post);
    

    return (
        <div className="post">
            <div>
                <p className="postHeader">
                    <span className="subreddit_icon_text">
                        {iconUrl && <img className="subredditIcon" src={iconUrl} alt="Subreddit icon" />}
                        &nbsp;{post.subreddit_name_prefixed}
                    </span>
                    <span>Posted by <span className="postAuthor">{post.author}</span></span>
                    <span className="timeAgo">{timeAgo.format(post.created_utc * 1000)}</span>

                </p>
                <div className="postBody">
                    <a className="postH1" href={`https://reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
                        {post.title}
                    </a>
                    <div className="postImageContainer">
                        {post.preview && post.preview.images.length > 0 ? (
                            <img className="postImage" src={post.preview.images[0].source.url.replace(/&amp;/g, '&')} alt="Post content" />
                        ) : (
                            post.url && post.url.match(/\.(jpeg|jpg|gif|png)$/) ? (
                                <img className="postImage" src={post.url} alt="Post content" />
                            ) : null
                        )}
                    </div>
                    <p className="postText">{post.selftext}</p>
                </div>
                <Comments post={post} />
            </div>
        </div>
    );
}

export default Post;
