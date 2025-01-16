import React from 'react'
import "./Comment.css";

function Comment({comment}) {
  return (
    <div className="comment">
        <p>
            <img 
                src={comment.profileImage} 
                className="profileImage" 
                onError={(e) => e.target.src = '/person.png'}
            />
            <span className="commentAuthor">
                {comment.author}
            </span>
        {comment.body}
        </p>
    </div>
  )
}

export default Comment;