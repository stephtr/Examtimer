import { SetStateAction, useState } from 'react';

export function useTemporaryState<T>(defaultValue: T, timeout: number = 1000, onChangeBack?: (value: T) => void) {
    const [value, setValue] = useState(defaultValue);
    const [timer, setTimer] = useState(0);

    const setter = (value: SetStateAction<T>) => {
        setValue(value);
        setTimer((timer) => {
            if (timer) clearTimeout(timer);
            const currentTimer = setTimeout(() => {
                setTimer((timer) => {
                    if (timer == currentTimer) {
                        setValue(defaultValue);
                        onChangeBack?.(defaultValue);
                        return 0;
                    }
                    return timer;
                });
            }, timeout) as unknown as number;
            return currentTimer;
        });
    };

    return [value, setter] as const;
}