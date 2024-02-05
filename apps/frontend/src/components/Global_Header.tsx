import "bootstrap/dist/css/bootstrap.min.css";
import DarkModeButton from "./DarkModeButton.tsx";

// This is a basic header that should be shown on every page of the site
export default function GlobalHeader() {
  return (
    <div>
      <header>
        <img className="pl-4 w-1/5" src="public/bwh-logo.svg" />
      </header>
      <div className="bg-dark-blue w-full p-0.5"></div>
        <DarkModeButton/>
    </div>
  );
};

