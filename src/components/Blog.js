import React, { useState } from 'react';
import Post from './Post';

function Blog({posts, setPosts}) {

    const onclickHandler = (event) => {
        const buttonId = event.target.dataset.id;
        const likedPost = posts.find(post => post.id === +buttonId);
        // const newLike = ++likedPost.likes
        setPosts(likedPost.likes += 1)
        console.log("likes", buttonId, likedPost.likes);
      }

     console.log('sort post', posts);

    return (
        <div className='blog-container'>
            <ul className='posts'>
                {posts.sort(function(a, b) {
                if (a.text < b.likes) {
                    return -1}
                if (a.text > b.likes) {
                    return 1}
                return new Date(b.date) - new Date(a.date);
                }).map(post => {
                    // return <Post post={post} key={post.id} countLikes={countLikes}/>
                    return <Post post={post} key={post.id} onclickHandler={onclickHandler}/>
                })}
            </ul>
        </div>
    );
}

export default Blog;