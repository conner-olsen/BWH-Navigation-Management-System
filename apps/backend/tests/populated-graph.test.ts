import { expect, test, describe } from "vitest";
import { Graph } from "common/src/graph-structure.ts";
import path from "path";
import fs from "fs";

// language=file-reference - Node csv file path
const nodePath = path.join(__dirname, "../data/csv/L1Nodes.csv");
// language=file-reference - Edge csv file path
const edgePath = path.join(__dirname, "../data/csv/L1Edges.csv");

describe("stub", () => {
  test("stub", () => {
    expect(1).toBe(1);
  });
});

//test stringsToNodes
test("string to nodes", async () => {
  const graph = new Graph();
  const startNode = "CCONF002L1";
  const endNode = "CHALL004L1";

  await graph.fromDB();

  expect(graph.stringsToNodes(graph.bfs(startNode, endNode))).toStrictEqual
  ([graph.getNode("CCONF002L1"), graph.getNode("WELEV00HL1"), graph.getNode("CHALL004L1") ]);
});

//If this fails, then the csv files are not being found
test("check if path exists", () => {
  expect(fs.existsSync(nodePath)).toBe(true);
  expect(fs.existsSync(edgePath)).toBe(true);
});


//test full graph
test("find path", async () => {
  const graph = new Graph();
  const startNode = "CCONF002L1";
  const endNode = "CHALL004L1";
  const correctPath: string[] = ["CCONF002L1", "WELEV00HL1", "CHALL004L1"];

  await graph.fromDB();

  const path = graph.bfs(startNode, endNode);
  expect(path).toStrictEqual(correctPath);
});

test("invalid input", async () => {
  const graph = new Graph();
  const startNode = "CCON02L1";
  const endNode = "CHALL004L1";

  await graph.fromDB();

  expect(graph.bfs(startNode, endNode)).toStrictEqual([]);
});

test("format bfs", async () => {
  const graph = new Graph();
  const startNode = "CCONF002L1";
  const endNode = "CHALL004L1";

  await graph.fromDB();

  expect(graph.formatBFS(graph.bfs(startNode, endNode))).toStrictEqual
  (" CCONF002L1 -->  WELEV00HL1 -->  CHALL004L1");
});

