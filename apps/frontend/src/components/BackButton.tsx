import { useNavigate } from "react-router-dom";

interface BackButton {
    link: string;
}

const BackButton: React.FC<BackButton> = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate(-1)} className= {"BackButton"}>
                <img className="BackButtonImg" src="public/icon/Vector.png" alt="" />
            </button>
        </div>
    );
};

export default BackButton;

