import "bootstrap/dist/css/bootstrap.min.css";

// This is a basic header that should be shown on every page of the site
const GlobalFooter: React.FC = () => {
  return (
    <div>
      <footer className="GlobalFooter">
        <img className="FooterLogo" src="public/bwh-logo-footer.svg" />
      </footer>
    </div>
  );
};

export default GlobalFooter;
