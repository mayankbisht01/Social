import multer from "multer";

const storage = multer.memoryStorage(); // upload files as a buffer in RAM

const upload = multer({
    storage, 
    limits: { fileSize: 5 * 1024 * 1024 }, // Size: 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true); // accept the file
        } else {
            cb(new Error("Only image files are allowed"))  // reject
        }
    }
});

export default upload;