const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetails,
  updateUserDetails,
  getUserData,
} = require("../controller/authController");
const { isAuthenticated } = require("../middelware/auth");
const uploadMiddleware = require("../middelware/multer");
const {
  registerValidator,
  loginValidator,
  updateUserValidator,
} = require("../validator/userValidator");
const router = express.Router();

router.post("/register", uploadMiddleware, registerValidator, registerUser);
router.post("/login", loginValidator, loginUser);
router.put(
  "/update-profile",
  isAuthenticated,
  uploadMiddleware,
  updateUserValidator,
  updateUserDetails
);
router.put(
  "/update-profile/:id",
  isAuthenticated,
  uploadMiddleware,
  updateUserValidator,
  updateUserDetails
);
router.get("/check-auth", isAuthenticated, getUserDetails);
router.post("/logout", isAuthenticated, (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
});
router.get("/seen/:username", isAuthenticated, getUserData);

module.exports = router;
