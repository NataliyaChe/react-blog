import React, { useState } from 'react';

function Post({post, addLike, deletePost}) {
  const [isClose, setIsClose] = useState(true);

  const toggleSpoiler = () => {
    setIsClose(!isClose)  
  };

  return (
    <li className='post-item'>   
      <p>{post.text}</p>
      <button 
        className={`'button show-btn ${isClose ? 'show' : 'hide'}`}
        onClick={toggleSpoiler}
        data-id={post.id} 
      />
      <div className={isClose ? 'hide' : 'show'}>
        <p>{post.date.toLocaleString()}</p>
        <button 
          className='button' 
          onClick={addLike} 
          data-id={post.id}>
          Like
        </button>
        <span className='likes'>{post.likes}</span>  
        <button 
          className='button hide-btn'
          onClick={toggleSpoiler} 
        />
      </div>
      <button 
        className='button delete-btn'
        onClick={deletePost}
        data-id={post.id}>
        Delete
      </button>  
    </li>
  );
}

export default Post;
