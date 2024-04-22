const path = require('path');
const Image = require('../models/image.js');
const User = require('../models/User');
const SettingsModel = require('../models/Settings.js');


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

    res.status(201).json({ message: 'Image uploaded successfully' , image: image._id});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload image' });
  }
};

//if isForFriend is true then this is displaying for a friend, otherwise its displaying for the user
exports.getImageNew = async (req, res) => {
  try {
      // Assuming req.params.id is the userId and req.query.displayProfilePic is the boolean parameter
      const { userId, isForFriend } = req.body;

      // Fetch the user based on the userId
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).send('User not found');
      }

      //defaults to the default profile pic
      let profilePicture = await Image.findById("66242c3261e6aa7c8c94428d");

      //checks if this request if for a fiend or for the user
      if (isForFriend) {
        const settings = await SettingsModel.getSettings(userId)

        //if settings are enabled it displays the real profile
        if(settings.DisplayPhoto){
          profilePicture = await Image.findById(user.ProfilePicture);
        }
      }else{
        profilePicture = await Image.findById(user.ProfilePicture);
      }

      if (!profilePicture) {
        return res.status(404).send('Profile picture not found');
      }

      // Construct absolute path to the profile picture file
      // const imagePath = path.resolve(profilePicture.path).replace(/\\/g, '/');
      // res.set('Content-Type', 'image/jpeg');
      // res.sendFile(imagePath);
      res.send(profilePicture)
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch image' });
  }
};

exports.getImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).send('Image not found');
    }
    // Construct absolute path to the image file
    const imagePath = path.resolve(image.path).replace(/\\/g, '/');
    res.set('Content-Type', 'image/jpeg');
    res.sendFile(imagePath);
  } catch (error) {
    console.error(error);
      res.status(500).json({ message: 'Failed to fetch image' });
    }
};
