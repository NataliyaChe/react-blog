import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { THIRTY_MIN_IN_MILLISECONDS } from '../constants';
import {useAuth} from './useAuth';
import {useApi} from './useApi';

export const useWarning = () => {
    const { user, logout } = useAuth();
    const authorizedUser = user;
    const warning = authorizedUser.securityBreaches;
    // const [time, setTime] = useState(10);
    const [ isTimer, setIsTimer ] = useState(false);
    const [ warningText, setWarningText ] = useState('');
    const [users, setUsers] = useState([]);
    const { get, post, patch } = useApi();
    const navigate = useNavigate();
    let counter = 10;
  
    useEffect(() => {
        const fetchUsers = async () => { 
            const users = await get('users');
            setUsers(users)
         }
            fetchUsers()
      }, []);

    useEffect (() => {
        if (isTimer) {
        // let counter = 10;
        const intervalId = setInterval(() => {
        console.log('counter', counter);
        counter -= 1;
        if (counter === 0) {
            setIsTimer(false);
            clearInterval(intervalId);
        }
        }, 1000);
    }
        // // if (time > 0 && isTimer) {
        // if (isTimer) {
        //     // setTimeout(setTime, 1000, time - 1);
        //     const timer = setInterval(setTime, 1000, time - 1);
        //     setTimeout(() => { clearInterval(timer); setIsTimer(false); setTime(10)}, 10000);
            
        //     console.log('time', time);
        // } else if (time <= 0){
        //     setIsTimer(false)
        // }
    }, [isTimer === true])

    function getBan() {
        const currentDate = new Date()
        const finishBanDate = new Date(currentDate.getTime() + THIRTY_MIN_IN_MILLISECONDS);
        authorizedUser.banEndDate = finishBanDate.getTime();
        // localStorage.setItem('authorizedUser', JSON.stringify(authorizedUser));

        users.map(user => {
            if(user.id === authorizedUser.id) {
                localStorage.setItem('authorizedUser', JSON.stringify(authorizedUser));
                patch('users', user.id, {"banEndDate": finishBanDate})
            }
            return authorizedUser
        })
       
        console.log('user', authorizedUser);
    }

    function getBanCase(warning) {
        switch(warning) {
            case 0: 
                console.log('case warning 1', warning);
                setIsTimer(true);
                setWarningText(`Вы не можете публиковать ссылки на сторонние ресурсы. Вы нарушили правила, вы не сможете отправлять посты тридцать минут ${counter}`);
                getBan();
                break;
            case 1: 
                console.log('case warning 2', warning);
                setIsTimer(true);
                setWarningText(`Вы нарушили правила второй раз. Вы не можете публиковать ссылки на сторонние ресурсы. Ваш аккаунт заблокирован на 30 минут. Вас разлогинет из системы через ${counter} секунд`);
                getBan();
                break;
            case 2: 
                console.log('case warning 3', warning);
                break;
        }
    }

    function compareDate() {
        const currentDate = Date.now();
        const finishBanDate = authorizedUser.banEndDate
        console.log('authorizedUser.banEndDate', finishBanDate, currentDate);
        if(finishBanDate - currentDate > 0) {
            console.log('if > 0', Math.ceil((finishBanDate - currentDate) / (60 * 1000)));
            const timeLeft = Math.ceil((finishBanDate - currentDate) / (60 * 1000))
            setIsTimer(true);
            setWarningText(`Возможность опубликовать новый пост будет доступна через ${timeLeft} минут.`);
        } else {
            console.log('ban ended');
            user.banEndDate = null;
            // user.securityBreaches += 1;
            const bannedUser = users.map(user => {
                if(user.id === authorizedUser.id) {
                    patch('users', user.id, {"banEndDate": null, 
                    // "securityBreaches": +1
                })
                }
                return post
            })
            console.log('user', authorizedUser);
        }   
        
        // switch(true) {
        //     case (finishBanDate - currentDate > 0) :
        //         console.log('if > 0', (finishBanDate - currentDate) / (60 * 1000));
        //         setIsTimer(true);
        //         setWarningText('Бан не закончился');
        //         break;
        //     case (finishBanDate - currentDate <= 0) :
        //         user.banEndDate = null;
        //         const bannedUser = users.map(user => {
        //             if(user.id === authorizedUser.id) {
        //                 patch('users', user.id, {"banEndDate": null})
        //             }
        //             return post
        //         })
        // }
    }
    return {
        warning, isTimer, setIsTimer, warningText, getBanCase, compareDate
    }
}

export const useAccept = () => {

}