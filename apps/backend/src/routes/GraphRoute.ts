import express from "express";
import client from "../bin/database-connection.ts";
import {Graph} from "common/src/graph-structure.ts";

const router = express.Router();

router.get("/",async (req,res) => {
  const graph = new Graph();

  try {
    // Fetch nodes from the database
    const nodes = await client.node.findMany();

    // Fetch edges from the database
    const edges = await client.edge.findMany();

    // Populate the graph with nodes and edges
    graph.populateGraph(nodes, edges);
    res.status(200).json({nodes:nodes,edges:edges});
  } catch (error) {
    console.error('Error fetching data from the database:', error);
  }
});

export default router;
