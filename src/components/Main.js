import React, { useState } from 'react';
import Form from './Form';
import Blog from './Blog';

function Main() {
    const [posts, setPosts] = useState(
        []
    )
    console.log('posts', posts);
    function addPost(text) {
        setPosts(
            posts.concat([
                {
                    text,
                    date: new Date().toLocaleString(),
                    id: Date.now(),
                }
            ])
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