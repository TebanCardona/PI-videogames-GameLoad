import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = "https://wandering-snaps-moth.cyclic.app/platforms";

export const platformsApi = createApi({
  reducerPath: "platformsApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getPlatforms: builder.query({
      query: () => "",
    }),
  }),
});

export const { useGetPlatformsQuery } = platformsApi;
