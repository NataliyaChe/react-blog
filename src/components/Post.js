import React, { useRef, useState } from 'react';

function Post({post, onclickHandler}) {
  const spoiler = useRef();
  const [newClass, setNewClass] = useState(true)
  const onclickSpoilerHandler = (event) => {

    newClass === false ? setNewClass(true) : setNewClass(false)
    
    // if(post.id === +spoilerId) {
    //   // spoiler.current.className('active')
    //   setNewClass(false)
    // }
    
}

  return (
    <li className='post-item'>   
      <p>{post.text}</p>
      <button 
        className='button' 
        onClick={onclickSpoilerHandler}
        data-id={post.id}>
              Spoiler
      </button>
      <div className={newClass ? 'hide' : 'show'} ref={spoiler}>
        <p>{post.date}</p>
        <button 
          className='button' 
          onClick={onclickHandler} 
          data-id={post.id}>
          Like
        </button>
        <span className='likes'>{post.likes}</span>  
      </div>
    </li>
  );
}

export default Post;
