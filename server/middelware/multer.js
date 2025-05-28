const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const uploadMiddleware = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err)
      return res
        .status(400)
        .json({ message: "File upload failed", error: err.message });

    next();
  });
};
module.exports = uploadMiddleware;
