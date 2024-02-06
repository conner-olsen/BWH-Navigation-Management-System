import "bootstrap/dist/css/bootstrap.min.css";

// This is a basic header that should be shown on every page of the site
export default function GlobalFooter() {
  return (
    <div className="flex flex-col flex-grow-1 justify-end
                    mt-5">
        <footer className="text-center w-full bg-dark-blue">
            <img className="scale-75 m-auto" src="public/footer-logo.png"/>
            <h5 className="text-white text-center"> © 2024 Brigham and Women's Hospital</h5>
        </footer>
    </div>
  );
};
