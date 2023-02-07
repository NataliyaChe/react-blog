import React from 'react';


function Post({post}) {
  return (
    <li className='post-item'>
        <p>{post.text}</p>
        <p>{post.date}</p>
        <p>{post.id}</p>
    </li>
  );
}

export default Post;