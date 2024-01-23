import { Graph } from './graph-structure.ts';
import { Node } from './graph-structure.ts';

/**
 * Finds the path from inputted startNode to endNode in given graph
 * @param {string} startNode - The ID of the starting node.
 * @param {string} endNode - The ID of the ending node.
 * @param {Graph} graph - The graph object to traverse
 * @return {string[]} - array of NodeIDs of nodes in path
 */

function bfs(startNode: string, endNode: string, graph: Graph): string[] {
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
      queue.pop();
    }

    //elif it is the end node, return visited
    else if (currentNodeID == endNode) {
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
      queue.pop();
    }
  }

  //return visited list if endNode not reached (probably should return something else)
  return visited;
}
