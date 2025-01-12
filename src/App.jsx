import { useState } from 'react'
import store from './App/store'
import './App.css'
import PostsList from './Features/postList/PostList'
import Searchbar from './Features/Searchbar/Searchbar'
function App() {


  return (
    <>
      <Searchbar />
      <PostsList />
    </>
  )
}

export default App;
