import { Graph } from "common/src/graph-structure.ts";
import nodeCSVString from "./nodeCSVString.ts";
import edgeCSVString from "./edgeCSVString.ts";

/**
 * This is a graph populated directly from a string.
 * It is used for testing purposes only.
 */


const populatedGraph = new Graph();

populatedGraph.fromString(nodeCSVString, edgeCSVString);

export default populatedGraph;
