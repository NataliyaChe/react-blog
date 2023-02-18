import React, { useState } from 'react';

function DatePicker({posts, setPosts, allPosts, setAllPosts}) {
    const [postsFromDate, setPostsFromDate] = useState([]);
    const [postsToDate, setPostsToDate] = useState([]);
    const [pickedDate, setPickedDate] = useState();
    const [isClass, setIsClass] = useState(true);
    
    const getStartDate = (event) => {
        setPostsFromDate(event.target.value)
        setPickedDate(event.target.value)
    }

    const getEndDate = (event) => {
        setPostsToDate(event.target.value)
        setPickedDate(event.target.value)
    }

    const filterHandler = (event) => {
        if(allPosts.length === 0 && (postsFromDate.length && postsToDate.length) !== 0) {
            const filteredPosts = posts.filter(post => {
                return (post.date >= postsFromDate) && (post.date <= postsToDate)
            })
            setAllPosts(posts);
            setPosts(filteredPosts);
            setIsClass(!isClass);
        }
    }

    const resetHandler = (event) => {
        setPosts(allPosts);
        setAllPosts([]);
        setIsClass(!isClass);
        setPickedDate('')
    }

    return (
        <div>
            <input 
                className='input start-input'
                type="date" 
                id="start" 
                name="start"
                min="2023-01-01" 
                max={pickedDate}
                onChange={getStartDate}/>  
            <input 
                className='input end-input'
                type="date" 
                id="end" 
                name="end"
                min={pickedDate}
                max="2023-03-31"
                onChange={getEndDate}/>  
            <button 
                className='button'
                onClick={filterHandler}>Filter
            </button>
            <button 
                className={`'button reset-btn ${isClass ? 'hide' : 'show'}`}
                onClick={resetHandler}>Reset
            </button>
        </div>
    );
}

export default DatePicker;