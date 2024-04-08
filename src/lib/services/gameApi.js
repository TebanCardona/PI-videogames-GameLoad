import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = "https://wandering-snaps-moth.cyclic.app/videogames";
export const gameApi = createApi({
  reducerPath: "gamesAPI",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getGames: builder.query({
      query: () => "",
    }),
    getGamesByName: builder.query({
      query: ({ name }) => `?name=${name}`,
    }),
    getGamesById: builder.query({
      query: ({ id }) => `/${id}`,
    }),
    postGame: builder.mutation({
      query: ({ body }) => ({
        url: "",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetGamesQuery,
  useGetGamesByIdQuery,
  useGetGamesByNameQuery,
  usePostGameQuery,
} = gameApi;
