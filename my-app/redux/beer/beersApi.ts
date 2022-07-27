import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const beersApi = createApi({
  reducerPath: 'beersApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://fakestoreapi.com'}),
  endpoints: (build) => ({
    getBeers: build.query({
      query: (name) => `${name}`,
    })
  })
})

export const { useGetBeersQuery } = beersApi