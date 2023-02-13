import React, { useState, useEffect } from 'react';
import Post from './Post';

function Blog({posts, setPosts, offset}) {
    const [currentPosts, setCurrentPosts] = useState([]);
    const onclickHandler = (event) => {
        const buttonId = event.target.dataset.id;
        const newPosts = posts.map(post => {
            if(post.id === +buttonId) {
                post.likes += 1
            }
            return post
        })
        setPosts(newPosts)
    }

     console.log('sort post', posts);

    return (
        <div className='blog-container'>
            <ul className='posts'>
                {posts.sort(function(a, b) {
                if (b.likes < a.likes) {
                    return -1}
                if (b.likes > a.likes) {
                    return 1}
                return new Date(b.date) - new Date(a.date);
                }).map(post => {
                    return <Post post={post} key={post.id} onclickHandler={onclickHandler}/>
                })}
            </ul>
            
        </div>
    );
}

export default Blog;