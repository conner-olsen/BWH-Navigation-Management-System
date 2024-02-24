import { Graph } from "../src/graph.ts";
// import nodeCSVString from "./nodeCSVString.ts";
// import edgeCSVString from "./edgeCSVString.ts";

/**
 * This is a graph populated directly from a string.
 * It is used for testing purposes only.
 */


const populatedGraph = new Graph();

populatedGraph.fromDB();

export default populatedGraph;
