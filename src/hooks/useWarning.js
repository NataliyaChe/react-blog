import React, { useState, useEffect } from 'react';
import { THIRTY_MIN_IN_MILLISECONDS } from '../constants';
import {useAuth} from './useAuth';
import {useApi} from './useApi';

// const { user } = useAuth();

export const useWarning = () => {
    const { user } = useAuth();
    const authorizedUser = user;
    const warning = authorizedUser.securityBreaches;
    const [time, setTime] = useState(10);
    const [ isTimer, setIsTimer ] = useState(false);
    const [ warningText, setWarningText ] = useState('');
    const [users, setUsers] = useState([]);
    const { get, post, patch } = useApi();
  
    useEffect(() => {
        const fetchUsers = async () => { 
            const users = await get('users');
            setUsers(users)
         }
            fetchUsers()
      }, []);

    useEffect (() => {
        if (time > 0 && isTimer) {
            setTimeout(setTime, 1000, time - 1);
            console.log('time', time);
        } else {
            setIsTimer(false)
        }
    }, [time, isTimer])

    function getBan() {
        const currentDate = new Date()
        const finishBanDate = new Date(currentDate.getTime() + THIRTY_MIN_IN_MILLISECONDS);
        console.log('finishDate', finishBanDate);
        user.banEndDate = finishBanDate.getTime();
        console.log('user.banEndDate', authorizedUser.banEndDate);
        localStorage.setItem('authorizedUser', JSON.stringify(authorizedUser));

        const bannedUser = users.map(user => {
            if(user.id === authorizedUser.id) {
                patch('users', user.id, {"banEndDate": finishBanDate})
            }
            return post
        })
        console.log('user', authorizedUser);
    }

    function getBanCase(warning) {
        switch(warning) {
            case 1: 
                console.log('case warning 1', warning);
                setIsTimer(true);
                setWarningText('Вы нарушили правила, вы не сможете отправлять посты тридцать минут');
                console.log('time ban', time);
                getBan()
                break;
            case 2: 
                console.log('case warning 2', warning);
                break;
            case 3: 
                console.log('case warning 3', warning);
                break;
        }
    }

    function compareDate() {
        const currentDate = Date.now();
        const finishBanDate = authorizedUser.banEndDate
        console.log('authorizedUser.banEndDate', finishBanDate, currentDate);
        if(finishBanDate - currentDate > 0) {
            console.log('if(finishBanDate - currentDate > 0)', (finishBanDate - currentDate) / (60 * 1000));
            setIsTimer(true);
            setWarningText('Бан не закончился');
        } else {
            console.log('ban ended');
            user.banEndDate = null;
            const bannedUser = users.map(user => {
                if(user.id === authorizedUser.id) {
                    patch('users', user.id, {"banEndDate": null})
                }
                return post
            })
            console.log('user', authorizedUser);

        }
        console.log('compareDate', finishBanDate > currentDate);
        
    }
    return {
        warning, time, isTimer, warningText, getBanCase, compareDate
    }
}

export const useAccept = () => {
    // const { user } = useAuth();
    // const authorizedUser = JSON.parse(localStorage.getItem('authorizedUser'))

    // function compareDate() {
    //     const currentDate = Date.now();
    //     const finishBanDate = authorizedUser.banEndDate
    //     console.log('authorizedUser.banEndDate', finishBanDate, currentDate);
    //     if(finishBanDate - currentDate > 0) {
    //         console.log('if(finishBanDate - currentDate > 0)', (finishBanDate - currentDate) / (60 * 1000));
            
    //     } else {
    //         console.log('ban ended');

    //     }
    //     console.log('compareDate', finishBanDate > currentDate);
        
    // }

    // return {
    //     compareDate
    // }

}