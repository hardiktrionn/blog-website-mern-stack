const { body } = require("express-validator");

const blogValidator = [
  body("file").notEmpty().withMessage("Upload Blog Banner"),
  body("title")
    .notEmpty()
    .withMessage("Title is Required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be at least 6 characters long."),
  body("category").notEmpty().withMessage("Please Choose Blog Category."),
  body("description")
    .notEmpty()
    .withMessage("Description is Required")
    .isLength({ min: 5 })
    .withMessage("Description must be at least 6 characters long."),
];

module.exports = blogValidator;
