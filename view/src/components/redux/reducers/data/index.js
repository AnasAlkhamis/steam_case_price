import { createSlice } from "@reduxjs/toolkit";

export const data = createSlice({
  name: "data",
  initialState: {
    data: [],
    categories: [
      "Snakebite",
      "Fracture",
      "Prisma",
      "CS20",
      "Prisma 2",
      "Horizon",
      "Clutch",
      "Spectrum",
      "Spectrum 2",
      "Glove",
      "Gamma",
      "Gamma 2",
      "Chroma",
      "Chroma 2",
      "Chroma 3",
      "Revolver",
      "Shadow",
      "Falchion",
    ],
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    addData: (state, action) => {
      state.data.push(action.payload);
    },

    deleteData: (state, action) => {
      state.data = state.data.filter((ele, index) => {
        return ele.category != action.payload;
      });
    },
    deleteAllData: (state, action) => {
      state.data = [];
    },
  },
});

export const { setData, addData, deleteData, deleteAllData } = data.actions;

export default data.reducer;
