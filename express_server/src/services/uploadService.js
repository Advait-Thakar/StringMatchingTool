const express = require('express');
const fs = require('fs');
const path = require('path');
const parser = require('pdf-parse');
const ERROR = require('../constants/errors');
const SUCCESS = require('../constants/responses');
const { runJavaClass, runTest } = require("../utils/javaIntegration");
const { textTransform } = require('../utils/textTransform');

const uploadService = async (req, res) => {
    if (!req.file || req.file.mimetype !== "application/pdf") {
        const error = ERROR.getErrorMessage("BAD_REQUEST");
        return res.status(error.status).json({ message: error.message + ". Please upload a valid PDF file." });
    }

    try {
        const filePath = path.resolve('../public/uploads', req.file.filename);

        const fileBuffer = fs.readFileSync(filePath);

        const data = await parser(fileBuffer);

        //fs.unlinkSync(filePath);

        const cleanedText = textTransform(data.text);

        // Create a string containing all ASCII values from 1 to 255 (excluding null byte 0)
        //let asciiFeeder = "1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z";

        // Print the resulting string
        //console.log(asciiFeeder);


        const feeder = cleanedText;
        const mode = "encode";
        const text = cleanedText;

        const jsonArgs = {
            args0: cleanedText,
            args1: mode,
            args2: cleanedText,
        }

        const encoded = await runJavaClass(jsonArgs);

        const response = SUCCESS.getSuccessMessage("CREATED");

        res.status(response.status).json({
            status: response.status,
            message: response.message,
            content: cleanedText,
            encoded: encoded
        });

    } catch (err) {
        console.error('Upload service error:', err); // Log detailed error information
        const error = ERROR.getErrorMessage("INTERNAL_SERVER_ERROR");
        return res.status(error.status).json({ message: error.message + ". Cannot process PDF file." });
    }
}

module.exports = { uploadService };
