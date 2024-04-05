import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL =  "http://localhost:3001/genres";

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
