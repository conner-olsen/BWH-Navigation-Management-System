import {Graph} from "./graph.ts";
import FastPriorityQueue from 'fastpriorityqueue';

export abstract class PathfindingStrategy {
  abstract findPath(startNode: string, endNode: string, graph: Graph): string[];

  reconstructPath(cameFrom: Map<string, string>, current: string): string[] {
    const totalPath = [current];
    while (cameFrom.has(current)) {
      current = cameFrom.get(current)!;
      totalPath.unshift(current);
    }
    return totalPath;
  }

  calculateDistance(nodeAId: string, nodeBId: string, graph: Graph): number {
    const nodeA = graph.getNode(nodeAId);
    const nodeB = graph.getNode(nodeBId);
    if (!nodeA || !nodeB) return Infinity;
  
    const dx = Math.abs(nodeA.xCoord - nodeB.xCoord);
    const dy = Math.abs(nodeA.yCoord - nodeB.yCoord);
    const floorDifference = Math.abs(nodeA.getFloorNumber() - nodeB.getFloorNumber());
  
    const baseCost = dx + dy;
  
    let floorChangeCost = 0;
    if (floorDifference > 0) {
      // Directly use the cached average distance
      const averageDistance = graph.getAverageDistance();
  
      // Define multipliers for stairs and elevators
      const stairMultiplier = 3; // Example: stairs are 3 times harder than moving the same distance on flat ground
      const elevatorMultiplier = 1.5; // Example: elevators are 1.5 times harder due to waiting time

      // Apply the appropriate multiplier based on the node type
      if (nodeA.nodeType === 'STAI') {
        floorChangeCost = averageDistance * stairMultiplier * floorDifference;
      } else {
        floorChangeCost = averageDistance * floorDifference * elevatorMultiplier;
      }
    }
  
    return baseCost + floorChangeCost;
  }
}

export class BFSPathfindingStrategy extends PathfindingStrategy {
  /**
   * Finds the shortest path from startNode to endNode in the given graph using BFS
   * @param {string} startNode - The ID of the starting node.
   * @param {string} endNode - The ID of the ending node.
   * @param {Graph} graph - The graph to search within.
   * @return {string[]} - An array of NodeIDs representing the shortest path.
   */
  findPath(startNode: string, endNode: string, graph: Graph): string[] {
    if (!graph.getNode(startNode) || !graph.getNode(endNode)) {
      return [];
    }

    const queue: string[][] = [[startNode]];
    const visited: Set<string> = new Set([startNode]);

    while (queue.length > 0) {
      const path = queue.shift()!;
      const node = path[path.length - 1];

      if (node === endNode) {
        return path;
      }

      const neighbors = graph.getNode(node)?.edges ?? [];

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      }
    }

    return [];
  }
}

export class DFSPathfindingStrategy extends PathfindingStrategy {
  /**
   * Finds the path from the specified startNode to endNode in the given graph using Depth-First Search.
   * @param {string} startNode - The ID of the starting node.
   * @param {string} endNode - The ID of the ending node.
   * @param {Graph} graph - The graph to search within.
   * @return {string[]} - An array of NodeIDs representing the path, if one exists.
   */
  findPath(startNode: string, endNode: string, graph: Graph): string[] {
    if (graph.getNode(startNode) === undefined || graph.getNode(endNode) === undefined) {
      return [];
    }

    const stack: string[][] = [[startNode]];
    const visited: Set<string> = new Set();

    while (stack.length > 0) {
      const path = stack.pop()!;
      const node = path[path.length - 1];

      if (node === endNode) {
        return path;
      }

      if (!visited.has(node)) {
        visited.add(node);
        const neighbors = graph.getNode(node)?.edges ?? [];

        neighbors.forEach((neighbor: string) => {
          if (!visited.has(neighbor)) {
            stack.push([...path, neighbor]);
          }
        });
      }
    }

    return [];
  }
}

