import { test, expect } from 'vitest';
import { parseCSV } from 'common/src/parser.ts';
import PrismaClient from '../../../../apps/backend/src/bin/database-connection.ts';
import nodeCSVString from './../nodeCSVString.ts';
import edgeCSVString from './../edgeCSVString.ts';
import populateDatabase from './../populateDatabase.ts';

test('parseCSV returns correct output for nodeCSVString', () => {
  const rowsNode = parseCSV(nodeCSVString);
  expect(rowsNode).toBeInstanceOf(Array);
  expect(rowsNode[0]).toHaveProperty('nodeID');
});

test('parseCSV returns correct output for edgeCSVString', () => {
  const rowsEdge = parseCSV(edgeCSVString);
  expect(rowsEdge).toBeInstanceOf(Array);
  expect(rowsEdge[0]).toHaveProperty('edgeID');
});

test('populateDatabase creates nodes in database', async () => {
  await populateDatabase();
  const nodes = await PrismaClient.node.findMany();
  expect(nodes).toBeInstanceOf(Array);
  expect(nodes.length).toBeGreaterThan(0);
});

test('populateDatabase creates edges in database', async () => {
  await populateDatabase();
  const edges = await PrismaClient.edge.findMany();
  expect(edges).toBeInstanceOf(Array);
  expect(edges.length).toBeGreaterThan(0);
});

test('populateDatabase does not create duplicate nodes', async () => {
  await populateDatabase();
  const nodes = await PrismaClient.node.findMany();
  const uniqueNodes = new Set(nodes.map(node => node.nodeId));
  expect(nodes.length).toBe(uniqueNodes.size);
});

test('populateDatabase does not create duplicate edges', async () => {
  await populateDatabase();
  const edges = await PrismaClient.edge.findMany();
  const uniqueEdges = new Set(edges.map(edge => edge.edgeID));
  expect(edges.length).toBe(uniqueEdges.size);
});
