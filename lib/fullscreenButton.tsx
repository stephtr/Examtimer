import { faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const OverlayButton = styled.button`
position: fixed;
bottom: 5vh;
right: 5vw;
font-size: 1.5em;
padding: 0.2em 0.5em;
background: rgba(0,0,0,0.5);
border: 2px solid white;
border-radius: 10px;
cursor: pointer;
opacity: 0;

.show-hover & {
    opacity: 0.5;
}

&:hover {
    opacity: 1;
}
`;

export default function FullscreenButton() {
    const [isFullscreen, setIsFullscreen] = useState(typeof document !== 'undefined' && document.fullscreenElement != null);

    const updateFullscreenState = () => setIsFullscreen(document.fullscreenElement != null);

    const toggleFullscreen = () => {
        if (document.fullscreenElement != null) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
        setTimeout(updateFullscreenState, 100);
    };

    useEffect(() => {
        const onFullscreenChange = updateFullscreenState;
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return document.removeEventListener('fullscreenchange', onFullscreenChange);
    });

    return (
        <OverlayButton onClick={toggleFullscreen}>
            Fullscreen <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
        </OverlayButton>
    );
}