// import { Graph } from "common/src/graph.ts";
// import { Node } from "common/src/graph.ts";
// import fs from "fs";
// import {parseCSV} from "common/src/parser.ts";
// import path from "path";

describe("stub", () => {
  test("stub", () => {
    expect(1).toBe(1);
  });
});
// describe("Graph Class", () => {
//   const node1 = new Node(
//     "node1",
//     0,
//     10,
//     "Level 1",
//     "Building 1",
//     "Type 1",
//     "Node 1",
//     "N1",
//   );
//
//   const node2 = new Node(
//     "node2",
//     20,
//     0,
//     "Level 1",
//     "Building 1",
//     "Type 1",
//     "Node 2",
//     "N2",
//   );
//
//   test("should add nodes", () => {
//     const graph = new Graph();
//
//     graph.addNode(node1);
//
//     expect(graph.getNode(node1.id)).toBe(node1);
//   });
//
//   test("should add edge between two nodes", () => {
//     const graph = new Graph();
//
//     graph.addNode(node1);
//     graph.addNode(node2);
//
//     graph.addEdge(node1.id, node2.id);
//
//     expect(node1.edges.has(node2.id)).toBe(true);
//   });
//
//   test("should return undefined when getting non-existent node", () => {
//     const graph = new Graph();
//
//     graph.addNode(node1);
//
//     expect(graph.getNode("fakeid")).toBe(undefined);
//   });
//
//   test("no existent pathway", () => {
//     const graph = new Graph();
//
//     graph.addNode(node1);
//
//     expect(graph.getNode("fakeid")).toBe(undefined);
//   });
//
//   test("should populate graph from CSV files", () => {
//     const graph = new Graph();
//     // language=file-reference - Node csv file path
//     const nodePath = path.join(__dirname, "../data/csv/L1Nodes.csv");
//     // language=file-reference - Edge csv file path
//     const edgePath = path.join(__dirname, "../data/csv/L1Edges.csv");
//
//     graph.fromCSV(nodePath, edgePath);
//
//     // Check if nodes are added to the graph
//     const nodeData = fs.readFileSync(nodePath, "utf-8");
//     const nodeRows = parseCSV(nodeData);
//     for (const row of nodeRows) {
//       const nodeID = row["nodeID"];
//       expect(graph.getNode(nodeID)).not.toBe(undefined);
//     }
//
//     // Check if edges are added to the graph
//     const edgeData = fs.readFileSync(edgePath, "utf-8");
//     const edgeRows = parseCSV(edgeData);
//     for (const row of edgeRows) {
//       const startNode = row["startNode"];
//       const endNode = row["endNode"];
//       expect(graph.getNode(startNode)?.edges.has(endNode)).toBe(true);
//       expect(graph.getNode(endNode)?.edges.has(startNode)).toBe(true);
//     }
//   });
//
//   test("should execute bfs algorithm correctly", () => {
//     const graph = new Graph();
//
//     graph.addNode(node1);
//     graph.addNode(node2);
//
//     graph.addEdge(node1.id, node2.id);
//
//     expect(graph.bfs(node1.id, node2.id)).toEqual([node1.id, node2.id]);
//   });
// });
//
// describe("Node Class", () => {
//   // Test instance creation
//   const node = new Node(
//     "1",
//     100,
//     200,
//     "1st floor",
//     "Building A",
//     "type",
//     "Long Name",
//     "Short Name",
//   );
//
//   test("node should properly initialize", () => {
//     expect(node.id).toBe("1");
//     expect(node.xCoord).toBe(100);
//     expect(node.yCoord).toBe(200);
//     expect(node.floor).toBe("1st floor");
//     expect(node.building).toBe("Building A");
//     expect(node.nodeType).toBe("type");
//     expect(node.longName).toBe("Long Name");
//     expect(node.shortName).toBe("Short Name");
//   });
//
//   // Test connecting to another node
//   node.connectTo("2");
//
//   test("node should connect to another node", () => {
//     expect(node.edges.has("2")).toBeTruthy();
//   });
// });
