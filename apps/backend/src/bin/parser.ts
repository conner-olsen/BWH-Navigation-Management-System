/**
 * Represents a single row in a CSV (Comma Separated Values) file.
 * The CSVRow class provides methods to access, manipulate, and retrieve data from a CSV row.
 *
 * @class
 * @constructor
 * @param {object} data - The data object representing the row in CSV format.
 */
type CSVRow = { [key: string]: string };

/**
 * Parses a CSV string and returns an array of CSVRow objects.
 *
 * @param {string} csvString - The CSV string to parse.
 * @return {CSVRow[]} - An array of CSVRow objects representing the parsed data.
 */
function parseCSV(csvString: string): CSVRow[] {
  // Split the CSV string into lines
  const lines = csvString.split("\n");

  // Extract headers
  const headers = lines[0].split(",");

  // Process each line
  return lines.slice(1).map((line) => {
    // Split the line by comma and create an object
    const data = line.split(",");
    return headers.reduce((obj, nextKey, index) => {
      obj[nextKey] = data[index];
      return obj;
    }, {} as CSVRow);
  });
}

/**
 * Converts an array of CSVRow objects to a JSON string.
 *
 * @param {CSVRow[]} rows - The array of CSVRow objects to convert.
 * @return {string} - The JSON string representation of the CSVRow objects.
 */
function convertToJSON(rows: CSVRow[]): string {
  return JSON.stringify(rows, null, 2);
}

// Example usage:
// Example CSV string
const csvString = `name,age,city
John,30,New York
Jane,25,Los Angeles
Jim,35,Chicago`;

// Parse the CSV string
const rows = parseCSV(csvString);

// Log the resulting array of CSVRow objects
console.log(rows);

// Output:
// [
//   { "name": "John", "age": "30", "city": "New York" },
//   { "name": "Jane", "age": "25", "city": "Los Angeles" },
//   { "name": "Jim", "age": "35", "city": "Chicago" }
// ]

// Get data from the first CSVRow object
const firstRow = rows[0];
const firstName = firstRow["name"];
const age = firstRow["age"];

console.log(`Name: ${firstName}, Age: ${age}`);

// Output:
// Name: John, Age: 30

// convertToJSON Usage:
const json = convertToJSON(rows);
console.log(json);
