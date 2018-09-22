const mongoose = require("mongoose").set("debug", false);
const { Schema } = mongoose;

// subdocuments
const MeshUserSchema = require("../schema/MeshUser");
const GeoJSONSchema = require("../schema/GeoJSON");
const EventDetailsSchema = require("../schema/EventDetails");

const MeshSchema = new Schema({
  eventId: { type: String, unique: true },
  eventDetails: EventDetailsSchema,
  startDate: Number,
  endDate: Number,
  users: [MeshUserSchema],
  duration: Number,
  provider: String,
  geometry: GeoJSONSchema,
  orgId: { type: Schema.Types.ObjectId, ref: "Org" },
  organizerId: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: Number
});

MeshSchema.virtual("usersCount").get(function() {
  return this.users.length;
});

const Mesh = mongoose.model("Mesh", MeshSchema);

module.exports = Mesh;
