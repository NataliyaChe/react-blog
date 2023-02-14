import React, { useState } from 'react';


function Form({ onCreate }) {
    const [value, setValue] = useState('');

    function submitHandler(event) {
        event.preventDefault()
        if (value.trim()) {
            onCreate(value)
            setValue('')
        }
    }

    return (
        <div className='form-container'>
            <form className='form' onSubmit={submitHandler}>
                <p className='form-title'>Write new post:</p>
                <textarea className='form-field' 
                    placeholder='Type something...' 
                    autoFocus
                    cols='50'
                    rows='8'
                    wrap='soft'
                    name='textform'
                    value={value}
                    onChange={event => setValue(event.target.value)}></textarea>
          
                <button className='button' type='submit'>Send post</button>
            </form>   
        </div>
    );
}

export default Form;