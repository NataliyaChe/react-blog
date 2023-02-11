import React, { useState } from 'react';


function Post({post, onclickHandler}) {
  // const [likes, setLikes] = useState(0);

  // const onclickHandler = () => {
    
  //   console.log("likes", post.likes);
  // }

  return (
    <li className='post-item'>
       
        <p>{post.text}</p>
        <p>{post.date}</p>
        <p>{post.id}</p>
        <button className='button' onClick={onclickHandler} data-id={post.id}>Like</button>
        <span className='likes'>{post.likes}</span>
       
    </li>
  );
}

export default Post;