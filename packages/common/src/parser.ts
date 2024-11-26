/**
 * Represents a single row in a CSV (Comma Separated Values) file.
 * The CSVRow class provides methods to access, manipulate, and retrieve data from a CSV row.
 *
 * @class
 * @constructor
 * @param {object} data - The data object representing the row in CSV format.
 */
export type CSVRow = { [key: string]: string };

/**
 * Parses a CSV string and returns an array of CSVRow objects.
 *
 * @param {string} csvString - The CSV string to parse.
 * @return {CSVRow[]} - An array of CSVRow objects representing the parsed data.
 * @example To call
 * const data = parseCSV("name,age\nJohn,25\nJane,30")
 * @example To access
 * Method 1: data[0]["name"] // returns "John"
 * Method 2: data[0].name // returns "John"
 * Method 3: data[0][0] // returns "John"
 * Method 4: data[0].age // returns "25"
 * Method 5:
 * row = data[1] // returns {name: "Jane", age: "30"}
 * row["name"] // returns "Jane"
 */
export function parseCSV(csvString: string): CSVRow[] {
  // Split the CSV string into lines
  const lines = csvString.split(/\r?\n/);

  // Extract headers
  const headers = lines[0].split(",");

  // Process each line
  return lines
    .slice(1)
    .filter((line) => line.trim() !== "")
    .map((line) => {
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
export function convertToJSON(rows: CSVRow[]): string {
  return JSON.stringify(rows, null, 2);
}
