import axios from '../node_modules/axios/index';
import { useEffect, useState } from 'react';
import { Box, Switch } from '../node_modules/@mui/material/index';

const LedControl = () => {

    const [isLedOn, setIsLedOn] = useState(false);

    useEffect(() => {
        axios.post('http://localhost:3003/led', {
            state: 'off'
        });
    }, []);

    const toggleLed = () => {
        const value = !isLedOn ? 'on' : 'off';
        axios.post('http://localhost:3003/led', {
            state: value
        });

        setIsLedOn(!isLedOn);
    }

    return (
        <>
            <Box sx={{fontFamily : "Roboto", marginTop: "10px"}}>
                <Switch onClick={toggleLed}/>
                <span>Toggle led</span>
            </Box>
        </>
    )
}

export default LedControl;