import {configureStore} from '@reduxjs/toolkit'
import {beersApi} from './beer/beersApi'
import {selectBeerReducer} from "./beer/beerSlice";

export const store = configureStore({
  reducer: {
    [beersApi.reducerPath]: beersApi.reducer, selectBeer: selectBeerReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(beersApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>