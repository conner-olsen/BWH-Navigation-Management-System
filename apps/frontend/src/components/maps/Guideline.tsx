import React from 'react';

interface GuidelineProps {
    goingUp: boolean,
    floorsApart: number
}

const marginOffset = 286;

const Guideline: React.FC<GuidelineProps> = ({goingUp, floorsApart}) => {
    return (
        <div className={`guideline ${goingUp? "guideline-up" : ''}`}
             style={{height: floorsApart * marginOffset + 'px'}}></div>
    );
};

export default Guideline;
