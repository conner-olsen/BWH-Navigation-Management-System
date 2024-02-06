import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

// This is a basic header that should be shown on every page of the site
export default function GlobalFooter() {
  return (
    <footer className="flex flex-col flex-grow-1 justify-end w-full">
        <div className="container flex justify-between">
            <p className="text-xs m-0">© 2024 Brigham and Women's Hospital</p>
            <div>
                <Link to="/" className="pl-1 inline-block no-underline text-xs">Link 1</Link>
                <Link to="/" className="pl-1 inline-block no-underline text-xs">Link 2</Link>
                <Link to="/" className="pl-1 inline-block no-underline text-xs">Link 3</Link>
                <Link to="/" className="pl-1 inline-block no-underline text-xs">Link 4</Link>
            </div>
        </div>
    </footer>
  );
};
