import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Form from './Form';
import Blog from './Blog';
import Pagination from './Pagination';

function Main() {
    const [posts, setPosts] = useState([]);

    const [totalPages, setTotalPages] = useState(0);
    const postsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + postsPerPage;

    const getCurrentPage = () => {
        return posts.slice(itemOffset, endOffset);
        
    }
   

    const getTotalPages = () => {
        return Math.ceil(posts.length / postsPerPage);
    }
    
    const pageChangeHandler = (event) => {
        const newOffset = (event.selected * postsPerPage) % posts.length;
        setItemOffset(newOffset);
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
        setTotalPages(getTotalPages());
        setCurrentPage(getCurrentPage());
    }

    console.log('totalPages', totalPages);
    console.log('currentPage', currentPage);

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
            <Blog posts={posts} setPosts={setPosts}/>
        </div>
    );
}

export default Main;