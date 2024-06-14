import { useState, useEffect } from 'react'

const getScrollValue = () => {
    const { scrollY } = window;

    return scrollY;
}

export default function useScrollValue() {
    const [scrollValue, setScrollValue] = useState(getScrollValue());

    useEffect(() => {
        const handleScrollValue = () => {
            setScrollValue(getScrollValue);
        }

        window.addEventListener('scroll', handleScrollValue);

        return () => window.removeEventListener('scroll', handleScrollValue);
    }, [])

    return scrollValue;
}