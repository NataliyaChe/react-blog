import React, { useState } from 'react';
import { ONE_DAY_IN_MS } from '../constants';

function DatePicker({posts, setPosts, allPosts, setAllPosts}) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    
    const getStartDate = (event) => {
        setStartDate(event.target.value);
    }

    const getEndDate = (event) => {
        setEndDate(event.target.value);
    }

    const filterHandler = (event) => {
        if(!allPosts.length && startDate && endDate) {
            const filteredPosts = posts.filter(post => {
                return (Date.parse(post.date) >= Date.parse(new Date(startDate))) && (Date.parse(post.date) <= Date.parse(new Date(endDate))+ONE_DAY_IN_MS)
            })
            setAllPosts(posts);
            setPosts(filteredPosts);
            setIsOpen(!isOpen);
        }
    }

    const resetHandler = (event) => {
        setPosts(allPosts);
        setAllPosts([]);
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <input 
                className='input start-input'
                type="date" 
                id="start" 
                name="start"
                min="2023-01-01" 
                max={endDate}
                onChange={getStartDate}/>  
            <input 
                className='input end-input'
                type="date" 
                id="end" 
                name="end"
                min={startDate}
                max="2023-03-31"
                onChange={getEndDate}/>  
            <button 
                className='button'
                onClick={filterHandler}>Filter
            </button>
            <button 
                className={`'button reset-btn ${isOpen ? 'hide' : 'show'}`}
                onClick={resetHandler}>Reset
            </button>
        </div>
    );
}

export default DatePicker;