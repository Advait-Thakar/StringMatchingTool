const fs = require('fs');
const path = require('path');
const ERROR = require('../constants/errors');
const SUCCESS = require('../constants/responses');
const uploadPdfData = require("../repository/uploadData");
//const { runJavaClass, runTest } = require("../utils/javaIntegration");
const { textTransform } = require('../utils/textTransform');
const { getChunkedData } = require('../utils/chunking');
const { getExtractedText } = require('../utils/extractPdf');

const uploadService = async (req) => {
    if (!req.file || req.file.mimetype !== "application/pdf") {
        const error = ERROR.getErrorMessage("BAD_REQUEST");
        const errorData = {
            status: error.status,
            message: error.message + ". Please upload a valid PDF file."
        }
        return errorData;
    }

    try {
        const filePath = path.resolve('../public/uploads', req.file.filename);

        const fileBuffer = fs.readFileSync(filePath);

        const pdfInfo = (await getExtractedText(fileBuffer)).metadata;
        const data = (await getExtractedText(fileBuffer)).pages;

        const pages = getChunkedData(data);

        data.forEach((page)=>{
            fs.appendFileSync('./pdfData.txt', page.content, 'utf8');
        })

        //fs.unlinkSync(filePath);

        //const encoded = await runJavaClass(send_your_arguments_here_as_json);

        const response = SUCCESS.getSuccessMessage("CREATED");

        const responseData = {
            status: response.status,
            message: response.message,
            pdfInfo: pdfInfo,
            content: pages,
        };

        await uploadPdfData(JSON.stringify({ pdfInfo, pages }));

        return responseData;

    } catch (err) {
        console.error('Upload service error:', err);
        const error = ERROR.getErrorMessage("INTERNAL_SERVER_ERROR");
        const errorData = {
            status: error.status,
            message: error.message + ". Cannot process PDF file."
        };

        return errorData;
    }
}

module.exports = { uploadService };
