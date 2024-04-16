const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  originalname: String,
  filename: String,
  path: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
  }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;