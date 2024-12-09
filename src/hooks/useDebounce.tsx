import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(value);            
        }, delay)
        return () => clearTimeout(timeout);
    }, [value])

    return debounceValue;
}

export default useDebounce;