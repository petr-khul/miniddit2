import { useState } from 'react';
import './App.css';
import PostsList from './Features/postList/PostList';
import Header from './Features/Header/Header';
import Subreddits from './Features/Subreddits/Subreddits';

function App() {


  return (
    <>
      <Header />
      <PostsList />
      <Subreddits />
    </>
  )
}

export default App;
