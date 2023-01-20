import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import EditIcon from './editIcon';
import { useTemporaryState } from './hooks';
import TimeInput from './timeInput';

const Root = styled.div`
    position: relative;
    min-width: 50vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TimeOutput = styled.div`
    font-size: 4em;
    font-size: min(4em, 8vw);
`;

const Placeholder = styled.button`
    padding: 1em;
    font-size: 1.5em;
    opacity: 0;
    background: transparent;
    color: inherit;
    border: none;
    cursor: pointer;

    ${Root}:hover &, .show-hover & {
        opacity: 0.5;
    }

    &:hover:hover {           
        opacity: 1;
    }
`;

const EditButton = styled.button`
    position: absolute;
    inset: 0;
    background: rgba(0,0,0, 0.75);
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: inherit;
    border: none;
    font-size: 1.5em;

    ${Root}:hover & {
        opacity: 1;
    }
`;

const Sep = styled.div`
    margin: 0 0.5em;
`;


export default function TimeRange() {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [isEditMode, setIsEditMode] = useTemporaryState(false, 20000);

    const switchToEditMode = () => setIsEditMode(true);
    const submit = () => setIsEditMode(false);

    const onStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStart(e.target.value);
        setIsEditMode(true);
    };

    const onEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnd(e.target.value);
        setIsEditMode(true);
    };
    const hasContent = start != '' || end != '';

    if (isEditMode) {
        return (
            <Root>
                <TimeInput label="Start" onChange={onStartTimeChange} value={start} onEnterPressed={submit} />
                <Sep><div>&nbsp;</div>–</Sep>
                <TimeInput label="End" onChange={onEndTimeChange} value={end} onEnterPressed={submit} />
            </Root>);
    }
    return (
        <Root>

            {hasContent ?
                <>
                    <TimeOutput>{start}{(start && end) && '–'}{end}</TimeOutput>
                    <EditButton title="Edit" type="button" onClick={switchToEditMode}><EditIcon /></EditButton>
                </>
                :
                <Placeholder onClick={switchToEditMode} type="button">
                    Start–End <FontAwesomeIcon icon={faEdit} />
                </Placeholder>
            }

        </Root>
    );
}