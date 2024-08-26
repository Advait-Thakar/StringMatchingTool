const ERROR = require("../constants/errors");
const { uploadService } = require("../services/uploadService");

const uploadController = {
    handleUpload: async (req, res) => {
        try {
            const response = await uploadService(req);
            res.status(response.status).json(response);

        } catch (err) {
            const error = ERROR.getErrorMessage("INTERNAL_SERVER_ERROR");
            res.status(error.status).json({
                message: error.message + "to console"
            });
        }
    }
}

module.exports = uploadController;