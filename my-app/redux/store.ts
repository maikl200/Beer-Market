import {configureStore} from '@reduxjs/toolkit'
import {beersApi} from './beersApi'

export const store = configureStore({
  reducer: {
    [beersApi.reducerPath]: beersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(beersApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>