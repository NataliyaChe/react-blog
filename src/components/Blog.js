import React from 'react';
import Post from './Post';

function Blog({posts, addLike, deletePost}) {

    return (
        <div className='blog'>
            <ul className='posts'>
                {posts.map(post => {
                    return <Post post={post} key={post.id} addLike={addLike} deletePost={deletePost}/>
                })}
            </ul>     
        </div>
    );
}

export default Blog;