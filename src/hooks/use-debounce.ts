import { useState, useEffect } from "react";
import { debounce } from "lodash";

export const useDebounceFunction = (func: any, delay = 300) =>
    debounce(func, delay);

export const useDebounce = (value: any, delay = 300) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = debounce(() => {
            setDebouncedValue(value);
        }, delay);

        handler();

        return () => handler.cancel();
    }, [value, delay]);

    return debouncedValue;
};

export const useDebounceT = <T>(value: T, delay = 300): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
};
