const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + path.parse(file.originalname).name;
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const uploadMiddleware = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err)
      return res.status(400).json({
        success: 0,
        message: [{ path: "server", msg: "File upload failed" }],
      });

    req.body.file = "";
    if (req.file) {
      req.body.file = req.file.originalname;
    }
    next();
  });
};
module.exports = uploadMiddleware;
