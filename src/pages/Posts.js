import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Form from '../components/Form';
import Blog from '../components/Blog';
import DatePicker from '../components/DatePicker';
import Api from '../utils/Api';
import Pagination from "../components/Pagination";
// import {AuthContext} from '../utils/AuthContext';
import {useAuth} from '../utils/AuthContext';

function Posts() {
    const [allPosts, setAllPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const api = new Api('posts');
    const navigate = useNavigate();
    
    // const authorizedUser = JSON.parse(localStorage.getItem('authorizedUser'));
    // const {setUser} = useContext(AuthContext);
    const { getUser, removeUser } = useAuth()
    const authorizedUser = getUser();
    console.log('posts user', authorizedUser);


    useEffect(() => {
        if(!authorizedUser) {
            navigate('./login');  
        } else {
            const fetchPosts = async () => { 
                const posts = await api.getPostsByUser(authorizedUser.id)
                setPosts(posts)
             }
                fetchPosts()
        }
    }, []);

    const postsPerPage = 5;
    const [firstPost, setFirstPost] = useState(0)
    const lastPost = firstPost + postsPerPage;

    const paginatedPosts = (posts.sort((a, b) => (
        b.likes - a.likes || String(b.date).localeCompare(String(a.date))
    )).slice(firstPost, lastPost));

    const totalPages = Math.ceil(posts.length / postsPerPage);

    const changePage = (event) => {
        setFirstPost(event.selected * postsPerPage)  
    }
   
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

    const addLike = (event) => {
        const buttonId = event.target.dataset.id;
        const newPosts = posts.map(post => {
            if(post.id === +buttonId) {
                post.likes += 1
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
        api.delete(postId)
    }

    const signOut = () => {
        // localStorage.removeItem('authorizedUser');
        // setUser(null);
        removeUser()
        navigate('./login'); 
    }

    return (
        <div className='main'>
            <div className='title-wrapper'>
                <h1 className='main-title'>Hello {authorizedUser?.login}!</h1>
                <button className='button' onClick={signOut}>Sign out</button>
            </div>
            <div className='flex-wrapper'>
                <Form onCreate={addPost}/>
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