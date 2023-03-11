import React from 'react';
import Post from './Post';

function Blog(props) {

    return (
        <div className='blog'>
            <ul className='posts'>
                {props.posts.map(post => {
                    return <Post post={post} key={post.id} addLike={props.addLike} deletePost={props.deletePost}/>
                })}
            </ul>     
        </div>
    );
}

export default Blog;