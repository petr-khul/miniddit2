import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchPosts, setSearchTerm } from "./searchSlice";

function Searchbar() {
  
    const dispatch = useDispatch();
    const searchTerm = useSelector ((state) => state.search.searchTerm);
    const results = useSelector((state) =>state.search.results);
    const status = useSelector((state) => state.search.results);
    const error = useSelector((state) => state.search.error);

    const handleSearchChange = (e) => {
        dispatch(setSearchTerm(e.target.value));
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            dispatch(searchPosts(searchTerm));
        }
    }

    useEffect(() => {
        if (searchTerm) {
          dispatch(searchPosts(searchTerm)); // Automatically search when term changes
        } else {
          // Reset results if the searchTerm is cleared
          dispatch({ type: 'search/resetResults' });
        }
    }, [searchTerm, dispatch]);
    
      if (status === 'loading') {
        return <div>Loading...</div>;
      }
    
      if (status === 'failed') {
        return <div>Error: {error}</div>;
      }
  
      return (
        <div>
          <h1>Search Reddit Posts</h1>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search Reddit..."
            />
            <button type="submit">Search</button>
          </form>

        </div>
      );
};

export default Searchbar