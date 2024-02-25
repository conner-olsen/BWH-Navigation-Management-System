/**
 * Class representing a Node.
 */
export class Node {
  readonly id: string; // Unique identifier for the node
  readonly xCoord: number; // X coordinate of the node
  readonly yCoord: number; // Y coordinate of the node
  readonly floor: string; // Floor where the node is located
  readonly building: string; // Building where the node is located
  readonly nodeType: string; // Type of the node
  readonly longName: string; // Long name of the node
  readonly shortName: string; // Short name of the node
  private _edges: Set<string>; // Set of node IDs that this node is connected to
  

  /**
   * Create a new Node.
   * @param {string} id - The unique identifier for the node.
   * @param {number} xCoord - The X coordinate of the node.
   * @param {number} yCoord - The Y coordinate of the node.
   * @param {string} floor - The floor where the node is located.
   * @param {string} building - The building where the node is located.
   * @param {string} nodeType - The type of the node.
   * @param {string} longName - The long name of the node.
   * @param {string} shortName - The short name of the node.
   */
  constructor(
    id: string,
    xCoord: number,
    yCoord: number,
    floor: string,
    building: string,
    nodeType: string,
    longName: string,
    shortName: string,
  ) {
    this.id = id;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.floor = floor;
    this.building = building;
    this.nodeType = nodeType;
    this.longName = longName;
    this.shortName = shortName;
    this._edges = new Set();
  }

  /**
   * Getter for the edges connected to this node.
   * @return {Set<string>} - A set of node IDs representing the edges.
   */
  get edges(): Set<string> {
    return this._edges;
  }

  /**
   * Setter for the edges connected to this node.
   * @param {Set<string>} value - A set of node IDs to connect.
   */
  set edges(value: Set<string>) {
    this._edges = value;
  }

  /**
   * Connect this node to another node by adding an edge.
   * @param {string} nodeId - The ID of the node to connect to.
   */
  connectTo(nodeId: string) {
    this._edges.add(nodeId);
  }

  /**
   * Check if this node has an edge to another node.
   * @param {string} nodeId - The ID of the node to check for.
   * @return {boolean} - True if the node has an edge to the other node, false otherwise.
   */
  hasEdge(nodeId: string): boolean {
    return this._edges.has(nodeId);
  }

  /**
   * Converts the string floor to a numeric value.
   * @param {string} floor - The floor to convert.
   * @return {number} - The numeric value of the floor.
   */
  getFloorNumber(): number {
    switch (this.floor) {
      case "L2": return 1;
      case "L1": return 2;
      case "1": return 3;
      case "2": return 4;
      case "3": return 5;
      default: return 0;
    }
  }
}
