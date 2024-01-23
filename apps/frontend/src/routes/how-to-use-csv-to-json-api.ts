import axios from "axios";

// The CSV data you want to convert to JSON (this should be the actual CSV string)
const csvData = `name,age,city
  John,30,New York
  Jane,25,Los Angeles
  Jim,35,Chicago`;

// Make a POST request to the CSV to JSON API
axios
  .post("/csv-to-json", csvData)
  .then((response) => {
    // This just prints the JSON string to the console, but you can do anything with it here
    const jsonString = JSON.stringify(response.data, null, 2);
    console.log(jsonString);
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
