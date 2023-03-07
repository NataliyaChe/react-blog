import React, { useState, useEffect } from 'react';
// import ReactPaginate from 'react-paginate';
import Form from './Form';
import Blog from './Blog';
import DatePicker from './DatePicker';
import Api from '../utils/Api';
import Pagination from "./Pagination";

function Posts() {
    const [allPosts, setAllPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const api = new Api('posts');
    
    const authorizedUser = JSON.parse(localStorage.getItem('authorizedUser'));

    if(!authorizedUser) {
        window.location.href = './registration'; 
    }

    useEffect(() => {
        const fetchPosts = async () => { 
            const posts = await api.getPostsByUser(authorizedUser.id)
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
    
    // function addPost(text) {
    //     const post = {
    //         text,
    //         date: new Date(),
    //         id: Date.now(),
    //         likes: 0,
    //         userId: authorizedUser.id
    //     }
        
    //     api.post(post)
    //     setPosts(
    //         [...posts, post]
    //     ) 
    // }

       
    const addPost = (text) => {
        const post = {
            text,
            date: new Date(),
            id: Date.now(),
            likes: 0,
            userId: authorizedUser.id
        }
        
        api.post(post)
        setPosts(
            [...posts, post]
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

    const onclickDelete = (event) => {
        const postId = +event.target.dataset.id;
        const filteredPosts = posts.filter(post => {
            return post.id !== postId;
        })
        setPosts(filteredPosts);
        api.delete(postId)
    }

    const onclickSingOut = () => {
        localStorage.removeItem('matchUser');
        window.location.href = './registration'; 
    }

    return (
        <div className='main'>
            <div className='title-wrapper'>
                <h1 className='main-title'>Hello {authorizedUser.login}!</h1>
                <button className='button' onClick={onclickSingOut}>Sign out</button>
            </div>
            <div className='flex-wrapper'>
                <Form onCreate={addPost}/>
                <DatePicker posts={posts} setPosts={setPosts} allPosts={allPosts} setAllPosts={setAllPosts}/>
            </div>
            <Blog 
                posts={posts.length > 5 ? paginatedPosts : posts} 
                onclickHandler={onclickHandler}
                onclickDelete={onclickDelete}
            />
            {posts.length > 5 &&    
            // <ReactPaginate
            //     breakLabel="..."
            //     nextLabel="next >"
            //     onPageChange={pageChangeHandler}
            //     pageRangeDisplayed={5}
            //     pageCount={totalPages}
            //     previousLabel="< previous"
            //     renderOnZeroPageCount={null}
            // />
            <Pagination pageChangeHandler={pageChangeHandler} totalPages={totalPages}/>
            }
        </div>
    );
}

export default Posts;