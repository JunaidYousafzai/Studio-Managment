const multer = require('multer');
const fs = require('fs');
const path = require('path');

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (request, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

module.exports = upload;
