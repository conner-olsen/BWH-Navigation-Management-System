import {ReactNode} from "react";

function LargeButton({children,onClick}:{children:ReactNode,onClick?:() => void}) {
  return (
    <button className="LargeButton" onClick={onClick}>
      {children}
    </button>
  );
}

export default LargeButton;
