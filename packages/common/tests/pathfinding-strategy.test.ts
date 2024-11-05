import {
  AStarPathfindingStrategy,
  BFSPathfindingStrategy,
  DFSPathfindingStrategy,
  DijkstraPathfindingStrategy,
  PathfindingStrategy,
} from "../src/pathfinding-strategy";
import { Graph } from "../src/graph";
import { Node } from "../src/node";

class PathfindingStrategyTest extends PathfindingStrategy {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findPath(startNode: string, endNode: string, graph: Graph): string[] {
    // Dummy implementation for testing purposes
    return [startNode, endNode];
  }
}

describe("PathfindingStrategy", () => {
  let testGraph: Graph;

  beforeAll(() => {
    // Initialize a new Graph with the default pathfinding strategy
    testGraph = new Graph();

    // Nodes to be added to the graph
    const nodes = [
      new Node("A", 0, 0, "L1", "Building 1", "NODE_TYPE_A", "Node A", "A"),
      new Node("B", 1, 1, "L1", "Building 1", "NODE_TYPE_B", "Node B", "B"),
      new Node("C", 2, 2, "L1", "Building 1", "NODE_TYPE_C", "Node C", "C"),
      new Node("D", 3, 3, "L1", "Building 1", "NODE_TYPE_D", "Node D", "D"),
      new Node("E", 4, 4, "L1", "Building 1", "NODE_TYPE_E", "Node E", "E"),
    ];

    // Add nodes to the graph
    nodes.forEach((node) => testGraph.addNode(node));

    // Add edges to the graph
    testGraph.addEdge("A", "B");
    testGraph.addEdge("B", "C");
    testGraph.addEdge("C", "D");
    testGraph.addEdge("D", "E");
    testGraph.addEdge("A", "E"); // Direct connection between A and E for testing shortest path
  });

  // Can find a path between two nodes in a graph using A* algorithm
  test("should find a path between two nodes in a graph using A* algorithm", () => {
    const pathfindingStrategy = new AStarPathfindingStrategy();
    const result = pathfindingStrategy.findPath("A", "C", testGraph);

    expect(result).toEqual(["A", "B", "C"]);
  });

  // Can find a path between two nodes in a graph using BFS algorithm
  test("should find a path between two nodes in a graph using BFS algorithm", () => {
    const graph = new Graph();
    // Mock the getNode method
    graph.getNode = jest.fn().mockImplementation((nodeId: string) => {
      return {
        id: nodeId,
        edges: ["B", "C"],
      };
    });

    const pathfindingStrategy = new BFSPathfindingStrategy();
    const result = pathfindingStrategy.findPath("A", "C", graph);

    expect(result).toEqual(["A", "C"]);
  });

  // Can find a path between two nodes in a graph using DFS algorithm
  test("should find a path between two nodes in a graph using DFS algorithm", () => {
    const graph = new Graph();
    // Mock the getNode method
    graph.getNode = jest.fn().mockImplementation((nodeId: string) => {
      return {
        id: nodeId,
        edges: ["B", "C"],
      };
    });

    const pathfindingStrategy = new DFSPathfindingStrategy();
    const result = pathfindingStrategy.findPath("A", "C", graph);

    expect(result).toEqual(["A", "C"]);
  });

  // Returns an empty array when startNode or endNode is not in the graph
  test("should return an empty array when startNode is not in the graph", () => {
    const graph = new Graph();
    const pathfindingStrategy = new AStarPathfindingStrategy();
    const result = pathfindingStrategy.findPath("A", "C", graph);

    expect(result).toEqual([]);
  });

  // Returns Infinity when either nodeA or nodeB is not in the graph
  test("should return Infinity when nodeA is not in the graph", () => {
    const graph = new Graph();
    const pathfindingStrategy = new AStarPathfindingStrategy();
    const result = pathfindingStrategy.calculateDistance("A", "B", graph);

    expect(result).toBe(Infinity);
  });

  // Returns an empty array when no path is found between startNode and endNode
  test("should return an empty array when no path is found between startNode and endNode", () => {
    const graph = new Graph();
    // Mock the getNode method
    graph.getNode = jest.fn().mockImplementation((nodeId: string) => {
      return {
        id: nodeId,
        edges: [],
        getFloorNumber: jest.fn(),
      };
    });

    const pathfindingStrategy = new AStarPathfindingStrategy();
    const result = pathfindingStrategy.findPath("A", "C", graph);

    expect(result).toEqual([]);
  });

  // Can find a path between two nodes in a graph using Dijkstra algorithm
  test("should find a path between two nodes using Dijkstra algorithm", () => {
    // Create a mock graph
    const graph = new Graph();
    const node1 = new Node(
      "1",
      0,
      0,
      "L1",
      "Building A",
      "NODE",
      "Node 1",
      "N1",
    );
    const node2 = new Node(
      "2",
      1,
      0,
      "L1",
      "Building A",
      "NODE",
      "Node 2",
      "N2",
    );
    const node3 = new Node(
      "3",
      2,
      0,
      "L1",
      "Building A",
      "NODE",
      "Node 3",
      "N3",
    );
    const node4 = new Node(
      "4",
      3,
      0,
      "L1",
      "Building A",
      "NODE",
      "Node 4",
      "N4",
    );
    const node5 = new Node(
      "5",
      4,
      0,
      "L1",
      "Building A",
      "NODE",
      "Node 5",
      "N5",
    );
    graph.addNode(node1);
    graph.addNode(node2);
    graph.addNode(node3);
    graph.addNode(node4);
    graph.addNode(node5);
    graph.addEdge("1", "2");
    graph.addEdge("2", "3");
    graph.addEdge("3", "4");
    graph.addEdge("4", "5");

    // Create an instance of DijkstraPathfindingStrategy
    const pathfindingStrategy = new DijkstraPathfindingStrategy();

    // Find the path between node1 and node5
    const path = pathfindingStrategy.findPath("1", "5", graph);

    // Assert the path is correct
    expect(path).toEqual(["1", "2", "3", "4", "5"]);
  });

  // Can calculate the distance between two nodes in a graph
  test("should calculate the distance between two nodes in a graph", () => {
    // Create a mock graph
    const graph = new Graph();
    const nodeA = new Node(
      "A",
      0,
      0,
      "L1",
      "Building A",
      "NODE_TYPE_A",
      "Long Name A",
      "Short Name A",
    );
    const nodeB = new Node(
      "B",
      3,
      4,
      "L1",
      "Building B",
      "NODE_TYPE_B",
      "Long Name B",
      "Short Name B",
    );
    graph.addNode(nodeA);
    graph.addNode(nodeB);
    graph.addEdge("A", "B");

    // Create an instance of PathfindingStrategy
    const pathfindingStrategy = new PathfindingStrategyTest();

    // Calculate the distance between nodeA and nodeB
    const distance = pathfindingStrategy.calculateDistance("A", "B", graph);

    // Assert the distance is correct with a tolerance of +/- 1
    expect(distance).toBeCloseTo(7, 0);
  });

  // Can reconstruct a path given a map of nodes and a current node
  test("should reconstruct the path correctly when given a map of nodes and a current node", () => {
    // Create a mock graph with nodes and edges
    const graph = new Graph();
    const nodeA = new Node("A", 0, 0);
    const nodeB = new Node("B", 1, 1);
    const nodeC = new Node("C", 2, 2);
    const nodeD = new Node("D", 3, 3);
    graph.addNode(nodeA);
    graph.addNode(nodeB);
    graph.addNode(nodeC);
    graph.addNode(nodeD);
    graph.addEdge("A", "B");
    graph.addEdge("B", "C");
    graph.addEdge("C", "D");

    // Create a mock cameFrom map
    const cameFrom = new Map<string, string>();
    cameFrom.set("B", "A");
    cameFrom.set("C", "B");
    cameFrom.set("D", "C");

    // Create a mock current node
    const current = "D";

    const pathfindingStrategy = new PathfindingStrategyTest();

    // Call the reconstructPath method
    const path = pathfindingStrategy.reconstructPath(cameFrom, current);

    // Assert the reconstructed path is correct
    expect(path).toEqual(["A", "B", "C", "D"]);
  });

  // Handles graphs with no nodes or edges
  test("should return an empty array when finding a path in a graph with no nodes or edges", () => {
    const graph = new Graph();
    const strategy = new AStarPathfindingStrategy();

    const startNode = "A";
    const endNode = "B";

    const result = strategy.findPath(startNode, endNode, graph);

    expect(result).toEqual([]);
  });

  // Calculates the distance between two nodes on different floors using the cached average distance
  test("should calculate the distance between two nodes on different floors using the cached average distance", () => {
    // Mock graph
    const graph = new Graph();
    const nodeA = new Node(
      "A",
      0,
      0,
      "L1",
      "Building A",
      "NODE_TYPE",
      "Long Name A",
      "Short Name A",
    );
    const nodeB = new Node(
      "B",
      5,
      5,
      "L2",
      "Building B",
      "NODE_TYPE",
      "Long Name B",
      "Short Name B",
    );
    graph.addNode(nodeA);
    graph.addNode(nodeB);
    graph.addEdge("A", "B");

    // Mock average distance
    const averageDistance = 10;
    graph.getAverageDistance = jest.fn().mockReturnValue(averageDistance);

    // Create pathfinding strategy instance
    const pathfindingStrategy = new PathfindingStrategyTest();

    // Calculate distance
    const distance = pathfindingStrategy.calculateDistance("A", "B", graph);

    // Verify the result with a tolerance of +/- 1
    const expectedDistance =
      Math.abs(nodeA.xCoord - nodeB.xCoord) +
      Math.abs(nodeA.yCoord - nodeB.yCoord) +
      averageDistance * 1.5;
    expect(distance).toBeCloseTo(expectedDistance, 0);
  });

  // Applies the appropriate multiplier based on the node type when calculating the cost of changing floors
  test("should apply the appropriate multiplier based on the node type when calculating the cost of changing floors", () => {
    // Create a mock graph with nodes and edges
    const graph = new Graph();
    const nodeA = new Node(
      "A",
      0,
      0,
      "L1",
      "Building A",
      "STAI",
      "Long Name A",
      "Short Name A",
    );
    const nodeB = new Node(
      "B",
      1,
      0,
      "L2",
      "Building B",
      "STAI",
      "Long Name B",
      "Short Name B",
    );
    graph.addNode(nodeA);
    graph.addNode(nodeB);
    graph.addEdge("A", "B");

    // Create a mock pathfinding strategy
    const pathfindingStrategy = new PathfindingStrategyTest();

    // Calculate the distance between the nodes using the pathfinding strategy
    const distance = pathfindingStrategy.calculateDistance("A", "B", graph);

    const averageDistance = graph.getAverageDistance();
    const expectedDistance =
      Math.abs(nodeA.xCoord - nodeB.xCoord) +
      Math.abs(nodeA.yCoord - nodeB.yCoord) +
      averageDistance * 3;

    // Assert that the distance is calculated correctly based on the node types with a tolerance of +/- 1
    expect(distance).toBeCloseTo(expectedDistance, 0);
  });
});
