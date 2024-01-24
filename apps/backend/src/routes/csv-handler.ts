import express, {Router, Request, Response} from "express";
import {convertToJSON, parseCSV} from "../bin/parser.ts";
import * as fs from "fs";
import * as path from "path";



const router: Router = express.Router();



router.post("/", async (req: Request, res: Response) => {
  try {
    // Read the CSV string from the request body
    const absolutePath = path.join(__dirname, "../../CSV-Data/L1Edges.csv");
    const csvFile = fs.readFileSync(absolutePath, "utf-8");

    // Parse the CSV string to an array of CSVRow objects
    const rows = parseCSV(csvFile);
    const jsonData = convertToJSON(rows);
    console.log(jsonData);

    res.json(rows);




  } catch (error) {
    console.error(`Error while converting CSV to JSON: ${error}`);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});


export default router;
