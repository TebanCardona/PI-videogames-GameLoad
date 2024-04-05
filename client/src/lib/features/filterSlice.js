import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gamesFilter: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      return { ...state, gamesFilter: action.payload };
    },
  },
});
export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
