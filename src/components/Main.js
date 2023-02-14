import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Form from './Form';
import Blog from './Blog';
import Pagination from './Pagination';

function Main() {
    const [posts, setPosts] = useState([]);

    const postsPerPage = 5;
    const [firstPost, setFirstPost] = useState(0)
    const lastPost = firstPost + postsPerPage;

    const paginatedPosts = (posts.sort(function(a, b) {
        if (b.likes < a.likes) {
            return -1}
        if (b.likes > a.likes) {
            return 1}
        return new Date(b.date) - new Date(a.date);
        }).slice(firstPost, lastPost));
    console.log('paginatedPosts', paginatedPosts);
    const totalPages = Math.ceil(posts.length / postsPerPage);


    const pageChangeHandler = (event) => {
        setFirstPost(event.selected * postsPerPage)  
    }
    console.log('firstPost', firstPost);
    function addPost(text, likes) {
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
    return (
        <div className='main'>
            <Form onCreate={addPost}/>
            {posts.length > 5 &&    
                // <Pagination />
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
            {posts.length > 5 ? (
                <Blog posts={paginatedPosts} setPosts={setPosts} paginatedPosts={paginatedPosts}/>
            ) : (
                <Blog posts={posts} setPosts={setPosts} paginatedPosts={paginatedPosts}/>
            )} 
        </div>
    );
}

export default Main;