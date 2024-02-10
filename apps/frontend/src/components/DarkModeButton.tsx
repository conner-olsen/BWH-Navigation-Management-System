// ButtonComponent.js
import React, { useState } from 'react';
import {Toggle} from "./ui/toggle.tsx";

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
        <Toggle variant={"outline"} size={"sm"} onClick={toggleDarkMode} className="mt-1">
            Dark Mode
        </Toggle>
    );
};

export default DarkModeButton;
