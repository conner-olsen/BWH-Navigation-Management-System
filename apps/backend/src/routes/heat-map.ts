import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();


router.post("/", async (req: Request, res: Response) => {
  const path = req.body;
  try {
    for (const item of path) {
      const existingNodeVisit = await PrismaClient.nodeVisit.findFirst({
        where: { nodeId: item.id },
      });

      if (existingNodeVisit) {
        await PrismaClient.nodeVisit.update({
          where: { nodeId: existingNodeVisit.nodeId },
          data: { count: existingNodeVisit.count + 1 },
        });
      } else {
        await PrismaClient.nodeVisit.create({
          data: { nodeId: item.id, count: 1 },
        });
      }
    }
    const nodeCounts = await PrismaClient.nodeVisit.findMany();
    res.status(200).send(nodeCounts);
  } catch(error) {
    console.error('Error updating visited nodes:', error);
    return res.status(500).json({ error: 'Error fetching data from the database' });
  }

});

router.get("/", async (req: Request, res: Response) => {
  try {
    const nodeCounts = await PrismaClient.nodeVisit.findMany();
    res.status(200).send(nodeCounts);
  } catch(error) {
    console.error('Error fetching nodeVisits:', error);
    return res.status(500).json({ error: 'Error fetching data from the database' });
  }

});
export default router;
