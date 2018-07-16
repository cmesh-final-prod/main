const _ = require('lodash');
const faker = require('faker');
const Mesh = require('./models/Mesh');
const User = require('./models/User');
const Organizer = require('./models/Organizer');

const MESHES_TO_ADD = 1000;
const USERS_TO_ADD = 15000;
const ORGANIZERS_TO_ADD = 10000;

//////////////////////////////////////////////////////////////////
////////////                  Users                ///////////////
//////////////////////////////////////////////////////////////////

const users = _.times(USERS_TO_ADD, () => createUsers());

function createUsers() {
  return {
    linkedin: {
      lnId: faker.random.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      emails: [faker.internet.email()],
      url: faker.internet.url(),
      photos: [faker.internet.avatar()],
      headline: faker.lorem.sentence()
    }
  };
}

async function insertUsers() {
  await User.insertMany(users);
}

//////////////////////////////////////////////////////////////////
////////////               Organizers              ///////////////
//////////////////////////////////////////////////////////////////

const organizers = _.times(ORGANIZERS_TO_ADD, () => createOrganizers());

function createOrganizers() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    linkedin: {
      lnId: faker.random.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      emails: [faker.internet.email()],
      url: faker.internet.url(),
      photos: [faker.internet.avatar()],
      headline: faker.lorem.sentence()
    },
    org: {
      name: faker.company.companyName(),
      url: faker.internet.url(),
      description: faker.lorem.paragraph()
    }
  };
}

async function insertOrganizers() {
  await Organizer.insertMany(organizers);
}

//////////////////////////////////////////////////////////////////
////////////               Meshes                   ///////////////
//////////////////////////////////////////////////////////////////
let meshUsers;
let meshOrganizer;

async function sample() {
  const sampleUsers = await User.find({}, { _id: true }).limit(200);
  const sampleOrganizers = await Organizer.find({}, { _id: true }).limit(1);

  meshUsers = sampleUsers.map(user => {
    return { userId: user._id };
  });

  meshOrganizer = sampleOrganizers.map(organizer => {
    return organizer._id;
  });

  console.log('xxxxxxx');
}

function createMeshes() {
  console.log('----------', meshUsers);
  return {
    title: faker.lorem.sentence(),
    users: meshUsers,
    geometry: {
      coordinates: [faker.address.longitude(), faker.address.latitude()]
    },
    organizer: meshOrganizer
  };
}

async function insertMeshes() {
  await sample();
  const meshes = await _.times(MESHES_TO_ADD, () => createMeshes());
  await Mesh.insertMany(meshes);
}

//////////////////////////////////////////////////////////////////
////////////               Operations              ///////////////
//////////////////////////////////////////////////////////////////

// insertUsers();
// insertOrganizers();
// insertMeshes();
