const assert = require('assert');
const app = require('../../index');
const request = require('supertest');

describe('it fetches data', () => {
  const userId = '5b662a3379c8797d475f5337';
  const userId2 = '5b662a3479c8797d475f5339';
  const orgId = '5b643eb692f6932da4cf7ae0';
  const meshId = '5b643eb692f6932da4cf7ae2';

  xit('fetches current user', async () => {
    const res = await request(app).get(`/api/users/${meshId}`);
    console.log(res.body);
  });

  xit('fetches mesh users', async () => {
    const res = await request(app).get(`/api/meshes/${meshId}`);
    console.log(res.body);
  });
});
