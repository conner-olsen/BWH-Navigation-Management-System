import { PathfindingStrategy } from "./pathfinding-strategy.ts";
import { Node } from "./node.ts";
import { node, edge } from "../interfaces/interfaces.ts";
import { AStarPathfindingStrategy } from "./pathfinding-strategy.ts";

/**
 * Class representing a Graph.
 */
export class Graph {
  nodes: Map<string, Node>; // Map of node IDs to Node objects
  private pathfindingStrategy: PathfindingStrategy;

  /**
   * Create a new Graph, optionally with a custom pathfinding strategy.
   * @param pathfindingStrategy The pathfinding strategy to use. Defaults to A* if not provided.
   */
  constructor(pathfindingStrategy?: PathfindingStrategy) {
    this.nodes = new Map();
    this.pathfindingStrategy = pathfindingStrategy || new AStarPathfindingStrategy();
  }

  /**
   * Set the pathfinding strategy.
   * @param pathfindingStrategy The pathfinding strategy to use.
   */
  setPathfindingStrategy(pathfindingStrategy: PathfindingStrategy) {
    this.pathfindingStrategy = pathfindingStrategy;
  }

  /**
   * Run the pathfinding algorithm specified by the current strategy.
   * @param startNode The ID of the start node.
   * @param endNode The ID of the end node.
   * @returns An array of node IDs representing the path from start to end.
   */
  runPathfinding(startNode: string, endNode: string): string[] {
    return this.pathfindingStrategy.findPath(startNode, endNode, this);
  }

  /**
   * Add a node to the graph.
   * @param node The node to add.
   */
  addNode(node: Node) {
    this.nodes.set(node.id, node);
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
}
