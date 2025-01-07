const mongoose = require("mongoose");

const victimSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
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
  cases: [
    {
      title: String,
      description: String,
      approve: Boolean,
      evidence: String,
    },
  ],
});

module.exports = mongoose.model("victim", victimSchema); // Use '=' instead of '-'
