import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || "",
    isLoggedIn: localStorage.getItem("token") ? true : false,
    show: false,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout: (state, action) => {
      state.token = "";
      state.isLoggedIn = false;
      localStorage.clear();
    },
    setShow: (state, action) => {
      state.show = !state.show;
    },
  },
});

export const { login, logout, setShow } = auth.actions;

export default auth.reducer;
