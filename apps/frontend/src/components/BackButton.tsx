import { Link } from "react-router-dom";

interface BackButton {
    link: string;
}


const BackButton: React.FC<BackButton> = ({ link }) => {
  return (
      <Link to={link}>
        <button className= {"BackButton"}>
          <img className="BackButtonImg" src="public/icon/Vector.png" alt="" />
        </button>
      </Link>
  );
};

export default BackButton;
