import { expect, test } from "vitest";
import { Graph } from '../src/bin/graph-structure.ts';
import { Node } from '../src/bin/graph-structure.ts';

function sum(a: number, b: number) {
  return a + b;
}
test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

///csv bfs testing:
const graphCSV = new Graph();
graphCSV.fromCSV("apps/backend/src/csvData/L1Nodes.csv", "apps/backend/src/csvData/L1Edges.csv");

const startNodeCSV = 'CCONF001L1';
const endNodeCSV = 'CCONF002L1';
const pathCSV = graphCSV.bfs(startNodeCSV, endNodeCSV);
const answerCSV: string[] = ["CCONF001L1", "CCONF002L1"];
console.log(pathCSV);

//test full graph
test("find path csv", () => {
  graphCSV.fromCSV("apps/backend/src/csvData/L1Nodes.csv", "apps/backend/src/csvData/L1Edges.csv");

  if(graphCSV.getNode(startNodeCSV) == undefined) {
    console.log("undefined");
  }
  else {
    console.log((graphCSV.getNode(startNodeCSV) as Node).id);
  }
  expect(graph.bfs(startNodeCSV, endNodeCSV)).toStrictEqual(answerCSV);
});

/////////////////manual bfs testing:
const graph = new Graph();

// Add nodes and edges to the graph (similar to the example in graph-structure.ts)
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

const startNode = '1';
const endNode = '3';
const path = graph.bfs(startNode, endNode);
const answer: string[] = ["1", "2", "3"];
console.log(path);

//test full graph
test("find path 1 2 3", () => {
  expect(graph.bfs(startNode, endNode)).toStrictEqual(answer);
});

//test same node
test("find path 1 1", () => {
  expect(graph.bfs("1", "1")).toStrictEqual(["1"]);
});

//test backwards
test("find path 3 2", () => {
  expect(graph.bfs("3", "2")).toStrictEqual(["3", "2"]);
});

//test empty
test("find path nothing", () => {
  expect(graph.bfs(" ", " ")).toStrictEqual([]);
});

//test non-existent nodes
test("find path 5 6", () => {
  expect(graph.bfs("5", "6")).toStrictEqual([]);
});

//test one non-existent node
test("find path 3 6", () => {
  expect(graph.bfs("3", "6")).toStrictEqual([]);
});
