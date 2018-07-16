const assert = require('assert');
const request = require('supertest');
const app = require('../index');
const Mesh = require('../db/models/Mesh');

describe('Organizer Controller Test', () => {
  it('Fetches Mesh Organizer Info', async () => {
    const nearByMesh = await Mesh.findOne({ title: 'Near By Mesh' });
    const response = await request(app).get(
      `/api/organizers/${nearByMesh._id}`
    );
    const mesh = await Mesh.findOne(
      { _id: nearByMesh._id },
      {
        organizer: true
      }
    );

    assert(mesh.organizer.toString() === response.body._id.toString());
  });
});
