import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { gameApi } from "./services/gameApi";
import { genresApi } from "./services/genresApi";
import { platformsApi } from "./services/platformsApi";
import favReducer from "./features/favSlice";
import pageReducer from "./features/pageSlice";
import filterReducer from "./features/filterSlice";
import loadReducer from "./features/loadSlice";
export const store = () => {
  return configureStore({
    reducer: {
      [gameApi.reducerPath]: gameApi.reducer,
      [genresApi.reducerPath]: genresApi.reducer,
      [platformsApi.reducerPath]: platformsApi.reducer,
      favReducer,
      pageReducer,
      filterReducer,
      loadReducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        [gameApi.middleware],
        [genresApi.middleware],
        [platformsApi.middleware]
      ),
  });
};

setupListeners(store.dispatch);
