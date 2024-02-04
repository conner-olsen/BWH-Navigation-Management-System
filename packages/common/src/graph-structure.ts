import fs from "fs";
import {CSVRow, parseCSV} from "./parser.ts";

/**
 * Class representing a Node.
 */
export class Node {
  id: string; // Unique identifier for the node
  xCoord: number; // X coordinate of the node
  yCoord: number; // Y coordinate of the node
  floor: string; // Floor where the node is located
  building: string; // Building where the node is located
  nodeType: string; // Type of the node
  longName: string; // Long name of the node
  shortName: string; // Short name of the node
  edges: Set<string>; // Set of node IDs that this node is connected to

  /**
   * Create a new Node.
   * @param {string} id - The unique identifier for the node.
   * @param {number} xCoord - The X coordinate of the node.
   * @param {number} yCoord - The Y coordinate of the node.
   * @param {string} floor - The floor where the node is located.
    * @param {string} building - The building where the node is located.
   * @param {string} nodeType - The type of the node.
   * @param {string} longName - The long name of the node.
   * @param {string} shortName - The short name of the node.
   */
  constructor(
    id: string,
    xCoord: number,
    yCoord: number,
    floor: string,
    building: string,
    nodeType: string,
    longName: string,
    shortName: string,
  ) {
    this.id = id;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.floor = floor;
    this.building = building;
    this.nodeType = nodeType;
    this.longName = longName;
    this.shortName = shortName;
    this.edges = new Set();
  }

  /**
   * Connect this node to another node.
   * @param {string} nodeId - The ID of the node to connect to.
   */
  connectTo(nodeId: string) {
    this.edges.add(nodeId);
  }

  hasEdge(nodeId: string): boolean {
    return this.edges.has(nodeId);
  }
}

/**
 * Class representing a Graph.
 */
export class Graph {
  nodes: Map<string, Node>; // Map of node IDs to Node objects

  /**
   * Create a new Graph.
   */
  constructor() {
    this.nodes = new Map();
  }

  /**
   * Add a node to the graph.
   * @param {Node} node - The node to add.
   */
  addNode(node: Node) {
    this.nodes.set(node.id, node);
  }

  /**
   * Add an edge between two nodes in the graph.
   * @param {string} nodeId1 - The ID of the first node.
   * @param {string} nodeId2 - The ID of the second node.
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
   * @param {string} nodeId - The ID of the node to get.
   * @return {Node | undefined} The node with the given ID, or undefined if no such node exists.
   */
  getNode(nodeId: string): Node | undefined {
    return this.nodes.get(nodeId);
  }

  /**
   * populates the graph from csv files
   * @param nodePath - path to nodeID csv file
   * @param edgePath - path to edgeID csv file
   */
  fromCSV(nodePath: string, edgePath: string) {
    // Read the CSV file as plain text
    const nodeCSVString = fs.readFileSync(nodePath, "utf8");
    const edgeCSVString = fs.readFileSync(edgePath, "utf8");
    this.fromString(nodeCSVString, edgeCSVString);
  }

  fromString(nodeCSVString: string, edgeCSVString: string) {
    // Specify the path to your CSV file
    let rows: CSVRow[];

    // Read the CSV file as plain text
    rows = parseCSV(nodeCSVString);
    // nodeID	xcoord	ycoord	floor	building	nodeType	longName	shortName
    for (const row of rows) {
      const nodeID = row["nodeID"];
      const xcoord = row["xcoord"];
      const ycoord = row["ycoord"];
      const floor = row["floor"];
      const building = row["building"];
      const nodeType = row["nodeType"];
      const longName = row["longName"];
      const shortName = row["shortName"];

      const node = new Node(
        nodeID,
        +xcoord,
        +ycoord,
        floor,
        building,
        nodeType,
        longName,
        shortName,
      );
      this.addNode(node);
    }

    // Populate edges
    rows = parseCSV(edgeCSVString);

    for (const row of rows) {
      const startNode = row["startNode"];
      const endNode = row["endNode"];

      this.addEdge(startNode, endNode);
    }
  }

  /**
   * Finds the path from inputted startNode to endNode in given graph
   * @param {string} startNode - The ID of the starting node.
   * @param {string} endNode - The ID of the ending node.
   * @return {string[]} - array of NodeIDs of nodes in path
   */

  bfsAstar(startNode: string, endNode: string): string[] {
    if (this.getNode(startNode) == undefined || this.getNode(endNode) == undefined) {
      return [];
    }

    const priorityQueue: [string[], number][] = []; // [path, f(n)] pairs
    const visited: Set<string> = new Set();

    const calculateManhattanDistance = (node1: Node, node2: Node): number => {
      return Math.abs(node1.xCoord - node2.xCoord) + Math.abs(node1.yCoord - node2.yCoord);
    };

    priorityQueue.push([[startNode], 0]);

    while (priorityQueue.length > 0) {
      const [currentNodeIDPath, gValue] = priorityQueue.shift()!;
      const currentNode = this.getNode(currentNodeIDPath[currentNodeIDPath.length - 1]);

      if (currentNode == undefined) {
        visited.add(currentNodeIDPath.join('-'));
        continue;
      }

      if (currentNode.id === endNode) {
        return currentNodeIDPath;
      }

      const neighbors = currentNode.edges;

      for (const neighborID of neighbors) {
        const neighbor = this.getNode(neighborID);
        if (neighbor == undefined || visited.has(neighbor.id)) {
          continue;
        }

        const hValue = calculateManhattanDistance(neighbor, this.getNode(endNode)!);
        const fValue = gValue + hValue;

        const newPath = [...currentNodeIDPath, neighbor.id];
        priorityQueue.push([newPath, fValue]);
      }

      priorityQueue.sort((a, b) => a[1] - b[1]);
      visited.add(currentNodeIDPath.join('-'));
    }

    return [];
  }


  formatBFS(array: string[]): string {
    let result: string = "";

    for (const item of array) {
      result = result + " " + item + " --> ";
    }
    result = result.substring(0, result.length - 5);
    return result;
  }

  stringsToNodes(arrayOfStrings: string[]): Node[] {
    const nodeArray: Node[] = [];
    for(const item of arrayOfStrings) {
      nodeArray.push((this.getNode(item) as Node));
    }
    
    return nodeArray;
  }
}
