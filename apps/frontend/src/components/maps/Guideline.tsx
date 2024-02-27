import React from 'react';

interface GuidelineProps {
    goingUp: boolean,
    floorsApart: number,
    animationOn: boolean
}

const marginOffset = 222;

const Guideline: React.FC<GuidelineProps> = ({goingUp, floorsApart, animationOn}) => {
    return (
        <div className={`guideline ${goingUp? "guideline-up" : ''} relative`}
             style={{height: floorsApart * marginOffset + 'px'}}>
            <div className={`w-[24px] h-[30px] right-[-12px] absolute elevator-animation shadow-md border-2 border-white
                            ${goingUp? "bg-orange-500" : 'bg-blue-500'} ${animationOn? "" : "hidden"}`}></div>
        </div>
    );
};

export default Guideline;
