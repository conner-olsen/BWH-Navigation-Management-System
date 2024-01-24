import fs from "fs";

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

  fromCSV(nodePath: string, edgePath: string) {
    // Specify the path to your CSV file
    let rows: any;
    // Read the CSV file as plain text
    fs.readFile(nodePath, "utf-8", (err, nodeData) => {
      if (err) {
        console.error("Error reading the file:", err);
      } else {
        // Print the content of the CSV file
        console.log("CSV Content:", nodeData);
        rows = parseCSV(nodeData);
      }
    });

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
        xcoord,
        ycoord,
        floor,
        building,
        nodeType,
        longName,
        shortName,
      );

      this.addNode(node);
    }

    // Populate edges
    fs.readFile(edgePath, "utf-8", (err, edgeData) => {
      if (err) {
        console.error("Error reading the file:", err);
      } else {
        // Print the content of the CSV file
        console.log("CSV Content:", edgeData);
        rows = parseCSV(edgeData);
      }
    });

    for (const row of rows) {
      const startNode = row["startNode"];
      const endNode = row["endNode"];

      this.addEdge(startNode, endNode);
    }
  }

  bfs(startNode: string, endNode: string): string[] {
    //add a error catcher -->

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
    while (queue.length > 0) {
      //get first item from queue
      currentNodeID = queue[0];
      currentNode = this.getNode(currentNodeID);

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

    //return empty if endNode not reached (probably should return something else)
    return [];
  }
}

// Example usage
// create graph
const graph = new Graph();

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

// get node from graph
console.log(graph.getNode("1"));
console.log(graph.getNode("2"));

// Output
// Node {
//   id: '1',
//   xCoord: 1,
//   yCoord: 1,
//   floor: '1',
//   building: '1',
//   nodeType: '1',
//   longName: '1',
//   shortName: '1',
//   edges: Set { '2', '3' } }
// Node {
//   id: '2',
//   xCoord: 2,
//   yCoord: 2,
//   floor: '2',
//   building: '2',
//   nodeType: '2',
//   longName: '2',
//   shortName: '2',
//   edges: Set { '1', '3' } }
