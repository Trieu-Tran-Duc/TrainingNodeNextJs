import { useState, useEffect } from 'react';

export function useNetworkStatus() {
    const [online, setOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

    useEffect(() => {
        const updateOnline = () => setOnline(true);
        const updateOffline = () => setOnline(false);

        window.addEventListener('online', updateOnline);
        window.addEventListener('offline', updateOffline);

        return () => {
            window.removeEventListener('online', updateOnline);
            window.removeEventListener('offline', updateOffline);
        };
    }, []);

    return online;
}
