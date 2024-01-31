import React, {useEffect, useRef} from 'react';
import NavBar from "../components/NavBar.tsx";
import {Graph, Node} from 'common/src/graph-structure.ts';
import {drawNodes} from "../show-graph/show-graph.ts";

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


            // Draw the nodes
            const graph = new Graph();

            //     constructor(
            //         id: string,
            //         xCoord: number,
            //         yCoord: number,
            //         floor: string,
            //         building: string,
            //         nodeType: string,
            //         longName: string,
            //         shortName: string,
            // ) {
            //         this.id = id;
            //         this.xCoord = xCoord;
            //         this.yCoord = yCoord;
            //         this.floor = floor;
            //         this.building = building;
            //         this.nodeType = nodeType;
            //         this.longName = longName;
            //         this.shortName = shortName;
            //         this.edges = new Set();
            //     }
            // Create nodes
            const node1 = new Node('1', 100, 100, 'L1', 'Hospital', 'Room', 'Room 1', 'R1');
            const node2 = new Node('2', 200, 200, 'L1', 'Hospital', 'Room', 'Room 2', 'R2');
            const node3 = new Node('3', 300, 300, 'L1', 'Hospital', 'Room', 'Room 3', 'R3');
            const node4 = new Node('4', 400, 400, 'L1', 'Hospital', 'Room', 'Room 4', 'R4');
            const node5 = new Node('5', 500, 500, 'L1', 'Hospital', 'Room', 'Room 5', 'R5');
            const node6 = new Node('6', 600, 600, 'L1', 'Hospital', 'Room', 'Room 6', 'R6');
            const node7 = new Node('7', 700, 700, 'L1', 'Hospital', 'Room', 'Room 7', 'R7');
            // Add nodes to graph
            graph.addNode(node1);
            graph.addNode(node2);
            graph.addNode(node3);
            graph.addNode(node4);
            graph.addNode(node5);
            graph.addNode(node6);
            graph.addNode(node7);
            // Draw nodes



            drawNodes(graph, ctx);
        };

        image.onerror = (error) => {
            console.error('Error loading the image:', error);
        };
    }, []);

    return (
        <div>
            <NavBar/>
            <canvas ref={canvasRef} style={{marginTop: '60px'}}/>
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
