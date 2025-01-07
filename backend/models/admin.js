const mongoose = require("mongoose");
const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  adminid: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("admin", adminSchema);
