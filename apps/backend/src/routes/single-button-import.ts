import express, {Router, Request, Response} from "express";
import { parseCSV} from "common/src/parser.ts";
import PrismaClient from "../bin/database-connection.ts";
import {edge, employee, node, user} from "common/interfaces/interfaces.ts";
import client from "../bin/database-connection.ts";




const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const dataType: { [key: string]: string } = {};
  try {
    // This is created with the idea that the front end
    // stores each individual csv with

    Object.keys(req.body).forEach(key => {
      const csv = req.body[key];
      if (csv.includes("nodeId")) {
        dataType["node"] = csv;
      } else if (csv.includes("edgeID")) {
        dataType["edge"] = csv;
      } else if (csv.includes("username")) {
        dataType["employee"] = csv;
      }
    });


    const rowsNode = parseCSV(dataType["node"]);
    const transformedNode:node[] = rowsNode.map((row) => {
      const rowval = Object.values(row);
      return {
        nodeId:rowval[0],
        xcoord:parseInt(rowval[1]),
        ycoord:parseInt(rowval[2]),
        floor:rowval[3],
        building:rowval[4],
        nodeType:rowval[5],
        longName:rowval[6],
        shortName:rowval[7]
      };
    });

    await PrismaClient.node.createMany({data:transformedNode.map((self) => {
        return {
          nodeId:self.nodeId,
          xcoord:self.xcoord,
          ycoord:self.ycoord,
          floor:self.floor,
          building:self.building,
          nodeType:self.nodeType,
          longName:self.longName,
          shortName:self.shortName
        };}
      )
    });

      const rowsEdge = parseCSV(dataType["edge"]);
      const transformed:edge[] = rowsEdge.map((rowEdge) => {
        const rowval = Object.values(rowEdge);
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


      const rowsEmp = parseCSV(dataType["employee"]);


      const transformedUser:user[] = rowsEmp.map((rowsEmp) => {
        const rowval = Object.values(rowsEmp);
        return {
          Username:rowval[0]
        };
    });


    const transformedEmp:employee[] = rowsEmp.map((rowsEmp) => {
      const rowval = Object.values(rowsEmp);
      return {
        username:rowval[0],
        firstName:rowval[1],
        lastName:rowval[2],
        email:rowval[3]
      };
    });

    await client.user.createMany({data:transformedUser.map((self) => {
        return {
          Username: self.Username
        };}
      )
    });


    await client.employee.createMany({data:transformedEmp.map((self) => {
        return {
          username: self.username,
          firstName: self.firstName,
          lastName: self.lastName,
          email: self.email
        };}
      )
    });





  } catch (error) {
    console.error(`Error while converting CSV to JSON: ${error}`);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});


export default router;
