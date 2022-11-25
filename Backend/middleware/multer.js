const multer = require('multer');
const fs = require('fs');
const path = require('path');

const MIME_TYPE = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images')
    },
    filename: (req, file, callback) => {
        let name = Date.now() + file.originalname.replace(" ", "_")
        if (!MIME_TYPE[file.mimetype]) throw new Error("Invalid extension");
        while (fs.existsSync(path.join("../public/images/", name))) {
            name = Date.now() + file.originalname.replace(" ", "_")
        }
        callback(null, name);
    }
})

module.exports = multer({ storage: storage })