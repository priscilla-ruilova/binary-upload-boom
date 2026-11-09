const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {  //here we are limiting the media types. We could check cloudinary if we can upload gifs or mp3s and if so, we can add media types here. 
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
