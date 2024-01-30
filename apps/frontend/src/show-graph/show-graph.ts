
import { Graph, Node } from 'common/src/graph-structure.ts';

window.onload = function() {
  const canvas = document.getElementById('mapCanvas') as HTMLCanvasElement;
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
    const graph = new Graph();//graph import
    drawNodes(graph, ctx);
  };
  image.onerror = (error) => {
    console.error("Error loading the image:", error);
  };
  image.src = 'L1map.png';
};

export function drawNodes(graph: Graph, ctx: CanvasRenderingContext2D) {
  graph.nodes.forEach((node: Node) => {
    drawNode(ctx, node);
  });
}

function drawNode(ctx: CanvasRenderingContext2D, node: Node) {
  const radius = 2;
  ctx.beginPath();
  ctx.arc(node.xCoord, node.yCoord, radius, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
}
