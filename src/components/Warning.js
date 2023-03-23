import React, { useState, useEffect } from 'react';

function Warning() {
    const [counter, setCounter] = useState(10);
    // const [state, setState] = useState(false);

    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
            console.log('counter', counter);
            return () => clearInterval(timer);
    }, [counter]);

    return (
        <div className='timer'>
                <span>
                    Countdown: {counter}
                </span> 
        </div>
    );
}

export default Warning;