const mongoose = require("mongoose");
const socialSchema = new mongoose.Schema({
  facebook: {
    type: String,
    required: false,
  },
  twitter: {
    type: String,
    required: false,
  },
  youtube: {
    type: String,
    required: false,
  },
});
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  study: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  socialMedia: socialSchema,
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
