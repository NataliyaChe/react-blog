import React from 'react';
import Post from './Post';

function Blog({posts}) {
    return (
        <div className='blog-container'>
            <ul className='posts'>
                {posts.map(post => {
                    return <Post post={post} key={post.id}/>
                })}
            </ul>
        </div>
    );
}

export default Blog;