import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';
import EditIcon from './editIcon';
import { useTemporaryState } from './hooks';
import MarkdownRender from './markdownRenderer';

const Root = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TextOutput = styled.div`
    font-size: 2em;
    padding: 0.25em 0.5em;
    width: 100%;
    height: 100%;
    border: 2px transparent;
    overflow: hidden;
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
    border: 2px solid rgba(255,255,255, 0.5);
    border-radius: 10px;

    ${Root}:hover & {
        opacity: 1;
    }
`;

const Textarea = styled.textarea`
    width: 100%;
    height: 100%;
    background: transparent;
    border: 1.5px solid white;
    border-radius: 5px;
    padding: 0.25em 0.5em;
    font-size: 2em;
    font-family: inherit;
`;


export default function NotesArea() {
    const [text, setText] = useState('');
    const [isEditMode, setIsEditMode] = useTemporaryState(false, 20000);

    const switchToEditMode = () => setIsEditMode(true);
    const submit = () => setIsEditMode(false);

    const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        setIsEditMode(true);
    };
    const hasContent = text != '';

    if (isEditMode) {
        return (
            <Root>
                <Textarea
                    title="Notes"
                    placeholder="Enter notes (Markdown & Math supported)..."
                    value={text}
                    onChange={onTextChange}
                    onBlur={submit}
                    autoFocus
                />
            </Root>);
    }
    return (
        <Root>

            {hasContent ?
                <>
                    <TextOutput>
                        <MarkdownRender>
                            {text}
                        </MarkdownRender>
                    </TextOutput>
                    <EditButton title="Edit notes" type="button" onClick={switchToEditMode}><EditIcon /></EditButton>
                </>
                :
                <Placeholder onClick={switchToEditMode} type="button" title="Edit notes">
                    Notes <FontAwesomeIcon icon={faEdit} />
                </Placeholder>
            }

        </Root>
    );
}