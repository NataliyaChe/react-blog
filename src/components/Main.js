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
            date: new Date(2023, 0, 2, 1, 10, 6),
            id: 1672614606000,
            likes: 0,
        },
        {
            text: 'second post',
            date: new Date(2023, 0, 15, 11, 10, 7),
            id: 1673773807000,
            likes: 0,
        },
        {
            text: 'third post',
            date: new Date(2023, 0, 25, 11, 10, 10),
            id: 1674637810000,
            likes: 0,
        },
        {
            text: 'fourth post',
            date: new Date(2023, 0, 30, 11, 10, 2),
            id: 1675069802000,
            likes: 0,
        },
        {
            text: 'fifth post',
            date: new Date(2023, 1, 2, 11, 10, 3),
            id: 1675329003000,
            likes: 0,
        },
        {
            text: 'sixth post',
            date: new Date(2023, 1, 6, 11, 10, 15),
            id: 1675674615000,
            likes: 0,
        },
        {
            text: 'seventh post',
            date: new Date(2023, 1, 10, 11, 10, 20),
            id: 1676020220000,
            likes: 0,
        },
        {
            text: 'eighth post',
            date: new Date(2023, 1, 18, 11, 10, 8),
            id: 1676711408000,
            likes: 0,
        },
    ]);

    // const [posts, setPosts] = useState([]);

    const postsPerPage = 5;
    const [firstPost, setFirstPost] = useState(0)
    const lastPost = firstPost + postsPerPage;

    const paginatedPosts = (posts.sort((a, b) => (
        b.likes - a.likes || b.date - a.date
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
                    date: new Date(),
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