import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import dataReducer from "./reducers/data";

export default configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
  },
});
