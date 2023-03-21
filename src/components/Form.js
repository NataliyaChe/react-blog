import React, { useState } from 'react';
import {useAccept} from '../hooks/useWarning';
import {useAuth} from '../hooks/useAuth';
import {useApi} from '../hooks/useApi';
import {useWarning} from '../hooks/useWarning';

function Form({ onCreate }) {
    const [value, setValue] = useState('');
    const { user } = useAuth();
    const authorizedUser = user;

    const { warning, isTimer, warningText, getBanCase, compareDate } = useWarning();
    // const { compareDate } = useAccept();

    const regex = /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/


    function submitHandler(event) {
        event.preventDefault();
        if(authorizedUser.banEndDate) {
            compareDate();
        } else if(!value.trim().match(regex)) {
            onCreate(value)
            setValue('')
        } else {
            console.log('getBanCase');
            getBanCase(warning);
        } 
        // if (value.trim()) {
        //     onCreate(value)
        //     setValue('')
        // }
    }

    console.log('authorizedUser', authorizedUser);
    return (
        <div className='form-container'>
            <span className={`warning ${isTimer ? 'show' : 'hide'}`}>
                {warningText}
            </span>
            <form className='form' 
            onSubmit={submitHandler}
            >
                <p className='form-title title'>Write new post:</p>
                <textarea 
                    className='form-field' 
                    placeholder='Type something...' 
                    autoFocus
                    cols='50'
                    rows='8'
                    wrap='soft'
                    name='textform'
                    value={value}
                    onChange={event => setValue(event.target.value)}>         
                </textarea>                
                <button className='button' type='submit' onClick={useAccept}
                // disabled={authorizedUser.banEndDate ? true : false}
                >Send post</button>
            </form>   
        </div>
    );
}

export default Form;