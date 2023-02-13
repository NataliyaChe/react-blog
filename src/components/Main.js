import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Form from './Form';
import Blog from './Blog';
import Pagination from './Pagination';

function Main() {
    const [posts, setPosts] = useState([]);

    const postsPerPage = 5;
    // const [currentPage, setCurrentPage] = useState(0);
    const [firstPost, setFirstPost] = useState(0)
    const lastPost = firstPost + postsPerPage;
    const [paginatedPosts, setPaginatedPosts] = useState([]);

    
    const totalPages = Math.ceil(posts.length / postsPerPage);
    // const getPaginatedPosts = () => {

    // }
    // setPaginatedPosts(posts.slice(firstPost, lastPost));

    const pageChangeHandler = (event) => {
        setFirstPost(event.selected * postsPerPage)
        // const firstPost = (event.selected * postsPerPage);
        // console.log('event', event.selected);
        // const lastPost = firstPost + postsPerPage;
        // setPaginatedPosts(posts.slice(firstPost, lastPost));
        // setPaginatedPosts(posts.slice(firstPost, lastPost));   
    }
    
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
        setPaginatedPosts(posts.slice(firstPost, lastPost));
    }
    console.log('paginatedPosts', paginatedPosts);
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
            <Blog posts={posts} setPosts={setPosts} paginatedPosts={paginatedPosts}/>
        </div>
    );
}

export default Main;