import pGraph from "../populatedGraph.ts";
import { expect, test } from "vitest";

const populatedGraph = pGraph;

test('Non-existent node should not be in the graph', () => {
  expect(populatedGraph.nodes.has("NON_EXISTENT_NODE")).toBe(false);
});

test('Non-existent edge should not be in the graph', () => {
  let hasNonExistentEdge = false;
  populatedGraph.nodes.forEach(node => {
    if (node.edges.has("NON_EXISTENT_EDGE")) {
      hasNonExistentEdge = true;
    }
  });
  expect(hasNonExistentEdge).toBe(false);
});
