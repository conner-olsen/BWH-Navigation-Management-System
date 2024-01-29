import "bootstrap/dist/css/bootstrap.min.css";

// This is a basic header that should be shown on every page of the site
export default function GlobalFooter() {
  return (
    <div className="FooterFormat">
        <footer className="GlobalFooter">
            <img className="FooterLogo" src="public/bwh-logo-footer.png"/>
            <h3 className="FooterText"> © 2024 Brigham and Women's Hospital</h3>
        </footer>
    </div>
  );
};

