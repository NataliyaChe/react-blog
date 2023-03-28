import React, { useState, useEffect } from 'react';

function Warning({setIsWarningShown, banTime, securityBreaches}) {
    const [counter, setCounter] = useState(10);
    const [ warningText, setWarningText ] = useState('');

    function getWarningText() {
        banTime ? setNotification() : setWarning()
    }

    function setWarning() {
        switch(securityBreaches) {
            case 1: 
                console.log('case warning 1');
                setWarningText(`Вы не можете публиковать ссылки на сторонние ресурсы. Вы нарушили правила, вы не сможете отправлять посты тридцать минут`);
                break;
            case 2: 
                console.log('case warning 2');
                setWarningText(`Вы нарушили правила второй раз. Вы не можете публиковать ссылки на сторонние ресурсы. Ваш аккаунт заблокирован на 30 минут. Вас разлогинет из системы через ${counter} секунд`);
                break;
            case 3: 
                console.log('case warning 3');
                setWarningText(`Вы трижды нарушили правила нашего ресурса. Ваш аккаунт и все посты будут удалены, а вас разлогинет из системы через ${counter} секунд`);
                break;
        }
    } 
        
    function setNotification() {
        switch(securityBreaches) {
            case 1:
                setWarningText(`Возможность опубликовать новый пост будет доступна через ${banTime} минут`);
                break;
            case 2:
                setWarningText(`Возможность войти будет доступна через ${banTime} минут`);
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