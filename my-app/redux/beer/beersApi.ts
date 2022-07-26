import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const beersApi = createApi({
  reducerPath: 'beersApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.punkapi.com/v2'}),
  endpoints: (build) => ({
    getBeers: build.query({
      query: (name) => `${name}`,
    })
  })
})

export const { useGetBeersQuery } = beersApi