import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 0,
  pages: [],
  pagesGames: [],
};

const pageSlice = createSlice({
  name: "currentPage",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      return { ...state, currentPage: action.payload };
    },
    setAllPage: (state, action) => {
      let pages = Math.ceil(action.payload.length / 15);
      let gamesArr = [];
      for (let i = 0; i < pages; i++) {
        gamesArr.push(action.payload.slice(i * 15, (i + 1) * 15));
      }
      return {
        ...state,
        pagesGames: gamesArr,
        page: pages,
        currentPage: 0,
      };
    },
  },
});

export const { setCurrentPage, setAllPage } = pageSlice.actions;
export default pageSlice.reducer;
