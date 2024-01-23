import express, { Router, Request, Response } from "express";
import { parseCSV, convertToJSON } from "../bin/parser.ts";

const router: Router = express.Router();

router.post("/csv-to-json", async (req: Request, res: Response) => {
  try {
    // Read the CSV string from the request body
    const csvString = req.body;

    // Parse the CSV string to an array of CSVRow objects
    const rows = parseCSV(csvString);

    // Convert the array of CSVRow objects to a JSON string
    const json = convertToJSON(rows);

    // Send the JSON string as the response
    res.json(json);
  } catch (error) {
    console.error(`Error while converting CSV to JSON: ${error}`);
    res.sendStatus(500);
  }
});

export default router;
