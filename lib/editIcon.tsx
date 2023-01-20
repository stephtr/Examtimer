import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const IconHost = styled.div`
background: transparent;
border: 2px solid white;
border-radius: 100%;
color: inherit;
width: 2em;
height: 2em;
display: flex;
align-items: center;
justify-content: center;
`;

export default function EditIcon() {
    return (
        <IconHost>
            <FontAwesomeIcon icon={faPenToSquare} />
        </IconHost>
    );
}