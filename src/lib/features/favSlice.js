import { createSlice } from "@reduxjs/toolkit";

const initialState = { fav: [] };

export const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    addFav: (state, action) => {
      if (state.fav.find((el) => el.id === action.payload.id))
        return { ...state };
      return { ...state, fav: [...state.fav, ...[action.payload]] };
    },
    removeFav: (state, action) => {
      return {
        ...state,
        fav: state.fav.filter((el) => el.id !== action.payload),
      };
    },
  },
});

export const { addFav, removeFav } = favSlice.actions;
export default favSlice.reducer;
