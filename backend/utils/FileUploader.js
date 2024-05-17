const multer = require("multer");

const path = require("path");

const imageStorage = multer.diskStorage({
    // Destination to store image
    destination: "./uploads/images",
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname +
            "-c" +
            Date.now() +
            path.extname(file.originalname)
        );
        // file.fieldname is name of the field (image)
        // path.extname get the uploaded file extension
    },
});
 
var imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1024 * 1024 * 10, // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.toLowerCase().match(/\.(png|jpg|jpeg|bmp|jfif)$/)) {
            // upload only png and jpg format

            return cb(new Error("Please upload a Image"));
        }
        cb(null, true);
    },

});

// --------------------------------------

module.exports = {
    //imageUpload,
};