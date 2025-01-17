import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, toggleCommentsVisibility } from './commentsSlice';
import Comment from '../Comment/Comment';
import "./Comments.css";

const Comments = ({ post}) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.commentsByPostId[post.id]);
  const isVisible = useSelector((state) => state.comments.visibleByPostId[post.id]);
  const isLoading = useSelector((state) => state.comments.loadingByPostId[post.id]);

  const handleToggleComments = () => {
    if (!comments && !isLoading) {
      dispatch(fetchComments(post.id));
    }
    dispatch(toggleCommentsVisibility(post.id));
  };
  
  //console.log(comments);
  return (
    <div className="commentsSection">
      <div className="commentBar">
        <p 
          className="commentInfo"
          onClick={handleToggleComments}
        >
          <img src="./comment.png" className="commentIcon"/>
          <span className="commentsNum">{post.num_comments}</span> comments 
        </p>
      </div>
      {isVisible && (isLoading ? (
        <p>Loading comments...</p>  // Show loading message if comments are loading
      ) : comments?.length > 0 ? (
        <ul className="comments">
          {comments.map((comment) => (
            <li key={comment.id}> 
              <Comment comment={comment} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments available.</p>  // Show message when there are no comments
      ))}

    </div>
  );
};

export default Comments;
