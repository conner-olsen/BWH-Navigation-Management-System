import { expect, test } from "vitest";
import { Graph } from "../src/bin/graph-structure.ts";
import { Node } from "../src/bin/graph-structure.ts";
import path from "path";
import fs from "fs";
import {ROOT_DIR} from "../../../config.ts";

const nodePath = path.join(ROOT_DIR, "apps","backend","data", "csv", "L1Nodes.csv");
const edgePath = path.join(ROOT_DIR, "apps","backend","data", "csv", "L1Edges.csv");

//test stringsToNodes
test("string to nodes", () => {
  const graphCSV = new Graph();
  const startNodeCSV = "CCONF002L1";
  const endNodeCSV = "CHALL004L1";

  graphCSV.fromCSV(
    nodePath,
    edgePath,
  );

  console.log(graphCSV.stringsToNodes(graphCSV.bfs(startNodeCSV, endNodeCSV)));

  expect(graphCSV.stringsToNodes(graphCSV.bfs(startNodeCSV, endNodeCSV))).toStrictEqual
  ([graphCSV.getNode("CCONF002L1"), graphCSV.getNode("WELEV00HL1"), graphCSV.getNode("CHALL004L1") ]);
});

//If this fails, then the csv files are not being found
test("check if path exists", () => {
  expect(fs.existsSync(nodePath)).toBe(true);
  expect(fs.existsSync(edgePath)).toBe(true);
});


//test full graph
test("find path csv", () => {
  const graphCSV = new Graph();
  const startNodeCSV = "CCONF002L1";
  const endNodeCSV = "CHALL004L1";
  const answerCSV: string[] = ["CCONF002L1", "WELEV00HL1", "CHALL004L1"];

  graphCSV.fromCSV(
    nodePath,
    edgePath,
  );

  if (graphCSV.getNode(startNodeCSV) == undefined) {
    console.log("undefined");
  } else {
    console.log((graphCSV.getNode(startNodeCSV) as Node).id);
  }
  expect(graphCSV.bfs(startNodeCSV, endNodeCSV)).toStrictEqual(answerCSV);
});

test("invalid input", () => {
  const graphCSV = new Graph();
  const startNodeCSV = "CCON02L1";
  const endNodeCSV = "CHALL004L1";
  //const answerCSV: string[] = ["CCONF002L1", "WELEV00HL1", "CHALL004L1"];

  graphCSV.fromCSV(
    nodePath,
    edgePath,
  );

  if (graphCSV.getNode(startNodeCSV) == undefined) {
    console.log("undefined");
  } else {
    console.log((graphCSV.getNode(startNodeCSV) as Node).id);
  }
  expect(graphCSV.bfs(startNodeCSV, endNodeCSV)).toStrictEqual([]);
});

test("format bfs", () => {
  const graphCSV = new Graph();
  const startNodeCSV = "CCONF002L1";
  const endNodeCSV = "CHALL004L1";

  graphCSV.fromCSV(
    nodePath,
    edgePath,
  );

  if (graphCSV.getNode(startNodeCSV) == undefined) {
    console.log("undefined");
  } else {
    console.log(graphCSV.formatBFS(graphCSV.bfs(startNodeCSV, endNodeCSV)));
  }
  expect(graphCSV.formatBFS(graphCSV.bfs(startNodeCSV, endNodeCSV))).toStrictEqual
  (" CCONF002L1 -->  WELEV00HL1 -->  CHALL004L1");
});

