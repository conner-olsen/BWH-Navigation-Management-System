import { Graph } from "./graph.ts";
import FastPriorityQueue from "fastpriorityqueue";

export abstract class PathfindingStrategy {
  abstract findPath(
    startNode: string,
    endNode: string,
    graph: Graph,
    accessibilityRoute: boolean,
  ): string[];

  reconstructPath(cameFrom: Map<string, string>, current: string): string[] {
    const totalPath = [current];
    while (cameFrom.has(current)) {
      current = cameFrom.get(current)!;
      totalPath.unshift(current);
    }
    return totalPath;
  }

  calculateDistance(
    nodeAId: string,
    nodeBId: string,
    graph: Graph,
    accessibilityRoute: boolean = false,
  ): number {
    const nodeA = graph.getNode(nodeAId);
    const nodeB = graph.getNode(nodeBId);
    if (!nodeA || !nodeB) return Infinity;

    const dx = Math.abs(nodeA.xCoord - nodeB.xCoord);
    const dy = Math.abs(nodeA.yCoord - nodeB.yCoord);
    const floorDifference = Math.abs(
      nodeA.getFloorNumber() - nodeB.getFloorNumber(),
    );

    // If accessibilityRoute is true and there's a floor change involving stairs, return Infinity
    if (
      accessibilityRoute &&
      floorDifference > 0 &&
      (nodeA.nodeType === "STAI" || nodeB.nodeType === "STAI")
    ) {
      return Infinity;
    }

    const baseCost = dx + dy;

    let floorChangeCost = 0;
    if (floorDifference > 0) {
      // Directly use the cached average distance
      const averageDistance = graph.getAverageDistance();

      // Define multipliers for stairs and elevators
      const stairMultiplier = 3; // stairs are 3 times harder than moving the same distance on flat ground
      const elevatorMultiplier = 1.5; // elevators are 1.5 times harder due to waiting time

      // Apply the appropriate multiplier based on the node type
      if (nodeA.nodeType === "STAI") {
        floorChangeCost = averageDistance * stairMultiplier * floorDifference;
      } else {
        floorChangeCost =
          averageDistance * floorDifference * elevatorMultiplier;
      }
    }

    const averageHeatIndex = graph.getAverageHeatIndex();
    let heatIndex = 1;
    heatIndex = nodeB.heatIndex;

    const heatIndexMultiplier = (heatIndex / averageHeatIndex) * 0.1;

    return baseCost + floorChangeCost + heatIndexMultiplier;
  }

  isAccessible(
    currentNodeId: string,
    neighborId: string,
    graph: Graph,
  ): boolean {
    const currentNode = graph.getNode(currentNodeId);
    const neighborNode = graph.getNode(neighborId);
    if (!currentNode || !neighborNode) return false;

    // Check if moving between these nodes involves a floor change via stairs
    if (
      currentNode.getFloorNumber() !== neighborNode.getFloorNumber() &&
      (currentNode.nodeType === "STAI" || neighborNode.nodeType === "STAI")
    ) {
      return false; // Not accessible if trying to change floors via stairs
    }

    return true; // Accessible otherwise
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
  findPath(
    startNode: string,
    endNode: string,
    graph: Graph,
    accessibilityRoute: boolean = false,
  ): string[] {
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
        if (
          !visited.has(neighbor) &&
          (!accessibilityRoute || this.isAccessible(node, neighbor, graph))
        ) {
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
  findPath(
    startNode: string,
    endNode: string,
    graph: Graph,
    accessibilityRoute: boolean = false,
  ): string[] {
    if (
      graph.getNode(startNode) === undefined ||
      graph.getNode(endNode) === undefined
    ) {
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
          if (
            !visited.has(neighbor) &&
            (!accessibilityRoute || this.isAccessible(node, neighbor, graph))
          ) {
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
  findPath(
    startNode: string,
    endNode: string,
    graph: Graph,
    accessibilityRoute: boolean = false,
  ): string[] {
    if (!graph.getNode(startNode) || !graph.getNode(endNode)) {
      return [];
    }

    const openSet = new FastPriorityQueue<[string, number]>(
      (a, b) => a[1] < b[1],
    );
    const cameFrom: Map<string, string> = new Map();
    const gScore: Map<string, number> = new Map(
      [...graph.nodes.keys()].map((nodeId) => [nodeId, Infinity]),
    );
    const fScore: Map<string, number> = new Map(
      [...graph.nodes.keys()].map((nodeId) => [nodeId, Infinity]),
    );
    const nodesInQueue = new Set<string>();

    gScore.set(startNode, 0);
    fScore.set(
      startNode,
      this.calculateDistance(startNode, endNode, graph, accessibilityRoute),
    );
    openSet.add([startNode, fScore.get(startNode) ?? Infinity]);
    nodesInQueue.add(startNode);

    while (!openSet.isEmpty()) {
      const currentPair = openSet.poll();
      if (!currentPair) break; // This should never happen if the queue is not empty, but it's good to guard against it.
      const current = currentPair[0];
      nodesInQueue.delete(current);

      if (current === endNode) {
        return this.reconstructPath(cameFrom, current);
      }

      const currentNode = graph.getNode(current);
      if (!currentNode) continue;

      for (const neighbor of currentNode.edges) {
        const tentativeGScore =
          (gScore.get(current) ?? Infinity) +
          this.calculateDistance(current, neighbor, graph, accessibilityRoute);
        if (tentativeGScore < (gScore.get(neighbor) ?? Infinity)) {
          cameFrom.set(neighbor, current);
          gScore.set(neighbor, tentativeGScore);
          fScore.set(
            neighbor,
            tentativeGScore +
              this.calculateDistance(
                neighbor,
                endNode,
                graph,
                accessibilityRoute,
              ),
          );

          if (!nodesInQueue.has(neighbor)) {
            openSet.add([neighbor, fScore.get(neighbor) ?? Infinity]);
            nodesInQueue.add(neighbor);
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
  findPath(
    startNode: string,
    endNode: string,
    graph: Graph,
    accessibilityRoute: boolean = false,
  ): string[] {
    if (!graph.getNode(startNode) || !graph.getNode(endNode)) {
      return [];
    }

    const comparator = (a: [string, number], b: [string, number]) =>
      a[1] < b[1];
    const priorityQueue = new FastPriorityQueue(comparator);
    const cameFrom: Map<string, string> = new Map();
    const costFromStart: Map<string, number> = new Map(
      [...graph.nodes.keys()].map((nodeId) => [nodeId, Infinity]),
    );
    const inQueue: Set<string> = new Set();

    costFromStart.set(startNode, 0);
    priorityQueue.add([startNode, 0]);
    inQueue.add(startNode);

    while (!priorityQueue.isEmpty()) {
      const [current] = priorityQueue.poll()!;
      inQueue.delete(current);

      if (current === endNode) {
        return this.reconstructPath(cameFrom, current);
      }

      const currentNode = graph.getNode(current);
      if (!currentNode) continue;

      for (const neighbor of currentNode.edges) {
        const tentativePathCost =
          (costFromStart.get(current) ?? Infinity) +
          this.calculateDistance(current, neighbor, graph, accessibilityRoute);

        if (tentativePathCost < (costFromStart.get(neighbor) ?? Infinity)) {
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
