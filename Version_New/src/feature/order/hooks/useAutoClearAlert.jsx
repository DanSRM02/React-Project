import { useState, useEffect } from 'react';

export const useAutoClearAlert = (timeout = 5000) => {
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), timeout);
            return () => clearTimeout(timer);
        }
    }, [alert, timeout]);

    return [alert, setAlert, () => setAlert(null)];
};