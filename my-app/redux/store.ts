import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit'
import {createWrapper} from "next-redux-wrapper";
import {productSliceReducer} from "./beer/beerSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      products: productSliceReducer
    }
  })
}

export const store = makeStore()

export type RootStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<RootStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const wrapper = createWrapper<RootStore>(makeStore)
