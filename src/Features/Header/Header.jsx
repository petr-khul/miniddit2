import Searchbar from "../Searchbar/Searchbar";
import "./Header.css";

import React from 'react'

export default function Header() {
  return (
    <div className="header">
        <img src="./src/Features/Header/reddit.png" className="headerIcon" />
        <Searchbar />
    </div>
  )
}
