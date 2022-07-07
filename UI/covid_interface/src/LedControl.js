import axios from 'axios';
import { useState } from 'react';

const LedControl = () => {

    const [isLedOn, setIsLedOn] = useState(false);

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