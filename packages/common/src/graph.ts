import { PathfindingStrategy, AStarPathfindingStrategy, BFSPathfindingStrategy, DFSPathfindingStrategy, DijkstraPathfindingStrategy } from "./pathfinding-strategy.ts";
import { Node } from "./node.ts";
import { node, edge } from "./interfaces/interfaces.ts";

/**
 * Class representing a Graph.
 */
export class Graph {
  nodes: Map<string, Node>; // Map of node IDs to Node objects
  private pathfindingStrategy: PathfindingStrategy;
  private averageDistance: number | null = null; // Store the average distance
  private averageHeatIndex: number = 1;

  /**
   * Create a new Graph, optionally with a custom pathfinding strategy.
   * @param pathfindingStrategy The pathfinding strategy to use. Defaults to A* if not provided.
   */
  constructor(pathfindingStrategy?: PathfindingStrategy) {
    this.nodes = new Map();
    this.pathfindingStrategy = pathfindingStrategy ?? new AStarPathfindingStrategy();
    // Initialize averageDistance to null to indicate it needs to be calculated
  }

  /**
   * Set the pathfinding strategy.
   * @param pathfindingStrategy The pathfinding strategy to use. Can be an instance of PathfindingStrategy or a string representing the strategy.
   */
  setPathfindingStrategy(pathfindingStrategy: PathfindingStrategy | string) {
    if (typeof pathfindingStrategy === "string") {
      switch (pathfindingStrategy.toUpperCase()) {
        case "A*":
          this.pathfindingStrategy = new AStarPathfindingStrategy();
          break;
        case "BFS":
          this.pathfindingStrategy = new BFSPathfindingStrategy();
          break;
        case "DFS":
          this.pathfindingStrategy = new DFSPathfindingStrategy();
          break;
        case "DIJKSTRA":
          this.pathfindingStrategy = new DijkstraPathfindingStrategy();
          break;
        default:
          throw new Error(`Unknown pathfinding strategy: ${pathfindingStrategy}`);
      }
    } else {
      this.pathfindingStrategy = pathfindingStrategy;
    }
  }


  /**
   * Run the pathfinding algorithm specified by the current strategy.
   * @param startNode The ID of the start node.
   * @param endNode The ID of the end node.
   * @returns An array of node IDs representing the path from start to end.
   */
  findPath(startNode: string, endNode: string, accessibilityRoute: boolean = false): string[] {
    return this.pathfindingStrategy.findPath(startNode, endNode, this, accessibilityRoute);
  }

  /**
   * Add a node to the graph.
   * @param node The node to add.
   */
  addNode(node: Node) {
    this.nodes.set(node.id, node);
    this.averageDistance = null; // Invalidate the cached average distance
  }

  /**
   * Add an edge between two nodes in the graph.
   * @param nodeId1 The ID of the first node.
   * @param nodeId2 The ID of the second node.
   */
  addEdge(nodeId1: string, nodeId2: string) {
    const node1 = this.nodes.get(nodeId1);
    const node2 = this.nodes.get(nodeId2);

    if (node1 && node2) {
      node1.connectTo(nodeId2);
      node2.connectTo(nodeId1);
    }
    this.averageDistance = null; // Invalidate the cached average distance
  }

  /**
   * Get a node from the graph.
   * @param nodeId The ID of the node to get.
   * @return The node with the given ID, or undefined if no such node exists.
   */
  getNode(nodeId: string): Node | undefined {
    return this.nodes.get(nodeId);
  }

  /**
   * Populates the graph with nodes and edges.
   * @param nodes Array of node data.
   * @param edges Array of edge data.
   */
  populateGraph(nodes: node[], edges: edge[]) {
    this.nodes.clear();

    nodes.forEach(nodeData => {
      const newNode = new Node(
        nodeData.nodeId,
        nodeData.xcoord,
        nodeData.ycoord,
        nodeData.floor,
        nodeData.building,
        nodeData.nodeType,
        nodeData.longName,
        nodeData.shortName,
      );
      this.addNode(newNode);
    });

    edges.forEach(edgeData => {
      this.addEdge(edgeData.startNodeID, edgeData.endNodeID);
    });
  }

  /**
   * Formats a path for display.
   * @param path Array of node IDs representing the path.
   * @return A formatted string representing the path.
   */
  formatPath(path: string[]): string {
    return path.join(" --> ");
  }

  /**
   * Converts an array of node IDs to an array of Node objects.
   * @param arrayOfStrings Array of node IDs.
   * @return Array of Node objects.
   */
  stringsToNodes(arrayOfStrings: string[]): Node[] {
    return arrayOfStrings.map(id => this.getNode(id)).filter(node => node !== undefined) as Node[];
  }

  /**
   * Converts an array of Node objects to an array of node IDs.
   * @param arrayOfNodes Array of Node objects.
   * @return Array of node IDs.
   */
  nodesToString(arrayOfNodes: Node[]): string[] {
    return arrayOfNodes.map(node => node.id);
  }

  /**
   * Calculate or retrieve the cached average distance between nodes in the graph.
   * @returns The average distance between nodes in the graph.
   */
  getAverageDistance(): number {
    if (this.averageDistance === null) {
      // Calculate the average distance only if it hasn't been calculated or if the graph has changed
      this.averageDistance = this.calculateAverageDistance();
    }
    return this.averageDistance;
  }

  /**
   * Calculate the average distance between nodes in the graph.
   * @returns The average distance between nodes in the graph.
   */
  calculateAverageDistance(): number {
    let totalDistance = 0;
    let edgeCount = 0;
  
    this.nodes.forEach((node) => {
      node.edges.forEach(neighborId => {
        const neighbor = this.getNode(neighborId);
        if (neighbor) {
          const dx = Math.abs(node.xCoord - neighbor.xCoord);
          const dy = Math.abs(node.yCoord - neighbor.yCoord);
          totalDistance += Math.sqrt(dx * dx + dy * dy);
          edgeCount++;
        }
      });
    });
  
    return edgeCount > 0 ? Math.round(totalDistance / edgeCount) : 0;
  }

  setAverageHeatIndex(heatIndex: number) {
    this.averageHeatIndex = heatIndex;
  }

  getAverageHeatIndex(): number {
    return this.averageHeatIndex;
  }
}
