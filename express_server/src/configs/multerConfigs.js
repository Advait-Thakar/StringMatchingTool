const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Exists = require('../../public/uploads/checkIfExists');

const uploadDirectory = path.resolve('../public/uploads');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        if (Exists(file.originalname)) {
            cb(new Error("File already exists: "), null);
        }
        else {
            cb(null, `${file.originalname}`);
        }
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Unsupported File Type Uploaded"), false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
