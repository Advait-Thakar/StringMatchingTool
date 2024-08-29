const ERROR = require("../constants/errors");
const { uploadService } = require("../services/uploadService");

const uploadController = {
    handleUpload: async (req, res) => {
        try {
            //const response = await uploadService(req); use this to access AWS S3 bucket in future.
            res.status(200).json({ mssg: "file uploaded successfully" });

        } catch (err) {
            const error = ERROR.getErrorMessage("INTERNAL_SERVER_ERROR");
            res.status(error.status).json({
                message: error.message + "to console"
            });
        }
    }
}

module.exports = uploadController;