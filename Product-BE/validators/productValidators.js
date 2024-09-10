const { body } = require("express-validator");

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

const validateUpdateProduct = () => [
  body("name").optional().isString().withMessage("Name is required"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 300 })
    .withMessage("Description must be less than 300 characters"),
  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0"),
];

const validateToggleSwitchProduct = () => [
  body("field")
    .notEmpty()
    .isString()
    .isIn(["isRecommended", "isBestSeller", "status"])
    .withMessage("field is required"),
  body("value").notEmpty().isBoolean(),
  body("id").notEmpty().isString(),
];

//const validateDeleteProduct = () => [body("id").notEmpty().isString()];

module.exports = {
  validateAddProduct,
  validateUpdateProduct,
  validateToggleSwitchProduct,
  // validateDeleteProduct,
};
