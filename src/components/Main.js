import React, { useState } from 'react';
import Form from './Form';
import Blog from './Blog';

function Main() {
    const [posts, setPosts] = useState(
        []
    )
    console.log('posts', posts);

    function addPost(text, likes) {
        setPosts(
            [...posts,
                {
                    text,
                    date: new Date().toLocaleString(),
                    id: Date.now(),
                    likes,
                }
            ]
        )
        
    }

    return (
        <div className='main'>
            <Form onCreate={addPost}/>
            <Blog posts={posts}/>
        </div>
    );
}

export default Main;