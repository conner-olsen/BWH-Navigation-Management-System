import {Node, Graph} from "./graph-structure.ts";

export interface PathfindingMethod {
  route: string;
  runPathfinding(startNode: string, endNode: string, graph: Graph): string[];
  runPathfindingAccessible(startNode: string, endNode: string, graph: Graph): string[];
}

export class bfsPathfinding implements PathfindingMethod  {
  route = "/api/bfs-searching";

  /**
   * Finds the path from inputted startNode to endNode in given graph
   * @param {string} startNode - The ID of the starting node.
   * @param {string} endNode - The ID of the ending node.
   * @return {string[]} - array of NodeIDs of nodes in path
   */
  runPathfinding(startNode: string, endNode: string, graph: Graph): string[] {
    //add an error catcher for invalid inputs
    if (graph.getNode(startNode) == undefined || graph.getNode(endNode) == undefined) {
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
        currentNode = graph.getNode(currentNodeIDPath[currentNodeIDPath.length - 1]);
      }
      else {
        currentNode = graph.getNode(currentNodeIDPath[0]);
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
   * Finds the accessible path from inputted startNode to endNode in given graph
   * @param {string} startNode - The ID of the starting node.
   * @param {string} endNode - The ID of the ending node.
   * @return {string[]} - array of NodeIDs of nodes in path
   */
  runPathfindingAccessible(startNode: string, endNode: string, graph: Graph): string[] {
    //add an error catcher for invalid inputs
    if (graph.getNode(startNode) == undefined || graph.getNode(endNode) == undefined) {
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
        currentNode = graph.getNode(currentNodeIDPath[currentNodeIDPath.length - 1]);
      }
      else {
        currentNode = graph.getNode(currentNodeIDPath[0]);
      }

      //if currentNode is undefined or is a stair, pop path from queue
      if (currentNode == undefined || (currentNode.nodeType == "STAI" && currentNode.id != endNode)) {
        console.log("bfs skipped stair");
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
}

export class aStarPathfinding implements PathfindingMethod {
  route = "/api/bfsAstar-searching";
  /**
   * Finds the path from inputted startNode to endNode in given graph
   * @param {string} startNode - The ID of the starting node.
   * @param {string} endNode - The ID of the ending node.
   * @return {string[]} - array of NodeIDs of nodes in path
   */
  runPathfinding(startNode: string, endNode: string, graph: Graph): string[] {
    // if start or end is undefined, return empty array
    if (graph.getNode(startNode) == undefined || graph.getNode(endNode) == undefined) {
      return [];
    }

    // make queue with each element being a path + its value and then visited array
    const priorityQueue: [string[], number][] = []; // [path, f(n)] pairs
    const visited: string[][] = [];


    //gets number value of floor
   const getFloor = (floor: string): number => {
      if(floor == "L2") {
        return 1;
      }
      if(floor == "L1") {
        return 2;
      }
      if(floor == "1") {
        return 3;
      }
      if(floor == "2") {
        return 4;
      }
      if(floor == "3") {
        return 5;
      }
      return 0;
    };

    // calculate the Manhattan distance (not hypotenuse) from one node to another
    const calculateManhattanDistance = (node1: Node, node2: Node): number => {
      //if both nodes are stairs, add weight of difference between floors
      if((node1.nodeType == "STAI") && (node2.nodeType == "STAI")) {
        return Math.abs(getFloor(node1.floor) - getFloor(node2.floor));
      }

      //else, simply calculate the manhattan distance (elevators add no weight)
      return Math.abs(node1.xCoord - node2.xCoord) + Math.abs(node1.yCoord - node2.yCoord);
    };

    // add first path to queue
    priorityQueue.push([[startNode], 0]);

    while (priorityQueue.length > 0) {
      // get first queue element and set to the current path
      let [currentNodeIDPath, gValue] = priorityQueue.shift()!;

      // get last node in the current path and set to current
      const currentNode = graph.getNode(currentNodeIDPath[currentNodeIDPath.length - 1]);

      // if current node is undefined, add to visited
      if (currentNode == undefined) {
        visited.push(currentNodeIDPath);
        continue;
      }

      // if current node is the end node, return current path
      if (currentNode.id === endNode) {
     //   console.log("Reached end node:", currentNodeIDPath);
        return currentNodeIDPath;
      }

      const neighbors = currentNode.edges;

      // for each neighbor of the currentNode, find its fValue
      for (const neighborID of neighbors) {
        const neighbor = graph.getNode(neighborID);

        // if neighbor doesn't exist, continue to next neighbor
        if (neighbor == undefined) {
          continue;
        }

        //calculate fValue
        //distance from current node gValue + distance between neighbor and current
        const tempGValue = gValue + calculateManhattanDistance(currentNode, neighbor);

        //distance from neighbor to end
        const hValue = calculateManhattanDistance(neighbor, graph.getNode(endNode)!);

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
      //if the number in a is less than that in b, keep it in front by giving sort function a positive number
      priorityQueue.sort((a, b)  => a[1] > b[1] ? 1 : -1);
    //  console.log("Current priority queue:", priorityQueue);

      //add current path to visited
      visited.push(currentNodeIDPath);
    }

    return [];
  }


  /**
   * Finds accessible the path from inputted startNode to endNode in given graph
   * @param {string} startNode - The ID of the starting node.
   * @param {string} endNode - The ID of the ending node.
   * @return {string[]} - array of NodeIDs of nodes in path
   */
  runPathfindingAccessible(startNode: string, endNode: string, graph: Graph): string[] {
    // if start or end is undefined, return empty array
    if (graph.getNode(startNode) == undefined || graph.getNode(endNode) == undefined) {
      return [];
    }

    // make queue with each element being a path + its value and then visited array
    const priorityQueue: [string[], number][] = []; // [path, f(n)] pairs
    const visited: string[][] = [];


    //gets number value of floor
    const getFloor = (floor: string): number => {
      if(floor == "L2") {
        return 1;
      }
      if(floor == "L1") {
        return 2;
      }
      if(floor == "1") {
        return 3;
      }
      if(floor == "2") {
        return 4;
      }
      if(floor == "3") {
        return 5;
      }
      return 0;
    };

    // calculate the Manhattan distance (not hypotenuse) from one node to another
    const calculateManhattanDistance = (node1: Node, node2: Node): number => {
      //if both nodes are stairs, add weight of difference between floors
      if((node1.nodeType == "STAI") && (node2.nodeType == "STAI")) {
        return Math.abs(getFloor(node1.floor) - getFloor(node2.floor));
      }

      //else, simply calculate the manhattan distance (elevators add no weight)
      return Math.abs(node1.xCoord - node2.xCoord) + Math.abs(node1.yCoord - node2.yCoord);
    };

    // add first path to queue
    priorityQueue.push([[startNode], 0]);

    while (priorityQueue.length > 0) {
      // get first queue element and set to the current path
      let [currentNodeIDPath, gValue] = priorityQueue.shift()!;

      // get last node in the current path and set to current
      const currentNode = graph.getNode(currentNodeIDPath[currentNodeIDPath.length - 1]);

      // if current node is undefined or is a stair, add to visited
      if (currentNode == undefined || (currentNode.nodeType == "STAI" && currentNode.id != endNode)) {
        console.log("astar skipped stair");
        visited.push(currentNodeIDPath);
        continue;
      }

      // if current node is the end node, return current path
      if (currentNode.id === endNode) {
        //   console.log("Reached end node:", currentNodeIDPath);
        return currentNodeIDPath;
      }

      const neighbors = currentNode.edges;

      // for each neighbor of the currentNode, find its fValue
      for (const neighborID of neighbors) {
        const neighbor = graph.getNode(neighborID);

        // if neighbor doesn't exist, continue to next neighbor
        if (neighbor == undefined) {
          continue;
        }

        //calculate fValue
        //distance from current node gValue + distance between neighbor and current
        const tempGValue = gValue + calculateManhattanDistance(currentNode, neighbor);

        //distance from neighbor to end
        const hValue = calculateManhattanDistance(neighbor, graph.getNode(endNode)!);

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
      //if the number in a is less than that in b, keep it in front by giving sort function a positive number
      priorityQueue.sort((a, b)  => a[1] > b[1] ? 1 : -1);
      //  console.log("Current priority queue:", priorityQueue);

      //add current path to visited
      visited.push(currentNodeIDPath);
    }

    return [];
  }
}

//not yet implemented, dummy run function right now
export class dfsPathfinding implements PathfindingMethod {
  route = "/api/bfs-searching"; //change later when we have dfs route
  /**
   * Finds the path from inputted startNode to endNode in given graph
   * @param {string} startNode - The ID of the starting node.
   * @param {string} endNode - The ID of the ending node.
   * @return {string[]} - array of NodeIDs of nodes in path
   */
  runPathfinding(startNode: string, endNode: string, graph: Graph): string[] {
    //add an error catcher for invalid inputs
    if (graph.getNode(startNode) == undefined || graph.getNode(endNode) == undefined) {
      return [];
    }

    //define needed objects
    //store lists of nodeID paths
    const stack: string[][] = [];
    const visited: string[][] = [];

    //used for iterating through the loop
    let currentNode: Node | undefined;
    let currentNodeIDPath: string[];
    let newPath: string[];
    let neighbors: Set<string>;

    //put startNode path in the stack
    stack.unshift([startNode]);

    //start loop
    while (stack.length > 0) {
      //get first path from stack
      currentNodeIDPath = stack[0];

      //get last node
      if(currentNodeIDPath.length > 1) {
        currentNode = graph.getNode(currentNodeIDPath[currentNodeIDPath.length - 1]);
      }
      else {
        currentNode = graph.getNode(currentNodeIDPath[0]);
      }

      //if currentNode is undefined, pop path from stack
      if (currentNode == undefined) {
        stack.shift();
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

          //if path hasn't been visited and nodes aren't repeated, add to stack
          if(!(visited.includes(newPath)) && !(currentNodeIDPath.includes(item))) {
            stack.unshift(newPath);
          }
        });

        //pop current node ID path from stack
        stack.pop();
        visited.push(currentNodeIDPath);
      }
    }

    //return empty if endNode not reached (probably should return something else)
    // console.log("not reached");
    return [];
  }

  /**
   * Finds accessible the path from inputted startNode to endNode in given graph
   * @param {string} startNode - The ID of the starting node.
   * @param {string} endNode - The ID of the ending node.
   * @return {string[]} - array of NodeIDs of nodes in path
   */
  runPathfindingAccessible(startNode: string, endNode: string, graph: Graph): string[] {
    //add an error catcher for invalid inputs
    if (graph.getNode(startNode) == undefined || graph.getNode(endNode) == undefined) {
      return [];
    }

    //define needed objects
    //store lists of nodeID paths
    const stack: string[][] = [];
    const visited: string[][] = [];

    //used for iterating through the loop
    let currentNode: Node | undefined;
    let currentNodeIDPath: string[];
    let newPath: string[];
    let neighbors: Set<string>;

    //put startNode path in the stack
    stack.unshift([startNode]);

    //start loop
    while (stack.length > 0) {
      //get first path from stack
      currentNodeIDPath = stack[0];

      //get last node
      if(currentNodeIDPath.length > 1) {
        currentNode = graph.getNode(currentNodeIDPath[currentNodeIDPath.length - 1]);
      }
      else {
        currentNode = graph.getNode(currentNodeIDPath[0]);
      }

      //if currentNode is undefined or is a stair, pop path from stack
      if (currentNode == undefined || (currentNode.nodeType == "STAI" && currentNode.id != endNode)) {
        console.log("dfs skipped stair");
        stack.shift();
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

          //if path hasn't been visited and nodes aren't repeated, add to stack
          if(!(visited.includes(newPath)) && !(currentNodeIDPath.includes(item))) {
            stack.unshift(newPath);
          }
        });

        //pop current node ID path from stack
        stack.pop();
        visited.push(currentNodeIDPath);
      }
    }

    //return empty if endNode not reached (probably should return something else)
    // console.log("not reached");
    return [];
  }
}
