import { Graph } from 'src/graph.ts';
import {bfsPathfinding} from "common/src/PathfindingMethod.ts";
import {Node} from "src/node.ts";

/////////////////manual bfs testing:
const graph = new Graph();

// Add nodes and edges to the graph (similar to the example in graph.ts)
// create nodes
const node1 = new Node("1", 1, 1, "1", "1", "1", "1", "1");
const node2 = new Node("2", 2, 2, "2", "2", "2", "2", "2");
const node3 = new Node("3", 3, 3, "3", "3", "3", "3", "3");
const node4 = new Node("4", 4, 3, "3", "3", "4", "4", "4");
// add nodes to graph
graph.addNode(node1);
graph.addNode(node2);
graph.addNode(node3);
graph.addNode(node4);


// add edges to graph
graph.addEdge("1", "2");
graph.addEdge("2", "3");
graph.addEdge("3", "1");

const startNode = '1';
const endNode = '3';
const answer: string[] = ["1", "3"];

graph.setPathfindingMethod(new bfsPathfinding());

//test full graph
test("find path 1 4", () => {
  expect(graph.runPathfinding("1", "4")).toStrictEqual([]);
});
test("find path 1 2 3", () => {
  expect(graph.runPathfinding(startNode, endNode)).toStrictEqual(answer);
});

//test the same node
test("find path 1 1", () => {
  expect(graph.runPathfinding("1", "1")).toStrictEqual(["1"]);
});

//test backwards
test("find path 3 2", () => {
  expect(graph.runPathfinding("3", "2")).toStrictEqual(["3", "2"]);
});

//test empty
test("find path nothing", () => {
  expect(graph.runPathfinding(" ", " ")).toStrictEqual([]);
});

//test non-existent nodes
test("find path 5 6", () => {
  expect(graph.bfs("5", "6")).toStrictEqual([]);
});

//test one non-existent node
test("find path 3 6", () => {
  expect(graph.bfs("3", "6")).toStrictEqual([]);
});
