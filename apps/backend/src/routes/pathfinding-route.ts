import express, { Router, Request, Response } from "express";
import { Graph } from "common/src/graph.ts";
import PathFindingRequest from "common/src/interfaces/pathfinding-request.ts";
import client from "../bin/database-connection.ts";
import { AStarPathfindingStrategy, BFSPathfindingStrategy, DFSPathfindingStrategy, DijkstraPathfindingStrategy } from "common/src/pathfinding-strategy.ts";

const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const requestData: PathFindingRequest = req.body;
    const graph = new Graph();
    const startNode = requestData.startId;
    const endNode = requestData.endId;
    const strategy = requestData.strategy; 
    const accessibilityRoute = requestData.accessibilityRoute; 

    // Set the pathfinding strategy based on the request
    switch (strategy) {
      case "A*":
        graph.setPathfindingStrategy(new AStarPathfindingStrategy());
        break;
      case "BFS":
        graph.setPathfindingStrategy(new BFSPathfindingStrategy());
        break;
      case "DFS":
        graph.setPathfindingStrategy(new DFSPathfindingStrategy());
        break;
      case "Dijkstra":
        graph.setPathfindingStrategy(new DijkstraPathfindingStrategy());
        break;
      default:
        return res.status(400).json({ error: "Invalid pathfinding strategy specified." });
    }

    try {
      // Fetch nodes and edges from the database
      const nodes = await client.node.findMany();
      const edges = await client.edge.findMany();

      // Populate the graph with nodes and edges
      graph.populateGraph(nodes, edges);
    } catch (error) {
      console.error('Error fetching data from the database:', error);
      return res.status(500).json({ error: 'Error fetching data from the database' });
    }

    // Run pathfinding and convert to an array of nodes
    const path = graph.findPath(startNode, endNode, accessibilityRoute);
    res.status(200).json(graph.stringsToNodes(path));

  } catch (error) {
    console.error(`Error in pathfinding route: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
