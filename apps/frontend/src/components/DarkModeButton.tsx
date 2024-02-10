// ButtonComponent.js
import React, { useState } from 'react';
import {Switch} from "./ui/switch.tsx";
const DarkModeButton = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        // Toggle the state
        setIsDarkMode((prevMode) => !prevMode);

        // Get the HTML tag
        const bodyTag = document.body;

        // Toggle the "darkMode" class on the HTML tag
        if (isDarkMode) {
            bodyTag.classList.remove('darkMode');
        } else {
            bodyTag.classList.add('darkMode');
        }
    };

    return (
        <Switch onClick={toggleDarkMode} className="mt-2.5">
            Dark Mode
        </Switch>
    );
};

export default DarkModeButton;
