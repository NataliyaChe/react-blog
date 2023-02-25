import React from 'react';
import Post from './Post';

function Blog({posts, onclickHandler, onclickDelete}) {

    return (
        <div className='blog-container'>
            <ul className='posts'>
                {posts.map(post => {
                    return <Post post={post} key={post.id} onclickHandler={onclickHandler} onclickDelete={onclickDelete}/>
                })}
            </ul>     
        </div>
    );
}

export default Blog;