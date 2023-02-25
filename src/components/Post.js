import React, { useState } from 'react';
import apiMethods from '../utils/Api'

function Post({post, onclickHandler, onclickDelete}) {
  const [isClass, setIsClass] = useState(true);

  const onclickSpoiler = (event) => {
    setIsClass(!isClass)  
  };

  return (
    <li className='post-item'>   
      <p>{post.text}</p>
      <button 
        className={`'button show-btn ${isClass ? 'show' : 'hide'}`}
        onClick={onclickSpoiler}
        data-id={post.id} 
      />
      <div className={isClass ? 'hide' : 'show'}>
        <p>{post.date.toLocaleString()}</p>
        <button 
          className='button' 
          onClick={onclickHandler} 
          data-id={post.id}>
          Like
        </button>
        <span className='likes'>{post.likes}</span>  
        <button 
          className='button hide-btn'
          onClick={onclickSpoiler} 
        />
      </div>
      <button 
        className='button delete-btn'
        onClick={onclickDelete}
        data-id={post.id}>
        Delete
      </button>  
    </li>
  );
}

export default Post;
