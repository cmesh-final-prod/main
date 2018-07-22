const assert = require('assert');
const mongoose = require('mongoose');
const Mesh = require('../db/models/Mesh');
const User = require('../db/models/User');
const request = require('supertest');
const app = require('../index');
const faker = require('faker');

describe('Mesh Controller Test', () => {
  let users;
  let currentDate = new Date();
  beforeEach(async () => {
    await Mesh.remove();

    const organizer1 = '5b4ac32612e53d3a1a45f72f';
    const organizer2 = '5b4ac32612e53d3a1a45f731';

    const response = await request(app)
      .post(`/api/meshes/${organizer1}`)
      .send({
        title: 'Near By Mesh',
        startDate: faker.date.future(),
        description: faker.lorem.sentence(),
        duration: 5,
        address: faker.address.streetAddress(),
        coordinates: [-122.40080849999998, 37.79041710000001]
      });

    await request(app)
      .post(`/api/meshes/${organizer2}`)
      .send({
        title: 'Far Away Mesh',
        startDate: faker.date.future(),
        duration: 3,
        address: faker.address.streetAddress(),
        description: faker.lorem.sentence(),
        coordinates: [-102.40080849999998, 37.79041710000001]
      });

    const selectedMesh = await Mesh.findOne({
      'eventDetails.title': 'Near By Mesh'
    });
    users = await User.find();

    // await request(app).put(
    //   `/api/meshes/${selectedMesh._id}/add/${users[0]._id}`
    // );
    // await request(app).put(
    //   `/api/meshes/${selectedMesh._id}/add/${users[1]._id}`
    // );
  });

  it('has created 2 meshes', async () => {
    const meshes = await Mesh.find();

    console.log('-------------------------------------------');
    console.log(meshes);
    const count = await Mesh.countDocuments();
    assert(count === 2);
  });

  it('adds user to a mesh', async () => {
    const farMesh = await Mesh.findOne({
      'eventDetails.title': 'Near By Mesh'
    });
    const response1 = await request(app).put(
      `/api/meshes/${farMesh._id}/add/${users[0]._id}`
    );
    const response2 = await request(app).put(
      `/api/meshes/${farMesh._id}/add/${users[1]._id}`
    );

    const updatedFarMesh = await Mesh.findOne({
      'eventDetails.title': 'Near By Mesh'
    });

    const response3 = await request(app).get(`/api/meshes/${farMesh._id}`);

    console.log('-------------------------------------------');
    console.log('1: ', response1.body);
    console.log('2: ', response3.body);
    // assert(updatedFarMesh.users.length === 1);
  });

  it('fetches near by mesh', async () => {
    const response = await request(app).get(
      '/api/meshes?lng=-122.401906&lat=37.7907733'
    );
    console.log('---------------------------------');
    console.log(response.body);
  });

  it('fetches mesh users', async () => {
    const mesh = await Mesh.findOne({ title: 'Near By Mesh' });
    const response = await request(app).get(`/api/meshes/${mesh._id}`);
    assert(response.body.length === 5);
  });

  it('exits user from selected mesh', async () => {
    const mesh = await Mesh.findOne({ 'eventDetails.title': 'Near By Mesh' });
    const users = await User.find();

    await request(app).put(`/api/meshes/${mesh._id}/add/${users[0]._id}`);
    const response2 = await request(app).put(
      `/api/meshes/${mesh._id}/add/${users[1]._id}`
    );

    const response = await request(app).put(
      `/api/meshes/${mesh._id}/exit/${users[1]._id}`
    );

    const updatedMesh = await Mesh.findOne({
      'eventDetails.title': 'Near By Mesh'
    });

    console.log('-------------------------------------------');
    console.log(response2.body);
    console.log('-------------------------------------------');
    console.log(updatedMesh);

    // assert(response.body.length === 4);
  });
});
