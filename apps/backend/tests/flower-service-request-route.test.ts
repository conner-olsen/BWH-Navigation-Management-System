import { test, expect } from 'vitest';
import supertest from 'supertest';
import app from '../src/app';

test('POST /', async () => {
  const response = await supertest(app)
    .post('/api/populate-flower-service-request')
    .send({
      senderName: 'Test Sender',
      senderEmail: 'testsender@example.com',
      roomLongName: 'Abrams Conference Room',
      patientName: 'Test Patient',
      flowerType: 'daffodils',
      deliveryDate: '2023-01-01',
      note: 'Test Note'
    });

  expect(response.status).toBe(200);
});
