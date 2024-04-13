const path = require('path');
const Image = require('../models/image.js');
const User = require('../models/User');


exports.uploadImage = async (req, res) => {
  try {
    const { originalname, filename, path } = req.file;
    const { userId } = req.body;

    // Check if there's already an image record for the user ID
    const existingImage = await Image.findOne({ userId });

    // If an image record exists, delete it
    if (existingImage) {
      await Image.findByIdAndDelete(existingImage._id);
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new image record with the uploaded image data
    const image = new Image({
      originalname,
      filename,
      path,
      userId,
    });

    // Save the image
    await image.save();

    // Update the user's profile picture field with the ID of the uploaded image
    user.ProfilePicture = image._id;
    await user.save();

    res.status(201).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload image' });
  }
};

exports.getImage = async (req, res) => {
    try {
      const image = await Image.findById(req.params.id);
      if (!image) {
        return res.status(404).send('Image not found');
      }
      // Construct absolute path to the image file
      const imagePath = path.resolve(image.path);
      res.set('Content-Type', 'image/jpeg');
      res.sendFile(imagePath);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch image' });
    }
  };

  exports.getImagesByUser = async (req, res) => {
    try {
      const userId = req.params.userId; // Assuming userId is passed as a URL parameter
      const images = await Image.find({ userId: userId });
      if (images.length === 0) {
        return res.status(404).send('No images found for the user');
      }
      // Return the images array or any processing you want to do with the images
      res.status(200).json(images);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch images' });
    }
  };