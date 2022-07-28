import {createSlice} from "@reduxjs/toolkit";
import {ProductType} from "./ProductType";

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    basket: [] as ProductType[],
    market: [] as ProductType[],
    saleProduct: [] as ProductType[]
  },
  reducers: {
    productBasket: (state, action) => {
      state.basket = action.payload
    },
    clearBasket: (state, action) => {
      state.basket = action.payload
    },
    productMarket: (state, action) => {
      state.market = action.payload
    },
    productSale: (state, action) => {
      state.saleProduct = action.payload
    }
  }
})

export const productSliceReducer = productSlice.reducer
export const productSliceAction = productSlice.actions