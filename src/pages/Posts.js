import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Form from '../components/Form';
import Blog from '../components/Blog';
import DatePicker from '../components/DatePicker';
import Pagination from "../components/Pagination";
import {useAuth} from '../hooks/useAuth';
import {useApi} from '../hooks/useApi';

function Posts() {
    const [allPosts, setAllPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const { getPostsByUser, post, patch, remove } = useApi();
    
    const { user, logout } = useAuth();
    const authorizedUser = user;

    useEffect(() => {
            const fetchPosts = async () => { 
                const posts = await getPostsByUser('posts', authorizedUser.id);
                setPosts(posts)
             }
                fetchPosts()
    }, []);

    const postsPerPage = 5;
    const [firstPost, setFirstPost] = useState(0);
    const lastPost = firstPost + postsPerPage;

    const paginatedPosts = (posts.sort((a, b) => (
        b.likes - a.likes || String(b.date).localeCompare(String(a.date))
    )).slice(firstPost, lastPost));

    const totalPages = Math.ceil(posts.length / postsPerPage);

    const changePage = (event) => {
        setFirstPost(event.selected * postsPerPage)  
    }

    // const regex = /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/

    const addPost = (text) => {
            const postItem = {
                text,
                date: new Date(),
                id: Date.now(),
                likes: 0,
                userId: authorizedUser.id
            }
            post('posts', postItem)
            setPosts(
                [...posts, postItem]
            ) 
    }

    const addLike = (event) => {
        const postId = +event.target.dataset.id;
        const newPosts = posts.map(post => {
            if(post.id === postId) {
                post.likes += 1
                patch('posts', post.id, {likes: post.likes})
            }
            return post
        })
        setPosts(newPosts)
    }

    const deletePost = (event) => {
        const postId = +event.target.dataset.id;
        const filteredPosts = posts.filter(post => {
            return post.id !== postId;
        })
        setPosts(filteredPosts);
        remove('posts', postId)
    }

    const signOut = () => {
        logout();
        navigate('./login'); 
    }

    return (
        <div className='main wrapper'>
            <div className='title-wrapper'>
                <h1 className='main-title'>Hello {authorizedUser?.login}!</h1>
                <button className='button' onClick={signOut}>Sign out</button>
            </div>
            {/* <span className={`warning ${isTimer ? 'show' : 'hide'}`}>
                {warningText}
            </span> */}
            <div className='flex-wrapper'> 
                <Form 
                onCreate={addPost} 
                />
                <DatePicker posts={posts} setPosts={setPosts} allPosts={allPosts} setAllPosts={setAllPosts}/>
            </div>
            <Blog 
                posts={posts.length > 5 ? paginatedPosts : posts} 
                addLike={addLike}
                deletePost={deletePost}
            />
            {posts.length > 5 &&    
            <Pagination changePage={changePage} totalPages={totalPages}/>
            }
        </div>
    );
}

export default Posts;