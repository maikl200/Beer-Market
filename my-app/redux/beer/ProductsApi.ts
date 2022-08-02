import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {HYDRATE} from "next-redux-wrapper";

export const productsApi = createApi({
  reducerPath: 'beersApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://fakestoreapi.com'}),
  endpoints: (build) => ({
    getBeers: build.query({
      query: (name) => `${name}`,
    })
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    console.log(action)
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
})

export const { useGetBeersQuery } = productsApi