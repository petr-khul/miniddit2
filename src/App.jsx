import { useState } from 'react';
import './App.css';
import PostsList from './Features/postList/PostList';
import Header from './Features/Header/Header';
import Subreddits from './Features/Subreddits/Subreddits';

function App() {


  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <PostsList />
      </main>
      <aside>
        <Subreddits />
      </aside>
    </>
  )
}

export default App;
