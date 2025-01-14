import Searchbar from "../Searchbar/Searchbar";
import "./Header.css";

import React from 'react'

export default function Header() {
  return (
    <div className="header">
        <div className="logo_h1">
          <img src="./src/Features/Header/reddit.png" className="headerIcon" />
          <h1>Miniddit</h1>
        </div>
        <Searchbar />
    </div>
  )
}
