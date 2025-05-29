// validators/loginValidator.js

const { body } = require("express-validator");

const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please provide a valid email address."),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];

const registerValidator = [
  body("file").notEmpty().withMessage("Upload a Profile Picture"),
  body("name")
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be at least 3 to 20 characters long."),
  body("username")
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ min: 3, max: 15 })
    .withMessage("username must be at least 6 to 15 characters long.")
    .matches(/^\S+$/)
    .withMessage("Username must not contain spaces"),
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please provide a valid email."),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  body("confirmpassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),
];

const updateUserValidator = [
  body("name")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be at least 3 to 20 characters long"),
  body("username")
    .isLength({ min: 3, max: 15 })
    .withMessage("username must be at least 6 to 15 characters long")
    .matches(/^\S+$/)
    .withMessage("Username must not contain spaces"),
  body("email").isEmail().withMessage("Please provide a valid email"),
];

const updatePasswordValidator = [
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  body("newPassword")
    .notEmpty()
    .withMessage("New Password is required.")
    .isLength({ min: 6 })
    .withMessage("New Password must be at least 6 characters long.")
    .custom((value, { req }) => {
      if (value == req.body.password) {
        throw new Error("Password and New Password are same");
      }
      return true;
    }),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),
];
module.exports = {
  loginValidator,
  registerValidator,
  updateUserValidator,
  updatePasswordValidator,
};
