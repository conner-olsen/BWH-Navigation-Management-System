
import { Graph, Node } from 'graph-structure.ts';

window.onload = function() {
  const canvas = document.getElementById('mapCanvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

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
}

function drawNodes(graph: Graph, ctx: CanvasRenderingContext2D) {
  graph.nodes.forEach(node => {
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
