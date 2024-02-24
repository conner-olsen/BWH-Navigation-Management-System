import {aStarPathfinding, bfsPathfinding, dfsPathfinding, PathfindingMethod} from "./PathfindingMethod.ts";
import {edge, node} from "../interfaces/interfaces.ts";
import {Node} from "./node.ts";


/**
 * Class representing a Graph.
 */
export class Graph {
  nodes: Map<string, Node>; // Map of node IDs to Node objects
  private pathfindingMethod: PathfindingMethod;

  /**
   * Create a new Graph.
   */
  constructor() {
    this.nodes = new Map();
    this.pathfindingMethod = new aStarPathfinding();
  }

  /**
   * change the pathfinding method
   * @param pathfindingMethod method to change to (bfs, Astar, dfs)
   */
  setPathfindingMethod(pathfindingMethod: PathfindingMethod) {
    this.pathfindingMethod = pathfindingMethod;
  }

  /**
   * change the pathfinding method to partner of inputted route
   * @param pathfindingMethod string name of method to change to (bfs, Astar, dfs)
   */
  setPathfindingMethodStringRoute(pathfindingMethod: string) {
    if(pathfindingMethod == "/api/bfs-searching"){
      this.pathfindingMethod = new bfsPathfinding();
    }
    else if (pathfindingMethod == "/api/bfsAstar-searching") {
      this.pathfindingMethod = new aStarPathfinding();
    }
    else if (pathfindingMethod == "dummy") {
      this.pathfindingMethod = new dfsPathfinding();
    }
  }

  /**
   * run the pathfinding algorithm specified by the current field
   * @param startNode
   * @param endNode
   */
  runPathfinding(startNode: string, endNode: string): string[] {
    return this.pathfindingMethod.runPathfinding(startNode, endNode, this);
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

  async fromDB() {
    // temp
  }

  public populateGraph(nodes: node[], edges: edge[]) {
    // Check if nodes is iterable
    if (!Array.isArray(nodes)) {
      console.error("populateGraph was called with a non-iterable nodes parameter.");
      return; // Exit the method early or throw an error
    }
    
    // Clear existing nodes and edges
    this.nodes.clear();

    // Populate nodes
    for (const node of nodes) {
      const newNode = new Node(
        node.nodeId,
        node.xcoord,
        node.ycoord,
        node.floor,
        node.building,
        node.nodeType,
        node.longName,
        node.shortName,
      );
      this.addNode(newNode);
    }

    // Populate edges
    for (const edge of edges) {
      this.addEdge(edge.startNodeID, edge.endNodeID);
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
      return [];
    }

    //define needed objects
    //store lists of nodeID paths
    const queue: string[][] = [];
    const visited: string[][] = [];

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
        visited.push(currentNodeIDPath);
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

          //if path hasn't been visited and nodes aren't repeated, add to queue
          if(!(visited.includes(newPath)) && !(currentNodeIDPath.includes(item))) {
            queue.push(newPath);
          }
        });

        //pop current node ID path from queue
        queue.shift();
        visited.push(currentNodeIDPath);
      }
    }

    //return empty if endNode not reached (probably should return something else)
   // console.log("not reached");
    return [];
  }

  /**
   * Finds the path from inputted startNode to endNode in given graph
   * @param {string} startNode - The ID of the starting node.
   * @param {string} endNode - The ID of the ending node.
   * @return {string[]} - array of NodeIDs of nodes in path
   */

  bfsAstar(startNode: string, endNode: string): string[] {
    // if start or end is undefined, return empty array
    if (this.getNode(startNode) == undefined || this.getNode(endNode) == undefined) {
      return [];
    }

    // make queue with each element being a path + its value and then visited array
    const priorityQueue: [string[], number][] = []; // [path, f(n)] pairs
    const visited: string[][] = [];

    // calculate the Manhattan distance (not hypotenuse) from one node to another
    const calculateManhattanDistance = (node1: Node, node2: Node): number => {
      return Math.abs(node1.xCoord - node2.xCoord) + Math.abs(node1.yCoord - node2.yCoord);
    };

    // add first path to queue
    priorityQueue.push([[startNode], 0]);

    while (priorityQueue.length > 0) {
      // get first queue element and set to the current path
      const [currentNodeIDPath, gValue] = priorityQueue.shift()!;

      // get last node in the current path and set to current
      const currentNode = this.getNode(currentNodeIDPath[currentNodeIDPath.length - 1]);

      // if current node is undefined, add to visited
      if (currentNode == undefined) {
        visited.push(currentNodeIDPath);
        continue;
      }

      // if current node is the end node, return current path
      if (currentNode.id === endNode) {
       // console.log("Reached end node:", currentNodeIDPath);
        return currentNodeIDPath;
      }

      const neighbors = currentNode.edges;

      // for each neighbor of the currentNode, find its fValue
      for (const neighborID of neighbors) {
        const neighbor = this.getNode(neighborID);

        // if neighbor doesn't exist, continue to next neighbor
        if (neighbor == undefined) {
          continue;
        }

        //calculate fValue
        //distance from current node gValue + distance between neighbor and current
        const tempGValue = gValue + calculateManhattanDistance(currentNode, neighbor);

        //distance from neighbor to end
        const hValue = calculateManhattanDistance(neighbor, this.getNode(endNode)!);

        //sum together
        const fValue = tempGValue + hValue;

        // add neighbor to path
        const newPath = [...currentNodeIDPath, neighbor.id];

        //if path hasn't been visited and nodes aren't repeated, add to queue
        if(!(visited.includes(newPath)) && !(currentNodeIDPath.includes(neighbor.id))) {
          priorityQueue.push([newPath, fValue]);
        }
      }

      //put node with current lowest f/"cost" at the front of the queue by sorting
      //if the number in a is less than that in b, keep it in front of giving sort function a positive number
      priorityQueue.sort((a, b)  => a[1] > b[1] ? 1 : -1);
     // console.log("Current priority queue:", priorityQueue);

      //add current path to visited
      visited.push(currentNodeIDPath);
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

  nodesToString(arrayOfNodes: Node[]): string[] {
    const stringArray: string[] = [];
    for(const item of arrayOfNodes) {
      stringArray.push((item.id));
    }

    return stringArray;
  }
}
