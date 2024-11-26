import { useState, useEffect } from "react";
import { parseCSV } from "common/src/parser.ts";
import { Label } from "./ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select.tsx";

interface locationSelect {
  onChange: (value: string) => void;
}
const LocationDropdown: React.FC<locationSelect> = ({ onChange }) => {
  const [nodeCSVData, setNodeCSVData] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const res = await fetch("/api/download-node-csv");

        // Check if the request was successful (status code 2xx)
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const result = await res.text();
        // Set the data in the state
        setNodeCSVData(result);
      } catch (err) {
        // Handle errors
        console.log("Failed");
      }
    };

    fetchData().then();
  }, []); //

  //parse node CSV into array of CSVRows
  const CSVRow = parseCSV(nodeCSVData);
  //make array to be inserted in the html code
  const roomNames: JSX.Element[] = [];

  //for each CSV row, add an option with the value as id and name as longName into array
  for (let i = 0; i < CSVRow.length; i++) {
    const row = CSVRow[i];
    const rowval = Object.values(row);
    const id = rowval[0];
    const nodeId = row["nodeId"];
    roomNames.push(<SelectItem value={id}>{nodeId}</SelectItem>);
    //roomNames.push(<option value={id}> {nodeId} </option>);
  }

  return (
    <div>
      <Label>Location</Label>
      <Select required onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>{roomNames}</SelectContent>
      </Select>
      {/*<label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Select*/}
      {/*    Location</label>*/}
      {/*<Form.Select onChange={onChange} id={id}>*/}
      {/*    {roomNames}*/}
      {/*</Form.Select>*/}
    </div>
  );
};

export default LocationDropdown;
