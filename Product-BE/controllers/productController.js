const Product = require("../models/productModel");

const addProduct = async (req, res, next) => {
  try {
    const { name, description, price } = req.body;

    const alreadyPresent = await Product.findOne({
      name,
      isDeleted: false,
    }).lean();

    if (alreadyPresent) {
      return res
        .status(409)
        .json({ success: false, message: "This product already exists" });
    }

    const product = new Product({ name, description, price });
    await product.save();

    return res
      .status(200)
      .json({ success: true, message: "Added Product Successfuly" });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id, name, description, price } = req.body;
    const exists = await Product.findOne({ _id: id });

    if (!exists) {
      return res
        .status(400)
        .json({ success: false, message: "This product does not Exists." });
    }

    exists.name = name || exists.name;
    exists.description = description || exists.description;
    exists.price = price || exists.price;

    await exists.save();

    return res
      .status(200)
      .json({ success: true, message: "Product updated Successfuly" });
  } catch (err) {
    next(err);
  }
};

const toggleSwitch = async (req, res, next) => {
  try {
    const { id, field, value } = req.body;
    const exists = await Product.findOne({ _id: id });

    if (!exists) {
      return res
        .status(400)
        .json({ success: false, message: "This product does not Exists." });
    }

    exists[field] = value;
    await exists.save();

    return res
      .status(200)
      .json({ success: true, message: "Product switch updated Successfuly" });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const exists = await Product.findOne({ _id: id });

    if (!exists) {
      return res
        .status(400)
        .json({ success: false, message: "This product does not Exists." });
    }

    exists.isDeleted = true;
    await exists.save();

    return res
      .status(200)
      .json({ success: true, message: "Product Deleted Successfuly" });
  } catch (err) {
    next(err);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isDeleted: false }).lean();

    if (!products || products?.length == 0) {
      return res
        .status(404)
        .json({ success: false, message: "No product found" });
    }

    return res.status(200).json({
      success: true,
      data: products,
      message: "Products fetched Successfuly",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addProduct,
  updateProduct,
  toggleSwitch,
  deleteProduct,
  getAllProducts,
};
