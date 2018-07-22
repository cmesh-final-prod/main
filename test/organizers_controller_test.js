const assert = require('assert');
const request = require('supertest');
const app = require('../index');
const Mesh = require('../db/models/Mesh');
const Organizer = require('../db/models/Organizer');

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

  it('creates an organizer', async () => {
    const response = await request(app)
      .post('/api/organizers')
      .send({
        firstName: 'Newly Created Organizer',
        lastName: 'Hala'
      });

    console.log('------------------------------');
    console.log(response.body.organizer);
  });
});
