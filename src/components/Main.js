import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Form from './Form';
import Blog from './Blog';
import DatePicker from './DatePicker';

function Main() {
    const [allPosts, setAllPosts] = useState([]);

    const [posts, setPosts] = useState([
        {
            text: 'first post',
            date: '2023-01-26',
            id: 20120126,
            likes: 0,
        },
        {
            text: 'second post',
            date: '2023-01-31',
            id: 20120131,
            likes: 0,
        },
        {
            text: 'third post',
            date: '2023-02-04',
            id: 20120204,
            likes: 0,
        },
        {
            text: 'fourth post',
            date: '2023-02-10',
            id: 20120210,
            likes: 0,
        },
        {
            text: 'fifth post',
            date: '2023-02-14',
            id: 20120214,
            likes: 0,
        },
        {
            text: 'sixth post',
            date: '2023-02-18',
            id: 20120218,
            likes: 0,
        },
        {
            text: 'seventh post',
            date: '2023-03-10',
            id: 20120310,
            likes: 0,
        },
        {
            text: 'eighth post',
            date: '2023-03-15',
            id: 20120315,
            likes: 0,
        },
    ]);

    // const [posts, setPosts] = useState([]);

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
        console.log('button', event.target);
        const newPosts = posts.map(post => {
            if(post.id === +buttonId) {
                post.likes += 1
            }
            return post
        })
        setPosts(newPosts)
    }

    console.log('posts', posts);
    return (
        <div className='main'>
            <div className='flex-wrapper'>
                <Form onCreate={addPost}/>
                <DatePicker posts={posts} setPosts={setPosts} allPosts={allPosts} setAllPosts={setAllPosts}/>
            </div>
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
                // posts={posts.length > 5 ? paginatedPosts : posts} 
                // onclickHandler={onclickHandler}/>
                posts={posts.length > 5 ? paginatedPosts : posts} onclickHandler={onclickHandler}/>
        </div>
    );
}

export default Main;