export class AStarPathfindingStrategy extends PathfindingStrategy {
  /**
   * Finds the path from the startNode to the endNode in the given graph using the A* algorithm.
   * @param {string} startNode - The ID of the starting node.
   * @param {string} endNode - The ID of the ending node.
   * @param {Graph} graph - The graph to search within.
   * @return {string[]} - An array of NodeIDs representing the path.
   */
  findPath(startNode: string, endNode: string, graph: Graph): string[] {
    if (!graph.getNode(startNode) || !graph.getNode(endNode)) {
      return [];
    }
  
    const comparator = (a: [string, number], b: [string, number]) => a[1] < b[1];
    const priorityQueue = new FastPriorityQueue(comparator);
    const nodesToEvaluate = new Set<string>();
  
    const cameFrom: Map<string, string> = new Map(); // The node that is the parent of the current node
    const costFromStart: Map<string, number> = new Map([...graph.nodes.keys()].map(nodeId => [nodeId, Infinity])); // gScore
    const estimatedTotalCost: Map<string, number> = new Map([...graph.nodes.keys()].map(nodeId => [nodeId, Infinity]));
  
    costFromStart.set(startNode, 0);
    estimatedTotalCost.set(startNode, this.calculateDistance(startNode, endNode, graph));
  
    priorityQueue.add([startNode, estimatedTotalCost.get(startNode) as number]);
    nodesToEvaluate.add(startNode);
  
    while (!priorityQueue.isEmpty()) {
      const current = priorityQueue.poll()![0];
      nodesToEvaluate.delete(current);
  
      if (current === endNode) {
        return this.reconstructPath(cameFrom, current);
      }
  
      const currentNode = graph.getNode(current);
      if (!currentNode) continue;
  
      for (const neighbor of currentNode.edges) {
        // Prevent cycles by checking if the neighbor is already in the cameFrom map
        if (cameFrom.has(neighbor)) {
          continue;
        }

        const tentativePathCost = (costFromStart.get(current) ?? Infinity) + this.calculateDistance(current, neighbor, graph);
        if (tentativePathCost < (costFromStart.get(neighbor) || Infinity)) {
          cameFrom.set(neighbor, current); // Correctly point neighbor back to current
          costFromStart.set(neighbor, tentativePathCost);
          estimatedTotalCost.set(neighbor, tentativePathCost + this.calculateDistance(neighbor, endNode, graph));
        
          if (!nodesToEvaluate.has(neighbor)) {
            priorityQueue.add([neighbor, estimatedTotalCost.get(neighbor) as number]);
            nodesToEvaluate.add(neighbor);
          } else {
            // If the neighbor is already in the queue but now has a lower cost, update its cost in the priority queue
            priorityQueue.removeOne(([nodeId,]) => nodeId === neighbor);
            priorityQueue.add([neighbor, estimatedTotalCost.get(neighbor) as number]);
          }
        }
      }
    }
    
    return [];
  }
}

export class DijkstraPathfindingStrategy extends PathfindingStrategy {
  /**
   * Finds the shortest path from startNode to endNode in the given graph using Dijkstra's algorithm.
   * @param {string} startNode - The ID of the starting node.
   * @param {string} endNode - The ID of the ending node.
   * @param {Graph} graph - The graph to search within.
   * @return {string[]} - An array of NodeIDs representing the shortest path.
   */
  findPath(startNode: string, endNode: string, graph: Graph): string[] {
    if (!graph.getNode(startNode) || !graph.getNode(endNode)) {
      return [];
    }

    const comparator = (a: [string, number], b: [string, number]) => a[1] < b[1];
    const priorityQueue = new FastPriorityQueue(comparator);
    const cameFrom: Map<string, string> = new Map();
    const costFromStart: Map<string, number> = new Map([...graph.nodes.keys()].map(nodeId => [nodeId, Infinity]));
    const inQueue: Set<string> = new Set();

    costFromStart.set(startNode, 0);
    priorityQueue.add([startNode, 0]);
    inQueue.add(startNode);

    while (!priorityQueue.isEmpty()) {
      const [current,] = priorityQueue.poll()!;
      inQueue.delete(current);

      if (current === endNode) {
        return this.reconstructPath(cameFrom, current);
      }

      const currentNode = graph.getNode(current);
      if (!currentNode) continue;

      for (const neighbor of currentNode.edges) {
        const tentativePathCost = (costFromStart.get(current) ?? Infinity) + this.calculateDistance(current, neighbor, graph);

        if (tentativePathCost < (costFromStart.get(neighbor) || Infinity)) {
          cameFrom.set(neighbor, current);
          costFromStart.set(neighbor, tentativePathCost);

          if (!inQueue.has(neighbor)) {
            priorityQueue.add([neighbor, tentativePathCost]);
            inQueue.add(neighbor);
          }
        }
      }
    }

    return [];
  }
}