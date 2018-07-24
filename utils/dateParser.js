const moment = require('moment');

module.exports = {
  milli(date) {
    return new Date(date).getTime();
  },

  utc(date) {
    return moment(date)
      .utc()
      .format();
  },

  isBetween(start, end) {
    return moment().isAfter(start) && moment().isBefore(end);
  },

  addHours(date, hours) {
    return moment(date)
      .add(hours, 'hour')
      .utc()
      .format();
  },

  subtractHours(date, hours) {
    return moment(date)
      .subtract(hours, 'hour')
      .utc()
      .format();
  }
};
