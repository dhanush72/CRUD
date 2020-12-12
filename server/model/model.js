const mongoose = require("mongoose");

var scheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: String,
  status: String,
});

const userDB = mongoose.model("userdb", scheme);

module.exports = userDB;
