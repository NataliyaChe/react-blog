import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Form from './Form';
import Blog from './Blog';

function Main() {
    const [posts, setPosts] = useState([]);

    const postsPerPage = 5;
    const [firstPost, setFirstPost] = useState(0)
    const lastPost = firstPost + postsPerPage;

    const paginatedPosts = (posts.sort((a, b) => (
        b.likes - a.likes || b.date.localeCompare(a.date)
    )).slice(firstPost, lastPost));

    const totalPages = Math.ceil(posts.length / postsPerPage);

    const pageChangeHandler = (event) => {
        setFirstPost(event.selected * postsPerPage)  
    }
    
    function addPost(text) {
        setPosts(
            [...posts,
                {
                    text,
                    date: new Date().toLocaleString(),
                    id: Date.now(),
                    likes: 0,
                }
            ]
        )
    }

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

    return (
        <div className='main'>
            <Form onCreate={addPost}/>
                {posts.length > 5 &&    
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={pageChangeHandler}
                    pageRangeDisplayed={5}
                    pageCount={totalPages}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                />
                }
            <Blog 
                posts={posts.length > 5 ? paginatedPosts : posts} 
                onclickHandler={onclickHandler}/>
        </div>
    );
}

export default Main;