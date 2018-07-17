const assert = require('assert');
const moment = require('moment');
const dateParser = require('../utils/dateParser');
const Mesh = require('../db/models/Mesh');

describe('Moment Date and Time', () => {
  it('learning moment', async () => {
    // const today = '2018-07-17T06:51:30.704Z';
    // const startDate = '2018-07-17T03:51:30.704Z';
    // const endDate = '2018-07-17T09:51:30.704Z';
    //
    // const preStartDate = dateParser.subtractHours(startDate, 1);
    // const postEndDate = dateParser.addHours(endDate, 1);
    //
    // const mesh = await Mesh.create({
    //   eventDetails: {
    //     title: 'Test Mesh',
    //     startDate,
    //     endDate
    //   },
    //   title: 'Test Mesh',
    //   startDate: preStartDate,
    //   endDate: postEndDate
    // });
    //
    // const createdMesh = await Mesh.findOne({ title: 'Test Mesh' });
    //
    // const isActive = dateParser.isBetween(
    //   createdMesh.startDate,
    //   createdMesh.endDate
    // );
    //
    // console.log(isActive);
  });
});
