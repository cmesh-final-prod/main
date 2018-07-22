const User = require('../db/models/User');
const assert = require('assert');
const faker = require('faker');
const latestPolicyUpdateOn = require('../utils/termsOfUse');

describe('Creating Users', async () => {
  beforeEach(async () => {
    await User.remove();
  });

  it('create users', async () => {
    const createdAt = new Date().getTime();

    const user = await User.create({
      createdAt,
      linkedin: {
        lnId: '987',
        firstName: 'testy baby'
      },
      termsOfUse: {
        latestPolicyUpdateOn,
        accepted: true,
        acceptedAt: createdAt
      }
    });

    await User.create({
      createdAt,
      linkedin: {
        lnId: '123',
        firstName: 'testy baby 2'
      },
      termsOfUse: {
        latestPolicyUpdateOn,
        accepted: true,
        acceptedAt: createdAt
      }
    });

    const findy = await User.findOne({ 'linkedin.firstName': 'testy baby' });

    console.log('------', findy.termsOfUse);
  });
});

// await User.create({
//   linkedin: {
//     lnId: '1',
//     firstName: faker.name.findName()
//   }
// });

//     await User.create({
//       linkedin: {
//         lnId: '2',
//         firstName: faker.name.findName()
//       }
//     });
//
//     await User.create({
//       linkedin: {
//         lnId: '3',
//         firstName: faker.name.findName()
//       }
//     });
//
//     await User.create({
//       linkedin: {
//         lnId: '4',
//         firstName: faker.name.findName()
//       }
//     });
//
//     await User.create({
//       linkedin: {
//         lnId: '5',
//         firstName: faker.name.findName()
//       }
//     });
//
//     await User.create({
//       linkedin: {
//         lnId: '6',
//         firstName: faker.name.findName()
//       }
//     });
//
//     await User.create({
//       linkedin: {
//         lnId: '7',
//         firstName: faker.name.findName()
//       }
//     });
//
//     await User.create({
//       linkedin: {
//         lnId: '8',
//         firstName: faker.name.findName()
//       }
//     });
//
//     await User.create({
//       linkedin: {
//         lnId: '9',
//         firstName: faker.name.findName()
//       }
//     });
//
//     await User.create({
//       linkedin: {
//         lnId: '10',
//         firstName: faker.name.findName()
//       }
//     });
//   });
//
//   it.only('has created 10 users', async () => {
//     const users = await User.find();
//     const count = await User.count();
//     assert(count === 10);
//   });
// });
