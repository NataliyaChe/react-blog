import React, { useState, useEffect } from 'react';
import {useAuth} from '../hooks/useAuth';
// import {useApi} from '../hooks/useApi';
// import { THIRTY_MIN_IN_MILLISECONDS } from '../constants';

function Warning({setIsWarningShown}) {
    const [counter, setCounter] = useState(10);
    const { user, setUser } = useAuth();
    const authorizedUser = user;
    const [ warningText, setWarningText ] = useState('');
    // const { patch } = useApi();

    function getWarningText() {
        switch(authorizedUser.securityBreaches) {
            case 0: 
                console.log('case warning 0', authorizedUser.securityBreaches);
                setWarningText(`Вы не можете публиковать ссылки на сторонние ресурсы. Вы нарушили правила, вы не сможете отправлять посты тридцать минут`);
                // const currentDate = new Date()
                // const finishBanDate = new Date(currentDate.getTime() + THIRTY_MIN_IN_MILLISECONDS);
                // setUser({
                //     login: authorizedUser.login,
                //     email: authorizedUser.email,
                //     password: authorizedUser.password,
                //     id: authorizedUser.id,
                //     securityBreaches: authorizedUser.securityBreaches + 1,
                //     ban: authorizedUser.ban,
                //     banEndDate: finishBanDate.getTime()
                // })
                // localStorage.setItem('authorizedUser', JSON.stringify(authorizedUser));
                // patch('users', authorizedUser.id, {"banEndDate": finishBanDate});
                // console.log('patch authorizedUser', authorizedUser);
                break;
            case 1: 
                console.log('case warning 1', authorizedUser.securityBreaches);
                setWarningText(`Вы нарушили правила второй раз. Вы не можете публиковать ссылки на сторонние ресурсы. Ваш аккаунт заблокирован на 30 минут. Вас разлогинет из системы через ${counter} секунд`);
                break;
            case 2: 
                console.log('case warning 2', authorizedUser.securityBreaches);
                setWarningText(`Вы трижды нарушили правила нашего ресурса. Ваш аккаунт и все посты будут удалены, а вас разлогинет из системы через ${counter} секунд`);
                break;
        }
    }

    useEffect(() => {
        getWarningText()
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        if(!timer) {
            setIsWarningShown(false)
        }   
        return () => clearInterval(timer);
    }, [counter]);

    return (
        <div className='timer'>
                <span>
                    {warningText}
                </span> 
        </div>
    );
}

export default Warning;