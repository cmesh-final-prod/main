const assert = require('assert');
const app = require('../../index');
const request = require('supertest');

// importing models
const Org = require('../../db/models/Org');
const User = require('../../db/models/User');
const Mesh = require('../../db/models/Mesh');
const Log = require('../../db/models/Log');
const UserAgent = require('../../db/models/UserAgent');

// importing controllers
const createUser = require('../../controllers/POST/createUser');

// importing constants
const profiles = require('../utils/USERS');
const orgs = require('../utils/ORGS');
const meshProps = require('../utils/MESHES');

//////////////////////////////////////////////////////////////////
////////////                  MESH                 ///////////////
//////////////////////////////////////////////////////////////////

describe('Create Mesh', () => {
  let org;
  beforeEach(async () => {
    await Promise.all([Mesh.remove(), Org.remove()]);
    org = await request(app)
      .post('/api/orgs')
      .send(orgs[0]);
  });

  xit('creates a new mesh', async () => {
    const orgId = org.body.data._id;
    const mesh = await request(app)
      .post(`/api/meshes/${orgId}`)
      .send(meshProps[0]);
    console.log(mesh.body);
  });
});

//////////////////////////////////////////////////////////////////
////////////                   ORG                 ///////////////
//////////////////////////////////////////////////////////////////

describe('Create Org', () => {
  beforeEach(async () => {
    await Org.remove();
  });

  xit('creates a new organization', async () => {
    const org = await request(app)
      .post('/api/orgs')
      .send(orgs[0]);

    console.log(org.body);
  });
});

//////////////////////////////////////////////////////////////////
////////////                  USER                 ///////////////
//////////////////////////////////////////////////////////////////

describe('Create User', () => {
  beforeEach(async () => {
    await User.remove();
  });

  xit('creates a new linkedin user', async () => {
    const done = () => {};

    await Promise.all([
      createUser(profiles[0], done),
      createUser(profiles[1], done),
      createUser(profiles[2], done),
      createUser(profiles[3], done),
      createUser(profiles[4], done)
    ]);

    // const [lnCount, usersCount, lnUser] = await Promise.all([
    //   Linkedin.countDocuments(),
    //   User.countDocuments(),
    //   Linkedin.findOne({ firstName: 'Ch' })
    // ]);
    //
    // assert(lnCount === 5 && lnCount === usersCount);
  });
});

//////////////////////////////////////////////////////////////////
////////////                  LOG                  ///////////////
//////////////////////////////////////////////////////////////////

describe('Create log', () => {
  it('creates a user log', async () => {
    const res = await request(app).post('/api/logs');
    console.log(res.body);
  });
});
