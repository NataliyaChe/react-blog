import React, { useState } from 'react';

function DatePicker({posts, setPosts, allPosts, setAllPosts}) {
    const [postsFromDate, setPostsFromDate] = useState(0);
    const [postsToDate, setPostsToDate] = useState(0);
    const [pickedDate, setPickedDate] = useState(0);
    const [isClass, setIsClass] = useState(true);
    
    const getStartDate = (event) => {
        setPickedDate(event.target.value)
        const startDate = Date.parse(event.target.value)
        setPostsFromDate(startDate)
        console.log('postsFromDate', postsFromDate);
        console.log('startDate', startDate);
        console.log('pickedDate', pickedDate);
    }

    const getEndDate = (event) => {
        setPickedDate(event.target.value)
        const endDate = Date.parse(event.target.value)
        setPostsToDate(endDate)
        console.log('postsToDate', postsToDate);
        console.log('endDate', endDate);
        console.log('pickedDate', pickedDate);
    }

    const filterHandler = (event) => {
        console.log('postsFromDate', postsFromDate);
        console.log('postsToDate', postsToDate);
        if(allPosts.length === 0 && (postsFromDate && postsToDate) !== 0) {
            const filteredPosts = posts.filter(post => {
                return (post.id >= postsFromDate) && (post.id <= postsToDate)
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