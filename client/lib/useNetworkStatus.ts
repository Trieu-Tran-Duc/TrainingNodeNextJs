import { useState, useEffect } from 'react';

export function useNetworkStatus() {
    const [online, setOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

    useEffect(() => {
        const updateOnline = () => setOnline(true);
        const updateOffline = () => setOnline(false);

        // const checkInternet = async () => {
        //     try {
        //         await fetch("http://localhost:3001/api/scans",
        //             {
        //                 cache: "no-store",
        //                 method: "GET",
        //             });
        //         updateOnline
        //     } catch {
        //         updateOffline
        //     }
        // };

        window.addEventListener('online', updateOnline);
        window.addEventListener('offline', updateOffline);

        return () => {
            window.removeEventListener('online', updateOnline);
            window.removeEventListener('offline', updateOffline);
        };
    }, []);

    return online;
}
