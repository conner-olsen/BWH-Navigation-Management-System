import {parseCSV} from "common/src/parser.ts";
import PrismaClient from "../../../apps/backend/src/bin/database-connection.ts";
import {node} from "common/interfaces/interfaces.ts";
import {edge} from "common/interfaces/interfaces.ts";
import nodeCSVString from "./nodeCSVString.ts";
import edgeCSVString from "./edgeCSVString.ts";


async function populateDatabase() {
  // Delete all records in the node and edge tables
  await PrismaClient.flowerServiceRequest.deleteMany();
  await PrismaClient.edge.deleteMany();
  await PrismaClient.node.deleteMany();

  // Parse the CSV string to an array of CSVRow objects
  const nodeTable = parseCSV(nodeCSVString);
  const transformedNode: node[] = nodeTable.map((row) => {
    const rowval = Object.values(row);
    return {
      nodeId: rowval[0],
      xcoord: parseInt(rowval[1]),
      ycoord: parseInt(rowval[2]),
      floor: rowval[3],
      building: rowval[4],
      nodeType: rowval[5],
      longName: rowval[6],
      shortName: rowval[7]
    };
  });

  transformedNode.pop();
  await PrismaClient.node.createMany({
    data: transformedNode.map((self) => {
        return {
          nodeId: self.nodeId,
          xcoord: self.xcoord,
          ycoord: self.ycoord,
          floor: self.floor,
          building: self.building,
          nodeType: self.nodeType,
          longName: self.longName,
          shortName: self.shortName
        };
      }
    )
  });

  // Ensure all Node records are created before creating Edge records
  const edgeTable = parseCSV(edgeCSVString);
  const transformed: edge[] = edgeTable.map((row) => {
    const rowval = Object.values(row);
    return {
      edgeID: rowval[0],
      startNodeID: rowval[1],
      endNodeID: rowval[2]
    };
  });

  for (let edge of transformed) {
    // Check if both nodes exist before creating the edge
    const startNodeExists = await PrismaClient.node.findUnique({ where: { nodeId: edge.startNodeID } });
    const endNodeExists = await PrismaClient.node.findUnique({ where: { nodeId: edge.endNodeID } });

    if (startNodeExists && endNodeExists) {
      await PrismaClient.edge.create({
        data: {
          startNodeID: edge.startNodeID,
          edgeID: edge.edgeID,
          endNodeID: edge.endNodeID
        }
      });
    }
  }
}

export default populateDatabase;
