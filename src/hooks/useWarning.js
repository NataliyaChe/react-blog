import React, { useState, useEffect } from 'react';
import {useAuth} from './useAuth';

export const useWarning = () => {
    const { user } = useAuth();
    const warning = user.securityBreaches;
    console.log('user securityBreaches', warning);
    const [time, setTime] = useState(10);
    const [ isTimer, setIsTimer ] = useState(false);
    const [ warningText, setWarningText ] = useState('');

    useEffect (() => {
        if (time > 0 && isTimer) {
            setTimeout(setTime, 1000, time - 1);
            console.log('time', time);
        } else {
            setIsTimer(false)
        }
    }, [time, isTimer])
    // function countdown() {
    //     // const [time, setTime] = useState(180);
    //     const minutes = Math.floor(time / 60);
    //     const seconds = time - minutes * 60;
    //     const interval = setInterval(() => {
    //         setTime(time)
    //     }, 1000)
    //     console.log('interval', interval);
    // }

    function getBan(warning) {
        switch(warning) {
            case 1: 
                console.log('case warning 1', warning);
                setIsTimer(true);
                setWarningText('Вы нарушили правила, вы не сможете отправлять посты тридцать минут')
                console.log('time ban', time);
                break;
            case 2: 
                console.log('case warning 2', warning);
                break;
            case 3: 
                console.log('case warning 3', warning);
                break;
        }
    }
    return {
        warning, time, isTimer, warningText, getBan
    }
}