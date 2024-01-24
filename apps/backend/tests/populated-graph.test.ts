import { expect, test } from "vitest";
import { Graph } from "../src/bin/graph-structure.ts";
import { Node } from "../src/bin/graph-structure.ts";
import path from "path";
import fs from "fs";

const nodePath = path.resolve("data", "csv", "L1Nodes.csv");
const edgePath = path.resolve("data", "csv", "L1Edges.csv");


//If this fails, then the csv files are not being found
test("check if path exists", () => {
  expect(fs.existsSync(nodePath)).toBe(true);
  expect(fs.existsSync(edgePath)).toBe(true);
});


//test full graph
test("find path csv", () => {
  const graphCSV = new Graph();
  const startNodeCSV = "CCONF002L1";
  const endNodeCSV = "WELEV00HL1";
  const answerCSV: string[] = ["CCONF001L1", "WELEV00HL1"];

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

