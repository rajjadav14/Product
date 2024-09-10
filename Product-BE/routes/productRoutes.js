const express = require("express");
const {
  addProduct,
  updateProduct,
  toggleSwitch,
  deleteProduct,
  getAllProducts,
} = require("../controllers/productController");
const {
  validateAddProduct,
  validateToggleSwitchProduct,
  validateUpdateProduct,
} = require("../validators/productValidators");

const { validator } = require("../utils/validator");

const router = express.Router();

router.get("/", getAllProducts);
router.post("/add", validateAddProduct(), validator, addProduct);
router.put("/update", validateUpdateProduct(), validator, updateProduct);
router.put(
  "/toggleSwitch",
  validateToggleSwitchProduct(),
  validator,
  toggleSwitch
);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
