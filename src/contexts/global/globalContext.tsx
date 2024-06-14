import { createContext, useEffect, useState } from 'react';
import useWindowDimensions from '../../hooks/windowDimensions';
import useScrollValue from '../../hooks/scrollValue';

export const GlobalContext = createContext<GlobalContextType>(null!);

export const GlobalProvider = ({ children }: any) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const windowDimensions = useWindowDimensions();
    const scrollValue = useScrollValue();

    const checkMobile = () => {
        if (windowDimensions.width <= 768) {
            setMobileOpen(true);
        } else {
            setMobileOpen(false);
        }
    }

    const checkScroll = () => {
        scrollValue > 50 ? setScrolled(true) : setScrolled(false);
    }

    useEffect(() => {
        checkScroll();
        checkMobile();
    }, [windowDimensions, scrollValue]);

    return <GlobalContext.Provider value={{ mobileOpen, scrolled, windowDimensions, checkMobile }}>
        {children}
    </GlobalContext.Provider>
}