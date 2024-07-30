import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addItem: (state, action) => {
      state.carts.push(action.payload);
      console.log(action.payload);
    },
    removeItem: (state, action) => {
      state.carts = state.carts.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.carts = [];
    },
    setLoanding: (state) => {
      state.status = "loading";
    },
    setError: (state, action) => {
      state.status = "failer";
      state.error = action.payload;
    },
    setLoaded: (state) => {
      state.status = "succeeded";
    },
  },
});
export const {
  addItem,
  removeItem,
  clearCart,
  setLoanding,
  setError,
  setLoaded,
} = cartSlice.actions;
export default cartSlice.reducer;
