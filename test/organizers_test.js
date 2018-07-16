// const Organizer = require('../db/models/Organizer');
// const faker = require('faker');
//
// describe('Seeding organizers', () => {
//   beforeEach(async () => {
//     await Organizer.remove();
//     await Organizer.create({
//       firstName: faker.name.firstName(),
//       lastName: faker.name.lastName(),
//       linkedin: {
//         lnId: '1',
//         firstName: faker.name.firstName(),
//         lastName: faker.name.firstName()
//       }
//     });
//
//     await Organizer.create({
//       firstName: faker.name.firstName(),
//       lastName: faker.name.lastName(),
//       linkedin: {
//         lnId: '2',
//         firstName: faker.name.firstName(),
//         lastName: faker.name.firstName()
//       }
//     });
//
//     await Organizer.create({
//       firstName: faker.name.firstName(),
//       lastName: faker.name.lastName(),
//       linkedin: {
//         lnId: '3',
//         firstName: faker.name.firstName(),
//         lastName: faker.name.firstName()
//       }
//     });
//
//     await Organizer.create({
//       firstName: faker.name.firstName(),
//       lastName: faker.name.lastName(),
//       linkedin: {
//         lnId: '4',
//         firstName: faker.name.firstName(),
//         lastName: faker.name.firstName()
//       }
//     });
//
//     await Organizer.create({
//       firstName: faker.name.firstName(),
//       lastName: faker.name.lastName(),
//       linkedin: {
//         lnId: '5',
//         firstName: faker.name.firstName(),
//         lastName: faker.name.firstName()
//       }
//     });
//
//     await Organizer.create({
//       firstName: faker.name.firstName(),
//       lastName: faker.name.lastName(),
//       linkedin: {
//         lnId: '6',
//         firstName: faker.name.firstName(),
//         lastName: faker.name.firstName()
//       }
//     });
//
//     await Organizer.create({
//       firstName: faker.name.firstName(),
//       lastName: faker.name.lastName(),
//       linkedin: {
//         lnId: '7',
//         firstName: faker.name.firstName(),
//         lastName: faker.name.firstName()
//       }
//     });
//
//     await Organizer.create({
//       firstName: faker.name.firstName(),
//       lastName: faker.name.lastName(),
//       linkedin: {
//         lnId: '8',
//         firstName: faker.name.firstName(),
//         lastName: faker.name.firstName()
//       }
//     });
//
//     await Organizer.create({
//       firstName: faker.name.firstName(),
//       lastName: faker.name.lastName(),
//       linkedin: {
//         lnId: '9',
//         firstName: faker.name.firstName(),
//         lastName: faker.name.firstName()
//       }
//     });
//
//     await Organizer.create({
//       firstName: faker.name.firstName(),
//       lastName: faker.name.lastName(),
//       linkedin: {
//         lnId: '10',
//         firstName: faker.name.firstName(),
//         lastName: faker.name.firstName()
//       }
//     });
//   });
//
//   it.only('fetches all organizers ', async () => {
//     const organizers = await Organizer.find();
//     console.log(organizers);
//   });
// });
