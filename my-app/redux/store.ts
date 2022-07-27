import {configureStore} from '@reduxjs/toolkit'
import {beersApi} from './beer/beersApi'
import {productSliceReducer} from "./beer/beerSlice";

export const store = configureStore({
  reducer: {
    [beersApi.reducerPath]: beersApi.reducer, products: productSliceReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(beersApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>