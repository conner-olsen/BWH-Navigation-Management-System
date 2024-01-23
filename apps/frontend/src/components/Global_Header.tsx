// This is a basic header that should be shown on every page of the site
const GlobalHeader: React.FC = () => {
  return (
    <div>
      <header className="GlobalHeader">
        <img className="CompanyLogo" src="public/bwh-logo.svg" />
      </header>
      <div className="Spacer"></div>
    </div>
  );
};

export default GlobalHeader;
