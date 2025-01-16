import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchPosts, setSearchTerm, resetResults } from "./searchSlice";
import "./Searchbar.css";

function Searchbar() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const status = useSelector((state) => state.search.status);
  const error = useSelector((state) => state.search.error);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.trim() === '') {
      dispatch(resetResults()); // Reset results if input is empty
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch(setSearchTerm(inputValue));
      dispatch(searchPosts(inputValue));
    }
  };

  return (
    <div className ="searchInput">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search Reddit..."
          
        />
        <button type="submit">Search</button>
      </form>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
    </div>
  );
}

export default Searchbar;
