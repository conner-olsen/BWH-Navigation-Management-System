import { parseCSV } from '../../src/parser';

describe('parseCSV', () => {

    // Should correctly parse a CSV string with one row and one column
    test('should correctly parse a CSV string with one row and one column', () => {
      const csvString = 'name\nJohn';
      const expected = [{ name: 'John' }];

      const result = parseCSV(csvString);

      expect(result).toEqual(expected);
    });

    // Should correctly parse a CSV string with multiple rows and columns
    test('should correctly parse a CSV string with multiple rows and columns', () => {
      const csvString = 'name,age\nJohn,25\nJane,30';
      const expected = [
        { name: 'John', age: '25' },
        { name: 'Jane', age: '30' },
      ];

      const result = parseCSV(csvString);

      expect(result).toEqual(expected);
    });

    // Should correctly parse a CSV string with empty rows
    test('should correctly parse a CSV string with empty rows', () => {
      const csvString = 'name,age\nJohn,25\n\nJane,30';
      const expected = [
        { name: 'John', age: '25' },
        { name: 'Jane', age: '30' },
      ];

      const result = parseCSV(csvString);

      expect(result).toEqual(expected);
    });

    // Should return an empty array when given an empty string
    test('should return an empty array when given an empty string', () => {
      const csvString = '';
      const expected = [];

      const result = parseCSV(csvString);

      expect(result).toEqual(expected);
    });

    // Should return an empty array when given a string with only headers
    test('should return an empty array when given a string with only headers', () => {
      const csvString = 'name,age';
      const expected = [];

      const result = parseCSV(csvString);

      expect(result).toEqual(expected);
    });

    // Should return an array with one empty object when given a string with only one empty row
    test('should return an array with one empty object when given a string with only one empty row', () => {
      const csvString = 'name,age\n';
      const expected = [];

      const result = parseCSV(csvString);

      expect(result).toEqual(expected);
    });
});
