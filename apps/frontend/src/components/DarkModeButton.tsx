// ButtonComponent.js
import React, { useState } from 'react';

const ButtonComponent = () => {
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
        <button onClick={toggleDarkMode}>
            Toggle Dark Mode
        </button>
    );
};

export default ButtonComponent;
