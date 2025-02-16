import { createSlice } from "@reduxjs/toolkit";

const collectionsSlice = createSlice({
  name: "collections",
  initialState: {
    value: [],
  },
  reducers: {
    setCollections: (state, action) => {
      state.value = action.payload;
    },
    addCollection: (state, action) => {
      state.value.push(action.payload);
    },
    removeCollection: (state, action) => {
      state.value = state.value.filter((col) => col._id !== action.payload);
    },
  },
});

export const { setCollections, addCollection, removeCollection } = collectionsSlice.actions;
export default collectionsSlice.reducer;
