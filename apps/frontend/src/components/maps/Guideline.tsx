import React from 'react';

interface GuidelineProps {
    goingUp: boolean,
    floorsApart: number
}

const marginOffset = 222;

const Guideline: React.FC<GuidelineProps> = ({goingUp, floorsApart}) => {
    return (
        <div className={`guideline ${goingUp? "guideline-up" : ''} relative`}
             style={{height: floorsApart * marginOffset + 'px'}}>
            <div className={`w-[16px] h-[30px] right-[-8px] absolute elevator-animation rounded-md shadow-md
                            ${goingUp? "bg-orange-500" : 'bg-blue-500'}`}></div>
        </div>
    );
};

export default Guideline;
