import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProductType} from "./ProductType";

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    basket: [] as ProductType[],
    market: []
  },
  reducers: {
    addProduct: (state, action: PayloadAction<ProductType>) => {
      state.basket.push(action.payload)
    },
    deleteMarketProduct: (state, action: PayloadAction<ProductType>) => {
      // @ts-ignore
      state.market.push({...action.payload})
    }
  }
})

export const productSliceReducer = productSlice.reducer
export const productSliceAction = productSlice.actions