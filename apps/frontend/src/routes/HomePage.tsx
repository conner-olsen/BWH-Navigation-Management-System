import React, {useEffect, useRef} from 'react';
import NavBar from "../components/NavBar.tsx";
import {Graph} from 'common/src/graph-structure.ts';
import {drawNodes} from "../show-graph/show-graph.ts";

const HomePage: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas === null) {
            console.error('Unable to get canvas');
            return;
        }
        const ctx = canvas.getContext('2d');

        if (ctx === null) {
            console.error('Unable to get 2d context');
            return;
        }

        // Load the map image
        const image = new Image();
        image.onload = () => {
            ctx.drawImage(image, 0, 0);

            // Draw the nodes
            const graph = new Graph();
            drawNodes(graph, ctx);
        };
        image.onerror = (error) => {
            console.error("Error loading the image:", error);
        };

        // language=file-reference
        image.src = '../../public/maps/L1map.png';
    }, []);

return (
        <div>
            <NavBar/>
            <canvas ref={canvasRef} style={{marginTop: "60px"}}/>
        </div>
    );
};

export default HomePage;
