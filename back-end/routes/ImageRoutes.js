const express = require('express');
const multer = require('multer');
const imageController = require('../controllers/ImageController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), imageController.uploadImage);
router.get('/:id', imageController.getImage);

module.exports = router;