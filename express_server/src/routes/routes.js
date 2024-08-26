const express = require('express');
const router = express.Router();
const upload = require('../configs/multerConfigs'); // Adjust the path to your multer config
const uploadController = require('../controllers/uploadController'); // Adjust the path to your controller
const SUCCESS = require('../constants/responses');

router.get('/test', (req, res) => {
    const response = SUCCESS.getSuccessMessage("SUCCESS");
    res.status(response.status).json({
        status: response.status,
        message: response.message
    });
});

// Handle file upload with multer
router.post('/upload', upload.single('pdf'), uploadController.handleUpload);

// Route for searching
router.get('/search', /* include database fetching logics here*/);

module.exports = router;
