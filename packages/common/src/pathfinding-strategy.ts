import {Graph} from "./graph.ts";

export interface PathfindingStrategy {
  findPath(startNode: string, endNode: string, graph: Graph): string[];
}

export class BFSPathfindingStrategy implements PathfindingStrategy {
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

      const neighbors = graph.getNode(node)?.edges || [];

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
export class AStarPathfindingStrategy implements PathfindingStrategy {
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

    const openSet: [string, number][] = [[startNode, 0]]; // Open set as [nodeId, fScore]
    const cameFrom: Map<string, string> = new Map(); // For reconstructing path
    const gScore: Map<string, number> = new Map(); // Cost from start to node
    const fScore: Map<string, number> = new Map(); // Estimated cost from start to end through node

    gScore.set(startNode, 0);
    fScore.set(startNode, this.calculateDistance(startNode, endNode, graph, false));

    while (openSet.length > 0) {
      // Sort by fScore
      openSet.sort((a, b) => (fScore.get(a[0]) || Infinity) - (fScore.get(b[0]) || Infinity));
      const current = openSet.shift()![0];

      if (current === endNode) {
        return this.reconstructPath(cameFrom, current);
      }

      const currentNode = graph.getNode(current);
      if (!currentNode) continue;

      for (const neighbor of currentNode.edges) {
        const tentativeGScore = (gScore.get(current) || Infinity) + this.calculateDistance(current, neighbor, graph, true);
        if (tentativeGScore < (gScore.get(neighbor) || Infinity)) {
          cameFrom.set(neighbor, current);
          gScore.set(neighbor, tentativeGScore);
          fScore.set(neighbor, tentativeGScore + this.calculateDistance(neighbor, endNode, graph, false));

          if (!openSet.some(([nodeId]) => nodeId === neighbor)) {
            openSet.push([neighbor, fScore.get(neighbor) || Infinity]);
          }
        }
      }
    }

    return []; // Return empty path if no path is found
  }

  /**
   * Calculates the distance between two nodes, optionally applying extra weight for vertical movement.
   * @param {string} nodeAId - The ID of the first node.
   * @param {string} nodeBId - The ID of the second node.
   * @param {Graph} graph - The graph containing the nodes.
   * @param {boolean} weightStairs - Whether to apply extra weight for vertical movement.
   * @return {number} - The calculated distance.
   */
  private calculateDistance(nodeAId: string, nodeBId: string, graph: Graph, weightStairs: boolean): number {
    const nodeA = graph.getNode(nodeAId);
    const nodeB = graph.getNode(nodeBId);
    if (!nodeA || !nodeB) return Infinity;

    const dx = Math.abs(nodeA.xCoord - nodeB.xCoord);
    const dy = Math.abs(nodeA.yCoord - nodeB.yCoord);
    const dz = Math.abs(nodeA.getFloorNumber() - nodeB.getFloorNumber());

    // Apply extra weight for vertical movement if specified
    const stairWeight = weightStairs ? 10 : 1;

    return dx + dy + (dz * stairWeight); // Manhattan distance with optional weighted floor difference
  }

  private reconstructPath(cameFrom: Map<string, string>, current: string): string[] {
    const totalPath = [current];
    while (cameFrom.has(current)) {
      current = cameFrom.get(current)!;
      totalPath.unshift(current);
    }
    return totalPath;
  }
}

//not yet implemented, dummy run function right now
export class DFSPathfindingStrategy implements PathfindingStrategy {
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
        const neighbors = graph.getNode(node)?.edges || [];

        neighbors.forEach(neighbor => {
          if (!visited.has(neighbor)) {
            stack.push([...path, neighbor]);
          }
        });
      }
    }

    return [];
  }
}

export class DijkstraPathfindingStrategy implements PathfindingStrategy {
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

    const openSet: Set<string> = new Set([startNode]);
    const cameFrom: Map<string, string> = new Map();
    const gScore: Map<string, number> = new Map([...graph.nodes.keys()].map(nodeId => [nodeId, Infinity]));
    gScore.set(startNode, 0);

    while (openSet.size > 0) {
      let current: string | undefined = undefined;
      let lowestFScore: number = Infinity;

      // Find the node in openSet with the lowest gScore
      openSet.forEach(nodeId => {
        const score = gScore.get(nodeId) || Infinity;
        if (score < lowestFScore) {
          current = nodeId;
          lowestFScore = score;
        }
      });

      if (current === endNode) {
        return this.reconstructPath(cameFrom, current);
      }

      openSet.delete(current!);

      const currentNode = graph.getNode(current!);
      if (!currentNode) continue;

      for (const neighbor of currentNode.edges) {
        // Tentative gScore is the distance from start to the neighbor through current
        const tentativeGScore = (gScore.get(current!) || Infinity) + this.distanceBetween(current!, neighbor, graph);

        if (tentativeGScore < (gScore.get(neighbor) || Infinity)) {
          // This path to neighbor is better than any previous one. Record it!
          cameFrom.set(neighbor, current!);
          gScore.set(neighbor, tentativeGScore);
          openSet.add(neighbor);
        }
      }
    }

    return []; // Return empty path if no path is found
  }

  private distanceBetween(nodeAId: string, nodeBId: string, graph: Graph): number {
    const nodeA = graph.getNode(nodeAId);
    const nodeB = graph.getNode(nodeBId);
    if (!nodeA || !nodeB) return Infinity;

    // Assuming direct distance is 1 for simplicity, adjust based on your graph's actual weights
    return 1;
  }

  private reconstructPath(cameFrom: Map<string, string>, current: string): string[] {
    const totalPath = [current];
    while (cameFrom.has(current)) {
      current = cameFrom.get(current)!;
      totalPath.unshift(current);
    }
    return totalPath;
  }
}