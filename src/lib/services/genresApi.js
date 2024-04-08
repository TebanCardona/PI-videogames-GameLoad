import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = "https://wandering-snaps-moth.cyclic.app/genres";


export const genresApi = createApi({
  reducerPath: "genresApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => "",
    }),
  }),
});

export const { useGetGenresQuery } = genresApi;
