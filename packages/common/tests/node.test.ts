import { Node } from "../src/node";

describe("Node", () => {
  // Creating a new Node with valid parameters should set all properties correctly.
  test("should set all properties correctly when creating a new Node with valid parameters", () => {
    const node = new Node(
      "id",
      1,
      2,
      "L1",
      "Building",
      "Type",
      "Long Name",
      "Short Name",
    );

    expect(node.id).toBe("id");
    expect(node.xCoord).toBe(1);
    expect(node.yCoord).toBe(2);
    expect(node.floor).toBe("L1");
    expect(node.building).toBe("Building");
    expect(node.nodeType).toBe("Type");
    expect(node.longName).toBe("Long Name");
    expect(node.shortName).toBe("Short Name");
    expect(node.edges.size).toBe(0);
  });

  // Adding an edge to a Node should update the edges set correctly.
  test("should update the edges set correctly when adding an edge to a Node", () => {
    const node = new Node(
      "id",
      1,
      2,
      "L1",
      "Building",
      "Type",
      "Long Name",
      "Short Name",
    );
    node.connectTo("edgeId");

    expect(node.edges.size).toBe(1);
    expect(node.edges.has("edgeId")).toBe(true);
  });

  // Checking if a Node has an edge to another Node should return true if the edge exists and false otherwise.
  test("should return true if the Node has an edge to another Node and false otherwise when checking for an edge", () => {
    const node = new Node(
      "id",
      1,
      2,
      "L1",
      "Building",
      "Type",
      "Long Name",
      "Short Name",
    );
    node.connectTo("edgeId");

    expect(node.hasEdge("edgeId")).toBe(true);
    expect(node.hasEdge("invalidEdgeId")).toBe(false);
  });

  // Checking if a Node has an edge to an invalid Node ID should return false.
  test("should return false when checking if a Node has an edge to an invalid Node ID", () => {
    const node = new Node(
      "id",
      1,
      2,
      "L1",
      "Building",
      "Type",
      "Long Name",
      "Short Name",
    );
    node.connectTo("edgeId");

    expect(node.hasEdge("")).toBe(false);
    expect(node.hasEdge("invalidEdgeId")).toBe(false);
  });

  // Converting a valid floor string to a numeric value should return the correct value.
  test("should return the correct numeric value when converting a valid floor string", () => {
    const node = new Node(
      "1",
      0,
      0,
      "L2",
      "Building A",
      "Type A",
      "Long Name",
      "Short Name",
    );
    expect(node.getFloorNumber()).toBe(1);
  });

  // Converting an invalid floor string to a numeric value should return 0.
  test("should return 0 when converting an invalid floor string to a numeric value", () => {
    const node = new Node(
      "1",
      0,
      0,
      "invalid",
      "Building A",
      "Type A",
      "Long Name",
      "Short Name",
    );
    expect(node.getFloorNumber()).toBe(0);
  });

  test("should update the edges set correctly when adding an edge to a Node", () => {
    const node = new Node(
      "id",
      1,
      2,
      "L1",
      "Building",
      "Type",
      "Long Name",
      "Short Name",
    );
    node.connectTo("edgeId");

    expect(node.edges.size).toBe(1);
    expect(node.edges.has("edgeId")).toBe(true);
  });

  test("should return true if the Node has an edge to another Node and false otherwise when checking for an edge", () => {
    const node = new Node(
      "id",
      1,
      2,
      "L1",
      "Building",
      "Type",
      "Long Name",
      "Short Name",
    );
    node.connectTo("edgeId");

    expect(node.hasEdge("edgeId")).toBe(true);
    expect(node.hasEdge("invalidEdgeId")).toBe(false);
  });

  test("should update the edges set correctly when adding multiple edges to a Node", () => {
    const node = new Node(
      "id",
      1,
      2,
      "L1",
      "Building",
      "Type",
      "Long Name",
      "Short Name",
    );
    node.connectTo("edgeId1");
    node.connectTo("edgeId2");

    expect(node.edges.size).toBe(2);
    expect(node.edges.has("edgeId1")).toBe(true);
    expect(node.edges.has("edgeId2")).toBe(true);
  });

  test("should return true if the Node has an edge to another Node and false otherwise when checking for an edge", () => {
    const node = new Node(
      "id",
      1,
      2,
      "L1",
      "Building",
      "Type",
      "Long Name",
      "Short Name",
    );
    node.connectTo("edgeId");

    expect(node.hasEdge("edgeId")).toBe(true);
    expect(node.hasEdge("invalidEdgeId")).toBe(false);
  });

  test("should update the edges set correctly when adding an edge to a Node", () => {
    const node = new Node(
      "id",
      1,
      2,
      "L1",
      "Building",
      "Type",
      "Long Name",
      "Short Name",
    );
    node.connectTo("edgeId");

    expect(node.edges.size).toBe(1);
    expect(node.edges.has("edgeId")).toBe(true);
  });
});
