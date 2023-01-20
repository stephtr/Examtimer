import { ChangeEventHandler } from 'react';
import styled from 'styled-components';

interface Props {
    label?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onEnterPressed?: () => void;
}

const Input = styled.input`
    font-size: 2em;
`;

export default function TimeInput({ label, value, onChange, onEnterPressed }: Props) {
    const keyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onEnterPressed) onEnterPressed();
    };
    return (
        <label>
            {label && <div>{label}</div>}
            <Input type="time" value={value} onChange={onChange} onKeyUp={keyUp} />
        </label>
    );
}