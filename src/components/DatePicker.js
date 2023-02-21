import React, { useState } from 'react';

function DatePicker({posts, setPosts, allPosts, setAllPosts}) {
    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(0);
    const [pickedStartDate, setPickedStartDate] = useState(0);
    const [pickedEndDate, setPickedEndDate] = useState(0);
    const [isOpen, setIsOpen] = useState(true);
    
    const getStartDate = (event) => {
        setPickedStartDate(0)
        setPickedStartDate(event.target.value)
        const start = Date.parse(event.target.value)
        setStartDate(start)
    }

    const getEndDate = (event) => {
        setPickedEndDate(0)
        setPickedEndDate(event.target.value)
        const end = Date.parse(event.target.value)
        setEndDate(end)
    }

    const filterHandler = (event) => {
        const fullEndDate = endDate + 86400000
        if(allPosts.length === 0 && (startDate && endDate) !== 0) {
            const filteredPosts = posts.filter(post => {
                return (post.date >= startDate) && (post.date <= fullEndDate)
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
        setPickedStartDate(0)
        setPickedEndDate(0)
    }

    return (
        <div>
            <input 
                className='input start-input'
                type="date" 
                id="start" 
                name="start"
                min="2023-01-01" 
                max={pickedEndDate}
                onChange={getStartDate}/>  
            <input 
                className='input end-input'
                type="date" 
                id="end" 
                name="end"
                min={pickedStartDate}
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