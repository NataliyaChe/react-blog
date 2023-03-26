import React, { useState } from 'react';
import {useAuth} from '../hooks/useAuth';
// import {useApi} from '../hooks/useApi';
import Warning from '../components/Warning';
// import { THIRTY_MIN_IN_MILLISECONDS } from '../constants';
import {isTextValid} from '../utils/PostValidation'
import {getBanEndDate, getBanTimeLeft} from '../utils/BanDateHelper'

function Form({ onCreate }) {
    const [text, setText] = useState('');
    const { user, updateUser } = useAuth();
    const [banTime, setBanTime] = useState(null);

    const [isWarningShown, setIsWarningShown] = useState(false);
    
    function submitHandler(event) {
        event.preventDefault();
        setBanTime(null);
        // const currentDate = new Date();
        // const banTimeLeft = Math.ceil((user.banEndDate - currentDate.getTime()) / (THIRTY_MIN_IN_MILLISECONDS))
        const banTimeLeft = getBanTimeLeft(user.banEndDate)
        console.log('banTimeLeft', banTimeLeft);
        if(banTimeLeft > 0) {
            console.log('banned');
            setIsWarningShown(true);
            setBanTime(getBanTimeLeft());
        } else if(isTextValid(text)) {
            console.log('regex valid');
            onCreate(text);
            setText('');
        } else {
            console.log('warning');
            updateUserBreaches();
            setIsWarningShown(true);
        }
    }

    function updateUserBreaches() {
        const updatedUser = {
            ...user,
            securityBreaches: user.securityBreaches+1,
            banEndDate: getBanEndDate()
        }
        updateUser(updatedUser)
    }

    // function getBanEndDate() {
    //     const currentDate = new Date();
    //     const finishBanDate = new Date(currentDate.getTime() + THIRTY_MIN_IN_MILLISECONDS);
    //     return finishBanDate.getTime()
    // }

    return (
        <div className='form-container'>
            {isWarningShown &&
                <Warning setIsWarningShown={setIsWarningShown}
                banTime={banTime}
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