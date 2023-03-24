import React, { useState } from 'react';
import {useAuth} from '../hooks/useAuth';
import {useApi} from '../hooks/useApi';
import Warning from '../components/Warning';
import { THIRTY_MIN_IN_MILLISECONDS } from '../constants';

function Form({ onCreate }) {
    const [text, setText] = useState('');
    const { user, updateUser } = useAuth();
    const [authorizedUser, setAuthorizedUser] = useState(user);
    const { patch } = useApi();

    const [isWarningShown, setIsWarningShown] = useState(false);

    const regex = /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/;

    

    function submitHandler(event) {
        event.preventDefault();
        // const currentDate = new Date();
       if(!text.trim().match(regex)) {
            console.log('regex valid');
            onCreate(text)
            setText('')
        } else {
            console.log('warning');
            setIsWarningShown(true);
            getBan() 
        }
        // if (text.trim()) {
        //     onCreate(text)
        //     setValue('')
        // }
    }

    function getBan() {
        const currentDate = new Date();
        const finishBanDate = new Date(currentDate.getTime() + THIRTY_MIN_IN_MILLISECONDS);
        console.log('date finish', currentDate, finishBanDate.getTime());
        // localStorage.setItem('authorizedUser', JSON.stringify(authorizedUser));
        // setAuthorizedUser({
        //     login: authorizedUser.login,
        //     email: authorizedUser.email,
        //     password: authorizedUser.password,
        //     id: authorizedUser.id,
        //     securityBreaches: ++authorizedUser.securityBreaches,
        //     ban: authorizedUser.ban,
        //     banEndDate: finishBanDate.getTime()
        // })
        patch('users', authorizedUser.id, {securityBreaches: ++authorizedUser.securityBreaches, banEndDate: finishBanDate.getTime()});
        updateUser( ++authorizedUser.securityBreaches, finishBanDate.getTime())
        // updateUser(authorizedUser.securityBreaches, authorizedUser.banEndDate)
        console.log('form getBan authorizedUser', authorizedUser);
    }

    return (
        <div className='form-container'>
            {isWarningShown &&
                <Warning setIsWarningShown={setIsWarningShown}
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