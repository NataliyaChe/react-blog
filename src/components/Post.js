import React, { useState } from 'react';


function Post({post}) {
  const [likes, setLikes] = useState(0);

  const onclickHandler = (event) => {
    setLikes(likes+1)
    console.log("likes", likes);
  }

  return (
    <li className='post-item'>
        <p>{post.text}</p>
        <p>{post.date}</p>
        <p>{post.id}</p>
        <button className='button' onClick={onclickHandler}>Like</button>
        <span className='likes'>{likes}</span>
    </li>
  );
}

export default Post;