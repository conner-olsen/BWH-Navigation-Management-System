import express, {Router, Request, Response} from "express";
import { parseCSV} from "common/src/parser.ts";
import PrismaClient from "../bin/database-connection.ts";
import {edge} from "common/interfaces/interfaces.ts";




const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const dataType: { [key: string]: string } = {};
  try {
    // This is created with the idea that the front end
    // stores each individual csv with

    Object.keys(req.body).forEach(key => {
      const csv = req.body[key];
      if (csv.includes("nodeID")) {
        dataType["node"] = csv;
      } else if (csv.includes("edgeID")) {
        dataType["edge"] = csv;
      } else if (csv.includes("username")) {
        dataType["employee"] = csv;
      }
    });


      const rows = parseCSV(dataType["edge"]);
      const transformed:edge[] = rows.map((row) => {
        const rowval = Object.values(row);
        return {
          edgeID:rowval[0],
          startNodeID:rowval[1],
          endNodeID:rowval[2]
        };
      });

      await PrismaClient.edge.createMany({data:transformed.map((self) => {
          return {
            startNodeID:self.startNodeID,
            edgeID:self.edgeID,
            endNodeID:self.endNodeID
          };}
        )
      });





  } catch (error) {
    console.error(`Error while converting CSV to JSON: ${error}`);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});
