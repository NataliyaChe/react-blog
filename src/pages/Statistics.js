import React, { useState, useEffect } from 'react';
import {useApi} from '../hooks/useApi';

function Statistics() {
  const [total, setTotal] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalLikes: 0
  })
  
  const { get } = useApi();

  useEffect(() => {
    const fetchPosts = async () => { 
        const users = await get('users');
        const posts = await get('posts');
        const likes = posts.reduce((sum, current) => sum + current.likes, 0);
        setTotal({
          totalUsers: users.length,
          totalPosts: posts.length,
          totalLikes: likes
        });
     }
        fetchPosts()
  }, []);

  return (
    <div className='statistics wrapper'>
      <h1 className='main-title statistics-title'>Statistics</h1>
      <p className='statistics-text'>Users: {total.totalUsers}</p>
      <p className='statistics-text'>Posts: {total.totalPosts}</p>
      <p className='statistics-text'>Likes: {total.totalLikes}</p>
    </div>
  );
}

export default Statistics;