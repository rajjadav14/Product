import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
  updateProductSwitch,
} from "../actions/productActions";
import { message } from "antd";
import { act } from "react";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle", // idle, loading, succeeded, failed
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.message = action.message;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.message;
      })
      .addCase(updateProductSwitch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductSwitch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.message = action.message;
      })
      .addCase(updateProductSwitch.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.message = action.message;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.message = action.message;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.message = action.message;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export default productSlice.reducer;
