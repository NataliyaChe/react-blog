import React, { useState, useEffect } from 'react';
import {useApi} from '../hooks/useApi';

function Statistics() {
  const [usersAmount, setUsersAmount ] = useState(0);
  const [postsAmount, setPostsAmount ] = useState(0);
  const [likesAmount, setLikesAmount ] = useState(0);
  const [posts, setPosts] = useState([]);
  // const [users, setUsers] = useState([]);
  const { get } = useApi('posts');
  const { getUsers } = useApi('users');

  useEffect(() => {
    const fetchPosts = async () => { 
        const posts = await get();
        setPosts(posts);
        setPostsAmount(posts.length);
        // getLikesAmount()
     }
        fetchPosts()
  }, []);

  useEffect(() => {
    const fetchUsers = async () => { 
        const users = await getUsers();
        // setUsers(users);
        setUsersAmount(users.length);
     }
        fetchUsers()
  }, []);

  useEffect(() => {
    const getLikesAmount = () => {
      let likes = 0
      posts.map(post => likes += post.likes);
      setLikesAmount(likes)
    }  
    getLikesAmount()
  }, [posts]);

 
  // setPostsAmount(posts.length + 1);
  // console.log('postsAmount', postsAmount);


  return (
    <div className='statistics wrapper'>
      <h1 className='main-title statistics-title'>Statistics</h1>
      <p className='statistics-text'>Users: {usersAmount}</p>
      <p className='statistics-text'>Posts: {postsAmount}</p>
      <p className='statistics-text'>Likes: {likesAmount}</p>
    </div>
  );
}

export default Statistics;