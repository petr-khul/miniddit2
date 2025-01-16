import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, toggleCommentsVisibility } from './commentsSlice';
import Comment from '../Comment/Comment';

const Comments = ({ post}) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.commentsByPostId[post.id]);
  const isVisible = useSelector((state) => state.comments.visibleByPostId[post.id]);
  const isLoading = useSelector((state) => state.comments.loadingByPostId[post.id]);

  const handleToggleComments = () => {
    if (!comments) {
      dispatch(fetchComments(post.id));
    }
    dispatch(toggleCommentsVisibility(post.id));
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <button onClick={handleToggleComments}>
        {isVisible ? 'Hide Comments' : 'Show Comments'}
      </button>
      {isLoading && <p>Loading comments...</p>}
      {isVisible && comments && (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}> 
                <Comment comment={comment} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;
