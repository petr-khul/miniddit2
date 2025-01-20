import React from 'react';
import { useDispatch } from 'react-redux';

function FailedFetchPosts({error}) {
  
    const dispatch = useDispatch();

    const handleErrorButtonClick = () => {
        dispatch(fetchPosts('popular'));
    }

    return (
    <div className="failed">
        <p>Error: {error}</p>
        <button 
            className="errorReload" 
            onClick={handleErrorButtonClick}
        >
        Reload page
        </button>
    </div>
  )
}

export default FailedFetchPosts