const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'Public', 'media', 'profiles'));
    },
    filename: (req, file, cb) => {
        const uniqAddress = Date.now() + Math.floor(Math.random() * 50000)
        const ext = (path.extname(file.originalname));
        const isValidExt = ['.png', '.jpg', '.jpeg'];
        if (!isValidExt.includes(ext)) {
            return false
        }
        cb(null, uniqAddress + ext);
    }
})

const upload = multer({ storage, limits: { fileSize: 10000000 } });

module.exports = upload;