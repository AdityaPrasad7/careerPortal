import multer from "multer";

const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// Single file upload for registration
export const singleUpload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
}).single('profilePhoto');

// Multiple file upload for profile updates
export const multipleUpload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
}).fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'file', maxCount: 1 } // for resume
]);