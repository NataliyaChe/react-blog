import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Form from './Form';
import Blog from './Blog';
import DatePicker from './DatePicker';

function Main() {
    const [allPosts, setAllPosts] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
          const data = await fetch(`http://localhost:3004/posts`)
          const posts = await data.json();
          setPosts(posts)
        }
        fetchPosts()
    }, []);

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
        console.log('test', text);
        const post = {
            text,
            date: new Date(),
            id: Date.now(),
            likes: 0,
        }
        
        fetch(`http://localhost:3004/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post)
        })
        setPosts(
            [...posts, post]
        ) 
        console.log('set posts', posts);
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
                posts={posts.length > 5 ? paginatedPosts : posts} 
                onclickHandler={onclickHandler}/>
        </div>
    );
}

export default Main;