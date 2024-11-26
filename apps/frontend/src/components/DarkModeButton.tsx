// ButtonComponent.js
import React, { useState } from "react";
import { Switch } from "./ui/switch.tsx";

const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useState(
    document.body.classList.contains("dark"),
  );

  // useEffect(() => {
  //     const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  //     setDarkMode(prefersDarkMode);
  //
  //     // Add or remove 'dark' class based on user's preferred color scheme
  //     if (prefersDarkMode) {
  //         document.body.classList.add('dark');
  //     } else {
  //         document.body.classList.remove('dark');
  //     }
  // }, []);

  const handleToggle = () => {
    setDarkMode((prevMode) => !prevMode);
    if (!darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  return (
    <Switch
      onCheckedChange={handleToggle}
      defaultChecked={document.body.classList.contains("dark")}
    >
      Dark Mode
    </Switch>
  );
};

export default DarkModeButton;
