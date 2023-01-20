import { useEffect, useState } from 'react';
import styled from 'styled-components';

const TimeContainer = styled.div`
font-size: 20vh;
font-size: min(25vh, 30vw);
text-align: center;
`;

export default function Time() {
    const [time, setTime] = useState('');
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(`${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`);
        };
        updateTime();
        const timer = setInterval(updateTime, 5 * 1000);
        return () => clearInterval(timer);
    });
    return <TimeContainer>{time}</TimeContainer>;
}