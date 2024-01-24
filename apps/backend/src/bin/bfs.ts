import { Graph } from './graph-structure.ts';
import { Node } from './graph-structure.ts';

/**
 * Finds the path from inputted startNode to endNode in given graph
 * @param {string} startNode - The ID of the starting node.
 * @param {string} endNode - The ID of the ending node.
 * @param {Graph} graph - The graph object to traverse
 * @return {string[]} - array of NodeIDs of nodes in path
 */

export function bfs(startNode: string, endNode: string, graph: Graph): string[] {
  //define needed objects
  //store lists of nodeIDs
  const visited: string[] = [];
  const queue: string[] = [];
  //used for iterating through the loop
  let currentNode: Node | undefined;
  let currentNodeID: string;
  let neighbors: Set<string>;

  //put startNode in the queue
  queue.push(startNode);

  //start loop
  while(queue.length > 0) {
    //get first item from queue
    currentNodeID = queue[0];
    currentNode = graph.getNode(currentNodeID);

    //if currentNode is undefined or been visited, pop from queue
    if (currentNode == undefined || visited.includes(currentNodeID)) {
      queue.shift();
    }

    //elif it is the end node, return visited
    else if (currentNodeID == endNode) {
      visited.push(currentNodeID);
      console.log(visited);
      return visited;
    }

    //else, cast as currentNode as Node (determined above) and add neighbors to queue
    else {
      neighbors = (currentNode as Node).edges;
      neighbors.forEach(function (item) {
        queue.push(item);
      });

      //add current node ID to visited
      visited.push(currentNodeID);

      //pop current node ID from queue
      queue.shift();
    }
  }

  //return visited list if endNode not reached (probably should return something else)
  return visited;
}

// Example usage
const graph = new Graph();

// Add nodes and edges to the graph (similar to the example in graph-structure.ts)
// create nodes
const node1 = new Node("1", 1, 1, "1", "1", "1", "1", "1");
const node2 = new Node("2", 2, 2, "2", "2", "2", "2", "2");
const node3 = new Node("3", 3, 3, "3", "3", "3", "3", "3");

// add nodes to graph
graph.addNode(node1);
graph.addNode(node2);
graph.addNode(node3);

// add edges to graph
graph.addEdge("1", "2");
graph.addEdge("2", "3");
graph.addEdge("3", "1");

const startNode = '1';
const endNode = '3';
const path = bfs(startNode, endNode, graph);
console.log(path);

/*if (path.length > 0) {
  console.log(path from ${startNode} to ${endNode}: ${path.join(' -> ')});
} else {
  console.log('No path found.');
}*/
