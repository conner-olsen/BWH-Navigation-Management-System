import "bootstrap/dist/css/bootstrap.min.css";

// This is a basic header that should be shown on every page of the site
export default function GlobalHeader() {
  return (
    <div>
      <header className="GlobalHeader">
        <img className="CompanyLogo" src="public/bwh-logo.svg" />
      </header>
      <div className="Spacer"></div>
    </div>
  );
};

