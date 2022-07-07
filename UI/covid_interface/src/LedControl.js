import axios from 'axios';
import { useEffect, useState } from 'react';

const LedControl = () => {

    const [isLedOn, setIsLedOn] = useState(false);
    const [firstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        if(firstRender) {
            setIsFirstRender(false);
            axios.post('http://localhost:3003/led', {
                state: 'off'
            });
        }
    }, 
    [firstRender]);

    const toggleLed = () => {
        const value = !isLedOn ? 'on' : 'off';
        axios.post('http://localhost:3003/led', {
            state: value
        });

        setIsLedOn(!isLedOn);
    }

    return (
        <div>
            <div>Led state: {isLedOn ? "ON" : "OFF"}</div>
            <button onClick={toggleLed}>Toggle led</button>
        </div>
    )
}

export default LedControl;