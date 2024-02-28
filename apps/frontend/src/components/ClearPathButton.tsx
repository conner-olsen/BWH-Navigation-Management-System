//import React, { useState } from "react";

import { Button } from "react-bootstrap";

interface ClearPathButtonProps {
    sendClear: () => void;
}
const ClearPathButton = ({sendClear}: Readonly<ClearPathButtonProps>) => {
   // const [isHovered, setHovered] = useState<boolean>(false);

    // const handleMouseEnter = () => {
    //     setHovered(true);
    // };

    // const handleMouseLeave = () => {
    //     setHovered(false);
    // };

    return (
        <div className="container">
            <Button variant="outline"
                   // className={"ClearPathButton"}
                    onClick={() => sendClear()}>
                Clear Path</Button>


            {/*<button*/}
            {/*    className={"ClearPathButton"}*/}
            {/*    onClick={() => sendClear()}*/}
            {/*    onMouseEnter={handleMouseEnter}*/}
            {/*    onMouseLeave={handleMouseLeave}*/}
            {/*    style={{*/}
            {/*        color: isHovered ? 'rgb(99,148,238)'  : 'rgba(169,166,166,0.75)',*/}
            {/*        backgroundColor: isHovered ? 'rgb(99,148,238)'  : 'rgba(169,166,166,0.75)', // Change background color to gray by default*/}
            {/*        transition: 'background-color 0.5s ease', // Add a smooth transition effect*/}
            {/*    }}*/}
            {/*>*/}
            {/*    Clear Path*/}
            {/*</button>*/}
        </div>
    );
};

export default ClearPathButton;
