// validators/loginValidator.js

const { body } = require("express-validator");

const loginValidator = [
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const registerValidator = [
  body("name")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be at least 3 to 20 characters long"),
  body("username")
    .isLength({ min: 3, max: 15 })
    .withMessage("username must be at least 6 to 15 characters long")
    .matches(/^\S+$/)
    .withMessage("Username must not contain spaces"),
  body("email").isEmail().withMessage("Please provide a valid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("confirmpassword")
    .notEmpty()
    .withMessage("Confirm Password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
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
module.exports = { loginValidator, registerValidator, updateUserValidator };
