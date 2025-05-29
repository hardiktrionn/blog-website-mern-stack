const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetails,
  updateUserDetails,
  getUserData,
  updatePassword,
  forgetPassword,
  newPassword,
  verifyLink,
} = require("../controller/authController");
const { isAuthenticated } = require("../middelware/auth");
const uploadMiddleware = require("../middelware/multer");
const {
  registerValidator,
  loginValidator,
  updateUserValidator,
  updatePasswordValidator,
} = require("../validator/userValidator");
const { body } = require("express-validator");
const router = express.Router();

router.post("/register", uploadMiddleware, registerValidator, registerUser);
router.post("/login", loginValidator, loginUser);
router.post(
  "/forget-password",
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide valid email address"),
  forgetPassword
);
router.get("/verify-link", verifyLink);
router.post(
  "/new-password",
  [
    body("password").notEmpty().withMessage("New Password is Required"),
    body("confirmPassword").custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("Password and Confirm Password are not same");
      }
      return true;
    }),
  ],
  newPassword
);

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

router.put(
  "/update-password",
  updatePasswordValidator,
  isAuthenticated,
  updatePassword
);

router.get("/check-auth", isAuthenticated, getUserDetails);

router.post("/logout", isAuthenticated, (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
});
router.get("/seen/:username", isAuthenticated, getUserData);

module.exports = router;
