import React, { useRef, useState } from 'react';

function Post({post, onclickHandler}) {
  const spoiler = useRef();
  const [isClass, setIsClass] = useState(true)

  const onclickShowSpoiler = (event) => {
    setIsClass(false)    
  };

  const onclickHideSpoiler = (event) => {
    setIsClass(true)  
  }

  return (
    <li className='post-item'>   
      <p>{post.text}</p>
      <button 
        className='button show-btn' 
        onClick={onclickShowSpoiler}
        data-id={post.id} />
      <div className={isClass ? 'hide' : 'show'} ref={spoiler}>
        <p>{post.date}</p>
        <button 
          className='button' 
          onClick={onclickHandler} 
          data-id={post.id}>
          Like
        </button>
        <span className='likes'>{post.likes}</span>  
        <button 
          className='button hide-btn'
          onClick={onclickHideSpoiler} />
      </div>
    </li>
  );
}

export default Post;
