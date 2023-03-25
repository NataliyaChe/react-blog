import React, { useState, useEffect } from 'react';
import {useAuth} from '../hooks/useAuth';

function Warning({setIsWarningShown, timeLeft}) {
    const [counter, setCounter] = useState(10);
    const { user } = useAuth();
    const [ warningText, setWarningText ] = useState('');

    function getWarningText() {
        console.log('warning timeLeft ', timeLeft);
        if(!timeLeft) {
            switch(user.securityBreaches) {
                case 1: 
                    console.log('case warning 0', user.securityBreaches);
                    setWarningText(`Вы не можете публиковать ссылки на сторонние ресурсы. Вы нарушили правила, вы не сможете отправлять посты тридцать минут`);
                    break;
                case 2: 
                    console.log('case warning 1', user.securityBreaches);
                    setWarningText(`Вы нарушили правила второй раз. Вы не можете публиковать ссылки на сторонние ресурсы. Ваш аккаунт заблокирован на 30 минут. Вас разлогинет из системы через ${counter} секунд`);
                    break;
                case 3: 
                    console.log('case warning 2', user.securityBreaches);
                    setWarningText(`Вы трижды нарушили правила нашего ресурса. Ваш аккаунт и все посты будут удалены, а вас разлогинет из системы через ${counter} секунд`);
                    break;
            }
        } else {
            setWarningText(`Возможность опубликовать новый пост будет доступна через ${timeLeft} минут`);
        
        }
        // switch(user.securityBreaches) {
        //     case 1: 
        //         console.log('case warning 0', user.securityBreaches);
        //         setWarningText(`Вы не можете публиковать ссылки на сторонние ресурсы. Вы нарушили правила, вы не сможете отправлять посты тридцать минут`);
        //         break;
        //     case 2: 
        //         console.log('case warning 1', user.securityBreaches);
        //         setWarningText(`Вы нарушили правила второй раз. Вы не можете публиковать ссылки на сторонние ресурсы. Ваш аккаунт заблокирован на 30 минут. Вас разлогинет из системы через ${counter} секунд`);
        //         break;
        //     case 3: 
        //         console.log('case warning 2', user.securityBreaches);
        //         setWarningText(`Вы трижды нарушили правила нашего ресурса. Ваш аккаунт и все посты будут удалены, а вас разлогинет из системы через ${counter} секунд`);
        //         break;
        // }
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