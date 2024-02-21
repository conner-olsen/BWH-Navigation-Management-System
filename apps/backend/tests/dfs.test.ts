import { expect, test } from "vitest";
import { Graph } from 'common/src/graph-structure.ts';
import { Node } from 'common/src/graph-structure.ts';
import {aStarPathfinding, dfsPathfinding} from "common/src/PathfindingMethod.ts";

/////////////////manual dfs testing:
const graph = new Graph();

// Add nodes and edges to the graph (similar to the example in graph-structure.ts)
// create nodes
const node1 = new Node("STAI1", 1, 1, "1", "1", "STAI", "1", "1");
const node2 = new Node("STAI2", 2, 2, "2", "2", "STAI", "2", "2");
const node3 = new Node("3", 3, 3, "3", "3", "3", "3", "3");
const node4 = new Node("4", 4, 3, "3", "3", "4", "4", "4");
const node5 = new Node("5", 4, 2, "3", "3", "STAI", "5", "5");


// add nodes to graph
graph.addNode(node1);
graph.addNode(node2);
graph.addNode(node3);
graph.addNode(node4);
graph.addNode(node5);

// add edges to graph
graph.addEdge("3", "STAI1");
graph.addEdge("STAI1", "STAI2");
graph.addEdge("3", "4");
graph.addEdge("4", "5");
graph.addEdge("STAI2", "5");


graph.setPathfindingMethod(new dfsPathfinding());

graph.setPathfindingMethod(new aStarPathfinding());

//test full graph
test("find path 1 5", () => {
  expect(graph.runPathfinding("STAI1", "5", true), ).toStrictEqual(["1", "3", "4", "5"]);
});

//test the same node
test("find path 1 1", () => {
  expect(graph.runPathfinding("1", "1", true)).toStrictEqual(["1"]);
});

//test backwards
test("find path 5 1", () => {
  expect(graph.runPathfinding("5", "1", true)).toStrictEqual(["5", "2", "1"]);
});

//test empty
test("find path nothing", () => {
  expect(graph.runPathfinding(" ", " ", true)).toStrictEqual([]);
});

//test non-existent nodes
test("find path 5 6", () => {
  expect(graph.bfs("5", "6")).toStrictEqual([]);
});

//test one non-existent node
test("find path 3 6", () => {
  expect(graph.bfs("3", "6")).toStrictEqual([]);
});
