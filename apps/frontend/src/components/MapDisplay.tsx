import {ReactNode} from "react";

function MapDisplay() {
    return (
        <svg width="800" height="600">
            <image href="../../public/maps/L1map.png" height="600" width="800"/>
            <circle cx="400" cy="300" r="50" fill="red" />
        </svg>
    );
}

export default MapDisplay;


// export default MapDisplay() {
//   return (
//     <div>
//         <svg width="100" viewBox={"0 0 "} height="100">
//             <img src={""}/>
//     </div>
//   );
// }
