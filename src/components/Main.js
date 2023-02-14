import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Form from './Form';
import Blog from './Blog';

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
    console.log('main', posts);

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
            {posts.length > 5 ? (
                <Blog posts={paginatedPosts} setPosts={setPosts} paginatedPosts={paginatedPosts} onclickHandler={onclickHandler}/>
            ) : (
                <Blog posts={posts} setPosts={setPosts} paginatedPosts={paginatedPosts} onclickHandler={onclickHandler}/>
            )} 
        </div>
    );
}

export default Main;