import React from 'react';
import Post from './Post';

function Blog({posts, onclickHandler}) {
    return (
        <div className='blog-container'>
            <ul className='posts'>
            {posts.map(post => {
                    return <Post post={post} key={post.id} onclickHandler={onclickHandler}/>
                })}
            </ul>
            
        </div>
    );
}

export default Blog;