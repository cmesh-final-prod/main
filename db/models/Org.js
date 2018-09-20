const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

// subdocuments
const AuthSchema = require("../schema/Auth");
const BookmarksSchema = require("../schema/Bookmarks");
const TermsSchema = require("../schema/Terms");
const MeetupSchema = require("../schema/Meetup");
const Address = require("../../db/schema/Address");

const OrgSchema = new Schema({
  title: String,
  url: String,
  address: Address,
  description: String,
  timeZone: String,
  photo: String,
  auth: AuthSchema,
  meetup: MeetupSchema,
  primaryOrganizerId: [{ type: Schema.Types.ObjectId, ref: "User" }],
  bookmarks: [BookmarksSchema],
  createdAt: Number,
  termsOfUse: [TermsSchema],
  lastSync: Number
});

///////////////////////////////////////////////////////////////
///////////          ENCRYPTING PASSWORDS           ///////////
///////////////////////////////////////////////////////////////

OrgSchema.pre("save", function(next) {
  bcrypt.hash(this.auth.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.auth.password = hash;
    next();
  });
});

///////////////////////////////////////////////////////////////
///////////           COMPARING PASSWORDS           ///////////
///////////////////////////////////////////////////////////////

OrgSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.auth.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

const Org = mongoose.model("Org", OrgSchema);
module.exports = Org;
