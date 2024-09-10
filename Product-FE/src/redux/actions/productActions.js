import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = "http://localhost:3000/api/product";

// Async thunk to fetch products from API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(SERVER_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.response.data.message });
    }
  }
);

// Async thunk to update product Switch
export const updateProductSwitch = createAsyncThunk(
  "products/updateProductStatus",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.put(SERVER_URL + "/toggleSwitch", payload);
      return response.data; // Update with the actual returned status if necessary
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.put(SERVER_URL + "/update", payload);
      return response.data; // Update with the actual returned status if necessary
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to add product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post(SERVER_URL + "/add", product);
      return {
        status: response.data.status,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(SERVER_URL + "/delete/" + id);
      return response.data; // Update with the actual returned status if necessary
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
