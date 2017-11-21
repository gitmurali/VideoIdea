const mongoose = require('mongoose');

const { Schema } = mongoose;

// create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: Date.now(),
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});


mongoose.model('users', UserSchema);
