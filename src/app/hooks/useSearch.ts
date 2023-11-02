import React, {useCallback, useEffect, useRef, useState} from "react";

export default function <T>(value: T, delay?: number): T {
    const [searchedValue, setSearchedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => setSearchedValue(value), delay || 500)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return searchedValue
}