import {convertToJSON, parseCSV} from "common/src/parser.ts";
import { expect, test, describe } from "vitest";

// Type definition for the CSV row object for use in the tests
type CSVRow = { [key: string]: string };

describe('parseCSV function', () => {
  // Test case 1: Verify that the function correctly parses a simple CSV string
  test('should correctly parse a simple CSV string', () => {
    const csvString = 'header1,header2\nvalue1,value2';
    const expectedOutput: CSVRow[] = [{ header1: 'value1', header2: 'value2' }];

    const result = parseCSV(csvString);
    expect(result).toEqual(expectedOutput);
  });

  // Test case 2: Verify that the function correctly handles CSV strings with multiple rows
  test('should handle CSV strings with multiple rows correctly', () => {
    const csvString = 'header1,header2\nvalue1,value2\nvalue3,value4';
    const expectedOutput: CSVRow[] = [{ header1: 'value1', header2: 'value2' }, { header1: 'value3', header2: 'value4' }];

    const result = parseCSV(csvString);
    expect(result).toEqual(expectedOutput);
  });

  // Test case 3: Verify that the function correctly handles empty CSV strings
  test('should handle empty CSV strings correctly', () => {
    const csvString = '';
    const expectedOutput: CSVRow[] = [];

    const result = parseCSV(csvString);
    expect(result).toEqual(expectedOutput);
  });
});

// ConvertToJSON function
test('convertToJSON function', () => {
  // Test case 1: Verify that the function correctly converts a CSVRow array into a JSON string
  test('converts CSVRow array into a JSON string', () => {
    const rows: CSVRow[] = [
      { 'name': 'John', 'age': '30', 'city': 'New York'},
      { 'name': 'Jane', 'age': '25', 'city': 'Chicago'}
    ];
    const result = convertToJSON(rows);
    expect(result).toBe(JSON.stringify(rows, null, 2));
  });

  // Test case 2: Verify that the function correctly handles an empty CSVRow array
  test('returns an empty JSON array string when CSVRow array is empty', () => {
    const rows: CSVRow[] = [];
    const result = convertToJSON(rows);
    expect(result).toBe(JSON.stringify(rows, null, 2));
  });
});
