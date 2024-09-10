// validation.js
const { body, validationResult } = require("express-validator");

// Function to create validation middleware
const validateAddProduct = () => [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  body("description")
    .optional() // Use optional if it's not required but should be validated if present
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 300 })
    .withMessage("Description must be less than 300 characters"),

  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0"),
];

// Middleware to handle validation errors
const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map((error) => error.msg), // Return all validation messages
    });
  }
  next();
};

module.exports = { validateAddProduct, validator };
