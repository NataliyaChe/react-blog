import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Form from './Form';
import Blog from './Blog';
import DatePicker from './DatePicker';
import Api from '../utils/Api'

function Main() {
    const [allPosts, setAllPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const api = new Api('http://localhost:3004/posts');
    
    const matchUser = JSON.parse(localStorage.getItem('matchUser'));

    if(matchUser === null) {
        window.location.href = './registration'; 
    }

    useEffect(() => {
        const fetchPosts = async () => { 
            const posts = await api.getPostsByUser(matchUser.id)
            setPosts(posts)
         }
            fetchPosts()
    }, []);

    const postsPerPage = 5;
    const [firstPost, setFirstPost] = useState(0)
    const lastPost = firstPost + postsPerPage;

    const paginatedPosts = (posts.sort((a, b) => (
        b.likes - a.likes || String(b.date).localeCompare(String(a.date))
    )).slice(firstPost, lastPost));

    const totalPages = Math.ceil(posts.length / postsPerPage);

    const pageChangeHandler = (event) => {
        setFirstPost(event.selected * postsPerPage)  
    }
    
    function addPost(text) {
        const post = {
            text,
            date: new Date(),
            id: Date.now(),
            likes: 0,
            userId: matchUser.id
        }
        
        api.post(post)
        setPosts(
            [...posts, post]
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

    const onclickDelete = (event) => {
        const postId = +event.target.dataset.id;
        const filteredPosts = posts.filter(post => {
            return post.id !== postId;
        })
        setPosts(filteredPosts);
        api.delete(postId)
    }

    const onclickSingOut = (event) => {
        localStorage.removeItem('matchUser');
        window.location.href = './registration'; 
    }

    return (
        <div className='main'>
            <div className='title-wrapper'>
                <h1 className='main-title'>Hello {matchUser.login}!</h1>
                <button className='button' onClick={onclickSingOut}>Sign out</button>
            </div>
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
                onclickHandler={onclickHandler}
                onclickDelete={onclickDelete}
            />
        </div>
    );
}

export default Main;