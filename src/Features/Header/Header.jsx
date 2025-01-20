import Searchbar from "../Searchbar/Searchbar";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../PostList/postListSlice";
import { useEffect } from "react";
import "./Header.css";

import React from 'react'



export default function Header() {
  
  const dispatch = useDispatch();

  const handleHeaderClick = () => {
    dispatch(fetchPosts('popular')); // Directly dispatch the action
  };
  
  return (
    <div className="header" onClick={handleHeaderClick}>
        <div className="logo_h1">
          <img src="./src/Features/Header/reddit.png" className="headerIcon" />
          <h1>Miniddit</h1>
        </div>
        <Searchbar />
    </div>
  )
}
