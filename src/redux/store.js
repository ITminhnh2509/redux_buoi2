import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productslice";
import cartReducer from "./cartSlice";
import catReducer from "./catSlice";

const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartReducer,
    cats: catReducer,
  },
});

export default store;
