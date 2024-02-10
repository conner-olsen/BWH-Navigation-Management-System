// ButtonComponent.js
import React, {useEffect, useState} from 'react';

const DarkModeButton = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDarkMode);

        // Add or remove 'dark' class based on user's preferred color scheme
        if (prefersDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, []);

    const handleToggle = () => {
        setDarkMode(prevMode => !prevMode);
        if (!darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    };

    return (
        <Switch onClick={toggleDarkMode} className="mt-2.5">
            Dark Mode
        </Switch>
    );
};

export default DarkModeButton;
