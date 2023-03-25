import React, { useState } from 'react';
import {useAuth} from '../hooks/useAuth';
import {useApi} from '../hooks/useApi';
import Warning from '../components/Warning';
import { THIRTY_MIN_IN_MILLISECONDS } from '../constants';

function Form({ onCreate }) {
    const [text, setText] = useState('');
    const { user, updateUser } = useAuth();
    const [timeLeft, setTimeLeft] = useState(null);
    const { patch } = useApi();

    const [isWarningShown, setIsWarningShown] = useState(false);

    const regex = /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/;

    function submitHandler(event) {
        event.preventDefault();
        const currentDate = new Date();
        const finishBanDate = user.banEndDateж
        if(finishBanDate - currentDate > 0) {
            console.log('banned');
            console.log('if > 0', Math.ceil((finishBanDate - currentDate) / (60 * 1000)));
            setIsWarningShown(true);
            setTimeLeft(Math.ceil((finishBanDate - currentDate) / (60 * 1000)));
        } else if(!text.trim().match(regex)) {
            console.log('regex valid');
            // const updatedUser = {
            //     ...user,
            //     banEndDate: null
            // }
            // updateUser(updatedUser);
            onCreate(text);
            setText('');
        } else {
            console.log('warning');
            setIsWarningShown(true);
            getBan() 
        }
    }

    function getBan() {
        const currentDate = new Date();
        const finishBanDate = new Date(currentDate.getTime() + THIRTY_MIN_IN_MILLISECONDS);
     
        const updatedUser = {
            ...user,
            securityBreaches: user.securityBreaches+1,
            banEndDate: finishBanDate.getTime()
        }
  
        updateUser(updatedUser)
    }

    return (
        <div className='form-container'>
            {isWarningShown &&
                <Warning setIsWarningShown={setIsWarningShown}
                    timeLeft={timeLeft}
                /> 
            }
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
                    value={text}
                    onChange={event => setText(event.target.value)}
                    required>         
                </textarea>                
                <button className='button' type='submit' disabled={isWarningShown}>
                    Send post
                </button>
            </form>   
        </div>
    );
}

export default Form;