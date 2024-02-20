import { expect, test, describe } from "vitest";
// import { Graph } from "common/src/graph-structure.ts";
// import path from "path";
// import fs from "fs";

describe("stub", () => {
  test("stub", () => {
    expect(1).toBe(1);
  });
});

// // language=file-reference - Node csv file path
// const nodePath = path.join(__dirname, "../data/csv/L1Nodes.csv");
// // language=file-reference - Edge csv file path
// const edgePath = path.join(__dirname, "../data/csv/L1Edges.csv");
//
// //test stringsToNodes
// test("string to nodes", () => {
//   const graphCSV = new Graph();
//   const startNodeCSV = "CCONF002L1";
//   const endNodeCSV = "CHALL004L1";
//
//   graphCSV.fromCSV(
//     nodePath,
//     edgePath,
//   );
//
//   expect(graphCSV.stringsToNodes(graphCSV.bfs(startNodeCSV, endNodeCSV))).toStrictEqual
//   ([graphCSV.getNode("CCONF002L1"), graphCSV.getNode("WELEV00HL1"), graphCSV.getNode("CHALL004L1") ]);
// });
//
// //If this fails, then the csv files are not being found
// test("check if path exists", () => {
//   expect(fs.existsSync(nodePath)).toBe(true);
//   expect(fs.existsSync(edgePath)).toBe(true);
// });
//
//
// //test full graph
// test("find path csv", () => {
//   const graphCSV = new Graph();
//   const startNodeCSV = "CCONF002L1";
//   const endNodeCSV = "CHALL004L1";
//   const correctPath: string[] = ["CCONF002L1", "WELEV00HL1", "CHALL004L1"];
//
//   graphCSV.fromCSV(
//     nodePath,
//     edgePath,
//   );
//
//   expect(graphCSV.bfs(startNodeCSV, endNodeCSV)).toStrictEqual(correctPath);
// });
//
// test("invalid input", () => {
//   const graphCSV = new Graph();
//   const startNodeCSV = "CCON02L1";
//   const endNodeCSV = "CHALL004L1";
//
//   graphCSV.fromCSV(
//     nodePath,
//     edgePath,
//   );
//
//   expect(graphCSV.bfs(startNodeCSV, endNodeCSV)).toStrictEqual([]);
// });
//
// test("format bfs", () => {
//   const graphCSV = new Graph();
//   const startNodeCSV = "CCONF002L1";
//   const endNodeCSV = "CHALL004L1";
//
//   graphCSV.fromCSV(
//     nodePath,
//     edgePath,
//   );
//
//   expect(graphCSV.formatBFS(graphCSV.bfs(startNodeCSV, endNodeCSV))).toStrictEqual
//   (" CCONF002L1 -->  WELEV00HL1 -->  CHALL004L1");
// });
//
