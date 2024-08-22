const ERROR = require("../constants/errors");
const { uploadService } = require("../services/uploadService");

const uploadController = {
    handleUpload: async (req, res) => {
        try {
            const response = await uploadService(req, res);
            console.log(response);
        } catch (err) {
            const error = ERROR.getErrorMessage("INTERNAL_SERVER_ERROR");
            return res.status(error.status).json({
                message: error.message
            });
        }
    }
}

module.exports = uploadController;