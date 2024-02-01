import React, {useEffect, useRef} from 'react';
import NavBar from "../components/NavBar.tsx";

const HomePage: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            console.error('Unable to get canvas');
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Unable to get 2d context');
            return;
        }

        // Load the map image
        const image = new Image();
        image.src = '../../public/maps/L1map.png';

        image.onload = () => {
            console.log('Image loaded successfully');
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, image.width / 2, image.height / 2);
        };

        image.onerror = (error) => {
            console.error('Error loading the image:', error);
        };
    }, []);

    return (
        <div>
            <NavBar/>
            {/*<canvas ref={canvasRef} style={{marginTop: '60px'}}/>*/}
        </div>
    );
};


// const HomePage: React.FC = () => {
//     return (
//         <div>
//             <NavBar/>
//             <img
//                 className={"pictureOfL1"}
//                 src="public/icon/00_thelowerlevel1 (2).png"
//                 alt="Lower Level of Hospital (L1)"
//                 style={{marginTop: "60px"}}
//             />
//         </div>
//     );
// };
//
export default HomePage;
