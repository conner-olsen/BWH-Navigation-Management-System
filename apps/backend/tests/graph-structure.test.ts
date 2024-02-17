import { test, expect, describe } from "vitest";
import { Graph } from "common/src/graph-structure.ts";
import { Node } from "common/src/graph-structure.ts";
import client from "../src/bin/database-connection.ts";

describe("Graph Class", () => {
  const node1 = new Node(
    "node1",
    0,
    10,
    "Level 1",
    "Building 1",
    "Type 1",
    "Node 1",
    "N1",
  );

  const node2 = new Node(
    "node2",
    20,
    0,
    "Level 1",
    "Building 1",
    "Type 1",
    "Node 2",
    "N2",
  );

  test("should add nodes", () => {
    const graph = new Graph();

    graph.addNode(node1);

    expect(graph.getNode(node1.id)).toBe(node1);
  });

  test("should add edge between two nodes", () => {
    const graph = new Graph();

    graph.addNode(node1);
    graph.addNode(node2);

    graph.addEdge(node1.id, node2.id);

    expect(node1.edges.has(node2.id)).toBe(true);
  });

  test("should return undefined when getting non-existent node", () => {
    const graph = new Graph();

    graph.addNode(node1);

    expect(graph.getNode("fakeid")).toBe(undefined);
  });

  test("no existent pathway", () => {
    const graph = new Graph();

    graph.addNode(node1);

    expect(graph.getNode("fakeid")).toBe(undefined);
  });

  test("should populate graph from database", async () => {
    const graph = new Graph();

    // Fetch nodes from the database
    const nodes = await client.node.findMany();

    // Fetch edges from the database
    const edges = await client.edge.findMany();

    // Populate the graph with nodes and edges
    graph.populateGraph(nodes, edges);

    // Check if nodes are added to the graph
    for (const node of nodes) {
      expect(graph.getNode(node.nodeId)).not.toBe(undefined);
    }

    // Check if edges are added to the graph
    for (const edge of edges) {
      const startNode = edge.startNodeID;
      const endNode = edge.endNodeID;
      expect(graph.getNode(startNode)?.edges.has(endNode)).toBe(true);
      expect(graph.getNode(endNode)?.edges.has(startNode)).toBe(true);
    }
  });

  test("should execute bfs algorithm correctly", () => {
    const graph = new Graph();

    graph.addNode(node1);
    graph.addNode(node2);

    graph.addEdge(node1.id, node2.id);

    expect(graph.bfs(node1.id, node2.id)).toEqual([node1.id, node2.id]);
  });
});

describe("Node Class", () => {
  // Test instance creation
  const node = new Node(
    "1",
    100,
    200,
    "1st floor",
    "Building A",
    "type",
    "Long Name",
    "Short Name",
  );

  test("node should properly initialize", () => {
    expect(node.id).toBe("1");
    expect(node.xCoord).toBe(100);
    expect(node.yCoord).toBe(200);
    expect(node.floor).toBe("1st floor");
    expect(node.building).toBe("Building A");
    expect(node.nodeType).toBe("type");
    expect(node.longName).toBe("Long Name");
    expect(node.shortName).toBe("Short Name");
  });

  // Test connecting to another node
  node.connectTo("2");

  test("node should connect to another node", () => {
    expect(node.edges.has("2")).toBeTruthy();
  });
});
