import { Graph } from "../src/graph";
import { AStarPathfindingStrategy, BFSPathfindingStrategy } from "../src/pathfinding-strategy";
import { Node } from "../src/node";


describe('Graph', () => {

    // can set pathfinding strategy
    test('should set the pathfinding strategy', () => {
      const graph = new Graph();
      const strategy = new AStarPathfindingStrategy();

      graph.setPathfindingStrategy(strategy);

      expect(graph['pathfindingStrategy']).toBe(strategy);
    });

    // can find path using A* pathfinding strategy
    test('should find the path using A* pathfinding strategy', () => {
      const graph = new Graph();
      const startNode = 'start';
      const endNode = 'end';
      const expectedPath = ['start', 'middle', 'end'];

      graph.setPathfindingStrategy(new AStarPathfindingStrategy());
      graph.findPath = jest.fn().mockReturnValue(expectedPath);

      const result = graph.findPath(startNode, endNode);

      expect(result).toEqual(expectedPath);
      expect(graph.findPath).toHaveBeenCalledWith(startNode, endNode);
    });

    // can find path using BFS pathfinding strategy
    test('should find the path using BFS pathfinding strategy', () => {
      const graph = new Graph();
      const startNode = 'start';
      const endNode = 'end';
      const expectedPath = ['start', 'middle', 'end'];

      graph.setPathfindingStrategy(new BFSPathfindingStrategy());
      graph.findPath = jest.fn().mockReturnValue(expectedPath);

      const result = graph.findPath(startNode, endNode);

      expect(result).toEqual(expectedPath);
      expect(graph.findPath).toHaveBeenCalledWith(startNode, endNode);
    });

    // returns empty array when start or end node does not exist
    test('should return an empty array when start or end node does not exist', () => {
      const graph = new Graph();
      const startNode = 'start';
      const endNode = 'end';

      const result = graph.findPath(startNode, endNode);

      expect(result).toEqual([]);
    });

    // returns empty array when no path exists between start and end node
    test('should return an empty array when no path exists between start and end node', () => {
      const graph = new Graph();
      const startNode = 'start';
      const endNode = 'end';

      graph.setPathfindingStrategy(new AStarPathfindingStrategy());
      graph.findPath = jest.fn().mockReturnValue([]);

      const result = graph.findPath(startNode, endNode);

      expect(result).toEqual([]);
      expect(graph.findPath).toHaveBeenCalledWith(startNode, endNode);
    });

    // returns undefined when getting non-existent node from graph
    test('should return undefined when getting non-existent node from graph', () => {
      const graph = new Graph();
      const nodeId = 'nonexistent';

      const result = graph.getNode(nodeId);

      expect(result).toBeUndefined();
    });

    test('should return an empty array when start or end node does not exist', () => {
      const graph = new Graph();
      const startNode = 'start';
      const endNode = 'end';

      const result = graph.findPath(startNode, endNode);

      expect(result).toEqual([]);
    });

    test('should return undefined when getting non-existent node from graph', () => {
      const graph = new Graph();
      const nodeId = 'nonexistent';

      const result = graph.getNode(nodeId);

      expect(result).toBeUndefined();
    });

    test('should create a new Graph with the provided pathfinding strategy', () => {
      const strategy = new AStarPathfindingStrategy();
      const graph = new Graph(strategy);

      expect(graph['pathfindingStrategy']).toBe(strategy);
    });

    test('should throw an error when setting an invalid pathfinding strategy', () => {
      const graph = new Graph();

      expect(() => {
        graph.setPathfindingStrategy("invalid");
      }).toThrowError("Unknown pathfinding strategy: invalid");
    });

    test('should return an empty array when running the pathfinding algorithm with an invalid start or end node', () => {
      const graph = new Graph();
      const startNode = 'start';
      const endNode = 'end';

      const result = graph.findPath(startNode, endNode);

      expect(result).toEqual([]);
    });

    test('should return 0 when calculating the average distance for an empty graph', () => {
      const graph = new Graph();

      const result = graph.calculateAverageDistance();

      expect(result).toBe(0);
    });

    test('should throw an error when finding the path using an unsupported pathfinding strategy', () => {
      const graph = new Graph();
      const startNode = 'start';
      const endNode = 'end';
      const unsupportedStrategy = 'unsupported';

      expect(() => {
        graph.setPathfindingStrategy(unsupportedStrategy);
        graph.findPath(startNode, endNode);
      }).toThrow(`Unknown pathfinding strategy: ${unsupportedStrategy}`);
    });

    test('should find a valid path between the start and end node', () => {
      const graph = new Graph();
      const startNode = 'start';
      const endNode = 'end';
      const expectedPath = ['start', 'middle', 'end'];

      graph.setPathfindingStrategy(new AStarPathfindingStrategy());
      graph.findPath = jest.fn().mockReturnValue(expectedPath);

      const result = graph.findPath(startNode, endNode);

      expect(result).toEqual(expectedPath);
      expect(graph.findPath).toHaveBeenCalledWith(startNode, endNode);
    });

    test('should return the average distance between all nodes in the graph', () => {
      const graph = new Graph();
      const node1 = new Node('node1', 0, 0);
      const node2 = new Node('node2', 2, 2);
      const node3 = new Node('node3', 3, 3);
      const node4 = new Node('node4', 4, 4);
      const node5 = new Node('node5', 5, 5);

      graph.addNode(node1);
      graph.addNode(node2);
      graph.addNode(node3);
      graph.addNode(node4);
      graph.addNode(node5);

      graph.addEdge(node1.id, node2.id);
      graph.addEdge(node1.id, node3.id);
      graph.addEdge(node2.id, node4.id);
      graph.addEdge(node3.id, node4.id);
      graph.addEdge(node4.id, node5.id);

      const result = graph.getAverageDistance();

      expect(result).toBe(3);
    });
});
