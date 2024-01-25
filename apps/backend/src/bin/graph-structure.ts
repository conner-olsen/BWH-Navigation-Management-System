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
  edges: Array<string>; // Set of edges IDs that this node is connected to

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
    this.edges = new Array<string>;
  }

  /**
   * Connect this node to another edge.
   * @param {string} nodeId - The ID of the node to connect to.
   */
  connectTo(edgeId: string) {
    this.edges.push(edgeId);
  }
}

/**
 * Class representing an Edge.
 */
class Edge {
  id: string;
  startNode: string;
  endNode: string;
  weigth: number;
  constructor(id: string, startNode: string, endNode: string, weight : number) {
    this.id = id;
    this.startNode = startNode;
    this.endNode = endNode;
    this.weigth = weight;
  }

}
/**
 * Class representing a Graph.
 */
class Graph {
  nodes: Map<string, Node>; // Map of node IDs to Node objects
  edges: Map<string, Edge>; // Map of edge IDs to Edge objects
  /**
   * Create a new Graph.
   */
  constructor() {
    this.nodes = new Map();
    this.edges = new Map();
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
   * @param {edge} Edge - the Edge that need to be added
   */
  addEdge(edge: Edge) {
    this.edges.set(edge.id, edge);
    this.getNode(edge.startNode)?.connectTo(edge.id);
    this.getNode(edge.endNode)?.connectTo(edge.id);
  }

  /**
   * Get a node from the graph.
   * @param {string} nodeId - The ID of the node to get.
   * @return {Node | undefined} The node with the given ID, or undefined if no such node exists.
   */
  getNode(nodeId: string): Node | undefined {
    return this.nodes.get(nodeId);
  }
}

//Example code
// Create some sample nodes
const nodeA = new Node("NodeA", 0, 0, "L1", "Building1", "TypeA", "LongNameA", "ShortNameA");
const nodeB = new Node("NodeB", 3, 4, "L1", "Building1", "TypeB", "LongNameB", "ShortNameB");
const nodeC = new Node("NodeC", 1, 7, "L1", "Building2", "TypeC", "LongNameC", "ShortNameC");

// Function to calculate Euclidean distance between two nodes
function calculateDistance(node1: Node, node2: Node): number {
  return Math.sqrt(Math.pow(node1.xCoord - node2.xCoord, 2) + Math.pow(node1.yCoord - node2.yCoord, 2));
}

// Create edges with calculated weights (distances)
const edgeAB = new Edge("EdgeAB", "NodeA", "NodeB", calculateDistance(nodeA, nodeB));
const edgeBC = new Edge("EdgeBC", "NodeB", "NodeC", calculateDistance(nodeB, nodeC));
const edgeCA = new Edge("EdgeCA", "NodeC", "NodeA", calculateDistance(nodeC, nodeA));

// Create a graph and add nodes and edges to it
const graph = new Graph();
graph.addNode(nodeA);
graph.addNode(nodeB);
graph.addNode(nodeC);

graph.addEdge(edgeAB);
graph.addEdge(edgeBC);
graph.addEdge(edgeCA);

      this.addEdge(startNode, endNode);
    }
  }

  /**
   * Finds the path from inputted startNode to endNode in given graph
   * @param {string} startNode - The ID of the starting node.
   * @param {string} endNode - The ID of the ending node.
   * @return {string[]} - array of NodeIDs of nodes in path
   */
  bfs(startNode: string, endNode: string): string[] {
    //add an error catcher for invalid inputs
    if (this.getNode(startNode) == undefined || this.getNode(endNode) == undefined) {
      console.log("Invalid location");
      return [];
    }

    //define needed objects
    //store lists of nodeID paths
    const queue: string[][] = [];

    //used for iterating through the loop
    let currentNode: Node | undefined;
    let currentNodeIDPath: string[];
    let newPath: string[];
    let neighbors: Set<string>;

    //put startNode path in the queue
    queue.push([startNode]);

    //start loop
    while (queue.length > 0) {
      //get first path from queue
      currentNodeIDPath = queue[0];

      //get last node
      if(currentNodeIDPath.length > 1) {
        currentNode = this.getNode(currentNodeIDPath[currentNodeIDPath.length - 1]);
      }
      else {
        currentNode = this.getNode(currentNodeIDPath[0]);
      }

      //if currentNode is undefined, pop path from queue
      if (currentNode == undefined) {
        queue.shift();
      }

      //elif it is the end node, return current path
      else if (currentNode.id == endNode) {
        return currentNodeIDPath;
      }

      //else, cast as currentNode as Node (determined above) and add neighbor to path for each
      else {
        neighbors = (currentNode as Node).edges;
        neighbors.forEach(function (item) {
          newPath = [...currentNodeIDPath];
          newPath.push(item);
          queue.push(newPath);
        });

        //pop current node ID path from queue
        queue.shift();

      }
    }

    //return empty if endNode not reached (probably should return something else)
    console.log("not reached");
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
}
