import { SetStateAction, useState } from 'react';

export function useTemporaryState<T>(defaultValue: T, timeout: number = 1000, onChangeBack?: (value: T) => void) {
    const [value, setValue] = useState(defaultValue);
    const [timer, setTimer] = useState(0);

    const setter = (value: SetStateAction<T>) => {
        setValue(value);
        if (timer) clearTimeout(timer);
        setTimer(setTimeout(() => {
            setValue(defaultValue);
            setTimer(0);
            onChangeBack?.(defaultValue);
        }, timeout) as unknown as number);
    };

    return [value, setter] as const;
}