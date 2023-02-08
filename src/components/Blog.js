import React, { useState } from 'react';
import Post from './Post';

function Blog({posts}) {
 
    const [sortedPosts, setSortedPosts] = useState([])

    // const [likes, setLikes] = useState(0);

    // const onclickHandler = (event) => {
    //     setLikes(likes+1)
    //     console.log("likes", likes);
    //   }

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