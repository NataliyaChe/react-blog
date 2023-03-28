import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {useAuth} from '../hooks/useAuth';
// import {useApi} from '../hooks/useApi';
import Warning from '../components/Warning';
import {isTextValid} from '../utils/PostValidation'
import {getBanEndDate, getBanTimeLeft} from '../utils/BanDateHelper'

function Form({ onCreate }) {
    const [text, setText] = useState('');
    const { user, updateUser, logout } = useAuth();
    // const { banEndDate, securityBreaches } = user;
    const [banTime, setBanTime] = useState(null);
    const navigate = useNavigate();

    const [isWarningShown, setIsWarningShown] = useState(false);

    function submitHandler(event) {
        event.preventDefault();
        setBanTime(null);
        const banTimeLeft = getBanTimeLeft(user.banEndDate)
        if(banTimeLeft > 0) {
            console.log('banned');
            setIsWarningShown(true);
            setBanTime(banTimeLeft);
        } else if(isTextValid(text)) {
            console.log('regex valid');
            onCreate(text);
            setText('');
        } else {
            console.log('warning');
            setIsWarningShown(true);
            updateUserBreaches();
            console.log('user.securityBreaches', user.securityBreaches);
            if(user.securityBreaches === 2) {
                setTimeout(signOut, 10000);
            }
        }
    }

    function updateUserBreaches() {
        console.log('updated');
        const updatedUser = {
            ...user,
            securityBreaches: user.securityBreaches+1,
            banEndDate: getBanEndDate()
        }
        updateUser(updatedUser)
    }
    console.log('user form', user);
    const signOut = () => {
        logout();
        navigate('./login'); 
    }

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