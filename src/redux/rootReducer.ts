// src/redux/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import modalReducer from "./slice/modalSlice";
import productReducer from "./slice/productSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  product: productReducer,
  // Add other reducers if needed
});

export default rootReducer;
