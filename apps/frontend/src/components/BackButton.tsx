import { useNavigate } from "react-router-dom";



const BackButton = () => {
    const navigate = useNavigate();
  return (
        <button className= {"BackButton"} onClick={() => navigate(-1)}>
          <img className="BackButtonImg" src="public/icon/Vector.png" alt="" />
        </button>
  );
};

export default BackButton;
