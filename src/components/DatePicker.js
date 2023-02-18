import React, { useState } from 'react';

function DatePicker({posts, setPosts, allPosts, setAllPosts}) {
    const [filteredPosts, setFilteredPosts] = useState([]);
    
    const getStartDate = (event) => {
        const postsFromDate = posts.filter(post => {
            return post.date > event.target.value
        })
        setFilteredPosts(postsFromDate);
    }

    const getEndDate = (event) => {
        const postsToDate = filteredPosts.filter(post => {
            return post.date < event.target.value
        })
        setFilteredPosts(postsToDate);
    }

    console.log('start input', filteredPosts);

    const filterHandler = (event) => {
        setAllPosts(posts);
        setPosts(filteredPosts);
    }

    const resetHandler = (event) => {
        setPosts(allPosts);
        setAllPosts([]);
    }

    return (
        <div>
            <input 
                className='input start-input'
                type="date" 
                id="start" 
                name="start"
                min="2023-01-01" 
                max="2023-03-31"
                onChange={getStartDate}/>  
            <input 
                className='input end-input'
                type="date" 
                id="end" 
                name="end"
                min="2023-01-01" 
                max="2023-03-31"
                onChange={getEndDate}/>  
            <button 
                className='button'
                onClick={filterHandler}>Filter
            </button>
            <button 
                className='button reset-btn'
                onClick={resetHandler}>Reset
            </button>
        </div>
    );
}

export default DatePicker;