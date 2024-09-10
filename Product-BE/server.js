const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const productRouter = require("./routes/productRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.log(err.stack);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// routes middleware
app.use("/api/product", productRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});
