import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const TimeContainer = styled.div`
font-size: 25vh;
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