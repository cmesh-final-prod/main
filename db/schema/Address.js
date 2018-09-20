const mongoose = require("mongoose");
const { Schema } = mongoose;

const Address = new Schema({
  street: String,
  city: String,
  state: String,
  country: String
});

module.exports = Address;
