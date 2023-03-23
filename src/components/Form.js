import React, { useState } from 'react';
import {useAccept} from '../hooks/useWarning';
import {useAuth} from '../hooks/useAuth';
import Warning from '../components/Warning';

function Form({ onCreate }) {
    const [value, setValue] = useState('');
    const { user } = useAuth();
    const authorizedUser = user;

    const [state, setState] = useState(false);
    const renderWarning = () => {
        setState(true);
        // setCounter(10)
    }

    const regex = /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/

    function submitHandler(event) {
        event.preventDefault();
        if (value.trim()) {
            onCreate(value)
            setValue('')
        }
    }

    return (
        <div className='form-container'>
            {state &&
                <Warning state={state}/> 
            }
            <button onClick={renderWarning}>Start</button>   
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
                >Send post</button>
            </form>   
        </div>
    );
}

export default Form;