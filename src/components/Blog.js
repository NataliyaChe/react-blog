import React, { useState } from 'react';
import Post from './Post';

function Blog({posts}) {
 
    const [sortedPosts, setSortedPosts] = useState([])
    // function sortByDate(posts) {
  
    // console.log('post', posts);
    // }
    // sortByDate(posts)
    return (
        <div className='blog-container'>
            <ul className='posts'>
                {posts.sort((a, b) => new Date(b.date) - new Date(a.date)).map(post => {
                    return <Post post={post} key={post.id}/>
                })}
            </ul>
        </div>
    );
}

export default Blog;