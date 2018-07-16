// const User = require('../db/models/User');
// const assert = require('assert');
// const faker = require('faker');
//
// describe('Creating Users', async () => {
//   beforeEach(async () => {
//     await User.remove();
//
//     await User.create({
//       linkedin: {
//         lnId: '1',
//         firstName: faker.name.findName()
//       }
//     });
//
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
