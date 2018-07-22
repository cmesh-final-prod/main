const dateParser = require('./dateParser');

const allPolicyUpdates = [
  dateParser.utc('2017-12-30'),
  dateParser.utc('2018-06-19')
];

const latestPolicyUpdateOn = allPolicyUpdates[allPolicyUpdates.length - 1];

module.exports = latestPolicyUpdateOn;
